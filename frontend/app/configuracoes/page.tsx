"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ConfiguracoesPage() {
  // Estado para controlar qual aba está ativa na tela
  const [abaAtiva, setAbaAtiva] = useState('perfil');

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex">
      
      {/* Menu Lateral de Configurações */}
      <aside className="w-64 bg-[#1a252f] text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-[#2c3e50]">
          <h2 className="text-2xl font-bold text-center">AjUDO COI</h2>
          <p className="text-xs text-gray-400 text-center mt-1">Configurações do Sistema</p>
        </div>
        
        <nav className="p-4 flex-1 space-y-2 mt-4">
          <button 
            onClick={() => setAbaAtiva('perfil')}
            className={`w-full text-left px-4 py-3 rounded font-medium transition-colors ${abaAtiva === 'perfil' ? 'bg-[#3498db]' : 'hover:bg-[#2c3e50] text-gray-300'}`}
          >
            👤 Meu Perfil
          </button>
          <button 
            onClick={() => setAbaAtiva('preferencias')}
            className={`w-full text-left px-4 py-3 rounded font-medium transition-colors ${abaAtiva === 'preferencias' ? 'bg-[#3498db]' : 'hover:bg-[#2c3e50] text-gray-300'}`}
          >
            🎨 Preferências
          </button>
          <button 
            onClick={() => setAbaAtiva('seguranca')}
            className={`w-full text-left px-4 py-3 rounded font-medium transition-colors ${abaAtiva === 'seguranca' ? 'bg-[#3498db]' : 'hover:bg-[#2c3e50] text-gray-300'}`}
          >
            🔒 Segurança
          </button>
        </nav>
        
        <div className="p-6 border-t border-[#2c3e50]">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            ← Voltar ao Chat
          </Link>
        </div>
      </aside>

      {/* Área Principal - Conteúdo da Aba */}
      <main className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border-t-4 border-[#1a252f] p-8">
          
          {/* CONTEÚDO: PERFIL */}
          {abaAtiva === 'perfil' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] border-b pb-4">Editar Perfil</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-[#3498db] text-white flex items-center justify-center text-3xl font-bold">
                  US
                </div>
                <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm font-medium text-[#2c3e50] hover:bg-gray-200">
                  Alterar Foto
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#2c3e50]">Nome Completo</label>
                  <input type="text" defaultValue="Usuário Sistema" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3498db]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2c3e50]">Departamento</label>
                  <input type="text" defaultValue="COI" disabled className="mt-1 w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded text-gray-500 cursor-not-allowed" />
                </div>
              </div>
              
              <button className="px-6 py-2 bg-[#3498db] text-white font-bold rounded hover:bg-[#2980b9] transition-colors">
                Salvar Alterações
              </button>
            </div>
          )}

          {/* CONTEÚDO: PREFERÊNCIAS */}
          {abaAtiva === 'preferencias' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] border-b pb-4">Preferências do Sistema</h3>
              
              <div>
                <label className="block text-sm font-bold text-[#2c3e50] mb-2">Tema Visual</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tema" defaultChecked className="text-[#3498db]" /> Claro
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tema" className="text-[#3498db]" /> Escuro
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2c3e50] mb-2">Notificações</label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="checkbox" defaultChecked className="rounded text-[#3498db]" /> Receber e-mails de atualização de chamados
                </label>
              </div>

              <button className="px-6 py-2 bg-[#3498db] text-white font-bold rounded hover:bg-[#2980b9] transition-colors">
                Salvar Preferências
              </button>
            </div>
          )}

          {/* CONTEÚDO: SEGURANÇA */}
          {abaAtiva === 'seguranca' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] border-b pb-4">Segurança da Conta</h3>
              
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-bold text-[#2c3e50]">Senha Atual</label>
                  <input type="password" placeholder="••••••••" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3498db]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2c3e50]">Nova Senha</label>
                  <input type="password" placeholder="••••••••" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3498db]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2c3e50]">Confirmar Nova Senha</label>
                  <input type="password" placeholder="••••••••" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-[#3498db]" />
                </div>
              </div>

              <button className="px-6 py-2 bg-[#1a252f] text-white font-bold rounded hover:bg-[#2c3e50] transition-colors mt-2">
                Atualizar Senha
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}