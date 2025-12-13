import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { applyTw } from '../style/style';

// Import screens
import HomeScreen from '../screen/HomeScreen';
import ComponentDemo from '../screen/ComponentDemo';

const Router = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [componentId, setComponentId] = useState(null);

  // Navigation function
  const navigateTo = (screen, params) => {
    if (screen === 'component-detail' && params?.componentId) {
      setComponentId(params.componentId);
      setCurrentScreen('component-detail');
    } else {
      setCurrentScreen(screen);
      setComponentId(null);
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'component-detail':
        return <ComponentDemo componentId={componentId} onNavigate={navigateTo} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <SafeAreaView style={applyTw('flex-1 bg-black')}>
      <View style={applyTw('flex-1')}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

export default Router;
