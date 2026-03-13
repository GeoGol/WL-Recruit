import { memo, type ReactNode } from 'react';

const ContentComponent = memo(({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main className="p-4 md:ml-64 w-full min-h-[calc(100vh-4rem)] bg-primary">
            {children}
        </main>
    );
});

ContentComponent.displayName = 'ContentComponent';

export default ContentComponent;
