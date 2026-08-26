import Link from 'next/link';

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-[#1a252f]">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a252f]">AjUDO</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Solicitação de Novo Acesso</p>
        </div>
        
        {/* Formulário de Registro */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#2c3e50]">Nome Completo</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2c3e50]">E-mail Corporativo</label>
            <input 
              type="email" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
              placeholder="usuario@udo.gov.br"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2c3e50]">Departamento</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]">
              <option value="">Selecione a unidade...</option>
              <option value="udo">UDO - Desenvolvimento Organizacional</option>
              <option value="coi">COI - Operações em Informática</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#2c3e50]">Senha de Acesso</label>
            <input 
              type="password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
              placeholder="••••••••"
            />
          </div>
          
          {/* Botão de Criar Conta (Simula a criação e volta pro Login) */}
          <Link 
            href="/login" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#1a252f] hover:bg-[#2c3e50] transition-colors mt-6"
          >
            Criar Conta
          </Link>

          {/* Link para voltar caso já tenha conta */}
          <div className="text-center mt-4">
            <Link href="/login" className="text-sm font-medium text-[#3498db] hover:underline">
              Já tenho uma conta. Voltar ao Login.
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}