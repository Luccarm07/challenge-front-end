import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Stethoscope, Trash2, Edit2, AlertCircle, CheckCircle } from "lucide-react";
import type { Appointment } from "@/types";

/**
 * Página de Minhas Consultas
 * Exibe todas as consultas agendadas do usuário com opções de editar e cancelar
 */
export default function MinhasConsultas() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todas" | "proximas" | "concluidas">("todas");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Simular carregamento de consultas
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dados simulados
        const mockAppointments: Appointment[] = [
          {
            id: 1,
            patientId: "1",
            patientName: "João Silva",
            doctorId: "1",
            doctorName: "Dr. João Silva",
            date: "2024-11-15",
            time: "14:30",
            duration: 30,
            status: "confirmada",
            description: "Consulta de rotina",
          },
          {
            id: 2,
            patientId: "1",
            patientName: "João Silva",
            doctorId: "2",
            doctorName: "Dra. Maria Santos",
            date: "2024-11-20",
            time: "10:00",
            duration: 45,
            status: "agendada",
            description: "Dermatologia - Avaliação de pele",
          },
          {
            id: 3,
            patientId: "1",
            patientName: "João Silva",
            doctorId: "3",
            doctorName: "Dr. Pedro Oliveira",
            date: "2024-10-10",
            time: "15:00",
            duration: 30,
            status: "concluida",
            description: "Consulta de acompanhamento",
          },
        ];

        setAppointments(mockAppointments);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar consultas. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleDelete = async (appointmentId: number | string) => {
    try {
      // Simular delete da API
      setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
      setShowDeleteConfirm(false);
      setSelectedAppointment(null);
    } catch (err) {
      setError("Erro ao cancelar consulta. Tente novamente.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "agendada":
        return "bg-blue-100 text-blue-800";
      case "concluida":
        return "bg-gray-100 text-gray-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmada: "Confirmada",
      agendada: "Agendada",
      concluida: "Concluída",
      cancelada: "Cancelada",
    };
    return labels[status] || status;
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "proximas") {
      return apt.status === "agendada" || apt.status === "confirmada";
    }
    if (filter === "concluidas") {
      return apt.status === "concluida";
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Minhas Consultas</h1>
          <p className="text-gray-600">Visualize e gerencie suas consultas agendadas</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["todas", "proximas", "concluidas"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Mensagens */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Lista de Consultas */}
        {!loading && filteredAppointments.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta encontrada</h3>
            <p className="text-gray-600 mb-6">Você não tem consultas neste filtro</p>
            <a href="/agendamento" className="inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Agendar Nova Consulta
              </Button>
            </a>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Informações Principais */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-600">Especialista em {appointment.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>

                    {/* Detalhes */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time} - {appointment.duration} minutos</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{appointment.patientName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col justify-between">
                    {appointment.description && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Motivo:</span> {appointment.description}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowDeleteConfirm(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Cancelar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal de Confirmação de Cancelamento */}
        {showDeleteConfirm && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Cancelar Consulta?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja cancelar a consulta com {selectedAppointment.doctorName} em{" "}
                {new Date(selectedAppointment.date).toLocaleDateString("pt-BR")} às {selectedAppointment.time}?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Não, Manter
                </button>
                <button
                  onClick={() => handleDelete(selectedAppointment.id)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Sim, Cancelar
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Link para Agendar */}
        {!loading && filteredAppointments.length > 0 && (
          <div className="mt-8 text-center">
            <a href="/agendamento">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Agendar Nova Consulta
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
