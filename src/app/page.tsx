"use client"

import { useState, useEffect } from "react"
import { Send, Bot, User, Sparkles, Locate } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function PocketDocHome() {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health companion. How can I help you today?",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: messages }),
      })

      const data = await res.json()

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply ?? "Sorry, something went wrong.",
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠️ Error contacting AI. Try again later.",
          sender: "bot",
        },
      ])
    }

    setLoading(false)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage()
  }

  const handleFindDoctors = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const mapsUrl = `https://www.google.com/maps/search/doctors/@${latitude},${longitude},15z`
        window.open(mapsUrl, "_blank")
      },
      () => {
        alert("Unable to retrieve your location.")
      }
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Floating Button */}
      <button
        onClick={handleFindDoctors}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <Locate className="w-4 h-4" />
        Find Nearby Doctors
      </button>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 py-12">
        {/* Hero */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">AI-Powered Healthcare</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            Welcome to PocketDoc
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-blue-200/80 font-light max-w-2xl mx-auto leading-relaxed">
            Your AI Health Companion
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Chat UI */}
        <div className="w-full max-w-4xl px-4 sm:px-6 md:px-12 mx-auto transition-all duration-1000 delay-300">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50 rounded-3xl blur-sm group-hover:blur-md transition-all duration-300 animate-pulse"></div>

            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-4 md:p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">PocketDoc AI</h3>
                    <p className="text-sm text-blue-300/70">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                    <div className={`flex items-start gap-3 max-w-xs ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500"
                      }`}>
                        {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30"
                          : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30"
                      }`}>
                        <p className="text-sm text-white/90">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-center text-sm text-blue-300/60 animate-pulse">Analyzing your health question...</div>
                )}
              </div>

              {/* Input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-slate-700/30 rounded-2xl border border-blue-400/20 focus-within:border-blue-400/50 transition-all duration-300">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleEnterKey}
                  placeholder="Ask me about your health..."
                  className="flex-1 bg-transparent text-white placeholder-blue-200/50 focus:outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="sm:w-10 w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Footer Tags */}
              <div className="flex justify-center mt-6 gap-6">
                <div className="flex items-center gap-2 text-xs text-blue-300/70">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-300/70">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-300/70">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-blue-200/60 text-sm">Powered by advanced AI • Your health data is encrypted and secure</p>
        </div>
      </div>
    </div>
  )
}
