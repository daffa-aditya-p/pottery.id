# Pottery.id

Website Pottery.id berbasis React + Vite, dengan halaman chatbot `PotteryAI` yang terhubung ke OpenRouter.

## Setup

1. Copy env:
   - `cp .env.example .env`
2. Isi nilai penting di `.env`:
   - `VITE_OPENROUTER_API_KEY`
   - Opsional: `VITE_OPENROUTER_MODEL`, `VITE_OPENROUTER_SITE_URL`, `VITE_OPENROUTER_SITE_TITLE`, `VITE_POTTERYAI_SYSTEM_PROMPT`
3. Jalankan project:
   - `npm install`
   - `npm run dev`

## Catatan Keamanan

- Jangan commit file `.env`.
- Karena ini Vite client-side, nilai `VITE_*` ikut terkirim ke browser. Untuk production yang aman, pindahkan call OpenRouter ke backend/proxy API milik Anda.
