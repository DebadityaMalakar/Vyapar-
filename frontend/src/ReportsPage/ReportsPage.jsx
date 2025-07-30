import { useState, useEffect, useRef } from 'react';

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [exportFormat, setExportFormat] = useState(null);
  
  // Refs for chart canvases
  const salesChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  
  // Chart instances
  const salesChartInstance = useRef(null);
  const expenseChartInstance = useRef(null);

  // Sample data
  const salesData = {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 15000, 20000, 18000, 22000, 25000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3
      },
      {
        label: 'Profit',
        data: [4000, 6500, 5000, 7000, 6000, 8000, 9000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3
      }
    ]
  };

  const expenseData = {
    labels: ['Inventory', 'Rent', 'Salary', 'Utilities', 'Other'],
    datasets: [
      {
        data: [45000, 15000, 20000, 5000, 3000],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ]
      }
    ]
  };

  const metrics = {
    totalSales: 185000,
    cogs: 125000,
    grossProfit: 60000,
    expenses: 45000,
    netProfit: 15000
  };

  const topProducts = [
    { name: 'Dove Shampoo', sales: 25000, margin: 35 },
    { name: 'Maggi Noodles', sales: 18000, margin: 25 },
    { name: 'Colgate Paste', sales: 15000, margin: 30 }
  ];

  useEffect(() => {
    // Initialize charts when component mounts
    if (salesChartRef.current && window.Chart) {
      // Destroy previous instance if exists
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
      }
      
      salesChartInstance.current = new window.Chart(salesChartRef.current, {
        type: 'line',
        data: salesData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    if (expenseChartRef.current && window.Chart) {
      // Destroy previous instance if exists
      if (expenseChartInstance.current) {
        expenseChartInstance.current.destroy();
      }
      
      expenseChartInstance.current = new window.Chart(expenseChartRef.current, {
        type: 'pie',
        data: expenseData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
      }
      if (expenseChartInstance.current) {
        expenseChartInstance.current.destroy();
      }
    };
  }, [timeRange]); // Re-run effect when timeRange changes

  const handleExport = (format) => {
    setExportFormat(format);
    // In real app, this would trigger download
    setTimeout(() => setExportFormat(null), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profit & Loss Report</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <select 
              className="border border-gray-300 p-2"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <button 
              className="bg-white border border-gray-300 p-2 hover:bg-gray-50 flex items-center"
              onClick={() => handleExport('pdf')}
            >
              <span className="mr-2">PDF</span>
              {exportFormat === 'pdf' && (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </button>
            <button 
              className="bg-white border border-gray-300 p-2 hover:bg-gray-50 flex items-center"
              onClick={() => handleExport('excel')}
            >
              <span className="mr-2">Excel</span>
              {exportFormat === 'excel' && (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-gray-500 text-sm">Total Sales</div>
            <div className="text-2xl font-bold">₹{metrics.totalSales.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-gray-500 text-sm">COGS</div>
            <div className="text-2xl font-bold">₹{metrics.cogs.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-gray-500 text-sm">Gross Profit</div>
            <div className="text-2xl font-bold text-green-600">₹{metrics.grossProfit.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-gray-500 text-sm">Net Profit</div>
            <div className={`text-2xl font-bold ${metrics.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{metrics.netProfit.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 border border-gray-200 lg:col-span-2">
            <h2 className="font-bold mb-4">Sales & Profit Trend</h2>
            <div className="h-64">
              <canvas ref={salesChartRef}></canvas>
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <h2 className="font-bold mb-4">Expense Breakdown</h2>
            <div className="h-64">
              <canvas ref={expenseChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 border border-gray-200">
            <h2 className="font-bold mb-4">Top Products</h2>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.margin}% margin</div>
                  </div>
                  <div className="font-medium">₹{product.sales.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 border border-gray-200">
            <h2 className="font-bold mb-4">Expense Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>Inventory</div>
                <div>₹45,000</div>
              </div>
              <div className="flex justify-between">
                <div>Rent</div>
                <div>₹15,000</div>
              </div>
              <div className="flex justify-between">
                <div>Salary</div>
                <div>₹20,000</div>
              </div>
              <div className="flex justify-between">
                <div>Utilities</div>
                <div>₹5,000</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 border border-gray-200">
            <h2 className="font-bold mb-4">Profit Analysis</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Gross Margin</span>
                  <span>32.4%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-green-500 h-2" style={{ width: '32.4%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Net Margin</span>
                  <span>8.1%</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-blue-500 h-2" style={{ width: '8.1%' }}></div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Compared to 7.2% last month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;