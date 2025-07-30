import { useState, useEffect } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    email: '',
    password: '',
    role: 'owner'
  });
  const [showPassword, setShowPassword] = useState(false);

  // Initialize feather icons after component mounts
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
    if(showPassword){
        document.querySelector("#app > div.min-h-screen.bg-gray-50.flex.flex-col.justify-center.py-12.px-4 > div > div.px-8.py-6 > div > div:nth-child(5) > div > button").innerHTML= '<i data-feather="eye"></i>';
    } else {
        document.querySelector("#app > div.min-h-screen.bg-gray-50.flex.flex-col.justify-center.py-12.px-4 > div > div.px-8.py-6 > div > div:nth-child(5) > div > button").innerHTML= '<i data-feather="eye-off"></i>';
    }
    if(window.feather) {
      window.feather.replace();
    }
  }, [showPassword]); // Re-run when showPassword changes to update the icon

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    // Add registration logic here
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

        {/* Signup Form */}
        <div className="px-8 py-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-1">
                Shop Name
              </label>
              <input
                id="shopName"
                name="shopName"
                type="text"
                required
                value={formData.shopName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                required
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i data-feather={showPassword ? "eye-off" : "eye"} className="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I am
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="owner">Owner</option>
                <option value="accountant">Accountant</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-medium hover:text-blue-700">
              Login
            </a>
          </p>
        </div>

        <div className="px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Powered by Vyapari+
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;