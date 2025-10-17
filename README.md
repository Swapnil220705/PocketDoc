# 🩺 PocketDoc – AI Health Companion

PocketDoc is an AI-powered health chatbot built with Next.js and integrated with the Groq API using LLaMA3 models. It helps users get instant answers to **health-related questions**, and even helps **locate nearby doctors** using geolocation.

## 🌐 Live Demo
🔗 [Visit the site here](https://pocket-doc-red.vercel.app)

---

## ⚙️ Features

- 🤖 Real-time AI health assistant
- 📍 “Find Nearby Doctors” using Geolocation (opens in Google Maps)
- 🎨 Beautiful, responsive UI with animations
- 🔒 Only responds to medical queries
- ☁️ Deployed on Vercel with secure environment variables

---

## 🧠 Powered By

- [Next.js 14 (App Router)](https://nextjs.org/)
- [Groq API (LLaMA 3)](https://console.groq.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel Deployment](https://vercel.com)

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/pocketdoc.git
cd pocketdoc
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Add Environment Variables

```bash
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_MAP_API_KEY=your_google_maps_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```
---

## 🗂️ Project Structure
```bash
pocketdoc/
├── app/                 # Next.js App Router pages and layouts
│   ├── page.tsx         # Main chat interface
│   ├── components/      # UI components (chat box, navbar, etc.)
│   ├── utils/           # Helper and API utility functions
│   └── styles/          # Global and component styles
├── public/              # Static assets (icons, logos)
├── .env.local           # Environment variables
├── package.json         # Dependencies and scripts
├── next.config.ts       # Next.js configuration
├── tailwind.config.mjs  # TailwindCSS configuration
└── tsconfig.json        # TypeScript configuration
```
---

## 🧩 Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Starts the app in development mode |
| `npm run build` | Builds the production version      |
| `npm start`     | Runs the built app                 |
| `npm run lint`  | Runs Next.js linting               |

---

## 🌍 Deployment

PocketDoc is fully deployable on **Vercel**.

1. Push your project to a GitHub repository.  
2. Visit [Vercel](https://vercel.com/) and import your repo.  
3. Add your `.env` variables in Vercel’s dashboard under **Settings → Environment Variables**.  
4. Click **Deploy** — and you’re live!

---

## 🧠 How It Works

- Users interact with an **AI-powered chatbot** that only responds to medical-related queries.  
- The app uses **Groq API (LLaMA 3)** to process user questions and generate safe responses.  
- The **Geolocation feature** lets users find nearby doctors by opening Google Maps at their current location.  
- A clean **TailwindCSS interface** with animations ensures smooth user experience.

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m "Add feature")
4. Push to your branch (git push origin feature-name)
5. Open a Pull Request

---

## 🪪 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it — just give proper credit.
