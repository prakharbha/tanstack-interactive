'use client'

import { useState } from 'react'
// Note: In a real TanStack AI app, you'd import from @tanstack/ai-react
// import { useChat, fetchServerSentEvents } from '@tanstack/ai-react'

// Mock implementation for demo purposes - TanStack AI is in alpha
// Replace with real imports when packages are stable

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export default function Home() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content,
                    }))
                }),
            })

            const data = await response.json()

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: data.content,
                },
            ])
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage()
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Basic Chat Demo
                </h1>
                <p className="text-slate-400">
                    A simple chat interface using TanStack AI with streaming responses.
                </p>
            </div>

            {/* Code Example */}
            <div className="mb-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-sm font-medium text-slate-400 mb-3">How it works:</h3>
                <pre className="text-sm overflow-x-auto">
                    <code className="text-green-400">{`// Server: app/api/chat/route.ts
import { chat, toStreamResponse } from '@tanstack/ai';
import { openaiText } from '@tanstack/ai-openai';

export async function POST(request: Request) {
  const { messages } = await request.json();
  const stream = chat({
    adapter: openaiText(),
    model: 'gpt-4o',
    messages,
  });
  return toStreamResponse(stream);
}`}</code>
                </pre>
            </div>

            {/* Chat Interface */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-slate-500 py-12">
                            Send a message to start chatting!
                        </div>
                    )}
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-xl px-4 py-2 ${message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-100'
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-700 rounded-xl px-4 py-2 text-slate-400">
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div >

            {/* Note */}
            < p className="text-center text-slate-500 text-sm mt-6" >
                Note: This demo uses a mock API.Add your OpenAI API key to.env.local to enable real responses.
            </p >
        </div >
    )
}
