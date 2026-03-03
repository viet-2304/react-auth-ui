import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthPage from './components/AuthPage';
import './styles.css';

const App = () => (
  <Provider store={store}>
    <AuthPage />
  </Provider>
);

export default App;
