import { TEAM_MEMBERS } from "@/const";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Briefcase } from "lucide-react";

export default function Integrantes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Nossa Equipe</h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-2xl">
            Conheça os desenvolvedores por trás do projeto Aura SM
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-white">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2 text-sm">
                      <Briefcase className="w-4 h-4" />
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">RM:</span>
                    <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">{member.rm}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Turma:</span>
                    <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">{member.turma}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 sm:p-8">
          
          </div>
        </div>
      </div>
    
  );
}
