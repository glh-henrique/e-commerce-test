
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import { CartProvider } from './contexts/CartContext';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App
