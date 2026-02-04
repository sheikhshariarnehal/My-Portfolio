# Astro Image Optimization Guide

## Overview
This project now uses Astro's built-in image optimization powered by Sharp. Images are automatically optimized during build time for better performance.

## What's Enabled
- ✅ Automatic image optimization with Sharp
- ✅ Responsive image generation
- ✅ WebP/AVIF format conversion
- ✅ Lazy loading support
- ✅ Remote image support (HTTPS)

## Configuration
The image optimization is configured in `astro.config.mjs`:
```javascript
image: {
  service: {
    entrypoint: 'astro/assets/services/sharp'
  },
  remotePatterns: [{ protocol: 'https' }]
}
```

## Usage

### For Static Images in `public/`
Use the `Image` component from `astro:assets`:

```astro
---
import { Image } from 'astro:assets';
---

<Image 
  src="/assets/images/hero.webp" 
  alt="Description"
  width={400}
  height={400}
  loading="lazy"
/>
```

### For Remote Images
The same `Image` component works with remote URLs:

```astro
<Image 
  src="https://example.com/image.jpg"
  alt="Description"
  width={400}
  height={300}
  inferSize  // Optional: infer dimensions from source
/>
```

### For Imported Images
You can also import images directly for better type safety:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.webp';
---

<Image src={heroImage} alt="Hero" />
```

## Key Differences from `<img>`
- Use `width={400}` instead of `width="400"` (numbers, not strings)
- `fetchpriority` is replaced by setting `loading="eager"` for above-fold images
- `decoding` attribute is automatically handled

## Benefits
- 🚀 Automatic format conversion to modern formats (WebP, AVIF)
- 📦 Multiple sizes generated for responsive images
- ⚡ Reduced file sizes without quality loss
- 🎨 Lazy loading built-in
- 🔧 Build-time optimization

## Components Updated
- ✅ `SkillCard.astro`
- ✅ `EducationCard.astro`
- ✅ `index.astro` (Home page)
- ✅ `projects/index.astro`
- ✅ `404.astro`
- ✅ `AdminLayout.astro`

## Note
For images in JavaScript/TypeScript files or dynamic admin content, regular `<img>` tags are still appropriate as they're generated at runtime.
