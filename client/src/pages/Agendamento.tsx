import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Stethoscope, AlertCircle, CheckCircle } from "lucide-react";
import { MEDICAL_SPECIALTIES } from "@/const";
import type { CreateAppointmentRequest, ApiResponse } from "@/types";

/**
 * Página de Agendamento de Consultas
 * Permite que usuários agendem consultas com médicos
 */
export default function Agendamento() {
  const [formData, setFormData] = useState({
    patientId: "1",
    doctorId: "",
    specialty: "",
    type: "presencial" as const,
    scheduledAt: "",
    duration: 30,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState<Array<{ id: string; name: string; specialty: string }>>([]);

  // Simular carregamento de médicos quando especialidade muda
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specialty = e.target.value;
    setFormData({ ...formData, specialty, doctorId: "" });

    // Simular lista de médicos por especialidade
    const mockDoctors = [
      { id: "1", name: "Dr. João Silva", specialty: "cardiologia" },
      { id: "2", name: "Dra. Maria Santos", specialty: "dermatologia" },
      { id: "3", name: "Dr. Pedro Oliveira", specialty: "pediatria" },
      { id: "4", name: "Dra. Ana Costa", specialty: "psicologia" },
      { id: "5", name: "Dr. Carlos Mendes", specialty: "ortopedia" },
    ];

    setDoctors(mockDoctors.filter((doc) => doc.specialty === specialty));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validações
      if (!formData.specialty) {
        throw new Error("Selecione uma especialidade");
      }
      if (!formData.doctorId) {
        throw new Error("Selecione um médico");
      }
      if (!formData.scheduledAt) {
        throw new Error("Selecione data e hora");
      }

      // Simular envio para API
      const appointmentData: CreateAppointmentRequest = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        specialty: formData.specialty,
        type: formData.type,
        scheduledAt: formData.scheduledAt,
        duration: formData.duration,
        description: formData.description,
      };

      // Aqui seria feito o POST para a API
      console.log("Agendamento enviado:", appointmentData);

      setSuccess(true);
      // Limpar formulário após sucesso
      setTimeout(() => {
        setFormData({
          patientId: "1",
          doctorId: "",
          specialty: "",
          type: "presencial",
          scheduledAt: "",
          duration: 30,
          description: "",
        });
        setDoctors([]);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao agendar consulta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Agendar Consulta</h1>
          <p className="text-gray-600">
            Escolha um especialista e reserve seu horário de atendimento
          </p>
        </div>

        {/* Mensagens de Feedback */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">Consulta agendada com sucesso! Você receberá uma confirmação por email.</p>
          </div>
        )}

        {/* Formulário */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Especialidade */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                <Stethoscope className="w-4 h-4 inline mr-2" />
                Especialidade
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleSpecialtyChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione uma especialidade</option>
                {MEDICAL_SPECIALTIES.map((spec) => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Médico */}
            <div>
              <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Médico
              </label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={doctors.length === 0}
              >
                <option value="">
                  {doctors.length === 0 ? "Selecione uma especialidade primeiro" : "Selecione um médico"}
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Consulta */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["presencial", "telemedicina", "retorno"].map((type) => (
                  <label key={type} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={formData.type === type}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Data e Hora */}
            <div>
              <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Data e Hora
              </label>
              <input
                type="datetime-local"
                id="scheduledAt"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Duração */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duração (minutos)
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={45}>45 minutos</option>
                <option value={60}>1 hora</option>
              </select>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição / Motivo da Consulta
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva o motivo da consulta..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Agendando..." : "Agendar Consulta"}
              </Button>
              <Button
                type="reset"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Limpar
              </Button>
            </div>
          </form>
        </Card>

        {/* Informações Adicionais */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="p-6 bg-blue-50">
            <h3 className="font-semibold text-gray-900 mb-2">Confirmação</h3>
            <p className="text-sm text-gray-600">
              Você receberá uma confirmação por email e SMS com os detalhes da sua consulta.
            </p>
          </Card>
          <Card className="p-6 bg-green-50">
            <h3 className="font-semibold text-gray-900 mb-2">Cancelamento</h3>
            <p className="text-sm text-gray-600">
              Você pode cancelar sua consulta até 24 horas antes do horário agendado.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
