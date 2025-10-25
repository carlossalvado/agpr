import React, { useState, useEffect } from 'react'
import { Appointment } from '../lib/supabase'
import { ApiService } from '../lib/api'

interface AppointmentsListProps {
  onEditAppointment: (appointment: Appointment) => void
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ onEditAppointment }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')

  const apiService = ApiService.getInstance()

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await apiService.getAppointments()
      setAppointments(data)
    } catch (err) {
      setError('Erro ao carregar agendamentos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true
    return appointment.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadAppointments}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Meus Agendamentos
        </h2>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === status
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {status === 'all' ? 'Todos' :
               status === 'pending' ? 'Pendente' :
               status === 'confirmed' ? 'Confirmado' :
               status === 'completed' ? 'Concluído' : 'Cancelado'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-slate-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Nenhum agendamento encontrado
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Seus agendamentos aparecerão aqui quando houver algum marcado
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="card p-6 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                    {appointment.customer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      {appointment.customer_name}
                    </h3>
                    <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center">
                        📞 {appointment.customer_phone}
                      </span>
                      <span className="flex items-center">
                        📅 {formatDate(appointment.appointment_date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'pending' ? 'Pendente' :
                     appointment.status === 'confirmed' ? 'Confirmado' :
                     appointment.status === 'completed' ? 'Concluído' : 'Cancelado'}
                  </span>
                  <button
                    onClick={() => onEditAppointment(appointment)}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Editar
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {appointment.services && appointment.services.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <strong className="text-slate-900 dark:text-slate-100">Serviços:</strong> {appointment.services.map(s => s.name).join(', ')}
                        </p>
                      </div>
                    )}
                    {appointment.notes && (
                      <div className="mb-3">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          <strong className="text-slate-900 dark:text-slate-100">Observações:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      R$ {appointment.total_price?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AppointmentsList