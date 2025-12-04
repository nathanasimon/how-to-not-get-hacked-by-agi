# How to Not Get Hacked by AGI

An interactive digital zine and printable PDF guide about protecting yourself from AI-powered cyberattacks.

## About

This project addresses the urgent need for public education about AI-powered cybersecurity threats. As AI tools democratize sophisticated hacking capabilities, everyone needs to understand the changing threat landscape and how to protect themselves.

The project consists of:
- **Interactive Web Zine**: A React-based website with interactive elements, attack demonstrations, and expandable protection guides
- **PDF Zine**: A printable version for offline reading and distribution
- **Quick Reference**: Essential defense strategies in an accessible format

## Features

- **Interactive Attack Demonstrations**: Click through different AI-powered attack methods to understand how they work
- **Expandable Protection Guides**: Detailed, actionable steps organized by priority
- **Real-World Examples**: Grounded in current research and actual incidents
- **Accessible Design**: Clear explanations for non-technical audiences
- **Hybrid Format**: Both digital and printable versions available

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── components/       # React components
│   │   ├── Cover.jsx     # Landing page
│   │   ├── Section.jsx   # Content sections
│   │   ├── InteractiveDemo.jsx  # Attack demonstrations
│   │   ├── ProtectionGuide.jsx   # Defense strategies
│   │   └── Footer.jsx    # Footer with resources
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── pdf-zine.html         # Printable PDF version
├── REFLECTION.md         # Project reflection (1,487 words)
└── README.md             # This file
```

## Deployment

This project is configured for GitHub Pages deployment. The `vite.config.js` includes the base path configuration.

### Deploy to GitHub Pages

1. Push the repository to GitHub
2. Go to Settings > Pages
3. Select the `gh-pages` branch or `dist` folder as the source
4. The site will be available at `https://[username].github.io/how-to-not-get-hacked-by-agi/`

Alternatively, use GitHub Actions for automatic deployment on push.

## PDF Version

The `pdf-zine.html` file can be printed to PDF using any modern browser:
1. Open `pdf-zine.html` in a browser
2. Use Print > Save as PDF
3. The page breaks are configured for 8.5x11" paper

## Content Sources

This project draws from:
- Anthropic's research on autonomous AI attacks
- Claude Code project documentation
- Academic papers on LLMs in cybersecurity
- Security blogs (KrebsOnSecurity, Dark Reading, Wired Security)
- EFF cybersecurity guides

## Ethical Considerations

This project:
- Documents publicly available information about AI-powered attacks
- Focuses on defense strategies, not attack methods
- Does not provide exploit code or step-by-step attack instructions
- Aims to raise awareness and enable defense

## License

This project is created for educational purposes. Feel free to share, print, and distribute the content to help raise awareness about AI-powered cybersecurity threats.

## Contributing

Suggestions for improvements, corrections, or additional resources are welcome. This is an educational project aimed at helping people protect themselves.

## Contact

For questions or feedback about this project, please open an issue in the repository.

---

**Remember**: The threat is real. The time is now. But you're not powerless. Start with password managers and two-factor authentication, then build from there.

