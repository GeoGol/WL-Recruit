import { useState } from 'react';
import type { ApiResponse } from '@/api/types';
import useFetch from '@/hooks/useFetch';
import fetchClient from '@/api/fetchClient';

// ── Typed example ─────────────────────────────────────────────────────────────
// Step 1 — define the shape you expect from the API
interface TestResource {
    id       : number;
    name     : string;
    createdAt: string;
}

// ── Scenario definitions ──────────────────────────────────────────────────────
type ScenarioFn = (request: <T>(fn: () => Promise<ApiResponse<T>>) => Promise<ApiResponse<T>>) => Promise<ApiResponse<unknown>>;

type Scenario = {
    label      : string;
    description: string;
    group      : 'success' | 'client' | 'server' | 'network';
    run        : ScenarioFn;
};

const SCENARIOS: Scenario[] = [
    // ── Success ───────────────────────────────────────────────────────────────
    { label: '200 OK',      group: 'success', description: 'Normal success with data',
      run: (req) => req(() => fetchClient('/api/test/200')) },
    { label: '201 Created', group: 'success', description: 'Resource created',
      run: (req) => req(() => fetchClient('/api/test/201')) },
    // ── Client errors ─────────────────────────────────────────────────────────
    { label: '400 Bad Request',   group: 'client', description: 'Server message + field errors',
      run: (req) => req(() => fetchClient('/api/test/400')) },
    { label: '401 Unauthorized',  group: 'client', description: 'Server message present',
      run: (req) => req(() => fetchClient('/api/test/401')) },
    { label: '403 Forbidden',     group: 'client', description: 'No server body → generic fallback',
      run: (req) => req(() => fetchClient('/api/test/403')) },
    { label: '404 Not Found',     group: 'client', description: 'Server message present',
      run: (req) => req(() => fetchClient('/api/test/404')) },
    { label: '409 Conflict',      group: 'client', description: 'Server message present',
      run: (req) => req(() => fetchClient('/api/test/409')) },
    { label: '422 Unprocessable', group: 'client', description: 'Server message + field errors',
      run: (req) => req(() => fetchClient('/api/test/422')) },
    { label: '429 Rate Limited',  group: 'client', description: 'No server body → generic fallback',
      run: (req) => req(() => fetchClient('/api/test/429')) },
    // ── Server errors ─────────────────────────────────────────────────────────
    { label: '500 Server Error',     group: 'server', description: 'Server message present',
      run: (req) => req(() => fetchClient('/api/test/500')) },
    { label: '502 Bad Gateway',      group: 'server', description: 'No server body → generic fallback',
      run: (req) => req(() => fetchClient('/api/test/502')) },
    { label: '503 Unavailable',      group: 'server', description: 'No server body → generic fallback',
      run: (req) => req(() => fetchClient('/api/test/503')) },
    { label: '504 Gateway Timeout',  group: 'server', description: 'No server body → generic fallback',
      run: (req) => req(() => fetchClient('/api/test/504')) },
    // ── Network / no response ─────────────────────────────────────────────────
    { label: '⏱ Request Timeout', group: 'network', description: 'Server delays 20s, client aborts at 10s (wait ~10s)',
      run: (req) => req(() => fetchClient('/api/test/timeout')) },
    { label: '🌐 Network Error',  group: 'network', description: 'Unreachable host → Failed to fetch (status 0)',
      run: (req) => req(() => fetchClient('http://localhost:9999/unreachable')) },
    { label: '⚡ Force Abort',    group: 'network', description: 'Timeout set to 1ms → immediate abort',
      run: (req) => req(() => fetchClient('/api/test/200', { timeout: 1 })) },
];
const GROUP_LABELS: Record<string, string> = {
    success: 'Success',
    client : 'Client errors (4xx)',
    server : 'Server errors (5xx)',
    network: 'Network / no response',
};
const GROUP_ORDER = ['success', 'client', 'server', 'network'];
const GROUP_BTN_CLASSES: Record<string, string> = {
    success: 'bg-success-bg text-accent-green hover:bg-accent-green hover:text-white border border-accent-green',
    client : 'bg-warning-bg text-warning hover:bg-warning hover:text-white border border-accent-yellow',
    server : 'bg-error-bg text-danger hover:bg-danger hover:text-white border border-danger',
    network: 'bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300',
};
// ── Component ─────────────────────────────────────────────────────────────────
export default function ApiTests() {
    const [result, setResult] = useState<ApiResponse<unknown> | null>(null);
    const [active, setActive] = useState<string | null>(null);

    // Step 2 — typed state for the real data
    const [resource, setResource] = useState<TestResource | null>(null);

    const { request, loading } = useFetch();

    const run = async (scenario: Scenario) => {
        setActive(scenario.label);
        setResult(null);
        setResource(null);
        const res = await scenario.run(request);
        setResult(res);
    };

    // Step 3 — typed fetch: res.data is TestResource, not unknown
    const fetchTyped = async () => {
        setResource(null);
        const res = await request(() => fetchClient<TestResource>('/api/test/200'));
        if (!res.error && res.data) {
            setResource(res.data);          // ← fully typed here
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-primary">API Playground</h1>
                <p className="text-sm text-muted mt-1">
                    Each button fires a real request through
                    <code className="bg-light-gray px-1 rounded text-xs">fetchClient</code>
                    to the Vite dev-server mock.
                    Inspect the parsed <code className="bg-light-gray px-1 rounded text-xs">ApiResponse</code> on the right.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ── Buttons ────────────────────────────────────────────── */}
                <div className="space-y-5">
                    {GROUP_ORDER.map(group => (
                        <div key={group}>
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                                {GROUP_LABELS[group]}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {SCENARIOS.filter(s => s.group === group).map(scenario => (
                                    <button
                                        key={scenario.label}
                                        disabled={loading}
                                        title={scenario.description}
                                        onClick={() => run(scenario)}
                                        className={[
                                            'px-3 py-1.5 rounded text-xs font-medium transition-opacity',
                                            GROUP_BTN_CLASSES[group],
                                            active === scenario.label ? 'ring-2 ring-offset-1 ring-gray-700' : '',
                                            loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                                        ].join(' ')}
                                    >
                                        {scenario.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* ── Result panel ───────────────────────────────────────── */}
                <div className="bg-surface border border-main rounded-lg p-4 min-h-64">
                    {loading && (
                        <div className="flex items-center gap-2 text-sm text-muted">
                            <svg className="animate-spin h-4 w-4 text-link" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                            Waiting for response…
                        </div>
                    )}
                    {!loading && !result && (
                        <p className="text-sm text-muted">← Click a scenario to fire a request</p>
                    )}
                    {!loading && result && (
                        <div className="space-y-3 text-xs">
                            {/* Status badge */}
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-primary">HTTP Status:</span>
                                <span className={[
                                    'px-2 py-0.5 rounded font-mono font-bold',
                                    result.status === 0              ? 'bg-purple-100 text-purple-800' :
                                    result.status  <  300            ? 'bg-green-100  text-green-800'  :
                                    result.status  <  500            ? 'bg-yellow-100 text-yellow-800' :
                                                                       'bg-red-100    text-red-800',
                                ].join(' ')}>
                                    {result.status === 0 ? '0 (no response)' : result.status}
                                </span>
                            </div>
                            {/* Success data */}
                            {result.data != null && (
                                <div>
                                    <p className="font-semibold text-primary mb-1">data:</p>
                                    <pre className="bg-green-50 border border-green-200 rounded p-2 overflow-auto text-green-900 text-xs">
                                        {JSON.stringify(result.data, null, 2)}
                                    </pre>
                                </div>
                            )}
                            {/* Error */}
                            {result.error && (
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-red-50 border border-red-200 rounded p-2">
                                        <span className="text-muted">code</span>
                                        <span className="font-mono font-semibold text-red-700">{result.error.code}</span>
                                        <span className="text-muted">message</span>
                                        <span className="text-red-800">{result.error.message}</span>
                                        <span className="text-muted">status</span>
                                        <span className="font-mono text-red-700">{result.error.status}</span>
                                    </div>
                                    {result.error.fields && (
                                        <div>
                                            <p className="font-semibold text-primary mb-1">fields (validation):</p>
                                            <pre className="bg-yellow-50 border border-yellow-200 rounded p-2 overflow-auto text-yellow-900 text-xs">
                                                {JSON.stringify(result.error.fields, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Typed usage example ──────────────────────────────────── */}
            <div className="border border-main rounded-lg p-4 space-y-3">
                <h2 className="text-sm font-semibold text-primary">Typed fetch example</h2>
                <p className="text-xs text-muted">
                    Calls <code className="bg-light-gray px-1 rounded">/api/test/200</code> typed as{' '}
                    <code className="bg-light-gray px-1 rounded">TestResource</code> — <code className="bg-light-gray px-1 rounded">res.data</code> is fully typed, not <code className="bg-light-gray px-1 rounded">unknown</code>.
                </p>
                <button
                    disabled={loading}
                    onClick={fetchTyped}
                    className="px-3 py-1.5 rounded text-xs font-medium bg-success-bg text-accent-green border border-accent-green hover:bg-accent-green hover:text-white disabled:opacity-50"
                >
                    Fetch typed resource
                </button>

                {resource && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-green-50 border border-green-200 rounded p-3 text-xs">
                        <span className="text-muted font-medium">resource.id</span>
                        <span className="font-mono text-green-800">{resource.id}</span>
                        <span className="text-muted font-medium">resource.name</span>
                        <span className="font-mono text-green-800">{resource.name}</span>
                        <span className="text-muted font-medium">resource.createdAt</span>
                        <span className="font-mono text-green-800">{resource.createdAt}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
