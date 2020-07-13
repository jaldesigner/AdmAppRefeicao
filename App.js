import 'react-native-gesture-handler';
import React from 'react';
import AppRouter from './src/Router';
import {StyleProvider, getTheme} from 'native-base';
import varT from './native-base-theme/variables/variables';

export default function App() {
  return (
      <StyleProvider style={getTheme(varT)}>
        <AppRouter />
      </StyleProvider>
  );
}
