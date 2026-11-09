# Media Guidelines for D.J. Trust React Web

You can add your images and videos directly into the folders below.

---

### 📁 Folder Paths on Your Computer:

1. **Images Folder**:
   `DjTrust_Modern\DjTrust.Web\public\images\`
   - `banners\` — For hero banners & page headers
   - `showrooms\` — For showroom and branch photos
   - `gallery\` — For event & CSR gallery pictures
   - `team\` — For leadership & board member photos
   - `partners\` — For partner brand logos

2. **Videos Folder**:
   `DjTrust_Modern\DjTrust.Web\public\videos\`
   - `hero\` — For homepage background or promo video
   - `events\` — For event videos

---

### 💻 How to use them in React:

Because these folders are inside `public/`, you can use them directly with a leading forward slash `/`:

```tsx
// Example Image
<img src="/images/banners/hero-banner.jpg" alt="Hero Banner" />

// Example Video
<video src="/videos/hero/intro.mp4" autoPlay loop muted playsInline />
```

Supported formats:
- Images: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
- Videos: `.mp4`, `.webm`

