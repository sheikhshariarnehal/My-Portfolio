import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:4322", wait_until="commit", timeout=10000)

        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass

        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:4322
        await page.goto("http://localhost:4322", wait_until="commit", timeout=10000)
        
        # -> Navigate to http://localhost:4322/admin (same tab) with no auth and check whether it redirects to a Supabase Auth login or otherwise prevents access to dashboard content.
        await page.goto("http://localhost:4322/admin", wait_until="commit", timeout=10000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        # Assert that an unauthenticated visit shows a login prompt and prevents dashboard access
        assert await page.locator("text=Admin Login").is_visible(), "Expected 'Admin Login' heading to be visible"
        assert await page.locator("text=Sign in to manage your portfolio").is_visible(), "Expected sign-in prompt to be visible"
        assert await page.get_by_label("Email").is_visible(), "Expected an Email input to be present for login"
        assert await page.get_by_label("Password").is_visible(), "Expected a Password input to be present for login"
        assert await page.get_by_role("button", name="Sign In").is_visible(), "Expected a 'Sign In' button to be present"
        # Ensure no authenticated/admin-only content is visible to the unauthenticated user
        assert (await page.locator("text=Dashboard").count()) == 0, "Dashboard content should not be visible to unauthenticated users"
        assert (await page.locator("text=Sign Out").count()) == 0, "Sign Out should not be visible to unauthenticated users"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    