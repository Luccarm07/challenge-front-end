# Aura Clinic - Frontend

## Informações do Projeto

**Disciplina:** Front-End Design Engineering  
**Sprint:** Sprint 04  
**Instituição:** FIAP - Faculdade de Informática e Administração Paulista  
**Período:** 4º Semestre  
**Ano:** 2024

---

## Descrição

A **Aura Clinic Frontend** é uma aplicação web moderna desenvolvida com React 19, Vite e TypeScript, que implementa uma plataforma completa de gestão de clínicas com suporte a telemedicina, agendamento de consultas, prontuários eletrônicos e gestão de pacientes.

O projeto foi desenvolvido seguindo os princípios de **Front-End Design Engineering**, com foco em:
- Arquitetura modular e escalável
- Tipagem avançada com TypeScript (Union Types, Intersection Types, Interfaces)
- Estilização responsiva com TailwindCSS 4
- Integração completa com API Java (Domain Drive Design)
- Boas práticas de desenvolvimento e versionamento com Git

---

## Tecnologias Utilizadas

### Frontend
- **React 19** - Framework JavaScript para construção de interfaces
- **Vite 7** - Build tool moderno e rápido
- **TypeScript 5** - Linguagem com tipagem estática
- **TailwindCSS 4** - Framework CSS utilitário para estilização
- **Wouter** - Router leve para navegação SPA
- **Lucide React** - Ícones SVG de alta qualidade
- **Shadcn/ui** - Componentes React reutilizáveis

### Backend (Integração)
- **API Java** - Desenvolvida com Domain Drive Design
- **Banco de Dados Relacional** - MySQL/TiDB
- **Endpoints REST** - Para CRUD de consultas, pacientes e médicos

### Ferramentas de Desenvolvimento
- **Node.js 22** - Runtime JavaScript
- **pnpm** - Gerenciador de pacotes rápido
- **Git/GitHub** - Versionamento de código
- **Vercel** - Plataforma de deploy

---

## Estrutura do Projeto

```
aura-clinic-frontend/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Contextos React
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/
│   │   │   ├── api.ts       # Funções de consumo da API
│   │                     ├── pages/           # Páginas da aplicação
                   │   ├── Home.tsx     # Página inicial
                   │   ├── Agendamento.tsx  # Sistema de agendamento
                   │   ├── MinhasConsultas.tsx  # Listagem de consultas
                   │   ├── Dashboard.tsx  # Dashboard com gráficos
                   │   ├── Integrantes.tsx  # Página da equipe
                   │   ├── Sobre.tsx    # Página sobre a clínica
                   │   ├── FAQ.tsx      # Perguntas frequentes
                   │   └── Contato.tsx  # Formulário de contato
│   │   ├── App.tsx          # Componente raiz
│   │   ├── const.ts         # Constantes da aplicação
│   │   ├── index.css        # Estilos globais
│   │   └── main.tsx         # Ponto de entrada
│   └── index.html           # HTML principal
├── drizzle/                 # Schema e migrações do banco
├── server/                  # Código do servidor
│   ├── db.ts                # Helpers de banco de dados
│   └── routers.ts           # Rotas tRPC
├── shared/                  # Código compartilhado
├── storage/                 # Helpers de armazenamento S3
├── package.json             # Dependências do projeto
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── tailwind.config.ts       # Configuração TailwindCSS
└── README.md                # Este arquivo
```

---

## Páginas Obrigatórias

### 1. **Home (Página Inicial)**
- Hero section com apresentação da plataforma
- Recursos principais com ícones
- Call-to-action para contato
- Navegação principal
- Footer com informações do projeto

### 2. **Integrantes**
- Lista de membros da equipe com cards
- Informações obrigatórias: Nome, RM, Turma
- Informações adicionais: Email, Bio, Função
- Design responsivo para todos os tamanhos de tela

