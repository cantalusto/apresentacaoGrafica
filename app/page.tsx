'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Printer,
  Globe,
  ShoppingCart,
  Instagram,
  TrendingUp,
  Video,
  Settings,
  Percent,
  DollarSign,
  Target,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

const slides = [
  {
    id: 'cover',
    layout: 'center',
    content: (
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8"
        >
          <Printer className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium tracking-wide uppercase text-zinc-300">Proposta de Parceria Estratégica</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
        >
          O Futuro da sua <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400">
            Gráfica é Digital
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-zinc-400"
        >
          Como vamos escalar sua operação e dominar o mercado digital.
        </motion.p>
      </div>
    )
  },
  {
    id: 'opportunity',
    layout: 'split',
    title: "O Mercado Mudou",
    icon: <Target className="w-12 h-12 text-magenta-500" />,
    left: (
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">A Oportunidade Oculta</h2>
        <p className="text-xl text-zinc-400 leading-relaxed mb-8">
          Sua gráfica já tem estrutura, capacidade produtiva e qualidade reconhecida. Mas o faturamento ainda depende demais de indicação e carteira fixa.
        </p>
        <p className="text-xl text-zinc-400 leading-relaxed">
          Enquanto isso, gráficas online menores estão capturando clientes que deveriam ser <strong>seus</strong>. Com a sua estrutura, o potencial digital é gigantesco.
        </p>
      </div>
    ),
    right: (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <DollarSign className="text-green-400" /> Onde está o dinheiro?
        </h3>
        <ul className="space-y-6">
          {[
            "Vendas 24 horas por dia, 7 dias por semana",
            "Orçamentos automatizados (sem perder tempo no WhatsApp)",
            "Escala nacional (vender para o Brasil todo)",
            "Retenção de clientes recorrentes"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg text-zinc-300">
              <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    id: 'identity',
    layout: 'feature',
    title: "1. Identidade Digital",
    icon: <Globe className="w-16 h-16 text-cyan-400" />,
    headline: "Sua Estrutura Merece uma Presença à Altura",
    description: "Posicionamos sua marca no digital com a autoridade que o tamanho da sua operação exige.",
    profitTitle: "Como isso gera lucro?",
    profitText: "Aumento do Ticket Médio. Uma marca com presença digital forte e profissional atrai clientes maiores e projetos mais lucrativos. Sua capacidade produtiva justifica preços premium — o digital mostra isso.",
    color: "cyan"
  },
  {
    id: 'ecommerce',
    layout: 'feature',
    title: "2. E-commerce & Vendas",
    icon: <ShoppingCart className="w-16 h-16 text-magenta-500" />,
    headline: "Sua Loja Aberta 24/7",
    description: "Um e-commerce completo onde o cliente escolhe o material, a gramatura, o acabamento e já paga na hora.",
    profitTitle: "Como isso gera lucro?",
    profitText: "Vendas no piloto automático e redução de custo operacional. Seus atendentes param de perder horas fazendo orçamentos manuais e focam em grandes contas. Você ganha escala infinita.",
    color: "magenta"
  },
  {
    id: 'instagram',
    layout: 'feature',
    title: "3. Marketing no Instagram",
    icon: <Instagram className="w-16 h-16 text-yellow-400" />,
    headline: "Sua Vitrine em Movimento",
    description: "Gestão completa do Instagram com posts estratégicos, stories do dia a dia da produção e portfólio de materiais.",
    profitTitle: "Como isso gera lucro?",
    profitText: "Retenção e Recorrência (LTV). Quem faz cartão de visita hoje, vai precisar de panfleto amanhã. Estar no feed do cliente garante que ele lembre de você na próxima compra.",
    color: "yellow"
  },
  {
    id: 'traffic',
    layout: 'feature',
    title: "4. Tráfego Pago",
    icon: <TrendingUp className="w-16 h-16 text-cyan-400" />,
    headline: "Clientes Novos Todos os Dias",
    description: "Anúncios no Google (para quem pesquisa 'gráfica perto de mim' ou 'imprimir banner') e no Meta (Facebook/Instagram).",
    profitTitle: "Como isso gera lucro?",
    profitText: "Previsibilidade de Caixa. Colocamos R$ 1 em anúncios e tiramos R$ 5 em vendas. Compramos a atenção de clientes qualificados que já estão com o cartão de crédito na mão.",
    color: "cyan"
  },
  {
    id: 'video',
    layout: 'feature',
    title: "5. Produção de Vídeos",
    icon: <Video className="w-16 h-16 text-magenta-500" />,
    headline: "Mostrando o Valor na Prática",
    description: "Gravação profissional das máquinas rodando, dos acabamentos premium (verniz localizado, hot stamping) e dos materiais prontos.",
    profitTitle: "Como isso gera lucro?",
    profitText: "Aumento drástico na Conversão. O cliente não pode tocar no papel pela internet, mas um vídeo bem feito do material impresso gera desejo imediato e quebra objeções de qualidade.",
    color: "magenta"
  },
  {
    id: 'system',
    layout: 'split',
    title: "O Coração da Operação",
    icon: <Settings className="w-12 h-12 text-yellow-400" />,
    left: (
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Sistema de Gestão Sob Medida</h2>
        <p className="text-xl text-zinc-400 leading-relaxed mb-8">
          Uma operação do seu porte precisa de um sistema que acompanhe o crescimento. Vamos integrar tudo em uma plataforma sob medida.
        </p>
        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" /> O Lucro Real
          </h4>
          <p className="text-zinc-300">
            Redução drástica de desperdício de material, controle exato de estoque, fluxo de caixa em tempo real e fim dos erros de pedido. <strong>Organização é lucro líquido.</strong>
          </p>
        </div>
      </div>
    ),
    right: (
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "Gestão de Pedidos", desc: "Do orçamento à entrega" },
          { title: "Controle de Estoque", desc: "Avisos de reposição" },
          { title: "Financeiro", desc: "Contas a pagar e receber" },
          { title: "CRM", desc: "Histórico de cada cliente" }
        ].map((feature, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
            <p className="text-sm text-zinc-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'proposal',
    layout: 'proposal',
    content: (
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">A Proposta de Parceria</h2>
          <p className="text-2xl text-zinc-400">Um modelo de negócios onde crescemos juntos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col">
            <div className="bg-cyan-400/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Settings className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Sistema de Gestão</h3>
            <p className="text-zinc-400 flex-grow mb-8">Desenvolvimento e implantação do sistema sob medida para a gráfica.</p>
            <div className="pt-6 border-t border-zinc-800">
              <span className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Investimento</span>
              <p className="text-3xl font-bold text-white mt-1">A Negociar</p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-magenta-500/30 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-magenta-500/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-magenta-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
              O Motor de Vendas
            </div>
            <div className="bg-magenta-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Percent className="w-8 h-8 text-magenta-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">E-commerce</h3>
            <p className="text-zinc-400 flex-grow mb-8">Criação, manutenção e hospedagem da loja virtual completa.</p>
            <div className="pt-6 border-t border-zinc-700">
              <span className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Taxa de Sucesso</span>
              <p className="text-4xl font-bold text-magenta-400 mt-1">3% <span className="text-lg text-zinc-400 font-normal">/venda online</span></p>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col">
            <div className="bg-yellow-400/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Marketing Total</h3>
            <p className="text-zinc-400 flex-grow mb-8">Identidade, Instagram, Tráfego Pago e Produção de Vídeos.</p>
            <div className="pt-6 border-t border-zinc-800">
              <span className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Investimento</span>
              <p className="text-3xl font-bold text-yellow-400 mt-1">Incluso <span className="text-lg text-zinc-400 font-normal">na parceria</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'closing',
    layout: 'center',
    content: (
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-bold mb-8">Vamos Fechar Negócio?</h2>
        <p className="text-2xl text-zinc-400 mb-12">
          Nós entramos com a tecnologia, o marketing e as vendas.<br />
          Você entra com a produção e a qualidade.
        </p>
        <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          Iniciar Projeto
        </button>
      </div>
    )
  }
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  const renderSlideContent = (slide: typeof slides[0]) => {
    if (slide.layout === 'center' || slide.layout === 'proposal') {
      return slide.content;
    }

    if (slide.layout === 'split') {
      return (
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800">
              {slide.icon}
            </div>
            {slide.left}
          </div>
          <div>{slide.right}</div>
        </div>
      );
    }

    if (slide.layout === 'feature') {
      const colorMap = {
        cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
        magenta: 'text-magenta-500 bg-magenta-500/10 border-magenta-500/20',
        yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      };
      const colorClass = colorMap[slide.color as keyof typeof colorMap];

      return (
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className={`mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl border ${colorClass}`}>
              {slide.icon}
            </div>
            <h2 className="text-3xl font-bold text-zinc-500 mb-4">{slide.title}</h2>
            <h3 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{slide.headline}</h3>
            <p className="text-2xl text-zinc-400 leading-relaxed">
              {slide.description}
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-[2rem] p-10 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 ${colorClass.split(' ')[0].replace('text-', 'bg-')}`} />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-3xl font-bold text-white">{slide.profitTitle}</h4>
                </div>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  {slide.profitText}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 text-zinc-50 overflow-hidden flex flex-col font-sans selection:bg-magenta-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(24,24,27,0)_0%,_rgba(9,9,11,1)_100%)]" />
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-8 md:p-16">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderSlideContent(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Progress */}
      <div className="h-24 relative z-20 flex items-center justify-between px-8 md:px-16 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-gradient-to-r from-cyan-400 to-magenta-500' 
                  : 'w-2 bg-zinc-800 hover:bg-zinc-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-zinc-500 font-mono text-sm">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
