import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { AlertCircle, Droplet, Activity, Map, Bell, TrendingUp, TrendingDown, Settings, Users, FileText, Database, Zap, Globe, Shield, Eye, ChevronDown, ChevronRight, Calendar, Filter, Download, RefreshCw, Info, CheckCircle, AlertTriangle, XCircle, BarChart3, MapPin, Waves, CloudRain, Home, Menu, X, Search, ChevronUp } from 'lucide-react';

const GroundwaterMonitoringSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStation, setSelectedStation] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [alerts, setAlerts] = useState([]);
  const [sustainabilityIndex, setSustainabilityIndex] = useState(72);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Simulated real-time data
  const [dwlrStations] = useState([
    { id: 'DWLR001', name: 'Delhi NCR', lat: 28.6139, lng: 77.2090, waterLevel: 45.2, status: 'normal', trend: 'stable', lastReading: '2 min ago' },
    { id: 'DWLR002', name: 'Mumbai Suburban', lat: 19.0760, lng: 72.8777, waterLevel: 32.8, status: 'warning', trend: 'declining', lastReading: '5 min ago' },
    { id: 'DWLR003', name: 'Chennai Central', lat: 13.0827, lng: 80.2707, waterLevel: 28.5, status: 'critical', trend: 'declining', lastReading: '1 min ago' },
    { id: 'DWLR004', name: 'Bangalore Urban', lat: 12.9716, lng: 77.5946, waterLevel: 55.3, status: 'normal', trend: 'rising', lastReading: '3 min ago' },
    { id: 'DWLR005', name: 'Kolkata Metro', lat: 22.5726, lng: 88.3639, waterLevel: 48.7, status: 'normal', trend: 'stable', lastReading: '1 min ago' },
  ]);

  const waterLevelData = [
    { time: '00:00', level: 45.5, predicted: 45.2 },
    { time: '04:00', level: 45.2, predicted: 45.0 },
    { time: '08:00', level: 44.8, predicted: 44.5 },
    { time: '12:00', level: 44.3, predicted: 44.0 },
    { time: '16:00', level: 43.8, predicted: 43.5 },
    { time: '20:00', level: 43.5, predicted: 43.2 },
    { time: '24:00', level: 43.2, predicted: 42.9 },
  ];

  const rechargeData = [
    { month: 'Jan', natural: 120, artificial: 80 },
    { month: 'Feb', natural: 110, artificial: 85 },
    { month: 'Mar', natural: 95, artificial: 90 },
    { month: 'Apr', natural: 85, artificial: 95 },
    { month: 'May', natural: 75, artificial: 100 },
    { month: 'Jun', natural: 150, artificial: 110 },
    { month: 'Jul', natural: 180, artificial: 120 },
    { month: 'Aug', natural: 200, artificial: 130 },
    { month: 'Sep', natural: 160, artificial: 115 },
    { month: 'Oct', natural: 130, artificial: 100 },
    { month: 'Nov', natural: 100, artificial: 90 },
    { month: 'Dec', natural: 110, artificial: 85 },
  ];

  const sustainabilityData = [
    { name: 'Sustainability Index', value: sustainabilityIndex, fill: sustainabilityIndex > 70 ? '#10b981' : sustainabilityIndex > 40 ? '#f59e0b' : '#ef4444' }
  ];

  const depletionFactors = [
    { factor: 'Agricultural Use', value: 45, color: '#3b82f6' },
    { factor: 'Industrial Use', value: 25, color: '#8b5cf6' },
    { factor: 'Domestic Use', value: 20, color: '#10b981' },
    { factor: 'Climate Impact', value: 10, color: '#f59e0b' },
  ];

  const regionalData = [
    { region: 'North', stations: 892, critical: 78, warning: 156, normal: 658 },
    { region: 'South', stations: 1240, critical: 134, warning: 287, normal: 819 },
    { region: 'East', stations: 756, critical: 45, warning: 98, normal: 613 },
    { region: 'West', stations: 1456, critical: 203, warning: 345, normal: 908 },
    { region: 'Central', stations: 916, critical: 67, warning: 178, normal: 671 },
  ];

  useEffect(() => {
    // Simulate real-time alerts
    const alertTimer = setInterval(() => {
      const newAlerts = [
        { id: Date.now(), type: 'critical', message: 'Chennai Central: Water level dropped below critical threshold', time: 'Just now', station: 'DWLR003' },
        { id: Date.now() + 1, type: 'warning', message: 'Mumbai Suburban: Rapid depletion detected', time: '5 min ago', station: 'DWLR002' },
        { id: Date.now() + 2, type: 'info', message: 'Bangalore Urban: Recharge event detected', time: '10 min ago', station: 'DWLR004' },
      ];
      setAlerts(prev => [...newAlerts.slice(0, 1), ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(alertTimer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      normal: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800',
    };
    const icons = {
      normal: <CheckCircle className="w-4 h-4" />,
      warning: <AlertTriangle className="w-4 h-4" />,
      critical: <XCircle className="w-4 h-4" />,
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const TrendIndicator = ({ trend }) => {
    if (trend === 'rising') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active DWLR Stations</p>
              <p className="text-2xl font-bold text-gray-900">5,260</p>
              <p className="text-xs text-green-600 mt-1">↑ 99.8% Online</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Water Level</p>
              <p className="text-2xl font-bold text-gray-900">42.3m</p>
              <p className="text-xs text-red-600 mt-1">↓ 2.3m from last month</p>
            </div>
            <div className="bg-cyan-100 p-3 rounded-full">
              <Waves className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sustainability Index</p>
              <p className="text-2xl font-bold text-gray-900">{sustainabilityIndex}%</p>
              <p className="text-xs text-yellow-600 mt-1">Moderate Risk</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              <p className="text-xs text-orange-600 mt-1">2 Critical, 1 Warning</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Water Level Trends & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Water Level Trends & AI Predictions</h3>
            <select className="text-sm border rounded px-3 py-1" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={waterLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="level" stroke="#3b82f6" fill="#93c5fd" name="Actual Level" />
              <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeDasharray="5 5" name="AI Prediction" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recharge Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rechargeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="natural" fill="#10b981" name="Natural Recharge" />
              <Bar dataKey="artificial" fill="#3b82f6" name="Artificial Recharge" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sustainability Index & Depletion Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Groundwater Sustainability Index</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={sustainabilityData}>
              <RadialBar dataKey="value" cornerRadius={10} fill={sustainabilityData[0].fill} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold">
                {sustainabilityIndex}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-yellow-600">Moderate Risk</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Trend:</span>
              <span className="font-medium text-red-600">Declining</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hydro-Socioeconomic Factors</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={depletionFactors}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ factor, value }) => `${factor}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {depletionFactors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy-Cost Restoration Model</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Energy Required</span>
                <span className="text-sm font-medium">2.4 GWh</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Estimated Cost</span>
                <span className="text-sm font-medium">₹45.2 Cr</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Time to Restore</span>
                <span className="text-sm font-medium">18 months</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Station Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Stations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Critical</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warning</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regionalData.map((region) => (
                <tr key={region.region} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{region.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{region.stations.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{region.critical}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">{region.warning}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{region.normal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(region.normal / region.stations) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round((region.normal / region.stations) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const StationMonitor = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search DWLR stations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="central">Central</option>
          </select>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">DWLR Station Map</h3>
          <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
            {/* Simplified map representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                {/* India outline (simplified) */}
                <path
                  d="M400 150 L450 200 L480 250 L470 350 L420 400 L380 400 L330 350 L320 250 L350 200 Z"
                  fill="#e5e7eb"
                  stroke="#9ca3af"
                  strokeWidth="2"
                />
                {/* Station markers */}
                {dwlrStations.map((station) => {
                  const x = ((station.lng - 70) / 30) * 800;
                  const y = ((30 - station.lat) / 20) * 600;
                  const color = station.status === 'critical' ? '#ef4444' : station.status === 'warning' ? '#f59e0b' : '#10b981';
                  return (
                    <g key={station.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={color}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedStation(station)}
                      />
                      <text x={x} y={y - 12} textAnchor="middle" className="text-xs fill-gray-700">
                        {station.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2 shadow">
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Station Details</h3>
          {selectedStation ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Station ID</p>
                <p className="font-medium">{selectedStation.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{selectedStation.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Water Level</p>
                <p className="font-medium">{selectedStation.waterLevel}m</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <StatusBadge status={selectedStation.status} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Trend</p>
                <div className="flex items-center gap-2">
                  <TrendIndicator trend={selectedStation.trend} />
                  <span className="capitalize">{selectedStation.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Reading</p>
                <p className="font-medium">{selectedStation.lastReading}</p>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Full Report
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Select a station on the map to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Station List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All DWLR Stations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reading</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dwlrStations.map((station) => (
                <tr key={station.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStation(station)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{station.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{station.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{station.waterLevel}m</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={station.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <TrendIndicator trend={station.trend} />
                      <span className="text-sm capitalize">{station.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{station.lastReading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AlertsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Real-Time Alert System</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            Configure Alerts
          </button>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-800">2</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-800">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Info Updates</p>
                <p className="text-2xl font-bold text-blue-800">12</p>
              </div>
              <Info className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg p-4 border-l-4 ${
                alert.type === 'critical' 
                  ? 'bg-red-50 border-red-500' 
                  : alert.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {alert.type === 'critical' ? (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.station}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Configuration */}
        <div className="mt-8 border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Alert Configuration</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Critical Water Level Alerts</p>
                <p className="text-sm text-gray-500">Notify when water level drops below 30m</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Rapid Depletion Detection</p>
                <p className="text-sm text-gray-500">Alert on unusual water level changes</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Recharge Event Notifications</p>
                <p className="text-sm text-gray-500">Notify on positive recharge detection</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PolicyTools = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Policy & Research Support Tools</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Generator */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h4 className="font-medium text-gray-900">Water Security Report Generator</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate comprehensive water security reports with AI-driven insights and recommendations
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>

          {/* Conservation Strategy Simulator */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <h4 className="font-medium text-gray-900">Conservation Strategy Simulator</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Simulate different conservation strategies and predict their impact on groundwater levels
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Run Simulation
            </button>
          </div>

          {/* Policy Impact Analysis */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
              <h4 className="font-medium text-gray-900">Policy Impact Analysis</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Analyze the potential impact of proposed water policies on groundwater resources
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              Analyze Policy
            </button>
          </div>

          {/* Data Export Tool */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Download className="w-6 h-6 text-orange-600" />
              <h4 className="font-medium text-gray-900">Research Data Export</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Export historical and real-time data for academic research and analysis
            </p>
            <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="mt-8 border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Key Policy Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">23%</p>
              <p className="text-sm text-gray-600">Depletion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">67%</p>
              <p className="text-sm text-gray-600">Aquifer Stress</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">₹126Cr</p>
              <p className="text-sm text-gray-600">Annual Loss</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">2.3M</p>
              <p className="text-sm text-gray-600">People Affected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center gap-3 ml-2 md:ml-0">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2 rounded-lg">
                  <Droplet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Groundwater Intelligence Platform</h1>
                  <p className="text-xs text-gray-500">Real-Time National DWLR Network</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                {alerts.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                )}
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>India National Network</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block bg-white shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-8 py-2 md:py-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'dashboard' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('stations')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'stations' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Station Monitor
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'alerts' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-4 h-4" />
              Alerts
              {alerts.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                  {alerts.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'policy' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Policy Tools
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'stations' && <StationMonitor />}
        {activeTab === 'alerts' && <AlertsSection />}
        {activeTab === 'policy' && <PolicyTools />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 Real-Time Groundwater Resource Evaluation System
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                System Online
              </span>
              <span>5,260 Active Stations</span>
              <span>Last Update: 2 seconds ago</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GroundwaterMonitoringSystem;