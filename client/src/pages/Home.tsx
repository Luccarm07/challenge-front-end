import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE, APP_LOGO } from "@/const";
import { Link } from "wouter";
import { ArrowRight, Calendar, Users, Shield, Zap, Heart, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src={APP_LOGO} alt={APP_TITLE} className="w-8 h-8" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">{APP_TITLE}</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/agendamento" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Agendar
              </Link>
              <Link href="/minhas-consultas" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Minhas Consultas
              </Link>
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/integrantes" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Integrantes
              </Link>
              <Link href="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Sobre
              </Link>
              <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/contato" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Transformando a Saúde em Experiência
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                A Aura SM é uma plataforma inovadora que conecta pacientes e profissionais de saúde,
                oferecendo agendamento de consultas, telemedicina e gestão completa de prontuários.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/agendamento">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
                    Agendar Consulta
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-gray-300 dark:border-gray-600">
                    Entre em Contato
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg shadow-2xl p-8 text-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <span>Agendamento Inteligente</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    <span>Conexão com Especialistas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6" />
                    <span>Segurança de Dados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    <span>Tecnologia de Ponta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Recursos Principais
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua saúde e bem-estar em um único lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <CardTitle>Agendamento Fácil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Agende consultas com seus médicos preferidos em poucos cliques, com confirmação instantânea.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400 mb-2" />
                <CardTitle>Telemedicina</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Consulte especialistas online de forma segura e conveniente, de qualquer lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Seus dados são protegidos com criptografia de ponta a ponta e conformidade LGPD.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <CardTitle>Prontuários Digitais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Acesse seu histórico completo de consultas e tratamentos em um único lugar.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                <CardTitle>Suporte 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Nossa equipe está sempre disponível para ajudar com dúvidas e problemas técnicos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-2" />
                <CardTitle>Integração Completa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Integração perfeita com sistemas de pagamento e notificações em tempo real.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Junte-se a milhares de pacientes que já confiam na Aura SM para sua saúde.
          </p>
          <Link href="/contato">
            <Button className="bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors">
              Entre em Contato Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Aura Clinic</h3>
              <p className="text-sm">
                Transformando a saúde através da tecnologia e inovação.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/integrantes" className="hover:text-white transition-colors">Equipe</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                <li><a href="mailto:contato@auraclinic.com.br" className="hover:text-white transition-colors">Email</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Projeto</h4>
              <ul className="space-y-2 text-sm">
                <li>Front-End Design Engineering</li>
                <li>Sprint 04 - FIAP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Aura SM. Todos os direitos reservados.</p>
            <p className="text-xs text-gray-500 mt-2">Projeto desenvolvido com React, Vite, TypeScript e TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
