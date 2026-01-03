'use client'

import { useState } from 'react'

type Provider = 'openai' | 'anthropic' | 'gemini' | 'ollama'

const providers: { id: Provider; name: string; model: string; color: string }[] = [
    { id: 'openai', name: 'OpenAI', model: 'gpt-4o', color: 'bg-green-600' },
    { id: 'anthropic', name: 'Anthropic', model: 'claude-3-opus', color: 'bg-orange-600' },
    { id: 'gemini', name: 'Google Gemini', model: 'gemini-1.5-pro', color: 'bg-blue-600' },
    { id: 'ollama', name: 'Ollama (Local)', model: 'llama3.1', color: 'bg-purple-600' },
]

export default function ProvidersPage() {
    const [selectedProvider, setSelectedProvider] = useState<Provider>('openai')

    const codeExamples: Record<Provider, string> = {
        openai: `import { chat } from '@tanstack/ai';
import { openaiText } from '@tanstack/ai-openai';

const result = await chat({
  adapter: openaiText(),
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
        anthropic: `import { chat } from '@tanstack/ai';
import { anthropicText } from '@tanstack/ai-anthropic';

const result = await chat({
  adapter: anthropicText(),
  model: 'claude-3-opus',
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
        gemini: `import { chat } from '@tanstack/ai';
import { geminiText } from '@tanstack/ai-gemini';

const result = await chat({
  adapter: geminiText(),
  model: 'gemini-1.5-pro',
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
        ollama: `import { chat } from '@tanstack/ai';
import { ollamaText } from '@tanstack/ai-ollama';

const result = await chat({
  adapter: ollamaText(),
  model: 'llama3.1',
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Provider Switching Demo
                </h1>
                <p className="text-slate-400">
                    Switch between AI providers with a single line change. No vendor lock-in!
                </p>
            </div>

            {/* Provider Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {providers.map((provider) => (
                    <button
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${selectedProvider === provider.id
                                ? `${provider.color} border-white`
                                : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                            }`}
                    >
                        <div className="font-bold text-white">{provider.name}</div>
                        <div className="text-sm text-slate-300">{provider.model}</div>
                    </button>
                ))}
            </div>

            {/* Code Example */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">
                        Using {providers.find(p => p.id === selectedProvider)?.name}
                    </h3>
                    <span className="text-sm text-slate-400">
                        Just change the adapter import!
                    </span>
                </div>
                <pre className="text-sm overflow-x-auto">
                    <code className="text-green-400">{codeExamples[selectedProvider]}</code>
                </pre>
            </div>

            {/* Key Point */}
            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-white mb-2">💡 Key Insight</h3>
                <p className="text-slate-300">
                    Notice how the <code className="bg-slate-700 px-2 py-0.5 rounded">chat()</code> call
                    stays exactly the same. Only the <code className="bg-slate-700 px-2 py-0.5 rounded">adapter</code>
                    changes. Your tools, your logic, your tests - they all work across providers.
                </p>
            </div>

            {/* When to Use */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-3">🚀 When to Switch Providers</h3>
                    <ul className="space-y-2 text-slate-300">
                        <li>• GPT-4 is too slow? Try Claude 3.5 Sonnet</li>
                        <li>• Need cheaper inference? Use Gemini Flash</li>
                        <li>• Want local/private? Spin up Ollama</li>
                        <li>• API down? Fallback to another provider</li>
                    </ul>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-3">✅ What Stays the Same</h3>
                    <ul className="space-y-2 text-slate-300">
                        <li>• All your tool definitions</li>
                        <li>• Your streaming logic</li>
                        <li>• Type safety with Zod schemas</li>
                        <li>• Client-side hooks (useChat)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
