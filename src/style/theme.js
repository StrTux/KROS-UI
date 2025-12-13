import React, { createContext, useContext, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme configuration
const themes = {
    light: {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#8b5cf6',
        muted: '#f3f4f6',
        border: '#e5e7eb',
        card: '#ffffff',
        text: {
            primary: '#000000',
            secondary: '#6b7280',
            muted: '#9ca3af',
        },
    },
    dark: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#3b82f6',
        secondary: '#9ca3af',
        accent: '#8b5cf6',
        muted: '#1f2937',
        border: '#2A2A2A',
        card: '#111111',
        text: {
            primary: '#ffffff',
            secondary: '#d1d5db',
            muted: '#9ca3af',
        },
    },
};

// ThemeProvider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark'); // Default to dark theme

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const currentTheme = themes[theme];

    return (
        <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;
