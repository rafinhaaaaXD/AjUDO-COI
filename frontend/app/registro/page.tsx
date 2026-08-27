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

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("As senhas não conferem. Tente novamente!");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      alert("Erro ao criar conta: " + error.message);
      setLoading(false);
      return;
    }

    alert("Conta criada com sucesso! Faça login para entrar.");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a252f] p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image src="/ajUDO-logotipo.svg" alt="Logo AjUDO" width={80} height={80} className="object-contain rounded-lg" />
          <h2 className="text-2xl font-bold text-white">Criar Conta no AjUDO</h2>
        </div>
        
        <form onSubmit={handleRegistro} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Nome Completo</Label>
            <Input id="name" type="text" required className="border-slate-300 bg-white text-black placeholder:text-slate-400" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">E-mail Corporativo</Label>
            <Input id="email" type="email" required className="border-slate-300 bg-white text-black placeholder:text-slate-400" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Senha</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} required className="border-slate-300 bg-white text-black placeholder:text-slate-400 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">Confirmar Senha</Label>
            <div className="relative">
              <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required className="border-slate-300 bg-white text-black placeholder:text-slate-400 pr-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-[#ffcc00] text-[#003366] hover:bg-[#e6b800] font-bold" disabled={loading}>
            {loading ? "Criando Conta..." : "Registrar"}
          </Button>
        </form>
        
        <div className="text-center text-sm text-slate-400">
          Já tem uma conta? <Link href="/login" className="text-[#3498db] hover:underline font-semibold">Faça login</Link>
        </div>
      </div>
    </div>
  );
}