import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './src/style/theme.js';
import HomeScreen from './src/screen/HomeScreen.js';
import ComponentDemo from './src/screen/ComponentDemo.js';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenParams, setScreenParams] = useState({});

  const handleNavigate = (screen, params = {}) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'component-detail':
        return (
          <ComponentDemo
            componentId={screenParams.componentId}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {renderScreen()}
    </ThemeProvider>
  );
}
