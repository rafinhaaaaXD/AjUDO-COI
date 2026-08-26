"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function EsqueceuSenhaPage() {
  // Controle de qual etapa do formulário estamos mostrando (1, 2 ou 3)
  const [etapa, setEtapa] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-[#1a252f]">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a252f]">AjUDO</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Recuperação de Acesso</p>
        </div>

        {/* ETAPA 1: SOLICITAR O E-MAIL */}
        {etapa === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Digite seu e-mail corporativo. Enviaremos um código de 6 dígitos para você redefinir sua senha.
            </p>
            <div>
              <label className="block text-sm font-bold text-[#2c3e50]">E-mail Corporativo</label>
              <input 
                type="email" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
                placeholder="usuario@udo.gov.br"
              />
            </div>
            <button 
              onClick={() => setEtapa(2)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#3498db] hover:bg-[#2980b9] transition-colors mt-6"
            >
              Enviar Código
            </button>
          </div>
        )}

        {/* ETAPA 2: DIGITAR CÓDIGO E NOVA SENHA */}
        {etapa === 2 && (
          <div className="space-y-4">
            <div className="bg-green-50 text-green-700 p-3 rounded text-sm mb-4 border border-green-200">
              Código enviado com sucesso! Verifique sua caixa de entrada.
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2c3e50]">Código de Confirmação (6 dígitos)</label>
              <input 
                type="text" 
                maxLength={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center tracking-widest text-lg focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
                placeholder="000000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2c3e50] mt-4">Nova Senha</label>
              <input 
                type="password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
                placeholder="••••••••"
              />
            </div>
            <button 
              onClick={() => setEtapa(3)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#1a252f] hover:bg-[#2c3e50] transition-colors mt-6"
            >
              Redefinir Senha
            </button>
          </div>
        )}

        {/* ETAPA 3: SUCESSO E VOLTA PRO LOGIN */}
        {etapa === 3 && (
          <div className="space-y-4 text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-[#2c3e50]">Senha alterada!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Sua senha foi redefinida com sucesso. Você já pode acessar o sistema novamente.
            </p>
            <Link 
              href="/login" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#3498db] hover:bg-[#2980b9] transition-colors"
            >
              Ir para o Login
            </Link>
          </div>
        )}

        {/* BOTÃO DE VOLTAR (Só aparece na Etapa 1 ou 2) */}
        {etapa !== 3 && (
          <div className="text-center mt-6">
            <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-[#3498db] hover:underline">
              Voltar ao Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}