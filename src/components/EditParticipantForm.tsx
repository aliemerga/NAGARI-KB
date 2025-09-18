import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, Save, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

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

interface EditParticipantFormProps {
  participant: Participant;
  onBack: () => void;
  onSave: (data: Participant) => void;
}

export function EditParticipantForm({ participant, onBack, onSave }: EditParticipantFormProps) {
  const [formData, setFormData] = useState<Participant>(participant);

  useEffect(() => {
    setFormData(participant);
  }, [participant]);

  const handleInputChange = (field: keyof Participant, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields: (keyof Participant)[] = ['namaIstri', 'namaSuami', 'nikIstri', 'nikSuami'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Mohon lengkapi data yang wajib diisi');
      return;
    }
    
    onSave(formData);
    toast.success('Data berhasil diperbarui');
  };

  const kontrasepsiOptions = [
    'IUD/AKDR',
    'Implan/Susuk',
    'Suntik',
    'Pil KB',
    'Kondom',
    'MOW (Tubektomi)',
    'MOP (Vasektomi)',
    'MAL (Metode Amenore Laktasi)'
  ];

  const statusKeluargaOptions = [
    'Pra-Sejahtera',
    'Sejahtera I',
    'Sejahtera II',
    'Sejahtera III',
    'Sejahtera III Plus'
  ];

  const tempatPelayananOptions = [
    'Puskesmas',
    'Pustu',
    'Posyandu',
    'Klinik KB',
    'Rumah Sakit',
    'Praktek Bidan',
    'Praktek Dokter'
  ];

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
              <h1 className="text-xl font-semibold text-gray-900">Edit Peserta KB</h1>
              <p className="text-sm text-gray-600">Perbarui data {formData.namaIstri}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Accordion type="multiple" defaultValue={["identitas", "keluarga", "kontrasepsi", "kunjungan"]} className="space-y-4">
          
          {/* Data Identitas PUS */}
          <AccordionItem value="identitas">
            <Card className="border-0 shadow-sm">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <CardTitle className="text-lg text-left">Data Identitas Pasangan Usia Subur (PUS)</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="namaIstri">Nama Istri *</Label>
                      <Input
                        id="namaIstri"
                        value={formData.namaIstri}
                        onChange={(e) => handleInputChange('namaIstri', e.target.value)}
                        placeholder="Masukkan nama lengkap istri"
                        className="h-12"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="namaSuami">Nama Suami *</Label>
                      <Input
                        id="namaSuami"
                        value={formData.namaSuami}
                        onChange={(e) => handleInputChange('namaSuami', e.target.value)}
                        placeholder="Masukkan nama lengkap suami"
                        className="h-12"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nikIstri">NIK Istri *</Label>
                      <Input
                        id="nikIstri"
                        value={formData.nikIstri}
                        onChange={(e) => handleInputChange('nikIstri', e.target.value)}
                        placeholder="16 digit NIK istri"
                        className="h-12"
                        maxLength={16}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nikSuami">NIK Suami *</Label>
                      <Input
                        id="nikSuami"
                        value={formData.nikSuami}
                        onChange={(e) => handleInputChange('nikSuami', e.target.value)}
                        placeholder="16 digit NIK suami"
                        className="h-12"
                        maxLength={16}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tanggalLahirIstri">Tanggal Lahir Istri</Label>
                        <Input
                          id="tanggalLahirIstri"
                          type="date"
                          value={formData.tanggalLahirIstri}
                          onChange={(e) => handleInputChange('tanggalLahirIstri', e.target.value)}
                          className="h-12"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tanggalLahirSuami">Tanggal Lahir Suami</Label>
                        <Input
                          id="tanggalLahirSuami"
                          type="date"
                          value={formData.tanggalLahirSuami}
                          onChange={(e) => handleInputChange('tanggalLahirSuami', e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="alamat">Alamat Lengkap</Label>
                      <Input
                        id="alamat"
                        value={formData.alamat}
                        onChange={(e) => handleInputChange('alamat', e.target.value)}
                        placeholder="Alamat lengkap termasuk RT/RW"
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nomorTelepon">Nomor Telepon</Label>
                      <Input
                        id="nomorTelepon"
                        type="tel"
                        value={formData.nomorTelepon}
                        onChange={(e) => handleInputChange('nomorTelepon', e.target.value)}
                        placeholder="Contoh: 08123456789"
                        className="h-12"
                      />
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Data Keluarga */}
          <AccordionItem value="keluarga">
            <Card className="border-0 shadow-sm">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <CardTitle className="text-lg text-left">Data Keluarga</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Status Keluarga</Label>
                    <Select value={formData.statusKeluarga} onValueChange={(value) => handleInputChange('statusKeluarga', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih status keluarga" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusKeluargaOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="jumlahAnakHidup">Jumlah Anak Hidup</Label>
                      <Input
                        id="jumlahAnakHidup"
                        type="number"
                        min="0"
                        value={formData.jumlahAnakHidup}
                        onChange={(e) => handleInputChange('jumlahAnakHidup', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jumlahAnakBawaan">Anak Bawaan</Label>
                      <Input
                        id="jumlahAnakBawaan"
                        type="number"
                        min="0"
                        value={formData.jumlahAnakBawaan}
                        onChange={(e) => handleInputChange('jumlahAnakBawaan', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jumlahAnakSekolah">Anak Sekolah</Label>
                      <Input
                        id="jumlahAnakSekolah"
                        type="number"
                        min="0"
                        value={formData.jumlahAnakSekolah}
                        onChange={(e) => handleInputChange('jumlahAnakSekolah', e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Data Metode Kontrasepsi */}
          <AccordionItem value="kontrasepsi">
            <Card className="border-0 shadow-sm">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <CardTitle className="text-lg text-left">Data Metode Kontrasepsi</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Metode Kontrasepsi yang Digunakan</Label>
                    <RadioGroup
                      value={formData.metodeKontrasepsi}
                      onValueChange={(value) => handleInputChange('metodeKontrasepsi', value)}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      {kontrasepsiOptions.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="text-sm">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="tanggalPemasangan">Tanggal Pemasangan/Penggunaan</Label>
                    <Input
                      id="tanggalPemasangan"
                      type="date"
                      value={formData.tanggalPemasangan}
                      onChange={(e) => handleInputChange('tanggalPemasangan', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Label>Tempat Pelayanan</Label>
                    <Select value={formData.tempatPelayanan} onValueChange={(value) => handleInputChange('tempatPelayanan', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih tempat pelayanan" />
                      </SelectTrigger>
                      <SelectContent>
                        {tempatPelayananOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Riwayat dan Rencana Kunjungan */}
          <AccordionItem value="kunjungan">
            <Card className="border-0 shadow-sm">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <CardTitle className="text-lg text-left">Riwayat dan Rencana Kunjungan</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tanggalKunjungan">Tanggal Kunjungan</Label>
                    <Input
                      id="tanggalKunjungan"
                      type="date"
                      value={formData.tanggalKunjungan}
                      onChange={(e) => handleInputChange('tanggalKunjungan', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tanggalKunjunganKembali">Tanggal Kunjungan Kembali</Label>
                    <Input
                      id="tanggalKunjunganKembali"
                      type="date"
                      value={formData.tanggalKunjunganKembali}
                      onChange={(e) => handleInputChange('tanggalKunjunganKembali', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

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
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}