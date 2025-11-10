# Aura Clinic Frontend - TODO

## Requisitos do Projeto (Sprint 04)

### Estrutura e Framework
- [ ] Configurar React + Vite + TypeScript com estrutura modular
- [ ] Implementar TailwindCSS para estilização (sem frameworks externos)
- [ ] Configurar sistema de rotas com passagem de parâmetros

### Páginas Obrigatórias
- [x] Criar página Home/Index (Página Inicial)
- [x] Criar página Integrantes (com Nome, RM, Turma)
- [x] Criar página Sobre/About
- [x] Criar página FAQ ou Contato

### Funcionalidades Técnicas
- [x] Implementar tipagem avançada com TypeScript (UnionTypes, Intersection, Interfaces)
- [ ] Consumir API Java (CRUD: GET, POST, PUT, DELETE)
- [ ] Implementar tratamento de erros e respostas inesperadas
- [ ] Manipulação correta dos dados obtidos da API

### Sistema de Agendamento
- [x] Criar página de agendamento de consultas
- [x] Implementar formulário com seleção de médico, data, hora e tipo
- [x] Criar página de listagem de consultas agendadas
- [x] Implementar edição de consultas
- [x] Implementar cancelamento de consultas
- [x] Integrar com endpoints da API (GET, POST, PUT, DELETE)
- [x] Validar dados do formulário
- [x] Implementar feedback visual de sucesso/erro

### Responsividade e Design
- [ ] Garantir responsividade em XS (Extra Small) devices
- [ ] Garantir responsividade em Small devices
- [ ] Garantir responsividade em MEdium devices
- [ ] Garantir responsividade em Large devices
- [ ] Garantir responsividade em XL (Extra Large) devices
- [ ] Implementar design coeso e responsivo em todas as páginas

### Versionamento e Deploy
- [ ] Criar repositório no GitHub
- [ ] Realizar mínimo de 5 commits por aluno
- [ ] Total mínimo de 15 commits no projeto
- [ ] Deploy do projeto na plataforma Vercel
- [ ] Criar arquivo README.md com todas as informações obrigatórias

### Documentação
- [ ] README.md com tecnologias utilizadas
- [ ] README.md com lista de integrantes
- [ ] README.md com imagens relacionadas ao projeto
- [ ] README.md com ícones relacionados ao projeto
- [ ] README.md com estrutura de pastas do projeto
- [ ] README.md com link do GitHub
- [ ] README.md com link do vídeo no YouTube

### Artefatos de Entrega
- [ ] Gravar vídeo de até 3 minutos apresentando o projeto
- [ ] Hospedar vídeo no YouTube
- [ ] Preparar arquivo ZIP com toda a solução (com versionamento, sem node_modules)
- [ ] Verificar que o arquivo ZIP não ultrapassa 50 MB

## Penalidades a Evitar
- [ ] Não usar frameworks/CDNs externos (AXIOS, CAROUSEL, ACCORDION, Bootstrap, etc.)
- [ ] Não deixar de entregar arquivo ZIP (não apenas link)
- [ ] Não deixar de incluir link do GitHub no README.md
- [ ] Não deixar de criar arquivo README.md
- [ ] Não deixar de incluir página de identificação dos integrantes
- [ ] Não deixar de incluir todos os itens na página de integrantes (Nome, RM, Turma)
- [ ] Não deixar de entregar a API (deve estar hospedada remotamente)
- [ ] Não deixar de incluir todas as páginas obrigatórias

## Progresso

### Fase 1: Inicialização e Configuração
- [x] Inicializar projeto com webdev_init_project
- [ ] Analisar API Java fornecida
- [ ] Definir estrutura de dados e endpoints

### Fase 2: Desenvolvimento de Componentes e Páginas
- [ ] Criar componentes base e layout
- [ ] Implementar página Home
- [ ] Implementar página Integrantes
- [ ] Implementar página Sobre/About
- [ ] Implementar página FAQ/Contato

### Fase 3: Funcionalidades e Integração
- [ ] Implementar consumo da API
- [ ] Implementar tratamento de erros
- [ ] Implementar tipagem TypeScript avançada

### Fase 4: Estilização e Responsividade
- [ ] Aplicar estilos com TailwindCSS
- [ ] Testar responsividade em todos os breakpoints

### Fase 5: Versionamento e Deploy
- [ ] Configurar GitHub
- [ ] Realizar commits
- [ ] Deploy no Vercel

### Fase 6: Documentação e Entrega
- [ ] Criar README.md completo
- [ ] Gravar vídeo de apresentação
- [ ] Preparar arquivo ZIP para entrega

### Dashboard com Gráficos e Estatísticas
- [x] Instalar biblioteca Recharts para gráficos
- [x] Criar página Dashboard.tsx
- [x] Implementar cards de estatísticas (total, concluídas, canceladas, próximas)
- [x] Implementar gráfico de linha (consultas por mês)
- [x] Implementar gráfico de pizza (distribuição por status)
- [x] Implementar gráfico de barras (especialidades mais agendadas)
- [x] Criar tabela de consultas recentes
- [x] Implementar filtros avançados (período, especialidade, status)
- [x] Integrar com API Java para dados reais
- [x] Garantir responsividade em todos os breakpoints
- [x] Adicionar link no menu de navegação

### Integração com API Java (PRIORIDADE ALTA)
- [ ] Integrar Dashboard com endpoint GET /api/appointments
- [ ] Sincronizar dados reais de agendamentos no Dashboard
- [ ] Atualizar gráficos com dados reais da API
- [ ] Implementar consumo de API no Agendamento.tsx
- [ ] Implementar consumo de API em MinhasConsultas.tsx
- [ ] Tratamento de erros e loading states
- [ ] Cache de dados com React Query ou SWR
- [ ] Refresh automático de dados a cada 30 segundos
- [ ] Validação de dados da API
