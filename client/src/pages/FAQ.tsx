import { useState } from "react";
import { FAQ_ITEMS } from "@/const";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  const categories = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));
  const groupedFaqs = categories.map((category) => ({
    category,
    items: FAQ_ITEMS.filter((item) => item.category === category),
  }));

  const toggleExpand = (id: number | string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-800 dark:to-purple-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-purple-100 text-lg sm:text-xl">
            Encontre respostas para as dúvidas mais comuns sobre a Aura Clinic
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {groupedFaqs.map((group) => (
            <div key={group.category}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {group.category}
              </h2>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 transition-transform ${
                          expandedId === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedId === item.id && (
                      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ainda tem dúvidas?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Se não encontrou a resposta que procurava, entre em contato conosco através da página de contato.
            Nossa equipe está sempre pronta para ajudar!
          </p>
          <a
            href="/contato"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Ir para Contato
          </a>
        </div>
      </div>
    </div>
  );
}
