import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Users, 
  UserPlus, 
  Target,
  Calendar,
  LogOut
} from 'lucide-react';

interface DashboardProps {
  userName: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Dashboard({ userName, onNavigate, onLogout }: DashboardProps) {
  const stats = [
    {
      title: 'Kunjungan Hari Ini',
      value: '12',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Peserta Baru',
      value: '5',
      icon: UserPlus,
      color: 'bg-green-500'
    },
    {
      title: 'Target Mingguan',
      value: '45/50',
      icon: Target,
      color: 'bg-orange-500'
    },
    {
      title: 'Total Peserta',
      value: '156',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Selamat datang, {userName}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Schedule */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Kunjungan Posyandu Melati</p>
                <p className="text-sm text-gray-600">09:00 - 12:00</p>
              </div>
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                Berlangsung
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Kunjungan Rumah Ibu Sari</p>
                <p className="text-sm text-gray-600">14:00 - 15:00</p>
              </div>
              <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                Mendatang
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Data peserta baru ditambahkan</p>
                <p className="text-xs text-gray-600">Siti Aminah & Ahmad Yusuf • 2 jam lalu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 py-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Kunjungan berhasil dicatat</p>
                <p className="text-xs text-gray-600">Rani Sari & Budi Santoso • 4 jam lalu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Data diperbarui</p>
                <p className="text-xs text-gray-600">Maya Indira & Eko Prasetyo • 6 jam lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ringkasan Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">28</p>
                <p className="text-xs text-gray-600">Peserta Baru</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">156</p>
                <p className="text-xs text-gray-600">Total Kunjungan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}