// import React from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import Services from './components/Services';
// import About from './components/About';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import Portfolio from './components/Portpolio';

// function App() {
//   return (
//     <div className="min-h-screen">
//       <Header />
//       <Hero />
//       <Services />
//       <About />
//       <Portfolio />
//       <Contact />
//       <Footer />
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { 
  FiSearch, FiFilter, FiBell, FiUser, FiClock, 
  FiAlertCircle, FiCheckCircle, FiDollarSign, 
  FiCreditCard, FiHome, FiPieChart, FiFileText, 
  FiSettings, FiMenu, FiX, FiChevronDown, 
  FiChevronUp, FiChevronLeft, FiChevronRight,
  FiDownload, FiUpload, FiMessageSquare, FiFlag 
} from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CreditCardDisputeDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    branch: '',
    cardType: '',
    dateRange: '30days',
    searchQuery: ''
  });
  const [selectedCase, setSelectedCase] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Mock data
  const [cases] = useState([
    {
      id: 'DIS-2023-001',
      customer: 'John Smith',
      account: '****4532',
      disputeReason: 'Unauthorized transaction',
      amount: '$245.67',
      status: 'open',
      branch: 'Downtown',
      cardType: 'Visa Platinum',
      openedDate: '2023-05-15',
      lastUpdated: '2023-06-02',
      timeline: [
        { date: '2023-05-15', action: 'Case opened', user: 'System' },
        { date: '2023-05-16', action: 'Documents requested', user: 'Agent 1' },
        { date: '2023-05-20', action: 'Documents received', user: 'Customer' }
      ],
      documents: ['receipt_001.pdf', 'statement_4532.pdf'],
      notes: [
        { date: '2023-05-16', note: 'Customer claims they never made this purchase', user: 'Agent 1' },
        { date: '2023-05-18', note: 'Merchant contacted for verification', user: 'Agent 2' }
      ]
    },
    {
      id: 'DIS-2023-002',
      customer: 'Sarah Johnson',
      account: '****7890',
      disputeReason: 'Duplicate charge',
      amount: '$89.99',
      status: 'in_progress',
      branch: 'Uptown',
      cardType: 'Mastercard Gold',
      openedDate: '2023-05-20',
      lastUpdated: '2023-06-01',
      timeline: [
        { date: '2023-05-20', action: 'Case opened', user: 'System' },
        { date: '2023-05-22', action: 'Initial review completed', user: 'Agent 2' }
      ],
      documents: ['invoice_789.pdf'],
      notes: [
        { date: '2023-05-21', note: 'Customer provided invoice showing single charge', user: 'Agent 2' }
      ]
    },
    {
      id: 'DIS-2023-003',
      customer: 'Michael Brown',
      account: '****1245',
      disputeReason: 'Service not received',
      amount: '$156.00',
      status: 'resolved',
      branch: 'Westside',
      cardType: 'Visa Classic',
      openedDate: '2023-05-10',
      lastUpdated: '2023-05-28',
      timeline: [
        { date: '2023-05-10', action: 'Case opened', user: 'System' },
        { date: '2023-05-12', action: 'Merchant contacted', user: 'Agent 1' },
        { date: '2023-05-18', action: 'Merchant acknowledged issue', user: 'Agent 1' },
        { date: '2023-05-28', action: 'Refund processed', user: 'Agent 3' }
      ],
      documents: ['contract_001.pdf', 'email_confirmation.pdf'],
      notes: [
        { date: '2023-05-11', note: 'Customer claims service was never provided', user: 'Agent 1' },
        { date: '2023-05-28', note: 'Merchant issued full refund', user: 'Agent 3' }
      ]
    }
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Case DIS-2023-004 has been escalated', time: '2 hours ago', read: false },
    { id: 2, message: 'New case DIS-2023-005 assigned to you', time: '1 day ago', read: false },
    { id: 3, message: 'Case DIS-2023-002 requires additional documents', time: '2 days ago', read: true }
  ]);

  // Filter cases
  const filteredCases = cases.filter(caseItem => {
    if (filters.status && caseItem.status !== filters.status) return false;
    if (filters.branch && caseItem.branch !== filters.branch) return false;
    if (filters.cardType && caseItem.cardType !== filters.cardType) return false;
    if (filters.searchQuery && 
        !caseItem.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !caseItem.customer.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !caseItem.account.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Calculate metrics
  const caseMetrics = {
    total: cases.length,
    open: cases.filter(c => c.status === 'open').length,
    inProgress: cases.filter(c => c.status === 'in_progress').length,
    escalated: cases.filter(c => c.status === 'escalated').length,
    resolved: cases.filter(c => c.status === 'resolved').length
  };

  // Chart data
  const statusChartData = {
    labels: ['Open', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Cases by Status',
        data: [caseMetrics.open, caseMetrics.inProgress, caseMetrics.resolved],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const branchChartData = {
    labels: ['Downtown', 'Uptown', 'Westside'],
    datasets: [
      {
        label: 'Cases by Branch',
        data: [
          cases.filter(c => c.branch === 'Downtown').length,
          cases.filter(c => c.branch === 'Uptown').length,
          cases.filter(c => c.branch === 'Westside').length
        ],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  const monthlyTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dispute Cases',
        data: [12, 19, 15, 20, 18, 22],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // Helper functions
  const getStatusInfo = (status) => {
    switch (status) {
      case 'open':
        return { icon: <FiAlertCircle className="text-red-500" />, color: 'bg-red-100 text-red-800' };
      case 'in_progress':
        return { icon: <FiClock className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' };
      case 'resolved':
        return { icon: <FiCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800' };
      default:
        return { icon: <FiAlertCircle className="text-gray-500" />, color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Cases</p>
                    <p className="text-2xl font-semibold text-gray-900">{caseMetrics.total}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FiFileText size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg Resolution Time</p>
                    <p className="text-2xl font-semibold text-gray-900">5.2 days</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <FiClock size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Success Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">78%</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle size={20} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Case Status Distribution</h3>
                <div className="h-64">
                  <Pie 
                    data={statusChartData} 
                    options={{ 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right'
                        }
                      }
                    }} 
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
                <div className="h-64">
                  <Bar 
                    data={monthlyTrendsData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
            
            {/* Branch Performance */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Branch Performance</h3>
              <div className="h-64">
                <Bar 
                  data={branchChartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }} 
                />
              </div>
            </div>
            
            {/* Resolution Time Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resolution Time Analysis</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FiClock className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p>Resolution time distribution chart</p>
                  <p className="text-sm">(Would show distribution of resolution times)</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'reports':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports</h2>
            
            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
                      <FiFileText size={20} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Monthly Dispute Report</h3>
                    <p className="text-sm text-gray-500 mt-1">Comprehensive overview of all disputes</p>
                  </div>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <FiDownload size={20} />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last generated: 2023-06-01</p>
                  <button className="mt-2 w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate New
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mb-3">
                      <FiPieChart size={20} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Branch Performance</h3>
                    <p className="text-sm text-gray-500 mt-1">Comparison of branch dispute metrics</p>
                  </div>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <FiDownload size={20} />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last generated: 2023-06-01</p>
                  <button className="mt-2 w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate New
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-3">
                      <FiUser size={20} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Agent Productivity</h3>
                    <p className="text-sm text-gray-500 mt-1">Agent performance metrics</p>
                  </div>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <FiDownload size={20} />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Last generated: 2023-06-01</p>
                  <button className="mt-2 w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate New
                  </button>
                </div>
              </div>
            </div>
            
            {/* Custom Report Generator */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Custom Report</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Case Status Summary</option>
                    <option>Resolution Time Analysis</option>
                    <option>Agent Performance</option>
                    <option>Branch Comparison</option>
                    <option>Customer Satisfaction</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Last Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                    <option>HTML</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detail Level</label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Summary</option>
                    <option>Detailed</option>
                    <option>Full Detail</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Options</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Include charts</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Include raw data</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-700">Email report when complete</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Reset
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Preferences */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">User Preferences</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>Light</option>
                          <option>Dark</option>
                          <option>System Default</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>(UTC-05:00) Eastern Time</option>
                          <option>(UTC-06:00) Central Time</option>
                          <option>(UTC-07:00) Mountain Time</option>
                          <option>(UTC-08:00) Pacific Time</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2 block text-sm text-gray-700">New cases assigned</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2 block text-sm text-gray-700">Case status updates</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label className="ml-2 block text-sm text-gray-700">Daily summary</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">In-App Notifications</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2 block text-sm text-gray-700">New messages</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2 block text-sm text-gray-700">System alerts</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notification Sound</label>
                        <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option>Default</option>
                          <option>Chime</option>
                          <option>Bell</option>
                          <option>None</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Save Notification Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default: // dashboard
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Metrics cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Cases</p>
                    <p className="text-2xl font-semibold text-gray-900">{caseMetrics.total}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FiFileText size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Open Cases</p>
                    <p className="text-2xl font-semibold text-gray-900">{caseMetrics.open}</p>
                  </div>
                  <div className="p-3 rounded-full bg-red-100 text-red-600">
                    <FiAlertCircle size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Progress</p>
                    <p className="text-2xl font-semibold text-gray-900">{caseMetrics.inProgress}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FiClock size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Resolved</p>
                    <p className="text-2xl font-semibold text-gray-900">{caseMetrics.resolved}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Case Status Distribution</h2>
                <div className="h-64">
                  <Pie 
                    data={statusChartData} 
                    options={{ 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right'
                        }
                      }
                    }} 
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Cases by Branch</h2>
                <div className="h-64">
                  <Bar 
                    data={branchChartData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            precision: 0
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Case list */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-lg font-medium text-gray-900">Dispute Cases</h2>
                <div className="flex space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search cases..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                    />
                  </div>
                  
                  <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiFilter className="mr-2" />
                    Filters
                  </button>
                </div>
              </div>

              {filtersOpen && (
                <div className="p-4 border-b bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        id="status"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                      >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                      <select
                        id="branch"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={filters.branch}
                        onChange={(e) => setFilters({...filters, branch: e.target.value})}
                      >
                        <option value="">All Branches</option>
                        <option value="Downtown">Downtown</option>
                        <option value="Uptown">Uptown</option>
                        <option value="Westside">Westside</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="cardType" className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                      <select
                        id="cardType"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={filters.cardType}
                        onChange={(e) => setFilters({...filters, cardType: e.target.value})}
                      >
                        <option value="">All Card Types</option>
                        <option value="Visa Classic">Visa Classic</option>
                        <option value="Visa Platinum">Visa Platinum</option>
                        <option value="Mastercard Gold">Mastercard Gold</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                      <select
                        id="dateRange"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={filters.dateRange}
                        onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                      >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispute Reason</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCases.length > 0 ? (
                      filteredCases.map((caseItem) => {
                        const statusInfo = getStatusInfo(caseItem.status);
                        return (
                          <tr key={caseItem.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.account}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.disputeReason}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}>
                                {statusInfo.icon} <span className="ml-1 capitalize">{caseItem.status.replace('_', ' ')}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedCase(caseItem)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  const newStatus = caseItem.status === 'open' ? 'in_progress' : 
                                                  caseItem.status === 'in_progress' ? 'resolved' : 'open';
                                  // In a real app, you would call an API here
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Update
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                          No cases found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-20 h-16 flex items-center px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            {/* Desktop Toggle Button */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
            >
              {sidebarCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">
              {activeTab === 'dashboard' && 'Credit Card Dispute Dashboard'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'reports' && 'Reports'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserDropdownOpen(false);
                }}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative"
              >
                <FiBell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-30">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b bg-gray-50">
                      <p className="text-sm font-medium text-gray-700">Notifications</p>
                    </div>
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <FiUser size={16} />
                </div>
                <span className="hidden lg:inline text-sm font-medium text-gray-700">Admin User</span>
                {userDropdownOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Fixed Sidebar */}
        <aside className={`fixed top-16 bottom-0 left-0 z-10 bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto
          ${mobileMenuOpen ? 'w-64' : 'w-0 lg:w-0'} 
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
          
          <nav className="h-full p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg
                    ${sidebarCollapsed ? 'justify-center' : ''}
                    ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <FiHome className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && 'Dashboard'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('analytics');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg
                    ${sidebarCollapsed ? 'justify-center' : ''}
                    ${activeTab === 'analytics' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <FiPieChart className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && 'Analytics'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('reports');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg
                    ${sidebarCollapsed ? 'justify-center' : ''}
                    ${activeTab === 'reports' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <FiFileText className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && 'Reports'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('settings');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg
                    ${sidebarCollapsed ? 'justify-center' : ''}
                    ${activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <FiSettings className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && 'Settings'}
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'ml-64' : 'ml-0'}
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          
          {renderContent()}
        </main>
      </div>

      {/* Case details modal */}
      {selectedCase && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedCase(null)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Case Details: {selectedCase.id}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Customer: {selectedCase.customer} • Account: {selectedCase.account}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setSelectedCase(null)}
                      >
                        <FiX size={24} />
                      </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Dispute Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Reason</p>
                              <p className="text-sm font-medium">{selectedCase.disputeReason}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Amount</p>
                              <p className="text-sm font-medium">{selectedCase.amount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Card Type</p>
                              <p className="text-sm font-medium">{selectedCase.cardType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Branch</p>
                              <p className="text-sm font-medium">{selectedCase.branch}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Opened Date</p>
                              <p className="text-sm font-medium">{selectedCase.openedDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Last Updated</p>
                              <p className="text-sm font-medium">{selectedCase.lastUpdated}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Timeline</h4>
                          <div className="space-y-4">
                            {selectedCase.timeline.map((item, index) => (
                              <div key={index} className="flex">
                                <div className="flex-shrink-0 mr-3">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    {index === selectedCase.timeline.length - 1 ? (
                                      <FiFlag size={16} />
                                    ) : (
                                      <FiClock size={16} />
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 pt-1">
                                  <div className="flex justify-between">
                                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                    <p className="text-xs text-gray-500">{item.date}</p>
                                  </div>
                                  <p className="text-xs text-gray-500">By: {item.user}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                          <div className="space-y-4">
                            {selectedCase.notes.map((note, index) => (
                              <div key={index} className="border-l-4 border-blue-200 pl-3 py-1">
                                <div className="flex justify-between">
                                  <p className="text-sm font-medium text-gray-900">{note.user}</p>
                                  <p className="text-xs text-gray-500">{note.date}</p>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{note.note}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            <textarea
                              rows={3}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Add a new note..."
                            ></textarea>
                            <button
                              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Add Note
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Documents</h4>
                          <div className="space-y-2">
                            {selectedCase.documents.length > 0 ? (
                              selectedCase.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                                  <div className="flex items-center">
                                    <FiFileText className="text-gray-400 mr-2" />
                                    <span className="text-sm truncate">{doc}</span>
                                  </div>
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <FiDownload size={16} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500">No documents attached</p>
                            )}
                          </div>
                          <button className="mt-3 w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <FiUpload className="mr-2" />
                            Upload Document
                          </button>
                        </div>

                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Actions</h4>
                          <div className="space-y-3">
                            <button
                              className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {selectedCase.status === 'open' ? 'Mark as In Progress' : 
                               selectedCase.status === 'in_progress' ? 'Mark as Resolved' : 'Reopen Case'}
                            </button>
                            <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <FiMessageSquare className="mr-2" />
                              Contact Customer
                            </button>
                            <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <FiFlag className="mr-2" />
                              Request Manager Review
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Case Status</h4>
                          <div className="flex items-center">
                            {getStatusInfo(selectedCase.status).icon}
                            <span className="ml-2 text-sm font-medium capitalize">
                              {selectedCase.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="mt-3">
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    Progress
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold inline-block text-blue-600">
                                    {selectedCase.status === 'open' ? '25%' : 
                                     selectedCase.status === 'in_progress' ? '50%' : '100%'}
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                <div 
                                  style={{ 
                                    width: selectedCase.status === 'open' ? '25%' : 
                                           selectedCase.status === 'in_progress' ? '50%' : '100%' 
                                  }} 
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedCase(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCardDisputeDashboard;