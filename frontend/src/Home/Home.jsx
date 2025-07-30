import { useState } from 'react';

const VyapariLanding = () => {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    { icon: '🧾', title: 'Auto GST Billing', desc: 'Generate GST bills without CA' },
    { icon: '📊', title: 'Daily Reports', desc: 'Instant profit/loss tracking' },
    { icon: '📦', title: 'Stock Alerts', desc: 'Low stock notifications' },
    { icon: '🤖', title: 'AI Suggestions', desc: 'Smart purchase recommendations' }
  ];

  const specialFeatures = [
    { icon: '⚡', title: 'Fast Billing', desc: '3x faster than manual billing' },
    { icon: '📱', title: 'Mobile First', desc: 'Works offline on any device' },
    { icon: '🔒', title: 'Data Secure', desc: 'Local-first data storage' },
    { icon: '🔄', title: 'Auto Sync', desc: 'Cloud backup when online' }
  ];

  const testimonials = [
    { 
      quote: "Reduced my billing time from 2 hours to 20 minutes daily!", 
      author: "Ramesh, Grocery Store",
      location: "Mumbai"
    },
    { 
      quote: "GST filing became effortless. Saves me ₹15,000/year in CA fees.", 
      author: "Priya, Electronics Shop",
      location: "Delhi" 
    }
  ];

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600 mr-10">Vyapari<span className="text-yellow-500">+</span></div>
            
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">Testimonials</a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-medium">
              Sign Up Free
            </button>
          </div>
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-3 space-y-2 py-3">
            <a href="#features" className="block px-3 py-2 hover:bg-gray-100">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 hover:bg-gray-100">How It Works</a>
            <a href="#pricing" className="block px-3 py-2 hover:bg-gray-100">Pricing</a>
            <a href="#testimonials" className="block px-3 py-2 hover:bg-gray-100">Testimonials</a>
            <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white font-medium">
              Sign Up Free
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                Smart Shop Management <br className="hidden md:block"/> for Indian Businesses
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Billing, inventory, GST and profits - all in one simple app. Designed for kirana stores, 
                hardware shops and small retailers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white font-bold hover:bg-blue-700">
                  Try Free Demo
                </button>
                <button className="flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-bold hover:bg-blue-50">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  See How It Works
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1602488283247-29bf1f5b148a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Shop owner using Vyapari+" 
                className="w-full h-auto shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Everything Your Shop Needs</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Vyapari+ interface" 
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-2xl font-bold mb-6">Simple Yet Powerful</h2>
              
              {specialFeatures.map((feature, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">{feature.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Loved by Shop Owners</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 border border-gray-200">
                <div className="text-blue-500 text-3xl mb-4">"</div>
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Simple Pricing</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Start free, upgrade as you grow. No hidden charges.
          </p>
          
          <div className="max-w-md mx-auto bg-white border border-gray-200">
            <div className="p-8">
              <div className="text-3xl font-bold mb-2">Free Forever</div>
              <div className="text-gray-600 mb-6">For shops with up to 50 bills/month</div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited products</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic GST reports</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Profit tracking</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-blue-600 text-white font-bold hover:bg-blue-700">
                Get Started
              </button>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-200">
              <a href="#" className="text-blue-600 font-medium">View all plans →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Shop?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join 10,000+ Indian businesses using Vyapari+ daily
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-bold hover:bg-gray-100">
                Start Free Trial
              </button>
            </div>
            <div className="mt-3 text-blue-100 text-sm">
              No credit card required • 7-day free trial
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-blue-400 mb-4">Vyapari<span className="text-yellow-400">+</span></div>
              <p className="mb-4">Smart shop management for Indian businesses</p>
              <div className="text-gray-400">Made in 🇮🇳</div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Download</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Vyapari+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { VyapariLanding as Home};