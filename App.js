import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/navigation';
import { AuthContextProvider } from './src/services/auth/auth.context';

export default function App() {

  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
      <StatusBar style="auto" />
    </>
  )
};