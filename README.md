# TanStack AI Interactive Demos

A collection of runnable TanStack AI examples to accompany the blog post:
**[TanStack AI: The Switzerland of AI Tooling](https://nandann.com/blog/tanstack-ai-switzerland-of-ai-tooling)**

## Quick Start

```bash
# Clone the repo
git clone https://github.com/prakharbha/tanstack-interactive.git
cd tanstack-interactive

# Install dependencies
npm install

# Add your API key
cp .env.example .env.local
# Edit .env.local with your OpenAI/Anthropic key

# Run the demo
npm run dev
```

## Available Examples

### 1. Basic Chat (`/`)
Simple chat interface using TanStack AI with streaming responses.

### 2. Provider Switching (`/providers`)
Demonstrates switching between OpenAI, Anthropic, and Gemini with one line.

### 3. Isomorphic Tools (`/tools`)
Shows server-side and client-side tool execution.

### 4. DevTools Integration (`/devtools`)
Debug your AI interactions in real-time.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI SDK**: `@tanstack/ai`, `@tanstack/ai-react`
- **Providers**: OpenAI (default), Anthropic, Gemini (configurable)
- **Styling**: Tailwind CSS

## Environment Variables

Create `.env.local`:

```bash
OPENAI_API_KEY=sk-...
# Optional: For provider switching demo
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
```

## Learn More

- [TanStack AI Documentation](https://tanstack.com/ai/latest/docs)
- [Blog Post: TanStack AI Deep Dive](https://nandann.com/blog/tanstack-ai-switzerland-of-ai-tooling)
- [Nandann Creative](https://nandann.com)

## License

MIT
