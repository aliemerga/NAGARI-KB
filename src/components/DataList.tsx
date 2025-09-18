import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface Participant {
  id: string;
  namaIstri: string;
  namaSuami: string;
  alamat: string;
  metodeKontrasepsi: string;
  tanggalKunjungan: string;
  statusKeluarga: string;
}

interface DataListProps {
  onBack: () => void;
  participants: Participant[];
  onEdit: (participant: Participant) => void;
  onDelete: (id: string) => void;
  onView: (participant: Participant) => void;
}

export function DataList({ onBack, participants, onEdit, onDelete, onView }: DataListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('');

  // Mock data for demonstration
  const mockParticipants: Participant[] = [
    {
      id: '1',
      namaIstri: 'Siti Aminah',
      namaSuami: 'Ahmad Yusuf',
      alamat: 'Jl. Merdeka No. 123, RT 02/RW 05',
      metodeKontrasepsi: 'IUD/AKDR',
      tanggalKunjungan: '2024-01-15',
      statusKeluarga: 'Sejahtera II'
    },
    {
      id: '2',
      namaIstri: 'Rani Sari',
      namaSuami: 'Budi Santoso',
      alamat: 'Jl. Pahlawan No. 45, RT 01/RW 03',
      metodeKontrasepsi: 'Suntik',
      tanggalKunjungan: '2024-01-14',
      statusKeluarga: 'Sejahtera I'
    },
    {
      id: '3',
      namaIstri: 'Maya Indira',
      namaSuami: 'Eko Prasetyo',
      alamat: 'Jl. Diponegoro No. 67, RT 03/RW 02',
      metodeKontrasepsi: 'Implan/Susuk',
      tanggalKunjungan: '2024-01-13',
      statusKeluarga: 'Pra-Sejahtera'
    },
    {
      id: '4',
      namaIstri: 'Dewi Lestari',
      namaSuami: 'Rudi Hartono',
      alamat: 'Jl. Sudirman No. 89, RT 04/RW 01',
      metodeKontrasepsi: 'Pil KB',
      tanggalKunjungan: '2024-01-12',
      statusKeluarga: 'Sejahtera III'
    }
  ];

  const allParticipants = participants.length > 0 ? participants : mockParticipants;

  const filteredParticipants = allParticipants.filter(participant => {
    const matchesSearch = 
      participant.namaIstri.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.namaSuami.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.alamat.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterMethod === '' || participant.metodeKontrasepsi === filterMethod;
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string, name: string) => {
    onDelete(id);
    toast.success(`Data ${name} berhasil dihapus`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pra-Sejahtera': return 'bg-red-100 text-red-800';
      case 'Sejahtera I': return 'bg-yellow-100 text-yellow-800';
      case 'Sejahtera II': return 'bg-blue-100 text-blue-800';
      case 'Sejahtera III': return 'bg-green-100 text-green-800';
      case 'Sejahtera III Plus': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800'
    ];
    return colors[method.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Data Peserta KB</h1>
              <p className="text-sm text-gray-600">{filteredParticipants.length} data ditemukan</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari nama peserta atau alamat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant={filterMethod === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterMethod('')}
                className="flex-1"
              >
                Semua
              </Button>
              <Button
                variant={filterMethod === 'IUD/AKDR' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterMethod('IUD/AKDR')}
                className="flex-1"
              >
                IUD
              </Button>
              <Button
                variant={filterMethod === 'Suntik' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterMethod('Suntik')}
                className="flex-1"
              >
                Suntik
              </Button>
              <Button
                variant={filterMethod === 'Implan/Susuk' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterMethod('Implan/Susuk')}
                className="flex-1"
              >
                Implan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Data List */}
      <div className="p-4 space-y-3">
        {filteredParticipants.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600">Tidak ada data yang ditemukan</p>
              <p className="text-sm text-gray-500 mt-1">Coba ubah kata kunci pencarian</p>
            </CardContent>
          </Card>
        ) : (
          filteredParticipants.map((participant) => (
            <Card key={participant.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header with names */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{participant.namaIstri}</h3>
                      <p className="text-sm text-gray-600">& {participant.namaSuami}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(participant)}
                        className="p-2 h-8 w-8"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(participant)}
                        className="p-2 h-8 w-8 text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 h-8 w-8 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Data Peserta</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus data {participant.namaIstri}? 
                              Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(participant.id, participant.namaIstri)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Address */}
                  <p className="text-sm text-gray-600">{participant.alamat}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getMethodColor(participant.metodeKontrasepsi)}>
                      {participant.metodeKontrasepsi}
                    </Badge>
                    <Badge className={getStatusColor(participant.statusKeluarga)}>
                      {participant.statusKeluarga}
                    </Badge>
                  </div>

                  {/* Visit Date */}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Kunjungan terakhir</span>
                    <span>{new Date(participant.tanggalKunjungan).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}