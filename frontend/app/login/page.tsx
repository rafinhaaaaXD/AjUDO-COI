"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      alert("Erro ao entrar: E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a252f] p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image src="/logo.png" alt="Logo AjUDO" width={80} height={80} className="object-contain rounded-lg" />
          <h2 className="text-2xl font-bold text-white">Entrar no AjUDO</h2>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">E-mail Corporativo</Label>
            <Input id="email" type="email" required className="border-slate-700 bg-slate-800 text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-300">Senha</Label>
              <Link href="/esqueceu-senha" className="text-xs text-[#3498db] hover:underline">Esqueceu a senha?</Link>
            </div>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} required className="border-slate-700 bg-slate-800 text-white pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-[#ffcc00] text-[#003366] hover:bg-[#e6b800] font-bold" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        
        <div className="text-center text-sm text-slate-400">
          Não tem uma conta? <Link href="/registro" className="text-[#3498db] hover:underline font-semibold">Registre-se</Link>
        </div>
      </div>
    </div>
  );
}