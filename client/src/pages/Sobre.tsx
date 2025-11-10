import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Shield, Zap } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Sobre a Aura SM</h1>
          <p className="text-green-100 text-lg sm:text-xl max-w-2xl">
            Transformando o cuidado em saúde através da tecnologia
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Nossa Missão</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
              A Aura SM é uma plataforma inovadora de gestão de clínicas que utiliza as mais modernas
              tecnologias para conectar pacientes e profissionais de saúde de forma segura, eficiente e humanizada.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Nossa missão é democratizar o acesso à saúde de qualidade, oferecendo ferramentas que facilitam
              o agendamento de consultas, telemedicina, gestão de prontuários e comunicação entre pacientes e médicos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Nossos Valores</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Humanidade</strong>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Colocamos o paciente no centro de tudo que fazemos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Segurança</strong>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Protegemos os dados e privacidade de nossos usuários</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Inovação</strong>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Utilizamos tecnologia de ponta para melhorar a experiência</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">Recursos Principais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Telemedicina
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Consultas online seguras e convenientes com médicos especialistas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Sistema intuitivo para agendar consultas com seus médicos preferidos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Prontuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Histórico completo de consultas e tratamentos em um único lugar
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Receitas Digitais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Emissão e gerenciamento seguro de receitas médicas digitais
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Gestão de Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Ferramentas completas para gerenciar informações de pacientes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Segurança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Criptografia de ponta a ponta e conformidade com regulamentações
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Por que escolher a Aura Clinic?</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span>Plataforma 100% responsiva e otimizada para mobile</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span>Interface intuitiva e fácil de usar para todos os públicos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span>Suporte técnico disponível 24/7</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span>Integração com sistemas de pagamento seguros</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span>Conformidade com LGPD e regulamentações de saúde</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
