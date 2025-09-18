import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { DataEntryForm } from './components/DataEntryForm';
import { EditParticipantForm } from './components/EditParticipantForm';
import { DataList } from './components/DataList';
import { ParticipantDetail } from './components/ParticipantDetail';
import { VisitForm } from './components/VisitForm';
import { ReportsPage } from './components/ReportsPage';
import { BottomNavigation } from './components/BottomNavigation';
import { Toaster } from './components/ui/sonner';

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

type Page = 'login' | 'dashboard' | 'add-participant' | 'edit-participant' | 'add-visit' | 'data-list' | 'participant-detail' | 'reports';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<{ nik: string; name: string } | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const handleLogin = (credentials: { nik: string; password: string }) => {
    // Simulate authentication
    setUser({ 
      nik: credentials.nik, 
      name: 'Petugas Lapangan' // In real app, this would come from the API
    });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSelectedParticipant(null);
  };

  const handleSaveParticipant = (data: any) => {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      namaIstri: data.namaIstri,
      namaSuami: data.namaSuami,
      nikIstri: data.nikIstri,
      nikSuami: data.nikSuami,
      tanggalLahirIstri: data.tanggalLahirIstri || '',
      tanggalLahirSuami: data.tanggalLahirSuami || '',
      alamat: data.alamat || '',
      nomorTelepon: data.nomorTelepon || '',
      statusKeluarga: data.statusKeluarga || '',
      jumlahAnakHidup: data.jumlahAnakHidup || '0',
      jumlahAnakBawaan: data.jumlahAnakBawaan || '0',
      jumlahAnakSekolah: data.jumlahAnakSekolah || '0',
      metodeKontrasepsi: data.metodeKontrasepsi || '',
      tanggalPemasangan: data.tanggalPemasangan || '',
      tempatPelayanan: data.tempatPelayanan || '',
      tanggalKunjungan: data.tanggalKunjungan || new Date().toISOString().split('T')[0],
      tanggalKunjunganKembali: data.tanggalKunjunganKembali || ''
    };
    
    setParticipants(prev => [...prev, newParticipant]);
    setCurrentPage('dashboard');
  };

  const handleSaveVisit = (visit: Visit) => {
    setVisits(prev => [...prev, visit]);
    setCurrentPage('dashboard');
  };

  const handleEditParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setCurrentPage('edit-participant');
  };

  const handleUpdateParticipant = (updatedData: Participant) => {
    setParticipants(prev => 
      prev.map(p => p.id === updatedData.id ? updatedData : p)
    );
    setCurrentPage('participant-detail');
  };

  const handleDeleteParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  const handleViewParticipant = (participant: Participant) => {
    // Convert basic participant to full participant with all fields
    const fullParticipant: Participant = {
      id: participant.id,
      namaIstri: participant.namaIstri,
      namaSuami: participant.namaSuami,
      nikIstri: participant.id + '001', // Mock NIK
      nikSuami: participant.id + '002', // Mock NIK
      tanggalLahirIstri: '1990-01-01', // Mock data
      tanggalLahirSuami: '1988-01-01', // Mock data
      alamat: participant.alamat,
      nomorTelepon: '08123456789', // Mock data
      statusKeluarga: participant.statusKeluarga,
      jumlahAnakHidup: '2',
      jumlahAnakBawaan: '0',
      jumlahAnakSekolah: '1',
      metodeKontrasepsi: participant.metodeKontrasepsi,
      tanggalPemasangan: '2024-01-01', // Mock data
      tempatPelayanan: 'Puskesmas', // Mock data
      tanggalKunjungan: participant.tanggalKunjungan,
      tanggalKunjunganKembali: '2024-02-15' // Mock data
    };
    
    setSelectedParticipant(fullParticipant);
    setCurrentPage('participant-detail');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      
      case 'dashboard':
        return (
          <Dashboard
            userName={user?.name || 'Petugas'}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      
      case 'add-participant':
        return (
          <DataEntryForm
            onBack={() => setCurrentPage('dashboard')}
            onSave={handleSaveParticipant}
          />
        );
      
      case 'add-visit':
        return (
          <VisitForm
            onBack={() => setCurrentPage('dashboard')}
            onSave={handleSaveVisit}
            participants={participants}
          />
        );
      
      case 'edit-participant':
        return selectedParticipant ? (
          <EditParticipantForm
            participant={selectedParticipant}
            onBack={() => setCurrentPage('participant-detail')}
            onSave={handleUpdateParticipant}
          />
        ) : (
          <div>Error: No participant selected</div>
        );
      
      case 'participant-detail':
        return selectedParticipant ? (
          <ParticipantDetail
            participant={selectedParticipant}
            onBack={() => setCurrentPage('data-list')}
            onEdit={handleEditParticipant}
          />
        ) : (
          <div>Error: No participant selected</div>
        );
      
      case 'data-list':
        return (
          <DataList
            onBack={() => setCurrentPage('dashboard')}
            participants={participants}
            onEdit={handleEditParticipant}
            onDelete={handleDeleteParticipant}
            onView={handleViewParticipant}
          />
        );
      
      case 'reports':
        return (
          <ReportsPage
            onBack={() => setCurrentPage('dashboard')}
            participants={participants}
            visits={visits}
          />
        );
      
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <>
      {renderCurrentPage()}
      {user && currentPage !== 'login' && (
        <BottomNavigation 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
        />
      )}
      <Toaster />
    </>
  );
}