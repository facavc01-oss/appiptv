/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Auth } from './Auth';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
  Tv,
  Play,
  Smartphone,
  Monitor,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  Users,
  Zap,
  Clock,
  Download,
  Lock,
  Star,
  Menu,
  X,
  Send,
  ArrowRight,
  HelpCircle,
  CreditCard,
  Laptop,
  Gamepad2
} from 'lucide-react';

// --- Components ---

interface NavbarProps {
  session: Session | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ session, onOpenAuth, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Planos', href: '#planos' },
    { name: 'Conteúdos', href: '#conteudos' },
    { name: 'Blog', href: '#blog' },
    { name: 'Revenda', href: '#revenda' },
    { name: 'Dúvidas', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/90 backdrop-blur-lg py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv className="w-8 h-8 text-primary" />
          <span className="font-display text-2xl font-black tracking-tighter text-white">PAJEÚ<span className="text-primary">PLAY</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold text-white hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-4 ml-2 pl-6 border-l border-white/10">
            {session ? (
              <button onClick={onLogout} className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors">
                Sair
              </button>
            ) : (
              <button onClick={onOpenAuth} className="text-sm font-bold text-white hover:text-primary transition-colors flex items-center gap-2">
                <Lock className="w-4 h-4" /> Entrar
              </button>
            )}

            <a href="https://wa.me/5587999648723?text=Olá tenho interesse" target="_blank" rel="noreferrer" className="btn-primary !py-2.5 !px-6 text-sm shadow-[0_0_20px_rgba(255,99,33,0.4)]">
              Assine
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-secondary border-t border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">
                {link.name}
              </a>
            ))}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
              {session ? (
                <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-red-400 hover:text-red-300">
                  Sair da Conta
                </button>
              ) : (
                <button onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-white hover:text-primary flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Entrar na Conta
                </button>
              )}
              <a href="https://wa.me/5587999648723?text=Olá tenho interesse" target="_blank" rel="noreferrer" className="btn-primary text-center">
                Assinar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface PlanCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  whatsappLink: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, period, features, highlight = false, badge = "", whatsappLink }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`glass-card p-8 flex flex-col h-full relative overflow-hidden ${highlight ? 'ring-2 ring-primary' : ''}`}
  >
    {badge && (
      <div className="absolute top-4 right-[-35px] bg-primary text-white text-[10px] font-bold py-1 px-10 rotate-45 shadow-lg">
        {badge}
      </div>
    )}
    <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-3xl font-black text-primary">{price}</span>
      <span className="text-white/60 text-sm ml-1">/ {period}</span>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <a href={whatsappLink} target="_blank" rel="noreferrer" className={`w-full text-center py-3 rounded-xl font-bold transition-all ${highlight ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20'}`}>
      Assinar {title.split(' ')[1] || title}
    </a>
  </motion.div>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  bannerImage?: string;
  content: string;
  link?: string;
}

const BlogCard: React.FC<{ post: BlogPost; onClick: (post: BlogPost) => void }> = ({ post }) => (
  <motion.a
    href={post.link || "https://pajeuplay.blogspot.com/"}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -5 }}
    className="glass-card overflow-hidden cursor-pointer group block"
  >
    <div className="aspect-video overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-6">
      <div className="text-primary text-xs font-bold mb-2 uppercase tracking-widest">{post.date}</div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
      <p className="text-white/50 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
      <div className="flex items-center gap-2 text-primary font-bold text-sm">
        Ler mais no Blog <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </motion.a>
);

// --- Main App ---

