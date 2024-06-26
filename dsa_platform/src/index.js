import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import theme from './components/theme';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider theme={theme}> 
      <App />
    </ChakraProvider> 
    </Provider>
  </React.StrictMode>
);

// Measuring performance in your app
reportWebVitals();
