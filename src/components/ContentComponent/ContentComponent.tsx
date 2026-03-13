import React from 'react';

const ContentComponent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className = "p-4 md:ml-64 w-full bg-amber-100">
            {children}

        </main>
    );
};

export default ContentComponent;
