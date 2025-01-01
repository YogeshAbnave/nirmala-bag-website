import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/shopContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from "@chakra-ui/alert";

const Login = () => {
  const { token, setToken, navigate, BASE_URL } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    currentView: 'Login',
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
      email: '',
      password: '',
    }
  });

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      password: ''
    };
    
    if (formState.currentView === 'Sign Up' && !formState.name.trim()) {
      errors.name = 'Username is required';
    }

    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formState.password) {
      errors.password = 'Password is required';
    } else if (formState.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFormState(prev => ({ ...prev, errors }));
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    const endpoint = formState.currentView === 'Sign Up' ? 'register' : 'login';

    try {
      const response = await fetch(`${BASE_URL}/webUser/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
          ...(formState.currentView === 'Sign Up' && { name: formState.name }),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Operation failed');
      }

      if (!data?.data?.token) {
        throw new Error('Invalid server response: Missing token');
      }

      const userToken = data.data.token;
      const userId = data.data.userId;

      setToken(userToken);
      localStorage.setItem('token', userToken);
      localStorage.setItem('userId', userId);


      if (formState.currentView === 'Sign Up') {
        setFormState(prev => ({
          ...prev,
          currentView: 'Login',
          email: '',
          password: '',
          name: '',
        }));
        toast.success('Registration successful!');
      } else {
        toast.success('Login successful!');
        navigate('/home');
      }

    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: ''
      }
    }));
  };

  useEffect(() => {
    if (token) navigate('/home');
  }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-sm">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <h1 className="prata-regular text-3xl">{formState.currentView}</h1>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {formState.currentView === 'Sign Up' && (
        <div className="w-full">
          <input
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            type="text"
            className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
            placeholder="Username"
          />
          {formState.errors.name && (
           <Alert variant="destructive" className="mt-2 text-red-700">
              <AlertDescription>{formState.errors.name}</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <div className="w-full">
        <input
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          type="email"
          className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
          placeholder="Email"
        />
        {formState.errors.email && (
        <Alert variant="destructive" className="mt-2 text-red-700">
            <AlertDescription>{formState.errors.email}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="w-full relative">
        <input
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          type={showPassword ? 'text' : 'password'}
          className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {formState.errors.password && (
         <Alert variant="destructive" className="mt-2 text-red-700">
            <AlertDescription>{formState.errors.password}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="w-full flex justify-between text-sm">
        <button type="button" className="text-blue-600 hover:underline">
          Forgot password?
        </button>
        <button
          type="button"
          onClick={() => setFormState(prev => ({
            ...prev,
            currentView: prev.currentView === 'Login' ? 'Sign Up' : 'Login',
            errors: { name: '', email: '', password: '' }
          }))}
          className="text-blue-600 hover:underline"
        >
          {formState.currentView === 'Login' ? 'Create Account' : 'Login'}
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white font-light px-8 py-2 mt-4 w-full disabled:bg-gray-400"
      >
        {isLoading ? 'Processing...' : formState.currentView}
      </button>
    </form>
  );
};

export default Login;