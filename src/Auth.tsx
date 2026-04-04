import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, X, Loader2, Play } from 'lucide-react';
import { supabase } from './lib/supabase';

interface AuthProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        // Se precisar de e-mail de confirmação, avise.
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-card w-full max-w-md p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Play className="w-6 h-6 text-white ml-1 fill-current" />
          </div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white mb-2">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua Conta'}
          </h2>
          <p className="text-white/60 text-sm">
            {isLogin
              ? 'Entre para acessar sua área de assinante.'
              : 'Faça parte da melhor plataforma de IPTV.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 flex items-start gap-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1.5 ml-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1.5 ml-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {!loading && (isLogin ? 'Entrar Agora' : 'Criar Conta')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/60">
          {isLogin ? "Ainda não tem conta? " : "Já tem uma conta? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'Registre-se' : 'Faça login'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
