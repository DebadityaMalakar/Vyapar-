import { useState, useRef, useEffect } from 'react';

const BillingPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Lux Soap', price: 19, quantity: 2, discount: 0, gst: 5 },
    { id: 2, name: 'Parle G 100g', price: 5, quantity: 5, discount: 0, gst: 5 }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + item.discount, 0);
  const totalGst = cart.reduce((sum, item) => sum + (item.price * item.quantity * item.gst / 100), 0);
  const grandTotal = subtotal + totalGst - totalDiscount;
  const estimatedProfit = cart.reduce((sum, item) => sum + (item.price * item.quantity * 0.2), 0);

  const handleAddProduct = (product) => {
    setCart([...cart, { ...product, quantity: 1, discount: 0 }]);
    setSearchTerm('');
  };

  const handleQuantityChange = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) } 
        : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const generatePDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let yPos = 20;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(66, 133, 244); // Material Blue 500
    doc.text('Vyapari+ Invoice', margin, yPos);
    
    // Shop Info
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.text('Shop Name: My Kirana Store', margin, yPos);
    yPos += 5;
    doc.text('GSTIN: 22ABCDE1234F1Z5', margin, yPos);
    yPos += 5;
    doc.text('Phone: +91 9876543210', margin, yPos);
    yPos += 5;
    doc.text('Date: ' + new Date().toLocaleDateString(), margin, yPos);
    
    // Invoice details right aligned
    doc.text(`Invoice #: ${Math.floor(1000 + Math.random() * 9000)}`, pageWidth - margin, yPos - 15, { align: 'right' });
    
    // Line separator
    yPos += 10;
    doc.setDrawColor(66, 133, 244);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    
    // Table header
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Item', margin, yPos);
    doc.text('Qty', 70, yPos);
    doc.text('Price', 90, yPos);
    doc.text('GST %', 120, yPos);
    doc.text('Total', 150, yPos);
    
    // Table rows
    doc.setFont('helvetica', 'normal');
    cart.forEach(item => {
      yPos += 8;
      doc.text(item.name, margin, yPos);
      doc.text(item.quantity.toString(), 70, yPos);
      doc.text('₹' + item.price.toFixed(2), 90, yPos);
      doc.text(item.gst + '%', 120, yPos);
      doc.text('₹' + (item.price * item.quantity).toFixed(2), 150, yPos);
    });
    
    // Totals
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Subtotal:', 120, yPos);
    doc.text('₹' + subtotal.toFixed(2), 150, yPos);
    yPos += 8;
    doc.text('GST:', 120, yPos);
    doc.text('₹' + totalGst.toFixed(2), 150, yPos);
    yPos += 8;
    doc.text('Discount:', 120, yPos);
    doc.text('-₹' + totalDiscount.toFixed(2), 150, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(66, 133, 244);
    doc.text('Grand Total:', 120, yPos);
    doc.text('₹' + grandTotal.toFixed(2), 150, yPos);
    
    // Payment method
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, margin, yPos);
    
    // Footer
    yPos += 20;
    doc.setFontSize(8);
    doc.setTextColor(117, 117, 117); // Material Grey 500
    doc.text('Thank you for your business!', margin, yPos);
    yPos += 5;
    doc.text('Vyapari+ - Smart Shop Management', margin, yPos);
    yPos += 5;
    doc.text('Made in India for local businesses', margin, yPos);
    
    doc.save(`Vyapari_Invoice_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const sampleProducts = [
    { id: 101, name: 'Dove Soap', price: 45, gst: 18 },
    { id: 102, name: 'Maggi 70g', price: 12, gst: 12 },
    { id: 103, name: 'Tata Tea 100g', price: 55, gst: 5 },
    { id: 104, name: 'Colgate 100g', price: 65, gst: 12 }
  ];

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Vyapari+ Billing</h1>
        <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1">
          GST Ready
        </div>
      </div>

      {/* Search and Quick Add */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search or scan product..."
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-200"
                    onClick={() => handleAddProduct(product)}
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">₹{product.price} • GST: {product.gst}%</div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">No products found</div>
              )}
            </div>
          )}
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-medium flex items-center justify-center"
          onClick={() => setShowNewProductModal(true)}
        >
          <span className="mr-2">+</span> Quick Add
        </button>
      </div>

      {/* Cart Table */}
      <div className="bg-white shadow-sm mb-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Qty</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">GST</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  {item.quantity > 5 && (
                    <div className="text-xs text-red-600 mt-1">Only {item.quantity} left!</div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">₹{item.price.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <button 
                      className="w-8 h-8 flex items-center justify-center border bg-gray-100 hover:bg-gray-200"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center border-t border-b">
                      {item.quantity}
                    </div>
                    <button 
                      className="w-8 h-8 flex items-center justify-center border bg-gray-100 hover:bg-gray-200"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{item.gst}%</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals and Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Customer Details</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (for WhatsApp bill)</label>
                <input
                  type="tel"
                  placeholder="Enter customer phone"
                  className="w-full p-3 border border-gray-300"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`p-3 border font-medium flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-blue-100 border-blue-500 text-blue-800' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('cash')}
              >
                💵 Cash
              </button>
              <button
                className={`p-3 border font-medium flex items-center justify-center ${paymentMethod === 'upi' ? 'bg-blue-100 border-blue-500 text-blue-800' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('upi')}
              >
                📱 UPI
              </button>
              <button
                className={`p-3 border font-medium flex items-center justify-center ${paymentMethod === 'card' ? 'bg-blue-100 border-blue-500 text-blue-800' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('card')}
              >
                💳 Card
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-red-600">-₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST:</span>
              <span>+₹{totalGst.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3 font-bold text-lg flex justify-between">
              <span>Grand Total:</span>
              <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
            </div>
            {estimatedProfit > 0 && (
              <div className="text-sm text-green-600 mt-2">
                Estimated profit: ₹{estimatedProfit.toFixed(2)}
              </div>
            )}
          </div>

          <div className="space-y-3 mt-6">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-bold flex items-center justify-center"
              onClick={generatePDF}
            >
              <span className="mr-2">🖨️</span> Print Invoice
            </button>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 font-bold flex items-center justify-center"
              disabled={!customerPhone}
            >
              <span className="mr-2">📤</span> WhatsApp Invoice
            </button>
          </div>
        </div>
      </div>

      {/* New Product Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white shadow-md max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full p-2 border border-gray-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full p-2 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST %</label>
                  <select className="w-full p-2 border border-gray-300">
                    <option>5%</option>
                    <option>12%</option>
                    <option>18%</option>
                    <option>28%</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  className="px-4 py-2 border border-gray-300"
                  onClick={() => setShowNewProductModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white"
                  onClick={() => {
                    // In a real app, this would add the new product
                    setShowNewProductModal(false);
                  }}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;