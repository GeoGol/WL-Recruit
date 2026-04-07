import { useState, useCallback } from 'react';

/**
 * Wraps an async action with automatic loading state.
 * While the action is running:
 *  - `isLoading` is true
 *  - calling `run` again is a no-op (prevents double-submit)
 *
 * Usage:
 *   const { isLoading, run } = useAsyncAction();
 *
 *   <ButtonComponent
 *       loading={isLoading}
 *       disabled={isLoading}
 *       onClick={() => run(async () => { await saveUser(data); drawer.close(); })}
 *   />
 */
export function useAsyncAction() {
    const [isLoading, setIsLoading] = useState(false);

    const run = useCallback(async (action: () => Promise<void>) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await action();
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { isLoading, run };
}

