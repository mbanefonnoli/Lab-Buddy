# 🩺 Lab Buddy — Your Health Story, Simplified!

Lab Buddy is a friendly, AI-powered medical lab report interpreter. It takes your complex lab results (via text or PDF) and explains them in plain English, flagging abnormal values and providing helpful context.

## ✨ Features
- **Instant Analysis**: Paste raw text or upload a PDF for immediate interpretation.
- **Friendly Explanations**: Uses custom AI prompts to translate medical jargon into 2–4 simple sentences.
- **Visual Status Badges**: Quickly see if your results are "Doing Great", "A Bit High", or "Heads Up!".
- **Mobile First**: Premium, playful design optimized for both mobile and desktop.
- **Privacy Focused**: No data is stored permanently; all analysis happens on-demand.

## 🚀 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **AI**: DeepSeek Chat API
- **Styling**: Tailwind CSS
- **Parsing**: `pdfjs-dist` for browser-side PDF text extraction

## 🛠️ Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mbanefonnoli/Lab-Buddy.git
   cd Lab-Buddy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   DEEPSEEK_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🏗️ Building for Production
```bash
npm run build
npm run start
```

## ⚖️ Disclaimer
This application is for informational purposes only and does not constitute medical advice. Always consult with a healthcare professional regarding your lab results.
