'use client'

export default function ToolsPage() {
    const serverToolCode = `import { toolDefinition } from '@tanstack/ai';
import { z } from 'zod';

// Define the tool
const searchProductsDef = toolDefinition({
  name: 'searchProducts',
  description: 'Search for products in the catalog',
  inputSchema: z.object({
    query: z.string(),
    maxPrice: z.number().optional(),
  }),
  outputSchema: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  })),
});

// Server implementation - runs on your backend
const searchProducts = searchProductsDef.server(async ({ query, maxPrice }) => {
  // Safe to use DB connections, secrets, etc.
  const products = await db.products.search({ query, maxPrice });
  return products;
});`

    const clientToolCode = `import { toolDefinition } from '@tanstack/ai';
import { z } from 'zod';

// Define the tool
const getCurrentLocationDef = toolDefinition({
  name: 'getCurrentLocation',
  description: 'Get user\\'s current location',
  inputSchema: z.object({}),
  outputSchema: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

// Client implementation - runs in the browser
const getCurrentLocation = getCurrentLocationDef.client(async () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  });
});`

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Isomorphic Tools Demo
                </h1>
                <p className="text-slate-400">
                    Define once, implement for server OR client. The AI calls them, you control where they run.
                </p>
            </div>

            {/* Concept Explainer */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">🧠 What are Isomorphic Tools?</h3>
                <p className="text-slate-300 mb-4">
                    Tools let the AI call functions to accomplish tasks. <strong>Isomorphic</strong> means
                    you define the tool's interface once, then implement it for either:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                        <div className="text-green-400 font-bold mb-2">🖥️ Server Tools</div>
                        <p className="text-sm text-slate-300">
                            Database queries, API calls with secrets, heavy computations
                        </p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                        <div className="text-blue-400 font-bold mb-2">🌐 Client Tools</div>
                        <p className="text-sm text-slate-300">
                            Browser APIs, geolocation, clipboard, camera, local storage
                        </p>
                    </div>
                </div>
            </div>

            {/* Server Tool Example */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm">1</span>
                    Server Tool Example
                </h3>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <pre className="text-sm overflow-x-auto">
                        <code className="text-green-400">{serverToolCode}</code>
                    </pre>
                </div>
            </div>

            {/* Client Tool Example */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                    Client Tool Example
                </h3>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <pre className="text-sm overflow-x-auto">
                        <code className="text-blue-400">{clientToolCode}</code>
                    </pre>
                </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-white mb-4">💡 Why This Matters</h3>
                <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span><strong>Type Safety:</strong> TypeScript knows your input/output shapes from Zod schemas</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span><strong>One Definition:</strong> Tool interface defined once, implementations vary</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span><strong>Security:</strong> Server tools keep secrets safe, client tools access browser APIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <span><strong>Approval Flows:</strong> Add human-in-the-loop for sensitive operations</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