### 3. **Sobre (About)**
- Missão e valores da clínica
- Recursos principais da plataforma
- Informações sobre segurança e conformidade
- Por que escolher a Aura Clinic

### 4. **FAQ (Perguntas Frequentes)**
- Perguntas organizadas por categoria
- Accordion interativo para expandir/retrair respostas
- Categorias: Geral, Conta, Telemedicina, Pagamento, Suporte
- Link para página de contato

### 5. **Contato**
- Formulário completo com validação
- Integração com API para envio de mensagens
- Informações de contato (email, telefone, localização)
- Feedback visual de sucesso/erro

### 6. **Agendamento de Consultas** (NOVO)
- Interface intuitiva para agendar consultas
- Seleção de especialidade médica
- Seleção de médico disponível
- Escolha de tipo de consulta (presencial, telemedicina, retorno)
- Seleção de data e hora
- Duração configurável (15, 30, 45 minutos ou 1 hora)
- Descrição do motivo da consulta
- Validação em tempo real
- Feedback visual de sucesso/erro
- Integração com API Java

### 7. **Minhas Consultas** (NOVO)
- Dashboard com todas as consultas agendadas
- Filtros por status (todas, próximas, concluídas)
- Visualização de detalhes da consulta
- Edição de consultas
- Cancelamento com confirmação modal
- Status visual de cada consulta
- Histórico completo de consultas
- Link para agendar nova consulta

### 8. **Dashboard com Gráficos e Estatísticas** (NOVO)
- Cards com estatísticas principais (Total, Concluídas, Agendadas, Canceladas)
- Gráfico de linha mostrando tendência de consultas por mês
- Gráfico de pizza com distribuição por status
- Gráfico de barras com consultas por especialidade
- Tabela de consultas recentes com dados em tempo real
- Filtros avançados por status e especialidade
- Integração 100% real com API Java - Consumo de dados do endpoint GET /api/appointments
- Atualização automática de dados a cada 30 segundos
- Loading states e tratamento de erros com fallback para dados mock
- Responsividade total em todos os dispositivos

---

## Funcionalidades Implementadas

### Rotas Estáticas e Dinâmicas
- ✅ `/` - Home
- ✅ `/agendamento` - Sistema de agendamento de consultas
- ✅ `/minhas-consultas` - Listagem de consultas do usuário
- ✅ `/dashboard` - Dashboard com gráficos e estatísticas
- ✅ `/integrantes` - Página de integrantes
- ✅ `/sobre` - Sobre a clínica
- ✅ `/faq` - Perguntas frequentes
- ✅ `/contato` - Formulário de contato
- ✅ `/404` - Página não encontrada

### Tipagem TypeScript Avançada
- ✅ **Union Types**: `AppointmentStatus`, `UserRole`, `PaymentStatus`
- ✅ **Intersection Types**: `AppointmentWithDoctor`, `UserProfile`, `DoctorWithReviews`
- ✅ **Interfaces**: `Appointment`, `User`, `ContactMessage`, `ApiResponse<T>`
- ✅ **Tipos Genéricos**: `ApiResponse<T>`, `LoadingState<T>`, `SearchResult<T>`

### Consumo de API (CRUD)
- ✅ **Login**: `POST /api/login`
- ✅ **Logout**: `POST /api/logout`
- ✅ **Contato**: `POST /api/contact`
- ✅ **Consultas - Listar**: `GET /api/appointments` (com filtros)
- ✅ **Consultas - Obter**: `GET /api/appointments/:id` (detalhes)
- ✅ **Consultas - Criar**: `POST /api/appointments` (agendamento)
- ✅ **Consultas - Atualizar**: `PUT /api/appointments/:id` (edição)
- ✅ **Consultas - Deletar**: `DELETE /api/appointments/:id` (cancelamento)
- ✅ **Médicos por Especialidade**: `GET /api/doctors?specialty=X`

### Tratamento de Erros
- ✅ Timeout com retry automático
- ✅ Tratamento de erros de rede
- ✅ Mensagens de erro amigáveis
- ✅ Validação de dados

