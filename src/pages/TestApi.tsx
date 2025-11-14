/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import productService from '../api/services/productService';
import authService from '../api/services/authService';

const TestApi = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAll();
      setResult(data);
      console.log('✅ Products:', data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login({
        email: 'admin@toko.test',
        password: 'Password123'
      });
      setResult(data);
      console.log('✅ Login:', data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Testing</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL}</p>
        <p><strong>API Key:</strong> {import.meta.env.VITE_API_KEY ? '✅ Set' : '❌ Not set'}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={testProducts} disabled={loading}>
          Test Get Products
        </button>
        <button onClick={testLogin} disabled={loading}>
          Test Login
        </button>
      </div>

      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red', padding: '10px', background: '#fee' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <pre style={{padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestApi;