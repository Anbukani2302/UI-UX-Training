import { useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faWallet, 
  faExchangeAlt, 
  faCreditCard, 
  faChartLine, 
  faCog, 
  faQuestionCircle, 
  faDollarSign,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { 
  Chart as ChartJS, 
  LineController, 
  LineElement, 
  PointElement, 
  LinearScale, 
  Title, 
  CategoryScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Chart data
  const spendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Spending',
      data: [1200, 1900, 1500, 2000, 1800, 2200],
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      borderColor: 'rgba(52, 152, 219, 1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true
    }]
  };

  const accountData = {
    labels: ['Checking', 'Savings', 'Investment'],
    datasets: [{
      data: [12000, 8000, 4589],
      backgroundColor: [
        'rgba(52, 152, 219, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(155, 89, 182, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const transactionData = {
    labels: ['Food', 'Shopping', 'Bills', 'Entertainment', 'Transport'],
    datasets: [{
      label: 'Amount',
      data: [500, 800, 600, 300, 400],
      backgroundColor: [
        'rgba(52, 152, 219, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(231, 76, 60, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(241, 196, 15, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`fixed h-screen bg-venum-primary text-white transition-all ${
          sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-venum-secondary">
          {sidebarOpen && <h4 className="text-xl font-bold">KASK Bank</h4>}
          {/* <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-venum-accent"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button> */}
        </div>
        
        <nav className="p-2">
          <ul>
            <SidebarItem 
              icon={faTachometerAlt} 
              text="Dashboard" 
              active 
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem 
              icon={faWallet} 
              text="Accounts" 
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem 
              icon={faExchangeAlt} 
              text="Transactions" 
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem 
              icon={faCreditCard} 
              text="Cards" 
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem 
              icon={faChartLine} 
              text="Investments" 
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem 
              icon={faCog} 
              text="Settings" 
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem 
              icon={faQuestionCircle} 
              text="Support" 
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`transition-all ${
          sidebarOpen ? 'main-content-expanded' : 'main-content-collapsed'
        }`}
      >
        {/* Header */}
        <header className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
          <h5 className="text-lg font-semibold text-gray-700">Dashboard</h5>
          <div className="flex items-center space-x-2">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-700">Anbukanna</span>
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
          </div>
        </header>

        {/* Cards - Updated with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 px-4 sm:px-6 h-50">
          <DashboardCard 
            icon={faDollarSign}
            title="Total Balance"
            value="$24,589.00"
            description="+2.5% from last month"
            color="bg-gradient-to-br from-blue-500 to-venum-primary"
            className="md:mr-3"
          />
          <DashboardCard 
            icon={faExchangeAlt}
            title="Transactions"
            value="1,248"
            description="+12% from last month"
            color="bg-gradient-to-br from-green-500 to-green-700"
            className="md:mx-3"
          />
          <DashboardCard 
            icon={faWallet}
            title="Accounts"
            value="3"
            description="2 Active, 1 Dormant"
            color="bg-gradient-to-br from-red-500 to-red-700"
            className="md:ml-3"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6">
          <ChartContainer title="Monthly Spending">
            <Line 
              data={spendingData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }} 
            />
          </ChartContainer>
          
          <ChartContainer title="Account Distribution">
            <Doughnut 
              data={accountData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </ChartContainer>
          
          <ChartContainer title="Transaction Types">
            <Bar 
              data={transactionData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }} 
            />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

// Reusable components with improved spacing
const SidebarItem = ({ icon, text, active = false, sidebarOpen }) => (
  <li className={`flex items-center p-3 rounded-md mb-1 cursor-pointer transition-colors ${
    active 
      ? 'bg-venum-accent font-semibold' 
      : 'hover:bg-venum-secondary'
  }`}>
    <FontAwesomeIcon icon={icon} className="text-lg w-6" />
    {sidebarOpen && <span className="ml-3">{text}</span>}
  </li>
);

const DashboardCard = ({ icon, title, value, description, color, className = '' }) => (
  <div className={`${color} ${className} text-white p-6 rounded-lg shadow-md hover:-translate-y-1 transition-transform min-h-[200px] flex flex-col justify-between`}>
    <div>
      <FontAwesomeIcon icon={icon} className="text-2xl mb-3" />
      <h5 className="text-sm font-medium">{title}</h5>
      <h2 className="text-3xl font-bold my-2">{value}</h2>
    </div>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-5 rounded-lg shadow-md h-full">
    <h6 className="text-sm font-semibold text-gray-600 mb-4">{title}</h6>
    <div className="chart-container h-[250px]">
      {children}
    </div>
  </div>
);

export default Dashboard;