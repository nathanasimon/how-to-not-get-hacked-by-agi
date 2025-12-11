# How to Not Get Hacked by AGI - Complete Project Prompt

## Project Overview

Build an interactive cybersecurity zine website about AI-powered attacks, specifically focusing on voice cloning scams targeting elderly people. The site should be beautiful, minimal, and tell real stories with actionable protection steps.

## Design Philosophy

**Think like Steve Jobs:**
- Clean, minimal design
- Generous white space
- Beautiful typography (use -apple-system font stack)
- White background (#fff)
- Subtle animations and hover effects
- One idea per section
- Let content breathe

**Write like Walter Isaacson:**
- Short, punchy sentences
- No em dashes (use periods instead)
- Clear facts, no fluff
- Direct, actionable language
- Real names, real places, real dollar amounts
- Story-driven narrative

## Content Requirements

### Focus: Generative AI-Specific Threats (NOT Pre-AI Threats)

**DO INCLUDE:**
- Voice cloning scams (grandparent scams, bank account draining)
- Deepfake video calls (Arup $25.6M case)
- Autonomous AI hacking (Anthropic research)
- AI-powered social engineering

**DO NOT INCLUDE:**
- Traditional password cracking (pre-AI)
- Basic phishing emails (pre-AI)
- Generic "AI is dangerous" statements

### Real Stories Required

Include these verified incidents with sources:

1. **Maureen (San Diego)** - $8,200 attempted scam, voice cloned from Instagram
   - Source: https://metanews.com/alert-grandma-avoids-losing-thousands-in-ai-voice-cloning-scam/

2. **Arup Deepfake** - $25.6M stolen via deepfaked CFO video call (Feb 2024)
   - Source: https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk

3. **Steve Beauchamp, 82** - Lost entire $690,000 retirement to deepfake Elon Musk investment scam
   - Source: https://www.ctol.digital/news/ai-powered-scams-drain-700-million-from-seniors-retirement-losses-surge-eightfold/

4. **Sharon Brightwell** - $15,000 sent to save "daughter" from accident, voice cloned from 3 seconds of Facebook video
   - Source: https://www.americanbar.org/groups/senior_lawyers/resources/voice-of-experience/2025-september/ai-cloned-voice-scam/

5. **Bank Account Voice Reset** - Journalist broke into own bank account using AI voice clone
   - Source: https://www.vice.com/en/article/how-i-broke-into-a-bank-account-with-an-ai-generated-voice/
   - 91% of US banks reconsidering voice verification

### Key Statistics

- 3 seconds of audio = 85% accurate voice clone
- 442% increase in vishing attacks in 2024
- $40B projected loss to deepfake scams by 2027
- $1/month cost of commercial voice cloning tools
- $1B lost by elderly to AI scams in 2024

### Protection Steps (Priority Order)

1. **Family Code Word** - Create secret phrase, AI can't know it
2. **Hang Up and Call Back** - Always verify using saved number
3. **Authenticator Apps with Face ID** - Google Authenticator, Authy, 1Password
4. **Physical Security Keys** - YubiKey, Titan Security Key
5. **Three-Factor Authentication** - Password + authenticator + physical key
6. **Lock Down Social Media** - Make videos private, remove voice samples
7. **Talk to Your Parents** - Explain voice cloning, set up code word together

## Technical Requirements

### Tech Stack
- React (functional components with hooks)
- Vite dev server
- CSS (no frameworks, custom styling)
- Responsive design (mobile-friendly)

### Site Structure

**Single scrolling page with these sections:**

1. **Sticky Header**
   - Small, subtle: "HOW TO NOT GET HACKED BY AGI"
   - Uppercase, letter-spacing, gray color

2. **Hero Section**
   - Massive "3 seconds" (clamp 6rem to 14rem)
   - Subtitle: "That's all it takes to clone a voice."
   - Description: "These are real people. Real families. Real losses."
   - Full viewport height (80vh min-height)

3. **Story Carousel Section**
   - Display one story at a time
   - Show: amount lost, victim name, location, story text
   - Dot navigation (4 dots for 4 stories)
   - Arrow buttons (← →) to navigate
   - Smooth transitions

4. **Stats Section**
   - Grid of 3 stats: 442%, $40B, $1/month
   - Large numbers, small labels
   - Clean spacing

5. **Protections Grid**
   - 7 cards in responsive grid
   - Each card: number (1-7), title, body text, reason (italic)
   - Hover effect: border changes to black, slight lift
   - Clean borders, subtle shadows on hover

6. **Footer**
   - Simple call to action
   - "The threat is real. The time is now."
   - "Start with the family code word. Do it today."

### Design Specifications

**Colors:**
- Background: #fff (white)
- Text: #000 (black) for headings, #1d1d1f for body
- Accents: #666 (gray) for secondary text, #999 for meta
- Borders: #e5e5e5 (light gray)

**Typography:**
- Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Hero number: clamp(6rem, 18vw, 14rem), weight 700
- Section titles: clamp(2rem, 4vw, 3.5rem), weight 600
- Body text: clamp(0.9375rem, 1.6vw, 1.0625rem), weight 400
- Line-height: 1.5-1.6 for readability

**Spacing:**
- Section padding: 6rem 2rem (4rem on mobile)
- Card padding: 2rem (1.5rem on mobile)
- Generous margins between sections

**Interactions:**
- Smooth hover transitions (0.2s-0.3s ease)
- Dot navigation active state
- Card hover: border color change, slight transform
- No jarring animations

## Writing Style Examples

**Good (Walter Isaacson style):**
"The phone rang. Maureen answered. 'Grandma, I'm in jail. I need $8,200 for bail.' The voice was her grandson's. Every inflection. Every pause. She nearly wired the money. Then she called his real number. He was fine. The voice had been AI. Cloned from 15 seconds of Instagram."

**Bad (AI slop):**
"AI-powered voice cloning technology has revolutionized the cybersecurity landscape, enabling sophisticated social engineering attacks that leverage advanced machine learning algorithms to create convincing audio deepfakes—posing significant risks to vulnerable populations."

## Key Principles

1. **No emojis** - They're "AI slop"
2. **No generic statements** - Every claim needs real examples
3. **No pre-AI threats** - Focus on what generative AI enables
4. **Scrolling is OK** - It's a zine, can have length
5. **Beautiful and fun** - Should be engaging, not scary
6. **One screen at a time** - Each section should feel complete
7. **Real > Theoretical** - Actual victims, actual dollar amounts

## File Structure

```
src/
├── components/
│   ├── VoiceCloningDemo.jsx (main component)
│   └── VoiceCloningDemo.css
├── App.jsx (simple wrapper)
├── App.css
├── main.jsx
└── index.css (global styles, white background)
```

## Dev Server

- Run: `npm run dev`
- Should start on http://localhost:5173/
- Hot reload should work

## Success Criteria

The site should:
- Look like an Apple product page (clean, minimal, beautiful)
- Read like Walter Isaacson biography (clear, factual, engaging)
- Tell real stories with real victims
- Provide actionable protection steps
- Be fun to scroll through
- Work on mobile and desktop

## Common Mistakes to Avoid

- Don't use emojis
- Don't write generic "AI is dangerous" content
- Don't include pre-AI threats (password cracking, basic phishing)
- Don't use dark backgrounds (must be white)
- Don't write long paragraphs (short sentences)
- Don't use em dashes (use periods)
- Don't make it scary (make it informative and actionable)

