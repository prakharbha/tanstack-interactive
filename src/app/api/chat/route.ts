import { NextResponse } from 'next/server'

// Note: This is a mock implementation for demo purposes
// In a real TanStack AI app, you'd use:
//
// import { chat, toStreamResponse } from '@tanstack/ai';
// import { openaiText } from '@tanstack/ai-openai';
//
// export async function POST(request: Request) {
//   const { messages } = await request.json();
//   const stream = chat({
//     adapter: openaiText(),
//     model: 'gpt-4o',
//     messages,
//   });
//   return toStreamResponse(stream);
// }

export async function POST(request: Request) {
    const { messages } = await request.json()

    // Check if we have an API key
    const apiKey = process.env.OPENAI_API_KEY

    if (apiKey && apiKey !== 'sk-your-openai-key-here') {
        // Real OpenAI request
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: messages,
                }),
            })

            const data = await response.json()
            return NextResponse.json({
                content: data.choices[0].message.content,
            })
        } catch (error) {
            console.error('OpenAI error:', error)
            return NextResponse.json({
                content: 'Error connecting to OpenAI. Please check your API key.',
            })
        }
    }

    // Mock response for demo
    const lastMessage = messages[messages.length - 1]?.content || ''

    const mockResponses = [
        "Hello! I'm a demo response. Add your OpenAI API key to .env.local to get real responses!",
        "This is TanStack AI in action! Well, a mock version. The real thing is even cooler.",
        "Great question! With TanStack AI, you can switch between OpenAI, Claude, and Gemini with just one line change.",
        "The isomorphic tools feature is really powerful - define once, run on server or client!",
    ]

    return NextResponse.json({
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
    })
}
