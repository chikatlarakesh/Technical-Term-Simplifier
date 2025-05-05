// Signup.tsx
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import {  useNavigate } from 'react-router-dom';

// Define props interface
interface SignupProps {
  onSignIn: () => void;
  switchToLogin: () => void;
}

const Signup = ({ onSignIn, switchToLogin }: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup Successful!');
      onSignIn(); // Call onSignIn after successful signup
      navigate('/'); // Redirect after signup
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Signed up with Google!');
      onSignIn(); // Call onSignIn after successful signup
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Signed up with GitHub!');
      onSignIn(); // Call onSignIn after successful signup
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Signed up with Facebook!');
      onSignIn(); // Call onSignIn after successful signup
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Create your Account</h1>

      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-3 rounded mb-3 w-72"
      />

      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-3 rounded mb-4 w-72"
      />

      <button 
        onClick={handleSignup}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4 w-72"
      >
        Sign Up
      </button>

      <p className="text-gray-600 mb-3">or sign up with</p>

      <div className="flex flex-col gap-3 mb-5 w-72">
        <button onClick={handleGoogleSignup} className="bg-red-500 text-white p-3 rounded">Google</button>
        <button onClick={handleFacebookSignup} className="bg-blue-700 text-white p-3 rounded">Facebook</button>
        <button onClick={handleGithubSignup} className="bg-gray-800 text-white p-3 rounded">GitHub</button>
      </div>

      <p className="text-sm">
        Already have an account?{' '}
        <button onClick={switchToLogin} className="text-blue-600 underline">
          Login here
        </button>
      </p>
    </div>
  );
};

export default Signup;