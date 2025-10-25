import React, { useState, useEffect } from 'react'
import { Commission } from '../lib/supabase'
import { ApiService } from '../lib/api'

const Commissions: React.FC = () => {
  const [commission, setCommission] = useState<Commission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const apiService = ApiService.getInstance()

  useEffect(() => {
    loadCommissions()
  }, [])

  const loadCommissions = async () => {
    try {
      setLoading(true)
      const data = await apiService.getCommissions()
      setCommission(data)
    } catch (err) {
      setError('Erro ao carregar dados de comissão')
      console.error(err)
    } finally {
      setLoading(false)
    }
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
          onClick={loadCommissions}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (!commission) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum dado de comissão disponível</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Relatório de Comissões
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Acompanhe sua performance e ganhos
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card metric-card text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl">📊</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Total de Atendimentos
              </h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {commission.total_appointments}
              </p>
            </div>

            <div className="card metric-card text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 text-xl">💰</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Receita Total
              </h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                R$ {commission.total_revenue.toFixed(2)}
              </p>
            </div>

            <div className="card metric-card text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 text-xl">📈</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Taxa de Comissão
              </h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {(commission.commission_rate * 100).toFixed(1)}%
              </p>
            </div>

            <div className="card metric-card text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 dark:text-yellow-400 text-xl">💎</span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Comissão Total
              </h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                R$ {commission.commission_amount.toFixed(2)}
              </p>
            </div>
          </div>

        <div className="mt-8 card p-6">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 text-center">
            Detalhes do Cálculo
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 dark:text-blue-400 text-sm">✅</span>
              </div>
              <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Status Considerado</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Apenas agendamentos com status "Concluído" são considerados no cálculo
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 dark:text-green-400 text-sm">💰</span>
              </div>
              <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Base de Cálculo</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Comissão calculada sobre o valor total dos serviços realizados
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 dark:text-purple-400 text-sm">📊</span>
              </div>
              <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Taxa Atual</h5>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {(commission.commission_rate * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commissions