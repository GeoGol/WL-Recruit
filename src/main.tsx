import '@fontsource-variable/inter';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';
import './global.css';
import "flowbite";
import React from 'react';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
