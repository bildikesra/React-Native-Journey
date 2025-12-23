import React from 'react';
import { StatusBar } from 'react-native';
import TodoApp from './src/screens/TodoApp';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TodoApp />
    </>
  );
}