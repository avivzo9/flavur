import React, { useEffect, useRef, useState } from 'react';
import { Appearance, AppState, StatusBar } from 'react-native';
import Navigation from './src/navigation';
import { AuthContextProvider } from './src/services/auth/auth.context';
import { colors } from './src/utils/colors';

export default function App() {
  const appState = useRef(AppState.currentState);

  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark' ? true : false)

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      if (nextAppState === "active") {
        setIsDarkMode(Appearance.getColorScheme() === 'dark' ? true : false)
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
      <StatusBar backgroundColor={isDarkMode ? colors.darkMode.dark : colors.darkMode.light} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </>
  )
};