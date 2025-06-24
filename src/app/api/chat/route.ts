import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { message, history } = await req.json()

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ reply: "❗ Please provide a valid message." }, { status: 400 })
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Groq API key missing" }, { status: 500 })
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
            content:
              "You are a helpful, friendly AI health assistant. ONLY respond to health-related or medical questions. If the user asks something unrelated, politely explain that you can only assist with medical concerns. Always respond clearly using bullet points, easy-to-understand language, and actionable advice.",
          },
          ...(history || []).map((msg: any) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
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
