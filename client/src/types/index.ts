/**
 * Tipos TypeScript para a aplicação Aura Clinic Frontend
 * Inclui tipos básicos, Union Types, Intersection Types e Interfaces
 */

// ============================================================================
// TIPOS BÁSICOS
// ============================================================================

export type StringType = string;
export type NumberType = number;
export type BooleanType = boolean;
export type ObjectType = Record<string, any>;

// ============================================================================
// UNION TYPES
// ============================================================================

/**
 * Tipos de usuários disponíveis no sistema
 */
export type UserRole = "paciente" | "medico" | "admin";

/**
 * Status possíveis de uma consulta
 */
export type AppointmentStatus = "agendada" | "confirmada" | "em_andamento" | "concluida" | "cancelada";

/**
 * Tipos de mensagens de resposta da API
 */
export type ApiMessageType = "success" | "error" | "warning" | "info";

/**
 * Tipos de especialidades médicas
 */
export type MedicalSpecialty = "cardiologia" | "dermatologia" | "pediatria" | "psicologia" | "ortopedia" | "oftalmologia" | "neurologia" | "gastroenterologia";

// ============================================================================
// INTERSECTION TYPES
// ============================================================================

/**
 * Usuário com perfil estendido
 */
export type UserProfile = User & {
  address?: string;
  birthDate?: string;
  phone?: string;
  medicalHistory?: string[];
  specialization?: MedicalSpecialty;
};

/**
 * Consulta com informações do médico
 */
export type AppointmentWithDoctor = Appointment & {
  doctorName?: string;
  doctorSpecialty?: MedicalSpecialty;
  doctorEmail?: string;
};

/**
 * Resposta de API com dados genéricos
 */
export type ApiResponseWithMeta<T> = ApiResponse<T> & {
  timestamp?: string;
  requestId?: string;
  version?: string;
};

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Interface para usuário do sistema
 */
export interface User {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface para credenciais de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface para resposta de autenticação
 */
export interface AuthResponse {
  name: string;
  email: string;
  role: UserRole;
  token: string;
  userId: number | string;
}

/**
 * Interface para consulta/agendamento
 */
export interface Appointment {
  id: number | string;
  patientId: number | string;
  patientName?: string;
  patient?: string;
  doctorId: number | string;
  doctorName?: string;
  doctor?: string;
  specialty?: string;
  date: string;
  time?: string;
  duration?: number;
  status: AppointmentStatus | 'scheduled' | 'completed' | 'cancelled';
  description?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface para criar/atualizar consulta
 */
export interface CreateAppointmentRequest {
  patientId: number | string;
  doctorId: number | string;
  specialty?: string;
  type?: "presencial" | "telemedicina" | "retorno";
  date?: string;
  time?: string;
  scheduledAt?: string;
  duration?: number;
  description?: string;
}

/**
 * Interface para mensagem de contato
 */
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/**
 * Interface genérica para resposta de API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

/**
 * Interface para erros de API
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  statusCode?: number;
}

/**
 * Interface para página de integrante
 */
export interface TeamMember {
  id: number | string;
  name: string;
  rm: string;
  turma: string;
  role: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

/**
 * Interface para pergunta frequente
 */
export interface FAQ {
  id: number | string;
  category: string;
  question: string;
  answer: string;
  order?: number;
}

/**
 * Interface para resposta de contato
 */
export interface ContactResponse {
  id: string | number;
  messageId: string;
  status: "enviada" | "lida" | "respondida";
  createdAt: string;
}

/**
 * Tipo para status de pagamento
 */
export type PaymentStatus = "pendente" | "processando" | "concluido" | "falhou" | "reembolsado";

/**
 * Interface para pagamento
 */
export interface Payment {
  id: string | number;
  appointmentId: string | number;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface para médico
 */
export interface Doctor {
  id: string | number;
  name: string;
  email: string;
  specialty: string;
  crm: string;
  avatar?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface para paciente
 */
export interface Patient {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface para contexto de autenticação
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

/**
 * Interface para estado de paginação
 */
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Interface para filtros de consulta
 */
export interface AppointmentFilters {
  status?: AppointmentStatus;
  doctorId?: number | string;
  patientId?: number | string;
  dateFrom?: string;
  dateTo?: string;
  specialty?: MedicalSpecialty;
}

/**
 * Interface para resultado de busca
 */
export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Interface para notificação
 */
export interface Notification {
  id: string;
  type: ApiMessageType;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

/**
 * Interface para configuração da aplicação
 */
export interface AppConfig {
  apiBaseUrl: string;
  appTitle: string;
  appLogo: string;
  appVersion: string;
  environment: "development" | "staging" | "production";
}
