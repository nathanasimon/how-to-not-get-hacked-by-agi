# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

3. **Build for Production**
   ```bash
   npm run build
   ```

## Publishing to GitHub Pages

### Option 1: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Push to GitHub and enable GitHub Pages:
   - Go to repository Settings > Pages
   - Select `gh-pages` branch or `dist` folder
   - The site will be available at `https://[username].github.io/how-to-not-get-hacked-by-agi/`

### Option 2: Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to GitHub Pages when you push to the main branch.

1. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/[username]/how-to-not-get-hacked-by-agi.git
   git push -u origin main
   ```

2. Enable GitHub Pages in repository settings (Settings > Pages)
   - Select "GitHub Actions" as the source

3. The workflow will automatically deploy on every push to main

## Creating PDFs

### Main Zine PDF

1. Open `pdf-zine.html` in a browser
2. Use Print (Cmd/Ctrl + P) > Save as PDF
3. Page breaks are configured for 8.5x11" paper

### Quick Reference Cards

1. Open `quick-reference-card.html` in a browser
2. Use Print (Cmd/Ctrl + P) > Save as PDF
3. Print on cardstock and cut along the borders
4. Cards are designed to be double-sided (print front, flip, print back)

## Project Structure

- `src/` - React source code
- `src/components/` - React components
- `pdf-zine.html` - Printable PDF version of the zine
- `quick-reference-card.html` - Printable reference cards
- `REFLECTION.md` - Project reflection (1,487 words)
- `README.md` - Project documentation
- `.github/workflows/` - GitHub Actions deployment workflow

## Customization

### Changing Colors

Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #ff6b35;
  --secondary: #004e89;
  --accent: #00d4ff;
  /* ... */
}
```

### Adding Content

- Edit component files in `src/components/`
- Update `src/App.jsx` to add new sections
- Modify `pdf-zine.html` for PDF version updates

## Troubleshooting

### Build Errors

- Make sure Node.js 16+ is installed
- Delete `node_modules` and run `npm install` again
- Check that all imports are correct

### GitHub Pages Not Updating

- Check GitHub Actions workflow status
- Verify base path in `vite.config.js` matches repository name
- Clear browser cache

### PDF Printing Issues

- Use Chrome or Firefox for best results
- Check print settings (margins, page size)
- Ensure page breaks are enabled in print dialog

