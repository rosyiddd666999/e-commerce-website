/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';

const TestApi = () => {
  // Menggunakan hooks, bukan langsung service
  const { products, loading: productsLoading, error: productsError, refetch } = useProducts();
  const { login, isAuthenticated, user } = useAuth();

  // State untuk form login
  const [email, setEmail] = useState('admin@toko.test');
  const [password, setPassword] = useState('Password123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Handler untuk test login
  const handleTestLogin = async () => {
    setLoginLoading(true);
    setLoginError(null);
    
    try {
      const response = await login(email, password);
      console.log('Login Success:', response);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      setLoginError(errorMsg);
      console.error('Login Error:', err);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handler untuk test products (refetch)
  const handleTestProducts = () => {
    console.log('Refetching products...');
    refetch();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🧪 API Testing Dashboard</h1>
      
      {/* API Config Info */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '15px', 
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h3>Configuration</h3>
        <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL}</p>
        <p><strong>API Key:</strong> {import.meta.env.VITE_API_KEY ? 'Set' : '❌ Not set'}</p>
        <p><strong>Auth Status:</strong> {isAuthenticated ? 'Authenticated' : '❌ Not authenticated'}</p>
        {user && <p><strong>User:</strong> {user.name} ({user.role})</p>}
      </div>

      {/* Test Login Section */}
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3>Test Login</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              padding: '8px', 
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              padding: '8px', 
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <button 
          onClick={handleTestLogin} 
          disabled={loginLoading}
          style={{
            padding: '10px 20px',
            background: loginLoading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loginLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {loginLoading ? 'Loading...' : 'Test Login'}
        </button>

        {loginError && (
          <div style={{ 
            marginTop: '15px',
            color: 'red', 
            padding: '10px', 
            background: '#fee',
            borderRadius: '4px'
          }}>
            <strong>Error:</strong> {loginError}
          </div>
        )}
      </div>

      {/* Test Products Section */}
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3>Test Products</h3>
        
        <button 
          onClick={handleTestProducts} 
          disabled={productsLoading}
          style={{
            padding: '10px 20px',
            background: productsLoading ? '#ccc' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: productsLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {productsLoading ? 'Loading...' : 'Refetch Products'}
        </button>

        <p style={{ marginTop: '10px', color: '#666' }}>
          Total Products: <strong>{products.length}</strong>
        </p>

        {productsError && (
          <div style={{ 
            marginTop: '15px',
            color: 'red', 
            padding: '10px', 
            background: '#fee',
            borderRadius: '4px'
          }}>
            <strong>Error:</strong> {productsError}
          </div>
        )}

        {!productsLoading && !productsError && products.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4>Products Data:</h4>
            <pre style={{ 
              padding: '15px', 
              background: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(products, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApi;