import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'TanStack AI Interactive Demos',
    description: 'Runnable examples for TanStack AI - the Switzerland of AI tooling',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-50">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                        <a href="/" className="text-xl font-bold text-white">
                            TanStack AI Demos
                        </a>
                        <div className="flex gap-6">
                            <a href="/" className="text-slate-300 hover:text-white">Chat</a>
                            <a href="/providers" className="text-slate-300 hover:text-white">Providers</a>
                            <a href="/tools" className="text-slate-300 hover:text-white">Tools</a>
                            <a
                                href="https://nandann.com/blog/tanstack-ai-switzerland-of-ai-tooling"
                                target="_blank"
                                className="text-blue-400 hover:text-blue-300"
                            >
                                Read Blog →
                            </a>
                        </div>
                    </div>
                </nav>
                <main className="pt-20 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    )
}
