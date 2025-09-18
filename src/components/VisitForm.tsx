import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Save, X, Search, Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Visit {
  id: string;
  participantId: string;
  participantName: string;
  visitType: string;
  visitDate: string;
  visitTime: string;
  location: string;
  purpose: string;
  contraceptionStatus: string;
  healthStatus: string;
  notes: string;
  nextVisitDate: string;
  followUpRequired: boolean;
  services: string[];
  createdAt: string;
}

interface VisitFormProps {
  onBack: () => void;
  onSave: (visit: Visit) => void;
  participants: any[];
}

export function VisitForm({ onBack, onSave, participants }: VisitFormProps) {
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    visitType: '',
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: new Date().toTimeString().slice(0, 5),
    location: '',
    purpose: '',
    contraceptionStatus: '',
    healthStatus: '',
    notes: '',
    nextVisitDate: '',
    followUpRequired: false,
    services: [] as string[]
  });

  const visitTypes = [
    'Kunjungan Rutin',
    'Konseling Awal',
    'Pemasangan Kontrasepsi',
    'Kontrol Kontrasepsi',
    'Konseling Masalah',
    'Kunjungan Darurat',
    'Follow-up',
    'Edukasi KB'
  ];

  const locations = [
    'Posyandu',
    'Puskesmas',
    'Rumah Peserta',
    'Klinik KB',
    'Kantor Desa',
    'Balai Desa',
    'Lainnya'
  ];

  const purposes = [
    'Konseling KB',
    'Pemeriksaan Kesehatan',
    'Pemasangan Alat Kontrasepsi',
    'Kontrol Rutin',
    'Edukasi Kesehatan Reproduksi',
    'Penanganan Keluhan',
    'Rujukan Kesehatan',
    'Penyuluhan'
  ];

  const contraceptionStatuses = [
    'Aktif Menggunakan',
    'Berhenti Sementara',
    'Ganti Metode',
    'Keluhan Ringan',
    'Keluhan Berat',
    'Tidak Ada Masalah'
  ];

  const healthStatuses = [
    'Sehat',
    'Ada Keluhan Ringan',
    'Ada Keluhan Berat',
    'Perlu Rujukan',
    'Hamil',
    'Menyusui'
  ];

  const availableServices = [
    'Konseling KB',
    'Pemeriksaan Fisik',
    'Pemberian Kontrasepsi',
    'Edukasi Kesehatan',
    'Rujukan Medis',
    'Penyuluhan Gizi',
    'Konseling Psikologi',
    'Pemeriksaan Kehamilan'
  ];

  const filteredParticipants = participants.filter(p =>
    p.namaIstri.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.namaSuami.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedParticipant) {
      toast.error('Pilih peserta terlebih dahulu');
      return;
    }

    if (!formData.visitType || !formData.purpose) {
      toast.error('Mohon lengkapi jenis kunjungan dan tujuan');
      return;
    }

    const participant = participants.find(p => p.id === selectedParticipant);
    
    const newVisit: Visit = {
      id: Date.now().toString(),
      participantId: selectedParticipant,
      participantName: `${participant.namaIstri} & ${participant.namaSuami}`,
      visitType: formData.visitType,
      visitDate: formData.visitDate,
      visitTime: formData.visitTime,
      location: formData.location,
      purpose: formData.purpose,
      contraceptionStatus: formData.contraceptionStatus,
      healthStatus: formData.healthStatus,
      notes: formData.notes,
      nextVisitDate: formData.nextVisitDate,
      followUpRequired: formData.followUpRequired,
      services: formData.services,
      createdAt: new Date().toISOString()
    };

    onSave(newVisit);
    toast.success('Kunjungan berhasil dicatat');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
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
              <h1 className="text-xl font-semibold text-gray-900">Catat Kunjungan</h1>
              <p className="text-sm text-gray-600">Dokumentasi kunjungan lapangan</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Participant Selection */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-500" />
              <span>Pilih Peserta</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Cari Peserta</Label>
              <Input
                id="search"
                type="text"
                placeholder="Cari nama peserta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>
            
            {searchTerm && (
              <div className="max-h-48 overflow-y-auto border rounded-lg">
                {filteredParticipants.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Tidak ada peserta ditemukan
                  </div>
                ) : (
                  filteredParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedParticipant === participant.id ? 'bg-green-50 border-green-200' : ''
                      }`}
                      onClick={() => {
                        setSelectedParticipant(participant.id);
                        setSearchTerm('');
                      }}
                    >
                      <p className="font-medium">{participant.namaIstri} & {participant.namaSuami}</p>
                      <p className="text-sm text-gray-600">{participant.alamat}</p>
                    </div>
                  ))
                )}
              </div>
            )}
            
            {selectedParticipant && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-800">
                  ✓ {participants.find(p => p.id === selectedParticipant)?.namaIstri} & {participants.find(p => p.id === selectedParticipant)?.namaSuami}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visit Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>Detail Kunjungan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Jenis Kunjungan</Label>
              <Select value={formData.visitType} onValueChange={(value) => handleInputChange('visitType', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Pilih jenis kunjungan" />
                </SelectTrigger>
                <SelectContent>
                  {visitTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="visitDate">Tanggal Kunjungan</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange('visitDate', e.target.value)}
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="visitTime">Waktu Kunjungan</Label>
                <Input
                  id="visitTime"
                  type="time"
                  value={formData.visitTime}
                  onChange={(e) => handleInputChange('visitTime', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <Label>Lokasi Kunjungan</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tujuan Kunjungan</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Pilih tujuan kunjungan" />
                </SelectTrigger>
                <SelectContent>
                  {purposes.map(purpose => (
                    <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Status and Assessment */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Status dan Penilaian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Status Kontrasepsi</Label>
              <Select value={formData.contraceptionStatus} onValueChange={(value) => handleInputChange('contraceptionStatus', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Pilih status kontrasepsi" />
                </SelectTrigger>
                <SelectContent>
                  {contraceptionStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status Kesehatan</Label>
              <Select value={formData.healthStatus} onValueChange={(value) => handleInputChange('healthStatus', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Pilih status kesehatan" />
                </SelectTrigger>
                <SelectContent>
                  {healthStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Catatan Kunjungan</Label>
              <Textarea
                id="notes"
                placeholder="Tulis catatan detail tentang kunjungan ini..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services Provided */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Layanan yang Diberikan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {availableServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={service} className="text-sm">{service}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Rencana Tindak Lanjut</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUpRequired"
                checked={formData.followUpRequired}
                onCheckedChange={(checked) => handleInputChange('followUpRequired', checked)}
              />
              <Label htmlFor="followUpRequired">Memerlukan tindak lanjut</Label>
            </div>

            {formData.followUpRequired && (
              <div>
                <Label htmlFor="nextVisitDate">Tanggal Kunjungan Berikutnya</Label>
                <Input
                  id="nextVisitDate"
                  type="date"
                  value={formData.nextVisitDate}
                  onChange={(e) => handleInputChange('nextVisitDate', e.target.value)}
                  className="h-12"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 sticky bottom-16 bg-gray-50 pb-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 h-12"
          >
            <X className="w-4 h-4 mr-2" />
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Simpan Kunjungan
          </Button>
        </div>
      </form>
    </div>
  );
}