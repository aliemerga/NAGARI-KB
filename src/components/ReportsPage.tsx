import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  ArrowLeft, Download, Filter, TrendingUp, TrendingDown, 
  Users, UserPlus, Calendar, Target, FileText, Activity
} from 'lucide-react';

interface ReportsPageProps {
  onBack: () => void;
  participants: any[];
  visits: any[];
}

export function ReportsPage({ onBack, participants, visits }: ReportsPageProps) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data for comprehensive reporting
  const mockParticipants = [
    { id: '1', namaIstri: 'Siti Aminah', namaSuami: 'Ahmad Yusuf', metodeKontrasepsi: 'IUD/AKDR', statusKeluarga: 'Sejahtera II', tanggalKunjungan: '2024-01-15' },
    { id: '2', namaIstri: 'Rani Sari', namaSuami: 'Budi Santoso', metodeKontrasepsi: 'Suntik', statusKeluarga: 'Sejahtera I', tanggalKunjungan: '2024-01-14' },
    { id: '3', namaIstri: 'Maya Indira', namaSuami: 'Eko Prasetyo', metodeKontrasepsi: 'Implan/Susuk', statusKeluarga: 'Pra-Sejahtera', tanggalKunjungan: '2024-01-13' },
    { id: '4', namaIstri: 'Dewi Lestari', namaSuami: 'Rudi Hartono', metodeKontrasepsi: 'Pil KB', statusKeluarga: 'Sejahtera III', tanggalKunjungan: '2024-01-12' }
  ];

  const allParticipants = participants.length > 0 ? participants : mockParticipants;

  // Calculate statistics
  const totalParticipants = allParticipants.length;
  const totalVisits = visits.length || 24; // Mock data
  const monthlyTarget = 50;
  const achievementPercentage = Math.round((totalParticipants / monthlyTarget) * 100);

  // Contraception method distribution
  const contraceptionData = [
    { name: 'IUD/AKDR', value: 8, color: '#3B82F6' },
    { name: 'Suntik', value: 12, color: '#10B981' },
    { name: 'Implan/Susuk', value: 6, color: '#F59E0B' },
    { name: 'Pil KB', value: 10, color: '#EF4444' },
    { name: 'Kondom', value: 4, color: '#8B5CF6' },
    { name: 'MOW/MOP', value: 3, color: '#06B6D4' }
  ];

  // Monthly trends
  const monthlyTrends = [
    { month: 'Jan', participants: 35, visits: 42, target: 50 },
    { month: 'Feb', participants: 28, visits: 38, target: 50 },
    { month: 'Mar', participants: 42, visits: 51, target: 50 },
    { month: 'Apr', participants: 38, visits: 45, target: 50 },
    { month: 'Mei', participants: 45, visits: 48, target: 50 },
    { month: 'Jun', participants: 52, visits: 55, target: 50 }
  ];

  // Family welfare status
  const familyWelfareData = [
    { name: 'Pra-Sejahtera', count: 15, percentage: 35 },
    { name: 'Sejahtera I', count: 12, percentage: 28 },
    { name: 'Sejahtera II', count: 10, percentage: 23 },
    { name: 'Sejahtera III', count: 6, percentage: 14 }
  ];

  // Visit types distribution
  const visitTypesData = [
    { type: 'Kunjungan Rutin', count: 18 },
    { type: 'Konseling Awal', count: 12 },
    { type: 'Kontrol Kontrasepsi', count: 15 },
    { type: 'Pemasangan', count: 8 },
    { type: 'Follow-up', count: 10 },
    { type: 'Edukasi KB', count: 14 }
  ];

  // Service coverage by area
  const areaCoverageData = [
    { area: 'Desa A', participants: 25, coverage: 85 },
    { area: 'Desa B', participants: 18, coverage: 72 },
    { area: 'Desa C', participants: 22, coverage: 88 },
    { area: 'Desa D', participants: 15, coverage: 65 },
    { area: 'Desa E', participants: 20, coverage: 80 }
  ];

  const exportReport = () => {
    // In a real app, this would generate and download a PDF/Excel report
    const reportData = {
      period: `${dateRange.startDate} - ${dateRange.endDate}`,
      totalParticipants,
      totalVisits,
      achievementPercentage,
      contraceptionData,
      familyWelfareData,
      visitTypesData,
      areaCoverageData
    };
    
    console.log('Exporting report:', reportData);
    // For now, just show a success message
    alert('Laporan akan diunduh (fitur export akan diimplementasikan)');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Laporan</h1>
                <p className="text-sm text-gray-600">Analisis dan statistik program KB</p>
              </div>
            </div>
            <Button
              onClick={exportReport}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Controls */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="startDate">Dari Tanggal</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="h-10"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="endDate">Sampai Tanggal</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="h-10"
                />
              </div>
              <Button variant="outline" size="sm" className="mt-6">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Peserta</p>
                  <p className="text-2xl font-semibold">{totalParticipants}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+12% bulan ini</span>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Kunjungan</p>
                  <p className="text-2xl font-semibold">{totalVisits}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+8% bulan ini</span>
                  </div>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pencapaian Target</p>
                  <p className="text-2xl font-semibold">{achievementPercentage}%</p>
                  <div className="flex items-center mt-1">
                    <Target className="w-3 h-3 text-orange-600 mr-1" />
                    <span className="text-xs text-gray-600">{totalParticipants}/{monthlyTarget}</span>
                  </div>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Peserta Baru</p>
                  <p className="text-2xl font-semibold">8</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                    <span className="text-xs text-red-600">-5% bulan ini</span>
                  </div>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports Tabs */}
        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="methods">Metode KB</TabsTrigger>
            <TabsTrigger value="welfare">Kesejahteraan</TabsTrigger>
            <TabsTrigger value="coverage">Cakupan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Monthly Trends Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Tren Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="participants" stroke="#10B981" strokeWidth={2} name="Peserta Baru" />
                    <Line type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={2} name="Kunjungan" />
                    <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Visit Types */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Jenis Kunjungan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={visitTypesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-4">
            {/* Contraception Methods Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Distribusi Metode Kontrasepsi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={contraceptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contraceptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Method Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Detail Metode Kontrasepsi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contraceptionData.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: method.color }}></div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{method.value} peserta</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="welfare" className="space-y-4">
            {/* Family Welfare Status */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Status Kesejahteraan Keluarga</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={familyWelfareData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Welfare Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Rincian Status Kesejahteraan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyWelfareData.map((welfare, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{welfare.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{welfare.count} keluarga</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{welfare.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverage" className="space-y-4">
            {/* Area Coverage Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Cakupan Per Wilayah</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={areaCoverageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="coverage" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Cakupan %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Coverage Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Detail Cakupan Wilayah</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {areaCoverageData.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{area.area}</p>
                        <p className="text-sm text-gray-600">{area.participants} peserta</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={`${
                            area.coverage >= 80 ? 'bg-green-100 text-green-800' :
                            area.coverage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {area.coverage}% cakupan
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Report Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <span>Ringkasan Laporan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Pencapaian Positif</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pencapaian target {achievementPercentage}% dari target bulanan</li>
                <li>• Peningkatan 12% peserta baru dibanding bulan lalu</li>
                <li>• Metode Suntik paling diminati (12 peserta)</li>
                <li>• Desa C memiliki cakupan tertinggi (88%)</li>
              </ul>
            </div>
            
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Area Perhatian</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Desa D memiliki cakupan terendah (65%)</li>
                <li>• Masih banyak keluarga Pra-Sejahtera (35%)</li>
                <li>• Perlu peningkatan edukasi metode kontrasepsi jangka panjang</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}