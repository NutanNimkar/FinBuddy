import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      alert('Authentication Successful');
    } catch (error) {
      console.error('Authentication Error:', error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md max-w-sm w-full">
      <h1 className="text-xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleAuth}
        className="w-full bg-blue-500 text-white py-2 rounded mb-2"
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full bg-gray-200 text-gray-700 py-2 rounded"
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
