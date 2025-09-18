import { Button } from './ui/button';
import { 
  Home, 
  UserPlus, 
  FileText, 
  ClipboardList, 
  TrendingUp 
} from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Beranda',
      icon: Home,
      action: () => onNavigate('dashboard')
    },
    {
      id: 'add-participant',
      label: 'Tambah',
      icon: UserPlus,
      action: () => onNavigate('add-participant')
    },
    {
      id: 'data-list',
      label: 'Data',
      icon: FileText,
      action: () => onNavigate('data-list')
    },
    {
      id: 'add-visit',
      label: 'Kunjungan',
      icon: ClipboardList,
      action: () => onNavigate('add-visit')
    },
    {
      id: 'reports',
      label: 'Laporan',
      icon: TrendingUp,
      action: () => onNavigate('reports')
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={item.action}
              className={`flex flex-col items-center space-y-1 px-3 py-2 h-auto min-h-[56px] ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
              <span className={`text-xs ${isActive ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}