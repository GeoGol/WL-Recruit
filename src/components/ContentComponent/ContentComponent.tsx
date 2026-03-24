import { memo, type ReactNode } from 'react';

interface ContentComponentProps {
    children: ReactNode;
    collapsed?: boolean;
}

const ContentComponent = memo(({ children, collapsed = false }: Readonly<ContentComponentProps>) => {
    return (
        <main className={`p-4 flex-1 min-w-0 min-h-[calc(100vh-4rem)] overflow-hidden bg-primary transition-all duration-300 ${collapsed ? 'md:ml-14' : 'md:ml-64'}`}>
            {children}
        </main>
    );
});

ContentComponent.displayName = 'ContentComponent';

export default ContentComponent;
