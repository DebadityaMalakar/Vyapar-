import { use, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    mobile: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
    if(showPassword){
        document.querySelector("#app > div.min-h-screen.bg-gray-50.flex.flex-col.justify-center.py-12.px-4 > div > form > div > div:nth-child(2) > div > button").innerHTML= '<i data-feather="eye"></i>';
    } else {
        document.querySelector("#app > div.min-h-screen.bg-gray-50.flex.flex-col.justify-center.py-12.px-4 > div > form > div > div:nth-child(2) > div > button").innerHTML= '<i data-feather="eye-off"></i>';
    }
    if(window.feather) {
      window.feather.replace(); 
    }
  }, [showPassword]); // Re-run when showPassword changes to update the icon

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', credentials);
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-200 shadow-sm">
        {/* Logo & App Name */}
        <div className="text-center py-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600">
            Vyapari<span className="text-yellow-500">+</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Your virtual CA & smart inventory assistant
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number or Email
              </label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                inputMode="tel"
                required
                value={credentials.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i data-feather={showPassword ? "eye-off" : "eye"} className="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="flex justify-between pt-3">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                Forgot password?
              </Link>
              <p className="text-sm text-gray-600">
                New here?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </form>

        <div className="px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Powered by Vyapari+
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;