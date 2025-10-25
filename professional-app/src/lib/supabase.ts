import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nlosdmsqebaczvuklnih.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sb3NkbXNxZWJhY3p2dWtsbmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjA0MjcsImV4cCI6MjA3NjAzNjQyN30.dOTJoYFbQ-yiQ7BXt6YraF_IpYCuUATUfybUwPxYXIc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Professional {
  id: string
  name: string
  specialty: string
  role: string
}

export interface Appointment {
  id: string
  customer_name: string
  customer_phone: string
  appointment_date: string
  status: string
  notes: string
  total_price: number
  services: Array<{
    id: string
    name: string
    price: number
    duration_minutes: number
    used_package_session: boolean
  }>
  created_at: string
  updated_at: string
}

export interface Commission {
  total_appointments: number
  total_revenue: number
  commission_amount: number
  commission_rate: number
}