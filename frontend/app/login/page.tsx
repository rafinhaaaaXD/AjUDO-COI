import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-[#1a252f]">
        
        {/* Cabeçalho com Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a252f]">AjUDO</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Centro de Operações em Informática (COI)</p>
        </div>
        
        {/* Formulário */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#2c3e50]">E-mail Corporativo</label>
            <input 
              type="email" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
              placeholder="usuario@udo.gov.br"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#2c3e50]">Senha</label>
            <input 
              type="password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db]"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Link href="/registro" className="text-sm font-medium text-[#3498db] hover:underline">
              Criar uma conta
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          
          {/* Botão de Acesso (Por enquanto é um link que leva para a tela inicial do chat) */}
          <Link 
            href="/" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#3498db] hover:bg-[#2980b9] transition-colors"
          >
            Acessar
          </Link>
        </form>

      </div>
    </div>
  );
}