/**
 * Configuração e funções para consumo da API
 * Implementa CRUD completo com tratamento de erros e retry
 */

import type {
  LoginCredentials,
  AuthResponse,
  ContactMessage,
  ApiResponse,
  Appointment,
  CreateAppointmentRequest,
  ApiError,
} from "@/types";
import { API_BASE_URL, API_TIMEOUT, API_RETRY_ATTEMPTS, API_RETRY_DELAY } from "@/const";

// ============================================================================
// TIPOS INTERNOS
// ============================================================================

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Função auxiliar para fazer requisições HTTP com timeout e retry
 */
async function fetchWithTimeoutAndRetry(
  url: string,
  options: FetchOptions = {},
  attempt: number = 1
): Promise<Response> {
  const { timeout = API_TIMEOUT, retries = API_RETRY_ATTEMPTS, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Se a resposta não for ok e tivermos tentativas restantes, fazer retry
    if (!response.ok && attempt < retries && response.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, API_RETRY_DELAY * attempt));
      return fetchWithTimeoutAndRetry(url, options, attempt + 1);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Se for erro de timeout ou conexão e tivermos tentativas, fazer retry
    if (attempt < retries && (error instanceof TypeError || (error as any)?.name === "AbortError")) {
      await new Promise((resolve) => setTimeout(resolve, API_RETRY_DELAY * attempt));
      return fetchWithTimeoutAndRetry(url, options, attempt + 1);
    }

    throw error;
  }
}

/**
 * Função auxiliar para tratar erros de API
 */
function handleApiError(error: any): ApiError {
  if ((error as any)?.name === "AbortError") {
    return {
      code: "TIMEOUT",
      message: "Tempo limite de requisição excedido",
      statusCode: 408,
    };
  }

  if (error instanceof TypeError) {
    return {
      code: "NETWORK_ERROR",
      message: "Erro de conexão com o servidor. Verifique sua internet.",
      statusCode: 0,
    };
  }

  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "Erro desconhecido ao processar requisição",
  };
}

/**
 * Função auxiliar para validar resposta JSON
 */
async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Resposta não é JSON válido");
  }

  return response.json() as Promise<T>;
}

// ============================================================================
// API DE AUTENTICAÇÃO
// ============================================================================

export const authApi = {
  /**
   * Realizar login
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 401) {
          return {
            success: false,
            error: "Credenciais inválidas",
            statusCode: 401,
          };
        }

        return {
          success: false,
          error: `Erro na autenticação: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const data = await parseJsonResponse<AuthResponse>(response);

      return {
        success: true,
        data,
        message: "Login realizado com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },

  /**
   * Realizar logout
   */
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.warn("Aviso ao fazer logout na API:", response.statusText);
      }

      return {
        success: true,
        message: "Logout realizado com sucesso",
      };
    } catch (error) {
      // Logout local mesmo se a API falhar
      console.error("Erro ao fazer logout na API:", error);

      return {
        success: true,
        message: "Logout realizado localmente",
      };
    }
  },
};

// ============================================================================
// API DE CONTATO
// ============================================================================

export const contactApi = {
  /**
   * Enviar mensagem de contato
   */
  async sendMessage(message: ContactMessage): Promise<ApiResponse<void>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Erro ao enviar mensagem: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        message: "Mensagem enviada com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },
};

// ============================================================================
// API DE CONSULTAS (CRUD)
// ============================================================================

export const appointmentsApi = {
  /**
   * Listar todas as consultas
   */
  async list(): Promise<ApiResponse<Appointment[]>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Erro ao listar consultas: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const data = await parseJsonResponse<Appointment[]>(response);

      return {
        success: true,
        data,
        message: "Consultas listadas com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },

  /**
   * Obter consulta por ID
   */
  async getById(id: string | number): Promise<ApiResponse<Appointment>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/appointments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: "Consulta não encontrada",
            statusCode: 404,
          };
        }

        return {
          success: false,
          error: `Erro ao obter consulta: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const data = await parseJsonResponse<Appointment>(response);

      return {
        success: true,
        data,
        message: "Consulta obtida com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },

  /**
   * Criar nova consulta (CREATE)
   */
  async create(appointmentData: CreateAppointmentRequest): Promise<ApiResponse<Appointment>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Erro ao criar consulta: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const data = await parseJsonResponse<Appointment>(response);

      return {
        success: true,
        data,
        message: "Consulta agendada com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },

  /**
   * Atualizar consulta (UPDATE)
   */
  async update(id: string | number, appointmentData: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: "Consulta não encontrada",
            statusCode: 404,
          };
        }

        return {
          success: false,
          error: `Erro ao atualizar consulta: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const data = await parseJsonResponse<Appointment>(response);

      return {
        success: true,
        data,
        message: "Consulta atualizada com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },

  /**
   * Deletar consulta (DELETE)
   */
  async delete(id: string | number): Promise<ApiResponse<void>> {
    try {
      const response = await fetchWithTimeoutAndRetry(`${API_BASE_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            error: "Consulta não encontrada",
            statusCode: 404,
          };
        }

        return {
          success: false,
          error: `Erro ao cancelar consulta: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        message: "Consulta cancelada com sucesso",
      };
    } catch (error) {
      const apiError = handleApiError(error);

      return {
        success: false,
        error: apiError.message,
        statusCode: apiError.statusCode,
      };
    }
  },
};

// ============================================================================
// CONFIGURAÇÃO EXPORTADA
// ============================================================================

export const apiConfig = {
  baseUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  retryAttempts: API_RETRY_ATTEMPTS,
  retryDelay: API_RETRY_DELAY,
};