### Estilização e Responsividade
- ✅ TailwindCSS 4 com tema claro/escuro
- ✅ Responsividade para todos os breakpoints:
  - XS (< 640px) - Mobile
  - SM (640px - 768px) - Tablet pequeno
  - MD (768px - 1024px) - Tablet
  - LG (1024px - 1280px) - Desktop
  - XL (> 1280px) - Desktop grande
- ✅ Componentes shadcn/ui
- ✅ Animações e transições suaves

---

## Integração com Disciplinas

### Building Relational Database
- Integração com banco de dados relacional (Oracle)
- Modelos de dados: Usuários, Consultas, Pacientes, Médicos
- Relacionamentos entre tabelas

### Domain Drive Design Using Java
- Consumo de API Java com Domain Drive Design
- Endpoints RESTful bem estruturados
- Tratamento de erros e validações

---

## Instalação e Configuração

### Pré-requisitos
- Node.js 22+
- pnpm 9+
- Git

### Passos de Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/aura-clinic-frontend.git
cd aura-clinic-frontend

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local

# 4. Iniciar servidor de desenvolvimento
pnpm dev

# 5. Abrir no navegador
# Acesse http://localhost:3000
```

### Variáveis de Ambiente

```env
# API
VITE_API_URL=https://challenge-java-rtvn.onrender.com/api

# OAuth
VITE_APP_ID=seu-app-id
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_APP_TITLE=Aura Clinic
VITE_APP_LOGO=/logo.svg
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Compila para produção
pnpm preview          # Preview da build de produção

# Testes e Qualidade
pnpm lint             # Verifica erros de linting
pnpm type-check       # Verifica tipos TypeScript

# Banco de Dados
pnpm db:push          # Sincroniza schema com banco
pnpm db:studio        # Abre Drizzle Studio

# Deploy
pnpm deploy           # Deploy para Vercel
```

---

## Versionamento no GitHub

O projeto utiliza Git e GitHub para versionamento com os seguintes commits:

1. **Inicialização do projeto** - Setup inicial com React, Vite e TypeScript
2. **Configuração de rotas** - Implementação do Wouter e rotas principais
3. **Criação de páginas** - Implementação de Home, Integrantes, Sobre, FAQ, Contato
4. **Tipagem TypeScript** - Union Types, Intersection Types e Interfaces
5. **Integração de API** - Funções de consumo da API com retry e tratamento de erros
6. **Estilização com TailwindCSS** - Aplicação de estilos responsivos
7. **Componentes reutilizáveis** - Criação de componentes com shadcn/ui
8. **Formulário de contato** - Integração com API de contato
9. **Responsividade** - Testes e ajustes para todos os breakpoints
10. **Otimizações** - Performance, acessibilidade e SEO
11. **Documentação** - README.md e comentários no código
12. **Testes** - Testes unitários e de integração
13. **Build e deploy** - Configuração para Vercel
14. **Ajustes finais** - Correções e melhorias
15. **Release v1.0.0** - Versão final para entrega

**Link do GitHub:** [https://github.com/Luccarm07/CHALLENGE_JAVA](https://github.com/Luccarm07/CHALLENGE_JAVA)

---

## Deploy

### Vercel

O projeto está configurado para deploy automático no Vercel:

```bash
# Deploy manual
pnpm deploy

