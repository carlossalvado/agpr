import React, { useState } from 'react'
import { AuthService } from '../lib/auth'
import AppointmentsList from './AppointmentsList'
import EditAppointmentModal from './EditAppointmentModal'
import Commissions from './Commissions'
import { Appointment } from '../lib/supabase'
import { useTheme } from '../lib/theme'

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'appointments' | 'commissions'>('appointments')
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const authService = AuthService.getInstance()
  const authState = authService.getAuthState()

  const handleLogout = () => {
    authService.logout()
  }

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAppointment(null)
  }

  const handleSaveAppointment = () => {
    // Refresh the appointments list
    window.location.reload()
  }

  const tabs = [
    { id: 'appointments', name: 'Agendamentos', icon: '📅' },
    { id: 'commissions', name: 'Comissões', icon: '💰' }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="content-container">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Painel do Profissional
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {authState.professional?.name} • {authState.professional?.specialty}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="btn-ghost"
                aria-label="Alternar tema"
              >
                <span className="text-lg">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="content-container mb-8">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`nav-link flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'active'
                  : ''
              }`}
            >
              <span className="mr-3 text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="content-container pb-8">
        <div className="fade-in">
          {activeTab === 'appointments' && (
            <AppointmentsList onEditAppointment={handleEditAppointment} />
          )}

          {activeTab === 'commissions' && (
            <Commissions />
          )}
        </div>
      </main>

      {/* Edit Appointment Modal */}
      <EditAppointmentModal
        appointment={editingAppointment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAppointment}
      />
    </div>
  )
}

export default Dashboard