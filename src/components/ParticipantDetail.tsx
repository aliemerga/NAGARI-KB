import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Edit2, Phone, MapPin, Calendar, Users, Heart } from 'lucide-react';

interface Participant {
  id: string;
  namaIstri: string;
  namaSuami: string;
  nikIstri: string;
  nikSuami: string;
  tanggalLahirIstri: string;
  tanggalLahirSuami: string;
  alamat: string;
  nomorTelepon: string;
  statusKeluarga: string;
  jumlahAnakHidup: string;
  jumlahAnakBawaan: string;
  jumlahAnakSekolah: string;
  metodeKontrasepsi: string;
  tanggalPemasangan: string;
  tempatPelayanan: string;
  tanggalKunjungan: string;
  tanggalKunjunganKembali: string;
}

interface ParticipantDetailProps {
  participant: Participant;
  onBack: () => void;
  onEdit: (participant: Participant) => void;
}

export function ParticipantDetail({ participant, onBack, onEdit }: ParticipantDetailProps) {
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

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '-';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
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
                <h1 className="text-xl font-semibold text-gray-900">Detail Peserta</h1>
                <p className="text-sm text-gray-600">Informasi lengkap peserta KB</p>
              </div>
            </div>
            <Button
              onClick={() => onEdit(participant)}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Header Card - Couple Names */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{participant.namaIstri}</h2>
              <p className="text-lg text-gray-600">& {participant.namaSuami}</p>
              <div className="flex justify-center space-x-2 pt-2">
                {participant.statusKeluarga && (
                  <Badge className={getStatusColor(participant.statusKeluarga)}>
                    {participant.statusKeluarga}
                  </Badge>
                )}
                {participant.metodeKontrasepsi && (
                  <Badge className={getMethodColor(participant.metodeKontrasepsi)}>
                    {participant.metodeKontrasepsi}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>Informasi Kontak</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Alamat</p>
              <p className="text-gray-600">{participant.alamat || 'Belum diisi'}</p>
            </div>
            {participant.nomorTelepon && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Nomor Telepon</p>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600">{participant.nomorTelepon}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Data */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span>Data Identitas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Wife's Data */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data Istri</h4>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">NIK</span>
                  <span className="text-sm font-medium">{participant.nikIstri || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tanggal Lahir</span>
                  <span className="text-sm font-medium">
                    {participant.tanggalLahirIstri 
                      ? `${new Date(participant.tanggalLahirIstri).toLocaleDateString('id-ID')} (${calculateAge(participant.tanggalLahirIstri)} tahun)`
                      : '-'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Husband's Data */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data Suami</h4>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">NIK</span>
                  <span className="text-sm font-medium">{participant.nikSuami || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tanggal Lahir</span>
                  <span className="text-sm font-medium">
                    {participant.tanggalLahirSuami 
                      ? `${new Date(participant.tanggalLahirSuami).toLocaleDateString('id-ID')} (${calculateAge(participant.tanggalLahirSuami)} tahun)`
                      : '-'
                    }
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Data */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Data Keluarga</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">
                  {participant.jumlahAnakHidup || '0'}
                </p>
                <p className="text-xs text-gray-600">Anak Hidup</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">
                  {participant.jumlahAnakBawaan || '0'}
                </p>
                <p className="text-xs text-gray-600">Anak Bawaan</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-purple-600">
                  {participant.jumlahAnakSekolah || '0'}
                </p>
                <p className="text-xs text-gray-600">Anak Sekolah</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contraception Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Informasi Kontrasepsi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Metode Kontrasepsi</p>
              <p className="text-gray-600">{participant.metodeKontrasepsi || 'Belum dipilih'}</p>
            </div>
            
            {participant.tanggalPemasangan && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Tanggal Pemasangan/Penggunaan</p>
                <p className="text-gray-600">
                  {new Date(participant.tanggalPemasangan).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
            
            {participant.tempatPelayanan && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Tempat Pelayanan</p>
                <p className="text-gray-600">{participant.tempatPelayanan}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visit History */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>Riwayat Kunjungan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {participant.tanggalKunjungan && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Kunjungan Terakhir</p>
                <p className="text-gray-600">
                  {new Date(participant.tanggalKunjungan).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
            
            {participant.tanggalKunjunganKembali && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Rencana Kunjungan Berikutnya</p>
                <p className="text-gray-600">
                  {new Date(participant.tanggalKunjunganKembali).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}