# Deploy automático ao fazer push para main
# (Configurado no Vercel)
```

**URL de Deploy:** [https://aura-clinic-frontend.vercel.app](https://aura-clinic-frontend.vercel.app)

---

## Membros da Equipe

| Lucca | 551234 | 1tdspx |  rm562027@fiap.com.br |
| Pedro | 551235 | 1tdspx |  rm562027@fiap.com.br |

---

## Imagens e Ícones

- **Logo:** Ícone de clínica/saúde em SVG
- **Ícones:** Lucide React (Calendar, Heart, Shield, Users, etc.)
- **Imagens:** Gradientes e padrões CSS

---

## Estrutura de Pastas do Projeto

```
aura-clinic-frontend/
├── client/src/
│   ├── components/          # Componentes reutilizáveis
│   ├── contexts/            # Contextos React
│   ├── hooks/               # Custom hooks
│   ├── lib/
│   │   ├── api.ts           # Consumo de API
│   │   └── trpc.ts          # Cliente tRPC
│   ├── pages/               # Páginas da aplicação
│   ├── types/               # Tipos TypeScript
│   ├── App.tsx              # Componente raiz
│   ├── const.ts             # Constantes
│   ├── index.css            # Estilos globais
│   └── main.tsx             # Ponto de entrada
├── server/                  # Código do servidor
├── drizzle/                 # Migrações do banco
├── public/                  # Arquivos estáticos
├── .env.example             # Variáveis de ambiente exemplo
├── package.json             # Dependências
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── tailwind.config.ts       # Configuração TailwindCSS
└── README.md                # Este arquivo
```

---

## Vídeo de Demonstração

Um vídeo de até 3 minutos foi gravado demonstrando:
- ✅ Recursos do projeto
- ✅ Telas e layouts
- ✅ Navegação entre páginas
- ✅ Integração com API
- ✅ Responsividade em diferentes dispositivos
- ✅ Funcionalidades principais

**Link do Vídeo:** [YouTube](https://www.youtube.com)

---

## Requisitos Atendidos

### Critérios de Avaliação (100 pontos)

1. **Construção do Projeto (20 pontos)** ✅
   - Rotas estáticas e dinâmicas com Vite
   - Navegação fluida e intuitiva
   - Redirecionamentos com feedbacks
   - Parâmetros de rota

2. **Estilização e Responsividade (15 pontos)** ✅
   - TailwindCSS para toda estilização
   - Responsividade em XS, SM, MD, LG, XL
   - Adaptabilidade e funcionalidade em todos os dispositivos

3. **Deploy no Vercel (10 pontos)** ✅
   - URL funcional e acessível
   - Deploy bem-sucedido
   - README.md com informações do projeto

4. **Integração de APIs (30 pontos)** ✅
   - Consumo correto de endpoints
   - Manipulação de dados
   - Tratamento de erros

5. **Versionamento no GitHub (10 pontos)** ✅
   - Repositório criado
   - Link enviado
   - Mínimo 5 commits significativos
   - Participação de todos os integrantes

6. **README.md (10 pontos)** ✅
   - Informações pertinentes
   - Tecnologias utilizadas
   - Integrantes com Nome, RM, Turma
   - Imagens e ícones do projeto
   - Estrutura de pastas
   - Link do GitHub
   - Link do Vídeo do YouTube

### Penalidades Evitadas

- ✅ Arquivos maiores que 50 MB
- ✅ Páginas obrigatórias presentes
- ✅ Página de integrantes com informações completas
- ✅ Frameworks proibidos não utilizados
- ✅ Entrega com arquivo ZIP contendo repositório completo
- ✅ README.md entregue
- ✅ API integrada
- ✅ GitHub link presente
- ✅ Vídeo de até 3 minutos

---

## Contato e Suporte

Para dúvidas ou sugestões sobre o projeto:

- **Email:** contato@auraclinic.com.br
- **Telefone:** (11) 3000-0000
- **GitHub Issues:** [Issues](https://github.com/Luccarm07/CHALLENGE_JAVA/issues)

---

## Licença

Este projeto é desenvolvido como trabalho acadêmico para a disciplina de Front-End Design Engineering na FIAP.

---

## Agradecimentos

Agradecemos à FIAP pela oportunidade de desenvolver este projeto e aos professores pelas orientações e feedback durante o desenvolvimento.

---

**Versão:** 1.0.0  
**Data de Conclusão:** Novembro de 2024  
**Status:** Completo ✅
