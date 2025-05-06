import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/products');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return loading ? <Loading /> : (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;