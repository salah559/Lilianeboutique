import '../styles/globals.css';
import { CartProvider } from '../components/CartContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ErrorBoundary>
  );
}