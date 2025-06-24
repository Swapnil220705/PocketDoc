import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Groq API key missing" }, { status: 500 })
  }

  const allowedTopics = [
    "health", "doctor", "medicine", "disease", "symptom", "treatment", "pain", "injury",
    "mental", "fitness", "hospital", "illness", "ache", "fever", "cough", "headache",
    "stomach", "cold", "flu", "nausea", "vomit", "diarrhea", "rash", "infection", "burn", "bleeding", "fracture"
  ]

  const lowercased = message.toLowerCase()
  const isHealthRelated = allowedTopics.some(topic => lowercased.includes(topic))

  if (!isHealthRelated) {
    return NextResponse.json({
      reply: "❌ I'm only trained to help with health-related questions. Please ask me something medical.",
    })
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful health assistant. ONLY answer medical questions. If asked about anything else, refuse politely.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    console.log("🧠 Groq response:", JSON.stringify(data, null, 2))

    if (!data.choices || !data.choices.length || !data.choices[0].message) {
      return NextResponse.json({ reply: "🛑 Unexpected response from AI. Try again shortly." })
    }

    const reply = data.choices[0].message.content.trim()
    return NextResponse.json({ reply })

  } catch (error) {
    console.error("🔥 Groq API Error:", error)
    return NextResponse.json({ error: "Error calling Groq API" }, { status: 500 })
  }
}
