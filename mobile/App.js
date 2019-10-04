import React from 'react';
import { View, YellowBox } from 'react-native';

import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <GeneralStatusBarColor backgroundColor="#f05a5b" barStyle="light-content"/>
      <Routes />
    </>
  )
}