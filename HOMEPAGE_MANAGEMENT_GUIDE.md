# Homepage Management System - Documentation

## Overview
A complete backend system to manage all homepage content from the admin dashboard, including images and details.

## What Was Implemented

### 1. Database Schema
Created `homepage_settings` table with the following sections:
- **hero**: Hero section content (name, greeting, typing texts, images, CTA)
- **about**: About section content (bio, profile image, email, location, resume)
- **contact**: Contact section content (contact image)
- **seo**: SEO metadata (social links, structured data, contact info)

### 2. Storage
Created `homepage-images` bucket for uploading:
- Hero images
- Profile images
- Contact images
- 5MB file size limit
- Supports: JPEG, PNG, WebP, GIF

### 3. Security (Row Level Security)
- **Public**: Can read active homepage settings
- **Authenticated**: Full CRUD access for admin users

### 4. Admin Interface
New admin page at `/admin/homepage/` with 4 tabs:
- **Hero Section**: Manage greeting, name, typing animations, hero image, CTA button
- **About Section**: Manage bio, profile image, contact details, resume link
- **Contact Section**: Manage contact page image
- **SEO Settings**: Manage metadata, social media links, structured data

### 5. Features
✅ Edit all homepage text content
✅ Upload new images with drag-and-drop
✅ Update typing animation texts
✅ Change hero and profile images
✅ Update SEO metadata
✅ Manage social media links
✅ Real-time preview on homepage
✅ Automatic image URL generation

### 6. Updated Files
- `supabase/migrations/20260214000000_create_homepage_settings.sql` - Database migration
- `src/lib/supabase.ts` - Added homepage settings helper functions
- `src/pages/admin/homepage.astro` - Admin interface for homepage management
- `src/layouts/AdminLayout.astro` - Added homepage link to navigation
- `src/pages/index.astro` - Updated to fetch content from database

## How to Use

### Access the Admin Panel
1. Login to admin dashboard: `/admin/`
2. Click "Homepage" in the sidebar
3. You'll see 4 tabs for different sections

### Edit Hero Section
1. Go to "Hero Section" tab
2. Fill in the form fields:
   - Greeting (e.g., "Hi There,")
   - Name (e.g., "Sheikh Shariar Nehal")
   - Subtitle (e.g., "I Am Into")
   - Typing texts (comma-separated)
   - Hero image URL or upload new image
   - CTA button text and link
3. Click "Save Hero" button

### Upload Images
1. Click "Choose File" under any section
2. Select an image (max 5MB)
3. Click "Upload" button
4. The URL will automatically populate in the form
5. Click the section's save button to apply changes

### Edit About Section
1. Go to "About Section" tab
2. Update biography, profile image, contact details
3. Change resume link if needed
4. Upload new profile image
5. Click "Save About"

### Update SEO Settings
1. Go to "SEO Settings" tab
2. Update professional information
3. Add/update social media links
4. Click "Save SEO"

## Database Structure

### homepage_settings Table
```sql
- id: UUID (Primary Key)
- section: VARCHAR (Unique) - 'hero', 'about', 'contact', 'seo'
- content: JSONB - Section-specific content
- is_active: BOOLEAN - Enable/disable section
- sort_order: INTEGER - Display order
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ (auto-updated)
```

### Example Content Structure

#### Hero Section
```json
{
  "name": "Sheikh Shariar Nehal",
  "greeting": "Hi There,",
  "subtitle": "I Am Into",
  "typingTexts": ["frontend development", "backend development"],
  "heroImage": "/assets/images/hero.webp",
  "heroImageAlt": "Alt text",
  "ctaText": "About Me",
  "ctaLink": "#about"
}
```

#### About Section
```json
{
  "title": "I'm Sheikh Shariar Nehal",
  "subtitle": "Web Developer",
  "profileImage": "/assets/images/profile2.webp",
  "profileImageAlt": "Alt text",
  "bio": "Biography text...",
  "email": "email@example.com",
  "location": "City, Country",
  "resumeText": "Resume",
  "resumeUrl": "https://..."
}
```

## API Functions

### Frontend (src/lib/supabase.ts)
- `getHomepageSettings()` - Fetch all homepage settings
- `getHomepageSettingsBySection(section)` - Fetch specific section

### Admin Functions (JavaScript)
- `loadHomepageSettings()` - Load all sections into forms
- `saveSection(section)` - Save section changes
- `uploadImage(section, targetInputId)` - Upload and set image URL

## Benefits
1. **No Code Changes**: Update homepage without touching code
2. **Image Management**: Upload images directly from admin panel
3. **Live Updates**: Changes reflect immediately on homepage
4. **Version Control**: Database tracks all changes with timestamps
5. **Secure**: RLS ensures only admins can modify content
6. **SEO Friendly**: Manage all SEO metadata in one place

## Next Steps (Optional Enhancements)
- Add image cropping/resizing tool
- Add preview before saving
- Add revision history
- Add bulk image upload
- Add dark/light mode toggle
- Add A/B testing for different hero messages
- Add analytics for CTA clicks

## Troubleshooting

### Images Not Uploading
- Check file size (must be < 5MB)
- Verify file type (JPEG, PNG, WebP, GIF only)
- Ensure you're logged in as admin

### Changes Not Showing
- Hard refresh the browser (Ctrl+F5)
- Clear browser cache
- Check if section is marked as active in database

### Database Connection Issues
- Verify Supabase credentials in `.env`
- Check if RLS policies are properly configured
- Ensure database is not paused

## Support
For issues or questions, check:
1. Browser console for JavaScript errors
2. Supabase dashboard for database errors
3. Network tab for API call failures
