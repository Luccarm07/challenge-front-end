export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// ============================================================================
// CONFIGURAÇÕES GERAIS
// ============================================================================

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Aura Clinic - Frontend";
export const APP_LOGO = import.meta.env.VITE_APP_LOGO || "/logo.svg";
export const APP_VERSION = "1.0.0";
export const ENVIRONMENT = import.meta.env.MODE as "development" | "staging" | "production";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

// ============================================================================
// CONFIGURAÇÃO DE API
// ============================================================================

export const API_BASE_URL = "https://challenge-java-rtvn.onrender.com/api";
export const API_TIMEOUT = 30000; // 30 segundos
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 segundo

// ============================================================================
// ROTAS DA APLICAÇÃO
// ============================================================================

export const ROUTES = {
  HOME: "/",
  INTEGRANTES: "/integrantes",
  SOBRE: "/sobre",
  FAQ: "/faq",
  CONTATO: "/contato",
  NOT_FOUND: "/404",
} as const;

// ============================================================================
// DADOS DE INTEGRANTES
// ============================================================================

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Lucca Ramos Mussumecci",
    rm: "562027",
    turma: "1TDSPX", 
  },
  {
    id: 2,
    name: "Pedro Peres Benitez",
    rm: "561792",
    turma: "1TDSPX",
  },
  

] as const;

// ============================================================================
// PERGUNTAS FREQUENTES
// ============================================================================

export const FAQ_ITEMS = [
  {
    id: 1,
    category: "Geral",
    question: "O que é a Aura Clinic?",
    answer: "A Aura Clinic é uma plataforma completa de gestão de clínicas que oferece telemedicina, agendamento de consultas, prontuários eletrônicos e gestão de pacientes.",
  },
  {
    id: 2,
    category: "Geral",
    question: "Como faço para criar uma conta?",
    answer: "Você pode criar uma conta clicando no botão 'Cadastro' na página inicial e preenchendo os dados solicitados.",
  },
  {
    id: 3,
    category: "Consultas",
    question: "Como agendar uma consulta?",
    answer: "Para agendar uma consulta, faça login em sua conta, acesse o menu de agendamentos e selecione a data, hora e especialidade desejada.",
  },
  {
    id: 4,
    category: "Consultas",
    question: "Posso cancelar uma consulta agendada?",
    answer: "Sim, você pode cancelar uma consulta agendada através da página de consultas, desde que o cancelamento seja feito com antecedência mínima de 24 horas.",
  },
  {
    id: 5,
    category: "Segurança",
    question: "Meus dados estão seguros?",
    answer: "Sim, utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança para proteger seus dados pessoais e médicos.",
  },
  {
    id: 6,
    category: "Segurança",
    question: "Como faço para recuperar minha senha?",
    answer: "Clique em 'Esqueci minha senha' na página de login e siga as instruções enviadas para seu e-mail registrado.",
  },
] as const;

// ============================================================================
// ESPECIALIDADES MÉDICAS
// ============================================================================

export const MEDICAL_SPECIALTIES = [
  { value: "cardiologia", label: "Cardiologia" },
  { value: "dermatologia", label: "Dermatologia" },
  { value: "pediatria", label: "Pediatria" },
  { value: "psicologia", label: "Psicologia" },
  { value: "ortopedia", label: "Ortopedia" },
  { value: "oftalmologia", label: "Oftalmologia" },
  { value: "neurologia", label: "Neurologia" },
  { value: "gastroenterologia", label: "Gastroenterologia" },
] as const;

// ============================================================================
// STATUS DE CONSULTAS
// ============================================================================

export const APPOINTMENT_STATUSES = {
  AGENDADA: "agendada",
  CONFIRMADA: "confirmada",
  EM_ANDAMENTO: "em_andamento",
  CONCLUIDA: "concluida",
  CANCELADA: "cancelada",
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  agendada: "Agendada",
  confirmada: "Confirmada",
  em_andamento: "Em Andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
} as const;

// ============================================================================
// ROLES DE USUÁRIO
// ============================================================================

export const USER_ROLES = {
  PACIENTE: "paciente",
  MEDICO: "medico",
  ADMIN: "admin",
} as const;

export const USER_ROLE_LABELS = {
  paciente: "Paciente",
  medico: "Médico",
  admin: "Administrador",
} as const;

// ============================================================================
// VALIDAÇÕES
// ============================================================================

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\d{2})\s?(\d{4,5})-(\d{4})$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
} as const;

// ============================================================================
// CACHE
// ============================================================================

export const CACHE = {
  USER_CACHE_KEY: "aura_user",
  AUTH_TOKEN_KEY: "aura_auth_token",
  APPOINTMENTS_CACHE_KEY: "aura_appointments",
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
} as const;

// ============================================================================
// LINKS EXTERNOS
// ============================================================================

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/Luccarm07/CHALLENGE_JAVA",
  YOUTUBE: "https://www.youtube.com",
  FIAP: "https://www.fiap.com.br",
} as const;