export default function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Guia Completo de Qualidade de Vídeo para IPTV",
      excerpt: "Se você quer melhorar sua experiência com IPTV ou streaming, entender a qualidade de streaming é essencial.",
      date: "18 MAR 2026",
      image: "/Qualidade de Streaming.jpg",
      link: "https://pajeuplay.blogspot.com/2026/03/guia-completo-de-qualidade-de-video.html",
      content: `
        <h2 class="text-3xl font-bold mb-4 text-primary">Configuração Rápida e Fácil</h2>
        <p class="mb-4 text-white/80 leading-relaxed">
          Configurar o PAJEÚ PLAY na sua Smart TV é muito simples. A maioria das TVs modernas já possui aplicativos compatíveis na loja oficial.
        </p>
        <img src="/INSTALAÇÃO-IPTV.jpg" class="w-full rounded-xl mb-6" alt="Apps de TV" />
        <h3 class="text-2xl font-bold mb-3">Passo a Passo</h3>
        <ul class="list-disc list-inside mb-4 text-white/80 space-y-2">
          <li>Acesse a loja de aplicativos da sua TV.</li>
          <li>Procure por apps como 'IPTV Smarters' ou 'Smart IPTV'.</li>
          <li>Insira os dados fornecidos pelo nosso suporte.</li>
          <li>Pronto! Agora é só aproveitar.</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "Melhores Apps de IPTV para Roku TV",
      excerpt: "Se você quer transformar sua TV em uma central completa de entretenimento, precisa conhecer os melhores apps de IPTV para Roku TV.",
      date: "16 MAR 2026",
      image: "/IPTV na Roku TV.jpg",
      link: "https://pajeuplay.blogspot.com/2026/03/melhores-apps-de-iptv-para-roku-tv-top.html",
      bannerImage: "/cinema-ler mais.jpg",
      content: `
        <h2 class="text-3xl font-bold mb-4 text-primary">O Cinema na sua Casa</h2>
        <p class="mb-4 text-white/80 leading-relaxed">
      Este mês, reunimos para você os filmes mais aguardados do ano, prontos para transformar sua experiência em casa. Prepare-se para assistir a grandes lançamentos com qualidade 4K impressionante e um som surround imersivo, que colocam você no centro da ação como se estivesse dentro do cinema..
        </p>
        <h3 class="text-2xl font-bold mb-3">Destaques do Mês</h3>
        <p class="mb-4 text-white/80 leading-relaxed">
          Nossa equipe de curadoria trabalha diariamente para garantir que os lançamentos cheguem o mais rápido possível após a saída dos cinemas.
        </p>
      `
    },
    {
      id: 3,
      title: "XCIPTV Player: Como Instalar no Android TV, TV Box e Firestick",
      excerpt: "Se você quer assistir IPTV com qualidade e sem complicação, aprender como instalar o XCIPTV Player é o primeiro passo. E a boa notícia é que o processo é simples.",
      date: "14 MAR 2026",
      image: "/XCIPTV.jpg",
      link: "https://pajeuplay.blogspot.com/2026/03/como-instalar-xciptv-player-no-android.html",
      content: `
        <h2 class="text-3xl font-bold mb-4 text-primary">Estabilidade é Prioridade</h2>
        <p class="mb-4 text-white/80 leading-relaxed">
          Nada pior do que travar na hora do gol. Siga estas dicas para garantir a melhor experiência de streaming.
        </p>
        <img src="https://picsum.photos/seed/router-setup/800/400" class="w-full rounded-xl mb-6" alt="Router" />
        <h3 class="text-2xl font-bold mb-3">Otimização de Rede</h3>
        <p class="mb-4 text-white/80 leading-relaxed">
          Sempre que possível, utilize o cabo de rede (Ethernet) em vez do Wi-Fi. Se precisar usar Wi-Fi, prefira a frequência de 5GHz e mantenha o roteador próximo ao aparelho.
        </p>
      `
    }
  ];
  const plans = [
    {
      title: "Plano Bronze",
      price: "R$ 30,00",
      period: "1 Mês",
      highlight: true,
      features: ["Filmes em Alta", "Séries Populares", "Esportes ao Vivo", "Conteúdo Infantil", "Câmeras 24hrs Reality", "Canais ADULTOS (Opcional)", "Qualidade: SD até 4K"],
      whatsappLink: "https://wa.me/5587999648723?text=Olá quero assinar o plano bronze"
    },
    {
      title: "Plano Prata",
      price: "R$ 27,00",
      period: "3 Meses",
      badge: "POPULAR",
      highlight: true,
      features: ["Filmes em Alta", "Séries Populares", "Esportes ao Vivo", "Conteúdo Infantil", "Câmeras 24hrs Reality", "Canais ADULTOS (Opcional)", "Qualidade: SD até 4K"],
      whatsappLink: "https://wa.me/5587999648723?text=Olá quero assinar o plano prata"
    },
    {
      title: "Plano Ouro",
      price: "R$ 25,00",
      period: "6 Meses",
      highlight: true,
      features: ["Filmes em Alta", "Séries Populares", "Esportes ao Vivo", "Conteúdo Infantil", "Câmeras 24hrs Reality", "Canais ADULTOS (Opcional)", "Qualidade: SD até 4K"],
      whatsappLink: "https://wa.me/5587999648723?text=Olá quero assinar o plano ouro"
    }
  ];

  const contentCategories = [
    {
      title: "Destaques",
      items: ["/Cidade em Chamas.jpeg", "/Guerra Total.jpeg", "/Mundo em Colapso.jpeg", "/O Despertar.jpeg", "/Última Missão.jpeg", "/Velocidade Máxima.jpeg"],
      description: "Os filmes mais assistidos e lançamentos do cinema direto na sua tela."
    },
    {
      title: "Suas Séries Favoritas",
      items: ["/Sombras da Cidade.jpeg", "/CÓDIGO FINAL.jpeg", "/IMPÉRIO OCULTO.jpeg", "/Além do Tempo.jpeg", "/Zona de Perigo.jpeg", "/Segredos da Mente.jpeg"],
      description: "Assista todas as temporadas de suas séries favoritas sem limite de vezes. Sempre atualizadas automaticamente."
    },
    {
      title: "Universo Kids",
      items: ["/Baby Cartoon.jpg", "/Cartoon Planet.jpg", "/Kids FunTv.jpg", "/Kids.jpg", "/Mundo Kids.jpg", "/Toon Time.jpg"],
      description: "Para as crianças, tudo do Universo Kids em um só lugar. Diversão garantida com segurança."
    },
    {
      title: "O Melhor do Futebol",
      items: ["/Canal Basquete.jpg", "/Canal Futebol Americano.jpg", "/Canal Futebol.jpg", "/Canal Lutas (UFC.jpg", "/GOAL TV.jpg", "/SPORT.jpg"],
      description: "Futebol e esportes ao vivo — futebol, NBA, NHL, NFL, lutas e muito mais."
    }
  ];

  const faqs = [
    { question: "Funciona na minha Smart TV?", answer: "Sim! É compatível com praticamente todas as marcas e modelos (Samsung, LG, Android TV, etc)." },
    { question: "Preciso de antena ou instalação?", answer: "Não. Você só precisa de uma conexão estável com a internet." },
    { question: "Como funciona o teste IPTV?", answer: "O IPTV teste é uma avaliação gratuita de 6 horas para você experimentar a estabilidade e qualidade sem compromisso." },
    { question: "O teste IPTV é totalmente gratuito?", answer: "Sim nosso teste é totalmente gratuito e inclui 100% da programação + suporte durante o período." },
    { question: "Em quais aparelhos funciona?", answer: "TV BOX, SMART TV, celulares (Android/iOS), computadores, tablets e notebooks." },
    { question: "Como é feita a instalação?", answer: "Indicamos o melhor aplicativo para seu aparelho, enviamos seus dados de login e você já começa a assistir." }
  ];

  return (
    <div className="min-h-screen">
      <Navbar
        session={session}
        onOpenAuth={() => setShowAuth(true)}
        onLogout={handleLogout}
      />

      <AnimatePresence>
        {showAuth && (
          <Auth
            onClose={() => setShowAuth(false)}
            onSuccess={() => setShowAuth(false)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/4 -z-10 blur-[120px]" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-[45%] text-center lg:text-left"
            >
              <span className="inline-block py-1.5 px-6 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 border border-primary/20 uppercase tracking-widest">
                O MELHOR IPTV DO BRASIL
              </span>
              <h1 className="font-display text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[0.9]">
                TV <br />
                <span className="text-primary">COMPLETA</span> <br />
                <span className="text-primary">NA SUA CASA</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Assista Canais, Filmes e Séries Sem Travar
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#teste" className="btn-primary w-full sm:w-auto flex items-center justify-center text-center">
                  TESTAR IPTV GRÁTIS
                </a>
                <a href="https://wa.me/5587999648723?text=Olá%20vim%20pelo%20site%20PAJEÚ%20PLAY%20e%20quero%20mais%20informações" target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto flex items-center justify-center text-center">
                  FALAR NO WHATSAPP
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:w-[55%] relative"
            >
              <div className="glass-card aspect-video overflow-hidden shadow-2xl shadow-black/50 relative z-10">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80"
                >
                  <source src="/Pajeú Play.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-tighter">Assista Agora</p>
                      <p className="text-[10px] text-white/60 uppercase">4K Ultra HD</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 blur-3xl rounded-full -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Big Brand Text Section */}
      <section className="py-12 bg-white/2 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[10vw] font-black text-center leading-none tracking-tighter text-white uppercase select-none"
          >
            PAJEÚ PLAY <span className="text-primary">IPTV</span>
          </motion.h2>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-primary">Escolha seu Plano</h2>
            <p className="section-subtitle">Temos a opção perfeita para você e sua família. Sem fidelidade e sem taxas de cancelamento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <PlanCard
                key={i}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                highlight={plan.highlight}
                badge={plan.badge}
                whatsappLink={plan.whatsappLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content Catalog */}
      <section id="conteudos" className="py-24 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-primary">O que assistir?</h2>
            <p className="section-subtitle">Explore nosso catálogo imenso com os melhores conteúdos do mundo.</p>
          </div>

          <div className="space-y-20">
            {contentCategories.map((cat, i) => (
              <div key={i}>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight text-primary">{cat.title}</h3>
                    <p className="text-white/50 max-w-xl">{cat.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {cat.items.map((item, j) => {
                    const isLocalImage = item.includes('/');
                    const imgSrc = isLocalImage ? item : `https://picsum.photos/seed/${item}/300/450`;
                    const itemName = isLocalImage ? item.split('/').pop()?.replace(/\.jpe?g/i, '') : item;

                    return (
                      <motion.div
                        key={j}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-[2/3] glass-card overflow-hidden group relative cursor-pointer"
                      >
                        <img
                          src={imgSrc}
                          alt={itemName}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="font-bold text-sm">{itemName}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Test CTA */}
      <section id="teste" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://picsum.photos/seed/cinema/1920/1080?blur=10"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-secondary" />
        </div>

        <div className="container mx-auto px-6">
          <div className="glass-card p-12 md:p-20 text-center max-w-4xl mx-auto border-primary/20 bg-primary/5">
            <Zap className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
            <h2 className="section-title">Teste IPTV Grátis</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Experimente nossa lista por 6 horas totalmente grátis. Avalie a qualidade, estabilidade e todo o catálogo sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://wa.me/5587999648723?text=Olá quero solicitar um teste" target="_blank" rel="noreferrer" className="btn-primary !px-12 flex items-center gap-2">
                Solicitar Teste Agora <MessageCircle className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-5 h-5" />
                <span>Liberação imediata</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reseller Section */}
      <section id="revenda" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Oportunidade de Negócio</span>
              <h2 className="section-title !text-left">Seja um Revendedor de Sucesso!</h2>
              <p className="text-white/60 text-lg mb-10">
                Já considerou a oportunidade de se tornar um revendedor e ampliar sua fonte de renda? Descubra como aproveitar essa excelente oportunidade conosco!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: ShieldCheck, title: "Painel Master", desc: "Controle total dos seus clientes" },
                  { icon: Clock, title: "Créditos não expiram", desc: "Use quando quiser" },
                  { icon: CreditCard, title: "Sem Taxas", desc: "Pague apenas pelos créditos" },
                  { icon: Zap, title: "Suporte 24h", desc: "Estamos aqui para ajudar" },
                  { icon: Monitor, title: "Servidor Atualizado", desc: "Melhor tecnologia do mercado" },
                  { icon: Play, title: "Material de Divulgação", desc: "Tudo pronto para você vender" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg h-fit">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/5587999648723?text=Olá quero ser um revendedor da PAJEÚ PLAY" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
                Quero ser um Revendedor <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative">
              <div className="glass-card p-4 rotate-3">
                <img
                  src="/Seja um Revendedor.jpg"
                  alt="Seja um Revendedor de Sucesso!"
                  className="rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass-card p-6 -rotate-6 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Lucro Garantido</div>
                    <div className="text-xs text-white/40">Baixo investimento</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="section-title">Assista em qualquer lugar</h2>
          <p className="section-subtitle">Nossos aplicativos são compatíveis com todos os seus dispositivos favoritos.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {[
              { icon: Smartphone, name: "Android / iOS" },
              { icon: Tv, name: "Smart TV / TV Box" },
              { icon: Laptop, name: "PC / Notebook" },
              { icon: Gamepad2, name: "Consoles / Fire TV" }
            ].map((app, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="glass-card p-8 flex flex-col items-center gap-4"
              >
                <app.icon className="w-10 h-10 text-primary" />
                <span className="font-bold text-sm">{app.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-primary">Nosso Blog</h2>
            <p className="section-subtitle">Fique por dentro das novidades, tutoriais e dicas sobre o mundo do streaming.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-black/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="section-title">Dúvidas Frequentes</h2>
          </div>
          <div className="glass-card p-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Tv className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-black tracking-tighter text-white">PAJEÚ<span className="text-primary">PLAY</span></span>
            </div>

            <div className="flex gap-8 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Pagamento Seguro</a>
            </div>

            <div className="text-sm text-white/40">
              © 2026 PAJEÚ PLAY. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5587999648723?text=Olá tenho interesse"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        <MessageCircle className="w-8 h-8 text-white fill-current" />
      </a>

      {/* Post Modal (Simulating a Page) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-secondary overflow-y-auto"
          >
            <div className="min-h-screen py-20 px-6">
              <div className="container mx-auto max-w-4xl">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Voltar para o Início
                </button>

                <div className="glass-card overflow-hidden">
                  {selectedPost.bannerImage && (
                    <img
                      src={selectedPost.bannerImage}
                      alt={selectedPost.title}
                      className="w-full aspect-[21/9] md:aspect-[3/1] object-cover border-b border-white/10"
                    />
                  )}
                  <div className="p-8 md:p-12">
                    <div className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">{selectedPost.date}</div>
                    <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{selectedPost.title}</h1>
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="btn-primary"
                  >
                    Fechar Artigo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}