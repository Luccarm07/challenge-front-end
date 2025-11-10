import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, AlertCircle, Loader } from 'lucide-react';
import { Link } from 'wouter';
import { appointmentsApi } from '@/lib/api';
import type { Appointment } from '@/types';

// Dados de exemplo - Em produção, viriam da API
const mockAppointments: Appointment[] = [
  { id: 1, patientId: 1, doctorId: 1, date: '2024-11-20', status: 'completed', specialty: 'Cardiologia', doctor: 'Dr. Silva', patient: 'Joao Santos' },
  { id: 2, patientId: 2, doctorId: 2, date: '2024-11-21', status: 'scheduled', specialty: 'Dermatologia', doctor: 'Dra. Maria', patient: 'Ana Costa' },
  { id: 3, patientId: 3, doctorId: 3, date: '2024-11-22', status: 'completed', specialty: 'Oftalmologia', doctor: 'Dr. Pedro', patient: 'Carlos Oliveira' },
  { id: 4, patientId: 4, doctorId: 1, date: '2024-11-23', status: 'cancelled', specialty: 'Cardiologia', doctor: 'Dr. Silva', patient: 'Lucia Ferreira' },
  { id: 5, patientId: 5, doctorId: 4, date: '2024-11-24', status: 'scheduled', specialty: 'Neurologia', doctor: 'Dr. Lucas', patient: 'Roberto Alves' },
  { id: 6, patientId: 6, doctorId: 2, date: '2024-11-25', status: 'completed', specialty: 'Dermatologia', doctor: 'Dra. Maria', patient: 'Fernanda Gomes' },
  { id: 7, patientId: 7, doctorId: 1, date: '2024-11-26', status: 'scheduled', specialty: 'Cardiologia', doctor: 'Dr. Silva', patient: 'Mariana Souza' },
  { id: 8, patientId: 8, doctorId: 3, date: '2024-11-27', status: 'completed', specialty: 'Oftalmologia', doctor: 'Dr. Pedro', patient: 'Ricardo Martins' },
];

// Dados para gráfico de linha (consultas por mês)
const monthlyData = [
  { month: 'Jan', consultas: 45 },
  { month: 'Fev', consultas: 52 },
  { month: 'Mar', consultas: 48 },
  { month: 'Abr', consultas: 61 },
  { month: 'Mai', consultas: 55 },
  { month: 'Jun', consultas: 67 },
  { month: 'Jul', consultas: 72 },
  { month: 'Ago', consultas: 68 },
  { month: 'Set', consultas: 75 },
  { month: 'Out', consultas: 82 },
  { month: 'Nov', consultas: 88 },
];

// Dados para gráfico de pizza (status das consultas)
const statusData = [
  { name: 'Concluídas', value: 45, color: '#10b981' },
  { name: 'Agendadas', value: 30, color: '#3b82f6' },
  { name: 'Canceladas', value: 8, color: '#ef4444' },
  { name: 'Remarcadas', value: 5, color: '#f59e0b' },
];

// Dados para gráfico de barras (especialidades)
const specialtyData = [
  { specialty: 'Cardiologia', total: 35 },
  { specialty: 'Dermatologia', total: 28 },
  { specialty: 'Oftalmologia', total: 22 },
  { specialty: 'Neurologia', total: 18 },
  { specialty: 'Ortopedia', total: 15 },
  { specialty: 'Pediatria', total: 12 },
];

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Carregar dados da API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await appointmentsApi.list();
        if (response.success && response.data) {
          setAppointments(response.data);
          setLastUpdate(new Date());
        } else {
          setError(response.error || 'Erro ao carregar consultas');
          // Usar dados mock como fallback
          setAppointments(mockAppointments);
        }
      } catch (err) {
        console.error('Erro ao buscar consultas:', err);
        setError('Erro ao conectar com o servidor');
        // Usar dados mock como fallback
        setAppointments(mockAppointments);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(fetchAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const total = appointments.length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    const scheduled = appointments.filter(a => a.status === 'scheduled').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;

    return { total, completed, scheduled, cancelled };
  }, [appointments]);

  // Filtrar consultas
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const statusMatch = filterStatus === 'all' || apt.status === filterStatus;
      const specialtyMatch = filterSpecialty === 'all' || apt.specialty === filterSpecialty;
      return statusMatch && specialtyMatch;
    });
  }, [appointments, filterStatus, filterSpecialty]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'scheduled':
        return 'Agendada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard de Consultas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Análise completa de estatísticas e métricas de agendamentos
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </div>
          </div>
          
          {/* Erro ou Loading */}
          {error && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">{error}</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">Exibindo dados em cache. Tente atualizar a página.</p>
              </div>
            </div>
          )}
          
          {loading && appointments.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-600 dark:text-gray-400">Carregando dados...</span>
            </div>
          )}
        </div>

        {/* Estatísticas em Cards */}
        {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Consultas */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Consultas</CardTitle>
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Todas as consultas registradas
              </p>
            </CardContent>
          </Card>

          {/* Consultas Concluídas */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.completed}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {((stats.completed / stats.total) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>

          {/* Consultas Agendadas */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.scheduled}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Próximas consultas
              </p>
            </CardContent>
          </Card>

          {/* Consultas Canceladas */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.cancelled}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {((stats.cancelled / stats.total) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
        </div>
        )}

        {/* Gráficos */}
        {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Linha - Consultas por Mês */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendência de Consultas por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="consultas" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Consultas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza - Status das Consultas */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Barras - Especialidades */}
          <Card>
            <CardHeader>
              <CardTitle>Consultas por Especialidade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={specialtyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        )}

        {/* Filtros e Tabela de Consultas Recentes */}
        {!loading && (
        <Card>
          <CardHeader>
            <CardTitle>Consultas Recentes</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Filtrar por Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos</option>
                  <option value="completed">Concluídas</option>
                  <option value="scheduled">Agendadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Filtrar por Especialidade
                </label>
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Todas</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Dermatologia">Dermatologia</option>
                  <option value="Oftalmologia">Oftalmologia</option>
                  <option value="Neurologia">Neurologia</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Data</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Paciente</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Médico</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Especialidade</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {new Date(apt.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{apt.patient}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{apt.doctor}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{apt.specialty}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                            {getStatusLabel(apt.status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
                        Nenhuma consulta encontrada com os filtros selecionados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Botão de Ação */}
            <div className="mt-6 flex justify-center sm:justify-end">
              <Link href="/agendamento">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Agendar Nova Consulta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}
