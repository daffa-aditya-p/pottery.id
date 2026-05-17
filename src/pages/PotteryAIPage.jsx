import { useEffect, useMemo, useRef, useState } from 'react'

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MODEL = 'openai/gpt-oss-120b:free'
const DEFAULT_SYSTEM_PROMPT =
  'Kamu adalah PotteryAI, asisten studio keramik yang ramah, cerdas, dan selalu menjawab dalam bahasa Indonesia dengan gaya jelas dan membantu.'

const INITIAL_ASSISTANT_MESSAGE =
  'Halo, saya PotteryAI. Tanya apa saja seputar keramik, koleksi, perawatan produk, atau ide hadiah.'

function toAssistantText(content) {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part
        return part?.text ?? ''
      })
      .join('')
      .trim()
  }
  return ''
}

export default function PotteryAIPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: INITIAL_ASSISTANT_MESSAGE }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesBoxRef = useRef(null)

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const model = import.meta.env.VITE_OPENROUTER_MODEL || DEFAULT_MODEL
  const referer = import.meta.env.VITE_OPENROUTER_SITE_URL
  const title = import.meta.env.VITE_OPENROUTER_SITE_TITLE || 'Pottery.id'
  const systemPrompt = import.meta.env.VITE_POTTERYAI_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT

  const hasApiKey = useMemo(() => Boolean(apiKey), [apiKey])

  useEffect(() => {
    if (!messagesBoxRef.current) return
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight
  }, [messages, isLoading])

  const handleReset = () => {
    setMessages([{ role: 'assistant', content: INITIAL_ASSISTANT_MESSAGE }])
    setInput('')
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const prompt = input.trim()
    if (!prompt || isLoading) return

    if (!hasApiKey) {
      setError('VITE_OPENROUTER_API_KEY belum terpasang. Tambahkan dulu di file .env.')
      return
    }

    setError('')
    setInput('')

    const nextMessages = [...messages, { role: 'user', content: prompt }]
    setMessages(nextMessages)
    setIsLoading(true)

    const historyForModel = nextMessages.slice(-16).map((message) => ({
      role: message.role,
      content: message.content,
    }))

    try {
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-OpenRouter-Title': title,
      }

      if (referer) headers['HTTP-Referer'] = referer

      const response = await fetch(OPENROUTER_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: systemPrompt }, ...historyForModel],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 0.9,
          stream: false,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error?.message || 'Gagal menghubungi OpenRouter.')
      }

      const assistantContent = toAssistantText(data?.choices?.[0]?.message?.content)
      if (!assistantContent) {
        throw new Error('Model tidak mengembalikan jawaban yang valid.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantContent }])
    } catch (err) {
      setError(err?.message || 'Terjadi kesalahan saat mengirim pesan.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f3eed9_0%,#fff8df_48%,#f3ebcf_100%)] py-10 sm:py-14">
      <div className="container-pad grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <section className="rounded-2xl border border-earth-900/10 bg-white/60 p-6 backdrop-blur-sm sm:p-8">
          <p className="eyebrow">Asisten Studio</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-earth-900 sm:text-5xl">
            PotteryAI
          </h1>
          <p className="mt-4 text-sm leading-7 text-earth-900/75">
            Asisten cerdas untuk rekomendasi produk, inspirasi dekorasi, panduan perawatan keramik, hingga jawaban cepat seputar studio.
          </p>

          <div className="mt-8 rounded-xl border border-clay-200 bg-clay-50 p-4 text-xs text-earth-900/75">
            <p className="font-semibold text-earth-900">Konfigurasi model:</p>
            <p className="mt-1">Model: {model}</p>
            <p className="mt-1">Endpoint: OpenRouter Chat Completions</p>
          </div>

          {!hasApiKey && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-900">
              API key belum tersedia. Isi <span className="font-semibold">VITE_OPENROUTER_API_KEY</span> di file <span className="font-semibold">.env</span>.
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-earth-900/10 bg-white shadow-lg shadow-black/5">
          <div className="border-b border-earth-900/10 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-xl font-bold text-earth-900">Chat Dengan PotteryAI</p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-earth-900/20 px-3 py-1.5 text-xs font-semibold text-earth-900 transition hover:border-clay-600 hover:text-clay-700"
              >
                Reset
              </button>
            </div>
          </div>

          <div ref={messagesBoxRef} className="h-[58svh] min-h-[420px] overflow-y-auto px-5 py-5 sm:px-6">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <article
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === 'user'
                      ? 'ml-auto bg-clay-600 text-white'
                      : 'mr-auto border border-earth-900/10 bg-[#f6f2e7] text-earth-900'
                  }`}
                >
                  {message.content}
                </article>
              ))}
              {isLoading && (
                <article className="mr-auto max-w-[90%] rounded-2xl border border-earth-900/10 bg-[#f6f2e7] px-4 py-3 text-sm text-earth-900/75 shadow-sm">
                  PotteryAI sedang menyusun jawaban...
                </article>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-earth-900/10 p-4 sm:p-5">
            <label htmlFor="potteryai-input" className="sr-only">
              Tulis pesan
            </label>
            <div className="flex items-end gap-3">
              <textarea
                id="potteryai-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Contoh: rekomendasi vas untuk ruang tamu minimalis..."
                rows={2}
                className="field min-h-[56px] resize-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex min-h-[56px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-clay-500 to-clay-700 px-5 text-xs font-bold uppercase tracking-[0.12em] text-white transition disabled:cursor-not-allowed disabled:opacity-55"
              >
                Kirim
              </button>
            </div>
            {error && <p className="mt-3 text-xs text-red-700">{error}</p>}
          </form>
        </section>
      </div>
    </main>
  )
}
