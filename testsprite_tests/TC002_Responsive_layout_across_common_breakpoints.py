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
        
        # -> Inject/replace the meta viewport tag with content width=320 and reload the Home page so the browser recalculates layout for a 320px viewport, then report window.innerWidth/window.innerHeight and run the DOM visibility checks for header/hero/primary CTAs.
        await page.goto("http://localhost:4322/", wait_until="commit", timeout=10000)
        
        # -> Open the Projects page (click Projects link) so the Projects page can be simulated at widths [320,375,768,1024,1440] and collect the same layout metrics.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/header/nav/ul/li[5]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # -> Navigate to the Experience page (click the Experience nav link) so the Experience page can be simulated at widths [320,375,768,1024,1440] using html/body width injection and collect layout metrics (header/hero/CTA bounding boxes, mobile menu presence, overlap detection, horizontal-scroll detection) for each width.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/header/nav/ul/li[6]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    