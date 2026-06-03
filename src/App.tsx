/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  MousePointer2, 
  Maximize2, 
  ArrowRight,
  Phone,
  MessageSquare,
  Eye,
  Percent
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { PERFORMANCE_DATA } from './constants';

// --- Components ---

const SlideWrapper = ({ children, slideKey }: { children: React.ReactNode; slideKey: number }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={slideKey}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-start md:justify-start p-4 md:py-6 md:px-12 overflow-y-auto"
    >
      <div className="w-full max-w-5xl my-auto py-2 flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.div>
  </AnimatePresence>
);

const MetricCard = ({ icon: Icon, label, value, subtext, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 rounded-2xl flex flex-col gap-3 group hover:border-brand-cyan/50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan">
        <Icon size={20} />
      </div>
      <span className="text-white/60 text-sm font-medium tracking-wider uppercase">{label}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-3xl font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
        {value}
      </span>
      {subtext && <span className="text-white/40 text-xs mt-1">{subtext}</span>}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [compilePeriod, setCompilePeriod] = useState<'7d' | 'month'>('7d');
  const [activeGoogleCampaign, setActiveGoogleCampaign] = useState(0);
  const totalSlides = 14;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col relative text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <header className="py-3 px-6 md:py-4 md:px-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tighter">AEG<span className="text-brand-cyan">MEDIA</span></span>
            <span className="text-[8px] text-white/40 tracking-[0.2em] font-bold uppercase -mt-1">Relatórios Estratégicos</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Confiauto Proteção Veicular</p>
          <div className="w-full h-[1px] bg-brand-cyan/30 mt-1" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        <SlideWrapper slideKey={currentSlide}>
          {currentSlide === 0 && (
            <div className="text-center space-y-6 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block"
              >
                <h2 className="text-brand-cyan text-sm sm:text-base font-bold tracking-[0.6em] uppercase mb-4 text-center">Apresentação de Performance</h2>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] mb-4 uppercase text-center">
                  RESULTADOS <br />
                  <span className="text-brand-cyan cyan-glow">CONFIAUTO</span> <br />
                  <span className="text-white text-3xl sm:text-5xl md:text-6xl tracking-widest block mt-4 font-black">META ADS</span>
                </h1>
                <div className="h-1.5 w-24 bg-brand-cyan mx-auto mt-6" />
              </motion.div>
              
              <div className="pt-8 text-white/40 font-mono tracking-[0.3em] text-[10px] uppercase">
                Compilado do Mês • {PERFORMANCE_DATA.period}
              </div>
            </div>
          )}

          {currentSlide === 1 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-3 md:gap-4 animate-fade-in select-none">
              <div className="flex flex-col items-center gap-1.5 text-center mb-0.5">
                <span className="text-brand-cyan font-black italic text-base md:text-lg uppercase tracking-[0.2em] leading-none">Comparativo Histórico</span>
                <h2 className="text-lg md:text-2xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Comparativo de Performance: Abril vs Maio</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Uma análise comparativa direta do crescimento de investimento e conversão de leads (Meta Ads)</p>
              </div>

              {/* Grid principal do comparativo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full">
                {/* CARD 1: INVESTIMENTO MENSAL */}
                <div className="glass-card p-4 rounded-[1.25rem] border-white/5 bg-white/[0.02] flex flex-col justify-between relative overflow-hidden shadow-lg h-[11.5rem]">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Total Investido</span>
                      <span className="text-[8px] font-mono font-black bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 px-1.5 py-0.5 rounded uppercase leading-none">+47,9%</span>
                    </div>
                    <p className="text-white/80 text-[11px] leading-snug font-semibold">
                      Expansão do orçamento com maior tração operacional e refinamento tático.
                    </p>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-end border-b border-white/5 pb-1">
                      <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Abril</span>
                      <span className="text-sm font-bold text-white/70 font-mono">R$ 72.015,24</span>
                    </div>
                    <div className="flex justify-between items-end pt-0.5">
                      <span className="text-brand-cyan text-[9px] uppercase tracking-wider font-extrabold">Maio</span>
                      <span className="text-lg font-black text-brand-cyan cyan-glow font-mono italic leading-none">R$ 106.501,42</span>
                    </div>
                  </div>
                </div>

                {/* CARD 2: LEADS GERADOS */}
                <div className="glass-card p-4 rounded-[1.25rem] border-brand-cyan/20 bg-brand-cyan/[0.01] flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_-15px_rgba(0,242,255,0.15)] h-[11.5rem]">
                  {/* Decorative glowing gradient circle */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-brand-cyan text-[8px] font-black uppercase tracking-widest">Leads Somados</span>
                      <span className="text-[8px] font-mono font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase leading-none">+160,8%</span>
                    </div>
                    <p className="text-white/80 text-[11px] leading-snug font-semibold">
                      Escala exponencial de geração de contatos diretos e cadastros qualificados.
                    </p>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-end border-b border-white/5 pb-1">
                      <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Abril</span>
                      <span className="text-sm font-bold text-white/70 font-mono">627 Leads</span>
                    </div>
                    <div className="flex justify-between items-end pt-0.5">
                      <span className="text-brand-cyan text-[9px] uppercase tracking-wider font-extrabold">Maio</span>
                      <span className="text-lg font-black text-brand-cyan cyan-glow font-mono italic leading-none">1.635 Leads</span>
                    </div>
                  </div>
                </div>

                {/* CARD 3: CUSTO POR LEAD (CPL) */}
                <div className="glass-card p-4 rounded-[1.25rem] border-emerald-500/20 bg-emerald-500/[0.01] flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_-15px_rgba(16,185,129,0.15)] h-[11.5rem]">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">Eficiência de Custo</span>
                      <span className="text-[8px] font-mono font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase leading-none">-43,3%</span>
                    </div>
                    <p className="text-white/80 text-[11px] leading-snug font-semibold">
                      Otimizações contínuas de funil e criativos cortaram o CPL quase pela metade!
                    </p>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-end border-b border-white/5 pb-1">
                      <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Abril (CPL Médio)</span>
                      <span className="text-sm font-bold text-white/70 font-mono">R$ 114,86</span>
                    </div>
                    <div className="flex justify-between items-end pt-0.5">
                      <span className="text-emerald-400 text-[9px] uppercase tracking-wider font-extrabold">Maio (CPL Médio)</span>
                      <span className="text-lg font-black text-emerald-400 emerald-glow font-mono italic leading-none">R$ 65,14</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusão Estratégica no rodapé do slide */}
              <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 text-left shadow-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-brand-cyan tracking-[0.2em] leading-none">Conclusão Estratégica</span>
                </div>
                <p className="text-white/60 text-[10px] md:text-[10.5px] leading-relaxed font-semibold">
                  A maturidade tática em Maio permitiu injetar <strong className="text-white font-mono">+47,9%</strong> a mais de orçamento (saindo de R$ 72.015,24 para R$ 106.501,42) gerando quase o triplo de resultados absolutos, escalando de <strong className="text-white font-mono">627 leads</strong> para <strong className="text-white font-mono">1.635 leads (+160,8% de aumento)</strong>. De forma concomitante, o custo unitário (CPL) desabou <strong className="text-white font-mono">-43,3%</strong> (passando de R$ 114,86 para R$ 65,14), comprovando a excelência operacional nas campanhas do Meta Ads.
                </p>
              </div>
            </div>
          )}

          {currentSlide === 2 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center gap-1 text-center mb-3">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-[0.2em] leading-none">CRM</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Métricas: {PERFORMANCE_DATA.crmLpTest.name}</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Resultado Consolidado do Período por Criativo</p>
              </div>

              <div className="w-full space-y-4">
                {/* Destaque do Acumulado (Soma do Teste) */}
                <div className="glass-card p-3 md:p-4 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/5 text-center relative overflow-hidden shadow-[0_0_35px_-20px_rgba(0,242,255,0.15)]">
                  <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.3em] mb-1">Resultado Geral Consolidado no Mês</p>
                  <div className="flex flex-col md:flex-row justify-around items-center gap-3 mt-1.5">
                    <div>
                      <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Total Investido</p>
                      <p className="text-lg md:text-xl font-black italic text-white uppercase tracking-tighter">
                        R$ {PERFORMANCE_DATA.crmLpTest.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                    <div>
                      <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-widest">Total de Leads</p>
                      <p className="text-lg md:text-2xl font-black italic text-brand-cyan cyan-glow uppercase tracking-tighter">
                        {PERFORMANCE_DATA.crmLpTest.totalLeads} Leads
                      </p>
                    </div>
                    <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                    <div>
                      <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">CPL Geral do Teste</p>
                      <p className="text-lg md:text-xl font-black italic text-emerald-400 uppercase tracking-tighter">
                        R$ {PERFORMANCE_DATA.crmLpTest.avgCpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid de Criativos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full items-stretch">
                  {PERFORMANCE_DATA.crmLpTest.creatives.map((creative, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "glass-card p-3 md:p-4 rounded-[1.5rem] space-y-2 relative overflow-hidden flex flex-col justify-between transition-all duration-300",
                        creative.isChamp 
                          ? "border-brand-cyan/25 bg-brand-cyan/5 shadow-[0_0_30px_-10px_rgba(0,242,255,0.15)] md:scale-105 z-10" 
                          : "border-white/5 bg-white/[0.02]"
                      )}
                    >
                      {creative.isChamp && (
                        <div className="absolute top-0 right-0 p-1.5 bg-brand-cyan text-brand-black font-black text-[6px] uppercase italic rounded-bl-[1rem] shadow-md tracking-widest">
                          Destaque Campeão (98% dos Leads)
                        </div>
                      )}
                      
                      <div>
                        <h3 className={cn(
                          "text-xs font-black italic uppercase tracking-tight line-clamp-2 md:h-10",
                          creative.isChamp ? "text-brand-cyan" : "text-white/80"
                        )}>
                          {creative.name}
                        </h3>
                        
                        <div className="space-y-1.5 mt-3">
                          <div className={cn(
                            "grid grid-cols-[1fr_auto] items-center border-b pb-1 gap-2",
                            creative.isChamp ? "border-brand-cyan/10" : "border-white/5"
                          )}>
                            <p className="text-[8px] font-bold uppercase text-white/30 tracking-widest">Investimento</p>
                            <p className="text-xs md:text-sm font-black italic text-white whitespace-nowrap">
                              R$ {creative.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          
                          <div className={cn(
                            "grid grid-cols-[1fr_auto] items-center border-b pb-1 gap-2",
                            creative.isChamp ? "border-brand-cyan/10" : "border-white/5"
                          )}>
                            <p className="text-[8px] font-bold uppercase text-white/30 tracking-widest">Leads Gerados</p>
                            <p className={cn(
                              "text-sm md:text-base font-black italic leading-none",
                              creative.isChamp ? "text-brand-cyan cyan-glow" : "text-white/70"
                            )}>
                              {creative.leads}
                            </p>
                          </div>

                          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                            <p className="text-[8px] font-bold uppercase text-white/30 tracking-widest">CPL Médio</p>
                            <p className="text-xs md:text-sm font-black italic text-emerald-400 whitespace-nowrap">
                              R$ {creative.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSlide === 3 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-3">
              <div className="flex flex-col items-center gap-1 text-center mb-1">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-widest leading-none">Estáticos</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-tight">Campanha Novos Estáticos</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Resultado Consolidado do Período por Criativo</p>
              </div>

              {/* Destaque do Acumulado (Visão Mensal) */}
              <div className="glass-card p-3 md:p-4 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/5 text-center relative overflow-hidden shadow-[0_0_35px_-20px_rgba(0,242,255,0.15)] w-full">
                <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.3em] mb-1">Resultado Geral Consolidado no Mês</p>
                <div className="flex flex-col md:flex-row justify-around items-center gap-3 mt-1.5">
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Total Investido</p>
                    <p className="text-sm md:text-base font-black italic text-white uppercase tracking-tighter">
                      R$ {PERFORMANCE_DATA.campaign2.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-widest">Total de Leads</p>
                    <p className="text-lg font-black italic text-brand-cyan cyan-glow uppercase tracking-tighter leading-none">
                      {PERFORMANCE_DATA.campaign2.totalLeads} Leads
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">CPL Médio Geral</p>
                    <p className="text-sm md:text-base font-black italic text-emerald-400 uppercase tracking-tighter font-mono">
                      R$ {PERFORMANCE_DATA.campaign2.avgCpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid de Criativos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full items-stretch animate-fade-in mt-1">
                {PERFORMANCE_DATA.campaign2.creatives.map((creative, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "glass-card p-3 md:p-4 rounded-[1.5rem] space-y-2 relative overflow-hidden flex flex-col justify-between transition-all duration-300",
                      creative.isChamp 
                        ? "border-brand-cyan/25 bg-brand-cyan/5 shadow-[0_0_30px_-10px_rgba(0,242,255,0.15)] z-10" 
                        : "border-white/5 bg-white/[0.02]"
                    )}
                  >
                    {creative.isChamp && (
                      <div className="absolute top-0 right-0 p-1 bg-brand-cyan text-brand-black font-black text-[5.5px] uppercase italic rounded-bl-[0.8rem] shadow-md tracking-wider leading-none">
                        Campeão (89% Leads)
                      </div>
                    )}
                    
                    <div>
                      <h3 className={cn(
                        "text-[11px] font-black italic uppercase tracking-tight line-clamp-3 md:h-12 pr-4",
                        creative.isChamp ? "text-brand-cyan" : "text-white/80"
                      )}>
                        {creative.name}
                      </h3>
                      
                      <div className="space-y-1.5 mt-3">
                        <div className={cn(
                          "grid grid-cols-[1fr_auto] items-center border-b pb-1 gap-2",
                          creative.isChamp ? "border-brand-cyan/10" : "border-white/5"
                        )}>
                          <p className="text-[7.5px] font-bold uppercase text-white/30 tracking-widest">Investimento</p>
                          <p className="text-[10px] md:text-xs font-black italic text-white whitespace-nowrap font-mono">
                            R$ {creative.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        
                        <div className={cn(
                          "grid grid-cols-[1fr_auto] items-center border-b pb-1 gap-2",
                          creative.isChamp ? "border-brand-cyan/10" : "border-white/5"
                        )}>
                          <p className="text-[7.5px] font-bold uppercase text-white/30 tracking-widest">Leads</p>
                          <p className={cn(
                            "text-xs md:text-sm font-black italic leading-none font-mono",
                            creative.isChamp ? "text-brand-cyan cyan-glow" : "text-white/70"
                          )}>
                            {creative.leads}
                          </p>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                          <p className="text-[7.5px] font-bold uppercase text-white/30 tracking-widest">CPL Médio</p>
                          <p className="text-[10px] md:text-xs font-black italic text-emerald-400 whitespace-nowrap font-mono">
                            R$ {creative.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSlide === 4 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-3">
              <div className="flex flex-col items-center gap-1 text-center mb-1">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-widest leading-none">Comparativo</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-tight">Campanha de Performance Geral</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Resultado Consolidado do Período e Teste A/B de Landing Pages</p>
              </div>

              {/* Destaque do Acumulado (Visão Consolidada Mensal) */}
              <div className="glass-card p-3 md:p-4 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/5 text-center relative overflow-hidden shadow-[0_0_35px_-20px_rgba(0,242,255,0.15)] w-full">
                <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.3em] mb-1">Resultado Geral Consolidado no Mês</p>
                <div className="flex flex-col md:flex-row justify-around items-center gap-3 mt-1.5">
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Total Investido</p>
                    <p className="text-sm md:text-base font-black italic text-white uppercase tracking-tighter">
                      R$ {PERFORMANCE_DATA.comparisonOriginal.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-widest">Total de Leads</p>
                    <p className="text-lg font-black italic text-brand-cyan cyan-glow uppercase tracking-tighter leading-none">
                      {PERFORMANCE_DATA.comparisonOriginal.totalLeads} Leads
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">CPL Médio Geral</p>
                    <p className="text-sm md:text-base font-black italic text-emerald-400 uppercase tracking-tighter font-mono">
                      R$ {PERFORMANCE_DATA.comparisonOriginal.avgCpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Comparativo: LP Original vs LP-B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch animate-fade-in mt-1">
                {/* LP Original */}
                <div className="glass-card p-4 md:p-5 rounded-[1.5rem] border-brand-cyan/25 bg-brand-cyan/5 space-y-3 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_-10px_rgba(0,242,255,0.1)]">
                  <div className="absolute top-0 right-0 p-1.5 bg-brand-cyan text-brand-black font-black text-[6px] uppercase italic rounded-bl-[1rem] shadow-lg tracking-widest leading-none z-10">
                    Principal (95.9% Leads)
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-black italic uppercase tracking-tight text-brand-cyan">Landing Page Original</h3>
                        <p className="text-[7.5px] font-bold uppercase tracking-wider text-white/40 leading-none mt-1">Versão Consolidada Principal</p>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[6px] font-bold uppercase px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap">
                        -{((1 - PERFORMANCE_DATA.comparisonOriginal.original.avgCpl / PERFORMANCE_DATA.comparisonOriginal.lpb.avgCpl) * 100).toFixed(1)}% CPL vs LP-B
                      </div>
                    </div>

                    <div className="h-0.5 w-12 bg-white/10 my-3" />

                    <div className="space-y-2">
                      <div className="grid grid-cols-[1fr_auto] items-center border-b border-brand-cyan/10 pb-2 gap-2">
                        <p className="text-[8px] font-bold uppercase text-brand-cyan/60 tracking-widest">Investimento</p>
                        <p className="text-xs md:text-sm font-black italic text-white font-mono">
                          R$ {PERFORMANCE_DATA.comparisonOriginal.original.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center border-b border-brand-cyan/10 pb-2 gap-2">
                        <p className="text-[8px] font-bold uppercase text-brand-cyan/60 tracking-widest">Quantidade Leads</p>
                        <p className="text-sm md:text-base font-black italic text-brand-cyan cyan-glow font-mono leading-none">
                          {PERFORMANCE_DATA.comparisonOriginal.original.totalLeads} Leads
                        </p>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-2 pt-0.5">
                        <p className="text-[8px] font-bold uppercase text-brand-cyan/60 tracking-widest">CPL Médio</p>
                        <p className="text-xs md:text-sm font-black italic text-emerald-400 font-mono">
                          R$ {PERFORMANCE_DATA.comparisonOriginal.original.avgCpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LP-B */}
                <div className="glass-card p-4 md:p-5 rounded-[1.5rem] border-white/5 bg-white/[0.01] space-y-3 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-1.5 bg-white/5 rounded-bl-[1rem] font-black text-[6px] uppercase italic text-white/40 tracking-widest leading-none z-10">
                    Versão de Teste (4.1% Leads)
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-black italic uppercase tracking-tight text-white/70">Landing Page B (LP-B)</h3>
                        <p className="text-[7.5px] font-bold uppercase tracking-wider text-white/30 leading-none mt-1">Ambiente de Experimento A/B</p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[6px] font-bold uppercase px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap">
                        CPL Elevado
                      </div>
                    </div>

                    <div className="h-0.5 w-12 bg-white/10 my-3" />

                    <div className="space-y-2">
                      <div className="grid grid-cols-[1fr_auto] items-center border-b border-white/5 pb-2 gap-2">
                        <p className="text-[8px] font-bold uppercase text-white/20 tracking-widest">Investimento</p>
                        <p className="text-xs md:text-sm font-black italic text-white/80 font-mono">
                          R$ {PERFORMANCE_DATA.comparisonOriginal.lpb.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center border-b border-white/5 pb-2 gap-2">
                        <p className="text-[8px] font-bold uppercase text-white/20 tracking-widest">Quantidade Leads</p>
                        <p className="text-sm md:text-base font-black italic text-white/80 font-mono leading-none">
                          {PERFORMANCE_DATA.comparisonOriginal.lpb.totalLeads} Leads
                        </p>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-2 pt-0.5">
                        <p className="text-[8px] font-bold uppercase text-white/20 tracking-widest">CPL Médio</p>
                        <p className="text-xs md:text-sm font-black italic text-amber-500 font-mono">
                          R$ {PERFORMANCE_DATA.comparisonOriginal.lpb.avgCpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide === 5 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col items-center gap-1 text-center mb-1">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-widest leading-none">Criativos</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-tight">Melhor Performance de Criativo por LP</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Comparativo direto do principal anúncio de cada Landing Page</p>
              </div>

              {/* Grid Principal Simples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch animate-fade-in mt-1">
                
                {/* LP Original (Melhor Criativo) */}
                <div className="glass-card p-5 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/5 flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_-15px_rgba(0,242,255,0.1)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-brand-cyan text-brand-black font-black text-[7px] uppercase italic rounded-bl-[1rem] tracking-wider z-10 leading-none">
                    Volume & Eficiência
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Landing Page Original</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white tracking-tight mt-1 leading-tight">ADS02 • Comparativos</h3>
                      <p className="text-[9px] text-brand-cyan uppercase tracking-widest font-bold mt-1">Líder Absoluto em Conversão</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white font-mono">R$ 11.822,40</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Leads</p>
                        <p className="text-xs sm:text-sm font-black text-brand-cyan cyan-glow font-mono leading-none">144</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">CPL Médio</p>
                        <p className="text-[10px] sm:text-xs font-black text-[#0cf273] font-mono">R$ 82,10</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <p className="text-brand-cyan text-[7.5px] font-black tracking-widest uppercase">🎯 Resultado Estratégico</p>
                      <p className="text-white/70 text-[10.5px] leading-relaxed">
                        Responsável pelo maior volume de leads na LP Original. O apelo comparativo direto trouxe tráfego altamente qualificado ao menor custo histórico com excelente tração.
                      </p>
                    </div>
                  </div>
                </div>

                {/* LP-B (Melhor Criativo) */}
                <div className="glass-card p-5 rounded-[1.5rem] border-white/5 bg-white/[0.01] flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-white/10 text-white/75 font-black text-[7px] uppercase italic rounded-bl-[1rem] tracking-wider z-10 leading-none">
                    Destaque Isolado
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Landing Page B (LP-B)</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white/90 tracking-tight mt-1 leading-tight">Barato Sai Caro</h3>
                      <p className="text-[9px] text-amber-500 uppercase tracking-widest font-bold mt-1">Quebra Absoluta de Objeção</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white/80 font-mono">R$ 1.813,85</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Leads</p>
                        <p className="text-xs sm:text-sm font-black text-amber-500 font-mono leading-none">22</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">CPL Médio</p>
                        <p className="text-[10px] sm:text-xs font-black text-amber-500 font-mono">R$ 82,45</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <p className="text-amber-500 text-[7.5px] font-black tracking-widest uppercase">🎯 Resultado Estratégico</p>
                      <p className="text-white/70 text-[10.5px] leading-relaxed">
                        Apesar do CPL médio geral da LP-B ter sido elevado, o criativo focado em quebrar objeção de preço performou incrivelmente bem de forma isolada, provando a força do seu gancho.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {currentSlide === 6 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-4 animate-fade-in">
              <div className="flex flex-col items-center gap-1.5 text-center mb-1">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-[0.2em] leading-none">Reconhecimento</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Métricas de Criativos por Alcance</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Comparativo de Entrega e Custo por Criativo na Campanha de Reconhecimento</p>
              </div>

              {/* Destaque do Acumulado (Visão Consolidada de 3 Semanas) */}
              <div className="glass-card p-3 md:p-4 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/5 text-center relative overflow-hidden shadow-[0_0_35px_-20px_rgba(0,242,255,0.15)] w-full">
                <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.3em] mb-1">Resultado Geral Acumulado • [AEG] [CBO] [RECONHECIMENTO] [ALCANCE]</p>
                <div className="flex flex-col md:flex-row justify-around items-center gap-3 mt-1.5">
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Total Investido</p>
                    <p className="text-sm md:text-base font-black italic text-white uppercase tracking-tighter">
                      R$ {PERFORMANCE_DATA.awarenessCampaign.combined.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-widest">Pessoas Alcançadas Acumulado</p>
                    <p className="text-lg font-black italic text-brand-cyan cyan-glow uppercase tracking-tighter leading-none">
                      {PERFORMANCE_DATA.awarenessCampaign.combined.reach.toLocaleString('pt-BR')} Pessoas
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">CPM Médio Geral (1.000 Alc.)</p>
                    <p className="text-sm md:text-base font-black italic text-emerald-400 uppercase tracking-tighter">
                      R$ {PERFORMANCE_DATA.awarenessCampaign.combined.cpm.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid de Performance de Criativos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch">
                {/* ADS02 - Cobertura Campeã */}
                <div className="glass-card p-5 rounded-[1.5rem] border-emerald-500/20 bg-[#0cf273]/[0.02] flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_-15px_rgba(12,242,115,0.05)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 text-emerald-400 border-l border-b border-white/5 font-black text-[7px] uppercase italic rounded-bl-[1rem] tracking-wider z-10 leading-none animate-pulse">
                    MÁXIMA EFICIÊNCIA
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Criativo Alcance</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white tracking-tight mt-1 leading-tight">ADS02 - Cobertura Campeã</h3>
                      <p className="text-[9px] text-[#0cf273] uppercase tracking-widest font-bold mt-1">Líder em Custo-Benefício de Marca</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white font-mono">R$ 966,54</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Alcance</p>
                        <p className="text-xs sm:text-sm font-black text-[#0cf273] font-mono leading-none">401.527</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">CPM Medio</p>
                        <p className="text-[10px] sm:text-xs font-black text-[#0cf273] font-mono">R$ 2,41</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <p className="text-emerald-500 text-[7.5px] font-black tracking-widest uppercase">🎯 Resultado Estratégico</p>
                      <p className="text-white/70 text-[10.5px] leading-relaxed">
                        Obteve um CPM extremamente baixo de <strong className="text-white">R$ 2,41</strong> por mil pessoas alcançadas, garantindo que quase metade do alcance total da campanha fosse conquistado com apenas 21% do investimento.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADS01 - A Confiauto segue */}
                <div className="glass-card p-5 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/[0.02] flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_-15px_rgba(0,242,255,0.05)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-brand-cyan/10 text-brand-cyan border-l border-b border-white/5 font-black text-[7px] uppercase italic rounded-bl-[1rem] tracking-wider z-10 leading-none">
                    LÍDER DE ENTREGA
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Criativo Foco</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white/95 tracking-tight mt-1 leading-tight">ADS01 - A Confiauto segue</h3>
                      <p className="text-[9px] text-brand-cyan uppercase tracking-widest font-bold mt-1">Maior Capilaridade de Marca</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white/80 font-mono">R$ 3.457,32</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Alcance</p>
                        <p className="text-xs sm:text-sm font-black text-brand-cyan cyan-glow font-mono leading-none">715.891</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">CPM Medio</p>
                        <p className="text-[10px] sm:text-xs font-black text-brand-cyan font-mono">R$ 4,83</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <p className="text-brand-cyan text-[7.5px] font-black tracking-widest uppercase">🎯 Resultado Estratégico</p>
                      <p className="text-white/70 text-[10.5px] leading-relaxed">
                        Responsável pelo motor de tração da campanha, distribuindo com excelência a mensagem institucional e fixando a lembrança de marca para mais de <strong className="text-white">715 mil</strong> pessoas de forma ampla.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide === 7 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-4 animate-fade-in">
              <div className="flex flex-col items-center gap-1.5 text-center mb-1">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-[0.2em] leading-none">Visit</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Métricas de Criativos: {PERFORMANCE_DATA.trafficToProfile.name}</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Comparativo de Entrega e Custo por Criativo na Campanha de Visitas ao Perfil</p>
              </div>

              {/* Destaque do Acumulado (Visão Consolidada de 3 Semanas) */}
              <div className="glass-card p-3 md:p-4 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/5 text-center relative overflow-hidden shadow-[0_0_35px_-20px_rgba(0,242,255,0.15)] w-full">
                <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.3em] mb-1">Resultado Geral Acumulado • [TRÁFEGO PARA PERFIL]</p>
                <div className="flex flex-col md:flex-row justify-around items-center gap-3 mt-1.5">
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Total Investido</p>
                    <p className="text-sm md:text-base font-black italic text-white uppercase tracking-tighter">
                      R$ {PERFORMANCE_DATA.trafficToProfile.combined.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-brand-cyan text-[8px] font-bold uppercase tracking-widest">Total de Visitas</p>
                    <p className="text-lg font-black italic text-brand-cyan cyan-glow uppercase tracking-tighter leading-none">
                      {PERFORMANCE_DATA.trafficToProfile.combined.visits.toLocaleString('pt-BR')} Visitas
                    </p>
                  </div>
                  <div className="hidden md:block h-6 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest font-black">CPV Médio Geral</p>
                    <p className="text-sm md:text-base font-black italic text-emerald-400 uppercase tracking-tighter">
                      R$ {PERFORMANCE_DATA.trafficToProfile.combined.cpv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid de Performance de Criativos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch animate-fade-in">
                {/* ADS01 - A Confiauto segue */}
                <div className="glass-card p-5 rounded-[1.5rem] border-brand-cyan/20 bg-brand-cyan/[0.02] flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_-15px_rgba(0,242,255,0.05)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-brand-cyan/10 text-brand-cyan border-l border-b border-white/5 font-black text-[7px] uppercase italic rounded-bl-[1rem] tracking-wider z-10 leading-none">
                    LÍDER DE TRÁFEGO
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Criativo Principal</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white tracking-tight mt-1 leading-tight">ADS01 - A Confiauto segue</h3>
                      <p className="text-[9px] text-brand-cyan uppercase tracking-widest font-bold mt-1">Alta Escala e Máximo Volume</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white font-mono">R$ 2.277,11</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Visitas</p>
                        <p className="text-xs sm:text-sm font-black text-brand-cyan cyan-glow font-mono leading-none">5.964</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">CPV Médio</p>
                        <p className="text-[10px] sm:text-xs font-black text-emerald-400 font-mono">R$ 0,38</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <p className="text-brand-cyan text-[7.5px] font-black tracking-widest uppercase">🎯 Resultado Estratégico</p>
                      <p className="text-white/70 text-[10.5px] leading-relaxed">
                        Responsável pelo motor de escala da campanha, direcionando mais de <strong className="text-white">5.964 visitas</strong> ao perfil com um custo dinâmico e consistente de <strong className="text-white font-mono">R$ 0,38</strong> por visitante.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADS02 - gleisson */}
                <div className="glass-card p-5 rounded-[1.5rem] border-emerald-500/20 bg-[#0cf273]/[0.02] flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_-15px_rgba(12,242,115,0.05)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 text-emerald-400 border-l border-b border-white/5 font-black text-[7px] uppercase italic rounded-bl-[1rem] tracking-wider z-10 leading-none animate-pulse">
                    MÃO MAIS EFICIENTE
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Criativo Otimizado</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white tracking-tight mt-1 leading-tight">ADS02 - gleisson</h3>
                      <p className="text-[9px] text-[#0cf273] uppercase tracking-widest font-bold mt-1">Custo por Resultado Excepcional</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white font-mono">R$ 724,99</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">Visitas</p>
                        <p className="text-xs sm:text-sm font-black text-[#0cf273] font-mono leading-none">2.297</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-1">CPV Médio</p>
                        <p className="text-[10px] sm:text-xs font-black text-[#0cf273] font-mono">R$ 0,32</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <p className="text-emerald-500 text-[7.5px] font-black tracking-widest uppercase">🎯 Resultado Estratégico</p>
                      <p className="text-white/70 text-[10.5px] leading-relaxed">
                        Conquistou um CPV imbatível de apenas <strong className="text-white font-mono">R$ 0,32</strong>, canalizando 2.297 visitas de forma extremamente econômica, ideal para otimizar orçamentos táticos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide === 8 && (
            <div className="w-full max-w-4xl px-4 flex flex-col justify-center items-center gap-2.5 animate-fade-in select-none">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-lg md:text-xl font-black italic uppercase tracking-tighter mx-auto leading-none">Criativo Campeão: Contratação</h2>
                <p className="text-white/30 uppercase tracking-[0.1em] font-bold text-[7px] italic mt-0.5">Líder absoluto de entrega e custo por lead na captação</p>
              </div>

              {/* Destaque do Acumulado (Visão Consolidada de 3 Semanas) */}
              <div className="glass-card p-2 md:p-2.5 rounded-[1.2rem] border-emerald-500/20 bg-emerald-500/5 text-center relative overflow-hidden shadow-[0_0_35px_-20px_rgba(12,242,115,0.15)] w-full">
                <p className="text-emerald-400 text-[7px] font-bold uppercase tracking-[0.3em] mb-0.5">Resultado Geral Acumulado • Contratação</p>
                <div className="flex flex-row justify-around items-center gap-1 mt-1">
                  <div>
                    <p className="text-white/30 text-[7px] font-bold uppercase tracking-widest leading-none">Total Investido</p>
                    <p className="text-xs font-black italic text-white uppercase tracking-tighter mt-0.5">
                      R$ {PERFORMANCE_DATA.hiringCampaign.combined.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="h-5 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-emerald-400 text-[7px] font-bold uppercase tracking-widest leading-none">Contatos Recebidos (Leads)</p>
                    <p className="text-sm font-black italic text-emerald-400 emerald-glow uppercase tracking-tighter leading-none mt-0.5">
                      {PERFORMANCE_DATA.hiringCampaign.combined.leads.toLocaleString('pt-BR')} Leads
                    </p>
                  </div>
                  <div className="h-5 w-[1px] bg-white/10" />
                  <div>
                    <p className="text-white/30 text-[7px] font-bold uppercase tracking-widest font-black leading-none">CPL Médio Geral</p>
                    <p className="text-xs font-black italic text-emerald-400 uppercase tracking-tighter font-mono mt-0.5">
                      R$ {PERFORMANCE_DATA.hiringCampaign.combined.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Criativo de Performance Campeão */}
              <div className="w-full max-w-lg animate-fade-in mx-auto">
                {/* ADS1 - CONSULTOR INTERNO SÃO GERALDO */}
                <div className="glass-card p-4 sm:p-4.5 rounded-[1.2rem] border-emerald-500/40 bg-emerald-500/[0.04] flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_-15px_rgba(12,242,115,0.2)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/20 text-emerald-400 border-l border-b border-white/5 font-black text-[7px] uppercase italic rounded-bl-[0.8rem] tracking-wider z-10 leading-none antialiased shadow-lg">
                    🏆 CAMPEÃO REVELADO
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-white/40 text-[7px] font-black uppercase tracking-widest leading-none">Liderança de Resultados</span>
                      <h3 className="text-base sm:text-lg font-black italic uppercase text-white tracking-tight mt-0.5 leading-tight">ADS1 - CONSULTOR INTERNO SÃO GERALDO</h3>
                      <p className="text-[8px] text-[#0cf273] uppercase tracking-widest font-bold mt-0.5">Excepcional Volume e Custo por Lead Imbatível</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-lg p-2 text-center">
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-0.5">Investido</p>
                        <p className="text-[10px] sm:text-xs font-bold text-white font-mono">R$ 813,81</p>
                      </div>
                      <div className="border-x border-white/5">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-0.5">Leads (Conversas)</p>
                        <p className="text-xs sm:text-sm font-black text-emerald-400 emerald-glow font-mono leading-none">591</p>
                      </div>
                      <div>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest font-black mb-0.5">CPL Unitário</p>
                        <p className="text-[10px] sm:text-xs font-black text-emerald-400 font-mono">R$ 1,38</p>
                      </div>
                    </div>

                    <div className="space-y-0.5 pt-2 border-t border-white/5">
                      <p className="text-emerald-400 text-[7.5px] font-black tracking-widest uppercase">🎯 Resumo da Performance</p>
                      <p className="text-white/80 text-[10.5px] leading-relaxed">
                        Desempenho histórico liderando a campanha de ponta a ponta. Canalizou <strong className="text-white">591 contatos diretos</strong> de candidatos engajados no WhatsApp com custo de <strong className="text-white font-mono">R$ 1,38</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide === 9 && (
            <div className="text-center space-y-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block animate-fade-in"
              >
                <h2 className="text-brand-cyan text-sm sm:text-base font-bold tracking-[0.6em] uppercase mb-4 text-center">Apresentação de Performance</h2>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] mb-4 uppercase text-center">
                  RESULTADOS <br />
                  <span className="text-brand-cyan cyan-glow">GOOGLE ADS</span> <br />
                  <span className="text-white">CONFIAUTO</span>
                </h1>
                <div className="h-1.5 w-24 bg-brand-cyan mx-auto mt-6" />
              </motion.div>

              <div className="pt-8 text-white/45 font-mono tracking-[0.3em] text-[10px] uppercase">
                Próximos Passos & Planejamento Estratégico • 2026
              </div>
            </div>
          )}

          {currentSlide === 10 && (
            <div className="w-full max-w-5xl px-4 flex flex-col justify-center items-center gap-3 animate-fade-in">
              <div className="flex flex-col items-center gap-1.5 text-center mb-1 w-full">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-[0.2em] leading-none">GOOGLE ADS</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Performance Google Ads - Maio Imbatível</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Resultado Consolidado das Campanhas de Tráfego Pago</p>
              </div>

              {/* Destaque Central de Investimento e Custo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full">
                {/* Investimento */}
                <div className="glass-card p-4 rounded-2xl border-brand-cyan/20 bg-brand-cyan/5 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-[0_0_30px_-15px_rgba(0,242,255,0.15)] h-32">
                  <div className="absolute top-0 right-0 p-1.5 bg-brand-cyan text-brand-black font-black text-[6px] uppercase italic tracking-widest rounded-bl-lg">Budget</div>
                  <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.2em] mt-1">Investimento Google Ads</span>
                  <p className="text-2xl md:text-3xl font-black italic tracking-tighter text-brand-cyan cyan-glow leading-none my-auto">
                    R$ 23.474,21
                  </p>
                  <span className="text-white/30 text-[7px] font-mono">Foco em Performance e Escala</span>
                </div>

                {/* Leads Gerados (Destaque!) */}
                <div className="glass-card p-4 rounded-2xl border-brand-cyan/35 bg-brand-cyan/10 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-[0_0_40px_-15px_rgba(0,242,255,0.25)] h-32">
                  <div className="absolute top-0 right-0 p-1.5 bg-brand-cyan text-brand-black font-black text-[6px] uppercase italic tracking-widest rounded-bl-lg">Hot Leads</div>
                  <span className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.2em] mt-1">Leads Gerados</span>
                  <div className="flex items-center gap-2 my-auto">
                    <Users className="text-brand-cyan animate-pulse" size={18} />
                    <p className="text-3xl md:text-4xl font-black italic tracking-tighter text-white leading-none">
                      415
                    </p>
                  </div>
                  <span className="text-brand-cyan/70 text-[7px] font-mono font-bold tracking-wider uppercase">Cadastros Nativos do Google</span>
                </div>

                {/* Conversões Totais (Destaque!) */}
                <div className="glass-card p-4 rounded-2xl border-brand-cyan/35 bg-brand-cyan/10 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-[0_0_40px_-15px_rgba(0,242,255,0.25)] h-32">
                  <div className="absolute top-0 right-0 p-1.5 bg-brand-cyan text-brand-black font-black text-[6px] uppercase italic tracking-widest rounded-bl-lg">Ações</div>
                  <span className="text-brand-cyan text-[8px] font-bold uppercase tracking-[0.2em] mt-1">Conversões Totais</span>
                  <div className="flex items-center gap-2 my-auto">
                    <Target className="text-brand-cyan" size={18} />
                    <p className="text-3xl md:text-4xl font-black italic tracking-tighter text-white leading-none">
                      510
                    </p>
                  </div>
                  <span className="text-brand-cyan/70 text-[7px] font-mono font-bold tracking-wider uppercase">Ações Rastradas Totais</span>
                </div>
              </div>

              {/* Grid Secundária de Métricas de Apoio */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 w-full">
                {/* Taxa de Conversão (Destaque!) */}
                <div className="glass-card p-3 rounded-xl border-brand-cyan/25 bg-white/[0.01] flex flex-col justify-center items-center text-center">
                  <span className="text-brand-cyan text-[7.5px] font-bold uppercase tracking-wider">Tx. Conversão</span>
                  <p className="text-lg md:text-xl font-black italic tracking-tight text-brand-cyan cyan-glow mt-1 font-mono">
                    12,41%
                  </p>
                  <span className="text-white/20 text-[6px] font-bold uppercase mt-0.5">Alta Conversão</span>
                </div>

                {/* Custo/Conv. */}
                <div className="glass-card p-3 rounded-xl border-white/5 bg-white/[0.01] flex flex-col justify-center items-center text-center">
                  <span className="text-white/40 text-[7.5px] font-bold uppercase tracking-wider">Custo/Conv.</span>
                  <p className="text-lg md:text-xl font-black italic tracking-tight text-white mt-1 font-mono">
                    R$ 46,03
                  </p>
                </div>

                {/* Cliques Gerados */}
                <div className="glass-card p-3 rounded-xl border-white/5 bg-white/[0.01] flex flex-col justify-center items-center text-center">
                  <span className="text-white/40 text-[7.5px] font-bold uppercase tracking-wider">Cliques Gerados</span>
                  <p className="text-lg md:text-xl font-black italic tracking-tight text-white mt-1">
                    4.108
                  </p>
                  <span className="text-white/20 text-[6px] font-bold uppercase mt-0.5">Cliques Qualificados</span>
                </div>

                {/* Impressões */}
                <div className="glass-card p-3 rounded-xl border-white/5 bg-white/[0.01] flex flex-col justify-center items-center text-center">
                  <span className="text-white/40 text-[7.5px] font-bold uppercase tracking-wider">Impressões</span>
                  <p className="text-lg md:text-xl font-black italic tracking-tight text-white mt-1">
                    40.348
                  </p>
                  <span className="text-white/20 text-[6px] font-bold uppercase mt-0.5">Alcance Amplo</span>
                </div>

                {/* CTR Médio */}
                <div className="glass-card p-3 rounded-xl border-white/5 bg-white/[0.01] flex flex-col justify-center items-center text-center">
                  <span className="text-white/40 text-[7.5px] font-bold uppercase tracking-wider">CTR Médio</span>
                  <p className="text-lg md:text-xl font-black italic tracking-tight text-white mt-1 font-mono">
                    10,18%
                  </p>
                  <span className="text-emerald-400/85 text-[6px] font-bold uppercase mt-0.5 font-bold">Acima do Padrão</span>
                </div>

                {/* % Impressão Topo */}
                <div className="glass-card p-3 rounded-xl border-white/5 bg-white/[0.01] flex flex-col justify-center items-center text-center">
                  <span className="text-white/40 text-[7.5px] font-bold uppercase tracking-wider">Posição Topo</span>
                  <p className="text-lg md:text-xl font-black italic tracking-tight text-white mt-1 font-mono">
                    80,65%
                  </p>
                  <span className="text-white/25 text-[6px] font-bold uppercase mt-0.5">Top of Page</span>
                </div>
              </div>

              {/* Observação Estratégica no Rodapé do Slide */}
              <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-left shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-brand-cyan tracking-[0.2em]">Observação Estratégica</span>
                </div>
                <p className="text-white/60 text-[10px] md:text-xs leading-relaxed font-semibold">
                  Os leads apresentados consideram apenas os cadastros nativos realizados dentro do Google. Já o total de conversões inclui todas as ações rastreadas nas campanhas, como preenchimento de formulário, ligações, cliques no WhatsApp.
                </p>
              </div>
            </div>
          )}

          {currentSlide === 11 && (
            <div className="w-full max-w-5xl px-4 pt-10 md:pt-16 flex flex-col justify-center items-center gap-3 animate-fade-in">
              <div className="flex flex-col items-center gap-1.5 text-center mb-1 w-full">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-[0.2em] leading-none">GOOGLE ADS</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Campanhas de Pesquisa Ativas</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic">Organização e Direcionamento Tático dos Anúncios no Google</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 w-full items-stretch">
                {/* Lado Esquerdo: Estrutura das Campanhas */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  <div className="glass-card p-4 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col gap-2.5">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase text-brand-cyan tracking-[0.15em] block">Estrutura das Campanhas</span>
                      <p className="text-white/40 text-[8px] font-mono">Segmentações Ativas e Objetivos de Captação</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Campanha Institucional */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex flex-col justify-between hover:border-brand-cyan/25 transition-colors">
                        <span className="text-xs md:text-sm font-black italic uppercase text-brand-cyan leading-none">Campanha Institucional</span>
                        <p className="text-[10.5px] md:text-xs text-white/80 leading-snug font-semibold mt-1">
                          Fortalecimento da presença da marca e captação de pesquisas relacionadas à empresa.
                        </p>
                      </div>

                      {/* Campanha Proteção Veicular */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex flex-col justify-between hover:border-brand-cyan/25 transition-colors">
                        <span className="text-xs md:text-sm font-black italic uppercase text-brand-cyan leading-none">Campanha Proteção Veicular</span>
                        <p className="text-[10.5px] md:text-xs text-white/80 leading-snug font-semibold mt-1">
                          Captação de usuários com alta intenção de contratação de proteção veicular.
                        </p>
                      </div>

                      {/* Campanha Concorrentes */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex flex-col justify-between hover:border-brand-cyan/25 transition-colors">
                        <span className="text-xs md:text-sm font-black italic uppercase text-brand-cyan leading-none">Campanha Concorrentes</span>
                        <p className="text-[10.5px] md:text-xs text-white/80 leading-snug font-semibold mt-1">
                          Estratégia voltada para usuários pesquisando empresas concorrentes no Google.
                        </p>
                      </div>

                      {/* Campanha Seguro Veicular */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex flex-col justify-between hover:border-brand-cyan/25 transition-colors">
                        <span className="text-xs md:text-sm font-black italic uppercase text-brand-cyan leading-none">Campanha Seguro Veicular</span>
                        <p className="text-[10.5px] md:text-xs text-white/80 leading-snug font-semibold mt-1">
                          Atração de clientes buscando alternativas relacionadas a seguro automotivo.
                        </p>
                      </div>
                    </div>

                    {/* Campanha Cidades com Sedes & Teste CRM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-0.5">
                      {/* Campanha Cidades com Sedes */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex flex-col justify-between hover:border-brand-cyan/25 transition-colors">
                        <span className="text-xs md:text-sm font-black italic uppercase text-brand-cyan leading-none">Campanha Cidades com Sedes</span>
                        <p className="text-[10.5px] md:text-xs text-white/80 leading-snug font-semibold mt-1">
                          Segmentação regional focada nas cidades com operação e presença física.
                        </p>
                      </div>

                      {/* Campanha Teste CRM */}
                      <div className="border border-brand-cyan/35 bg-brand-cyan/5 rounded-xl p-2.5 flex flex-col justify-between shadow-[0_0_15px_-5px_rgba(0,242,255,0.1)]">
                        <div>
                          <span className="text-xs md:text-sm font-black italic uppercase text-brand-cyan cyan-glow leading-none">Campanha Teste CRM</span>
                          <div className="flex flex-col gap-0.5 mt-1.5 font-mono text-[8px] md:text-[9px] font-bold text-white/90 uppercase">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                              PROTEÇÃO VEICULAR TESTE CRM
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                              INSTITUCIONAL TESTE CRM
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                              CONCORRENTES TESTE CRM
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] md:text-[11px] text-brand-cyan leading-tight font-black mt-1.5">
                          Testes de validação do envio e recebimento de leads via CRM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Estratégia Utilizada */}
                <div className="md:col-span-5 flex flex-col">
                  <div className="glass-card p-4 rounded-2xl border-brand-cyan/20 bg-brand-cyan/[0.02] flex flex-col gap-3 h-full shadow-[0_0_30px_-15px_rgba(0,242,255,0.15)]">
                    <div>
                      <span className="text-[8px] font-black uppercase text-brand-cyan tracking-[0.15em] block">Estratégia Utilizada</span>
                      <p className="text-white/40 text-[7px] font-mono">Fundamentos de Performance no canal Google</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-2.5">
                      {[
                        "Todas as campanhas operando na Rede de Pesquisa do Google",
                        "Estratégia focada em intenção de geração de leads",
                        "Campanhas segmentadas por objetivo estratégico",
                        "Estrutura otimizada para geração de leads e conversões",
                        "Estratégia de maximização de conversões aplicada nas campanhas",
                        "Integração e validação de rastreamento via CRM"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 bg-white/[0.01] border border-white/5 rounded-xl p-2.5 hover:border-brand-cyan/15 transition-colors">
                          <div className="p-1 bg-brand-cyan/10 rounded text-brand-cyan mt-0.5 flex-shrink-0 animate-pulse">
                            <Target size={11} />
                          </div>
                          <span className="text-white/80 text-[10px] md:text-xs font-semibold leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide === 12 && (() => {
            const campaigns = [
              {
                name: "Institucional",
                fullName: "[AEG] [RP] - INSTITUCIONAL",
                spent: "R$ 2.752,97",
                cliques: "1.137",
                impressions: "8.158",
                ctr: "13,94%",
                leads: "177",
                whatsapp: "0",
                ligacoes: "44",
                conversionRate: "17,19%",
                cpl: "R$ 14,09",
                topPage: "81,30%",
                strategy: "Campanha com maior volume de leads e excelente custo por conversão, fortalecendo a presença institucional e a geração de demanda qualificada.",
                tag: "Maior Volume & Eficiência",
                isTest: false
              },
              {
                name: "Concorrentes",
                fullName: "[AEG] [RP] - CONCORRENTES",
                spent: "R$ 4.313,91",
                cliques: "544",
                impressions: "9.133",
                ctr: "5,96%",
                leads: "95",
                whatsapp: "21",
                ligacoes: "4",
                conversionRate: "21,42%",
                cpl: "R$ 37,03",
                topPage: "82,54%",
                strategy: "Campanha com alta taxa de conversão focada em usuários pesquisando empresas concorrentes no Google.",
                tag: "Alta Taxa de Conversão",
                isTest: false
              },
              {
                name: "Proteção Veicular",
                fullName: "[AEG] [RP] - PROTEÇÃO VEICULAR",
                spent: "R$ 5.164,83",
                cliques: "630",
                impressions: "6.037",
                ctr: "10,44%",
                leads: "62",
                whatsapp: "33",
                ligacoes: "17",
                conversionRate: "15,71%",
                cpl: "R$ 52,18",
                topPage: "83,19%",
                strategy: "Campanha principal voltada para captação de usuários com alta intenção de contratação de proteção veicular.",
                tag: "Campanha Principal / Escala",
                isTest: false
              },
              {
                name: "Cidade com Sede",
                fullName: "[AEG] [RP] - PROTEÇÃO VEICULAR | CIDADES COM SEDES",
                spent: "R$ 1.158,41",
                cliques: "408",
                impressions: "2.172",
                ctr: "18,78%",
                leads: "16",
                whatsapp: "9",
                ligacoes: "19",
                conversionRate: "7,60%",
                cpl: "R$ 48,96",
                topPage: "85,57%",
                strategy: "Campanha regional com maior CTR da conta, fortalecendo a presença local nas cidades com operação.",
                tag: "Maior CTR / Regional",
                isTest: false
              },
              {
                name: "Seguro Veicular",
                fullName: "[AEG] [RP] - SEGURO VEICULAR",
                spent: "R$ 2.823,22",
                cliques: "137",
                impressions: "2.106",
                ctr: "6,51%",
                leads: "33",
                whatsapp: "0",
                ligacoes: "0",
                conversionRate: "24,09%",
                cpl: "R$ 85,35",
                topPage: "85,85%",
                strategy: "Campanha com maior taxa de conversão da conta, focada em usuários buscando alternativas relacionadas a seguro automotivo.",
                tag: "Maior Tx. Conversão da Conta",
                isTest: false
              },
              {
                name: "Institucional - Teste",
                fullName: "[AEG] [RP] - INSTITUCIONAL TESTE CRM",
                spent: "R$ 1.200,55",
                cliques: "617",
                impressions: "4.852",
                ctr: "12,72%",
                leads: "24",
                whatsapp: "0",
                ligacoes: "21",
                conversionRate: "4,13%",
                cpl: "R$ 47,08",
                topPage: "72,91%",
                strategy: "Campanha utilizada para testes e validação do envio e recebimento de leads via CRM.",
                tag: "Validação Tática de CRM",
                isTest: true
              },
              {
                name: "Proteção V. - Teste",
                fullName: "[AEG] [RP] - PROTEÇÃO VEICULAR TESTE CRM",
                spent: "R$ 4.083,18",
                cliques: "457",
                impressions: "4.501",
                ctr: "10,15%",
                leads: "6",
                whatsapp: "1",
                ligacoes: "16",
                conversionRate: "1,62%",
                cpl: "R$ 540,63",
                topPage: "78,37%",
                strategy: "Estrutura de validação e integração de eventos e conversões através do CRM.",
                tag: "Validação Técnica de CRM",
                isTest: true
              },
              {
                name: "Concorrentes - Teste",
                fullName: "[AEG] [RP] - CONCORRENTES TESTE CRM",
                spent: "R$ 2.617,15",
                cliques: "178",
                impressions: "3.389",
                ctr: "5,25%",
                leads: "2",
                whatsapp: "15",
                ligacoes: "3",
                conversionRate: "1,12%",
                cpl: "R$ 808,57",
                topPage: "75,42%",
                strategy: "Campanha destinada à validação técnica de rastreamento e recebimento de leads via CRM.",
                tag: "Validação Técnica de CRM",
                isTest: true
              }
            ];

            const selected = campaigns[activeGoogleCampaign] || campaigns[0];

            return (
              <div className="w-full max-w-5xl px-4 pt-2 md:pt-4 flex flex-col justify-center items-center gap-2.5 animate-fade-in">
                <div className="flex flex-col items-center gap-1 text-center w-full">
                  <span className="text-brand-cyan font-black italic text-sm md:text-base uppercase tracking-[0.2em] leading-none">GOOGLE ADS</span>
                  <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Performance Individual das Campanhas — Maio</h2>
                  <div className="h-0.5 w-12 bg-white/10 my-1" />
                  <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic leading-none">Visão Analítica Completa por Objetivo Tático Operacional</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 w-full items-stretch">
                  {/* Lado Esquerdo: Lista de Campanhas */}
                  <div className="md:col-span-4 flex flex-row md:flex-col gap-2 md:max-h-[390px] overflow-x-auto md:overflow-y-auto pr-1 pb-2 md:pb-0 scrollbar-thin">
                    <div className="hidden md:flex bg-white/[0.02] border border-white/5 rounded-xl px-2.5 py-1.5 items-center justify-between shrink-0">
                      <span className="text-[8px] font-black uppercase text-white/40 tracking-wider">Campanhas Ativas</span>
                      <span className="text-[7px] font-mono text-brand-cyan font-semibold">Selecione para ver</span>
                    </div>

                    {campaigns.map((camp, idx) => {
                      const isSelected = activeGoogleCampaign === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveGoogleCampaign(idx)}
                          className={cn(
                            "text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between select-none shrink-0 w-44 md:w-full",
                            isSelected
                              ? "border-brand-cyan/40 bg-brand-cyan/5 shadow-[0_0_15px_-5px_rgba(0,242,255,0.15)]"
                              : "border-white/5 bg-white/[0.01] hover:border-white/20"
                          )}
                        >
                          <div className="flex justify-between items-start gap-1.5 w-full">
                            <span className={cn(
                              "text-[10px] md:text-xs font-black italic uppercase leading-none truncate max-w-[130px] md:max-w-[170px]",
                              isSelected ? "text-brand-cyan cyan-glow" : "text-white/80"
                            )}>
                              {camp.name}
                            </span>
                            <span className={cn(
                              "text-[6px] font-mono font-bold px-1 py-0.5 rounded shrink-0 uppercase leading-none",
                              camp.isTest 
                                ? "bg-amber-500/10 text-amber-500/80 border border-amber-500/10" 
                                : "bg-brand-cyan/10 text-brand-cyan/80 border border-brand-cyan/10"
                            )}>
                              {camp.isTest ? "CRM" : "Ativa"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center w-full mt-2 pt-1 border-t border-white/5 leading-none">
                            <span className="text-white/40 text-[7px] font-bold font-mono">
                              Leads: <strong className={isSelected ? "text-brand-cyan" : "text-white"}>{camp.leads}</strong>
                            </span>
                            <span className="text-white/40 text-[7px] font-mono">
                              CPL: <strong className="text-emerald-400 font-bold">{camp.cpl}</strong>
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Lado Direito: Dashboard Detalhado */}
                  <div className="md:col-span-8 flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 relative overflow-hidden">
                    {/* Glowing effect inside */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />

                    {/* Header do Card Ativo */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/5 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                          <span className="text-[7.5px] font-black uppercase text-brand-cyan tracking-widest font-mono">{selected.tag}</span>
                        </div>
                        <h3 className="text-sm md:text-base font-black italic uppercase text-white leading-tight mt-0.5">
                          {selected.fullName}
                        </h3>
                      </div>
                      <div className="bg-white/5 rounded-lg px-2.5 py-1 text-right shrink-0 border border-white/5">
                        <span className="text-[6.5px] text-white/40 font-bold uppercase block tracking-wider leading-none">Investimento</span>
                        <span className="text-xs md:text-sm font-black text-brand-cyan font-mono italic leading-none block mt-0.5">{selected.spent}</span>
                      </div>
                    </div>

                    {/* KPIs Principais (Grid horizontal) */}
                    <div className="grid grid-cols-3 gap-2 mt-2.5">
                      {/* Leads do Card */}
                      <div className="glass-card p-2 rounded-xl border-brand-cyan/25 bg-brand-cyan/[0.03] text-center flex flex-col justify-center shadow-[0_0_15px_-5px_rgba(0,242,255,0.1)]">
                        <span className="text-brand-cyan/80 text-[7px] font-bold uppercase tracking-wider leading-none mb-1 flex items-center justify-center gap-1">
                          <Users size={9} /> Leads Gerados
                        </span>
                        <p className="text-lg md:text-2xl font-black italic text-white uppercase tracking-tighter leading-none font-sans py-0.5">
                          {selected.leads}
                        </p>
                        <span className="text-white/30 text-[5.5px] font-mono block">Cadastros Nativos</span>
                      </div>

                      {/* Taxa de Conversão */}
                      <div className="glass-card p-2 rounded-xl border-white/5 text-center flex flex-col justify-center bg-white/[0.01]">
                        <span className="text-white/40 text-[7px] font-bold uppercase tracking-wider leading-none mb-1 flex items-center justify-center gap-1">
                          <Percent size={9} /> Tx. Conversão
                        </span>
                        <p className="text-lg md:text-2xl font-black italic text-brand-cyan cyan-glow tracking-tighter leading-none font-mono py-0.5">
                          {selected.conversionRate}
                        </p>
                        <span className="text-white/30 text-[5.5px] font-mono block">Métrica de Eficiência</span>
                      </div>

                      {/* Custo/Conv (CPL) */}
                      <div className="glass-card p-2 rounded-xl border-white/5 text-center flex flex-col justify-center bg-white/[0.01]">
                        <span className="text-white/40 text-[7px] font-bold uppercase tracking-wider leading-none mb-1 flex items-center justify-center gap-1">
                          <Target size={9} /> Custo / Conv.
                        </span>
                        <p className="text-lg md:text-2xl font-black italic text-emerald-400 tracking-tighter leading-none font-mono py-0.5">
                          {selected.cpl}
                        </p>
                        <span className="text-white/30 text-[5.5px] font-mono block">Média por Contato</span>
                      </div>
                    </div>

                    {/* Operational Stats Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2.5">
                      {/* Cliques */}
                      <div className="border border-white/5 bg-white/[0.005] p-1.5 rounded-lg text-center">
                        <span className="text-white/30 text-[6.5px] font-bold uppercase block tracking-wider leading-none">Cliques</span>
                        <span className="text-xs font-black text-white italic leading-none block mt-1 font-mono">{selected.cliques}</span>
                      </div>

                      {/* Impressões */}
                      <div className="border border-white/5 bg-white/[0.005] p-1.5 rounded-lg text-center">
                        <span className="text-white/30 text-[6.5px] font-bold uppercase block tracking-wider leading-none">Impressões</span>
                        <span className="text-xs font-black text-white italic leading-none block mt-1 font-mono">{selected.impressions}</span>
                      </div>

                      {/* CTR */}
                      <div className="border border-white/5 bg-white/[0.005] p-1.5 rounded-lg text-center">
                        <span className="text-white/30 text-[6.5px] font-bold uppercase block tracking-wider leading-none">CTR</span>
                        <span className="text-xs font-black text-white italic leading-none block mt-1 font-mono">{selected.ctr}</span>
                      </div>

                      {/* Conversões WhatsApp */}
                      <div className="border border-white/5 bg-white/[0.005] p-1.5 rounded-lg text-center">
                        <span className="text-white/30 text-[6.5px] font-bold uppercase block tracking-wider leading-none flex items-center justify-center gap-0.5">
                          <MessageSquare size={7} /> Whats
                        </span>
                        <span className="text-xs font-black text-white italic leading-none block mt-1 font-mono">{selected.whatsapp}</span>
                      </div>

                      {/* Ligações */}
                      <div className="border border-white/5 bg-white/[0.005] p-1.5 rounded-lg text-center">
                        <span className="text-white/30 text-[6.5px] font-bold uppercase block tracking-wider leading-none flex items-center justify-center gap-0.5">
                          <Phone size={7} /> Ligações
                        </span>
                        <span className="text-xs font-black text-white italic leading-none block mt-1 font-mono">{selected.ligacoes}</span>
                      </div>

                      {/* Pos Topo */}
                      <div className="border border-white/5 bg-white/[0.005] p-1.5 rounded-lg text-center">
                        <span className="text-white/30 text-[6.5px] font-bold uppercase block tracking-wider leading-none">% Topo</span>
                        <span className="text-xs font-black text-brand-cyan italic leading-none block mt-1 font-mono">{selected.topPage}</span>
                      </div>
                    </div>

                    {/* Destaque Estratégico no rodapé do dashboard */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 mt-2.5 text-left flex gap-2 items-start">
                      <div className="p-1 bg-brand-cyan/10 rounded text-brand-cyan shrink-0">
                        <TrendingUp size={11} className="animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[7px] font-black uppercase tracking-widest text-brand-cyan block">Destaque Estratégico</span>
                        <p className="text-white/80 text-[10px] md:text-[11px] leading-relaxed font-semibold mt-0.5">
                          {selected.strategy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {currentSlide === 13 && (
            <div className="w-full max-w-5xl px-4 pt-4 md:pt-8 flex flex-col justify-center items-center gap-3 animate-fade-in text-white">
              {/* Header Container */}
              <div className="flex flex-col items-center gap-1.5 text-center mb-1 w-full">
                <span className="text-brand-cyan font-black italic text-lg uppercase tracking-[0.2em] leading-none">GOOGLE ADS</span>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter mx-auto leading-none mt-1">Interações Geradas — Ligações e WhatsApp</h2>
                <div className="h-0.5 w-12 bg-white/10 my-1" />
                <p className="text-white/30 uppercase tracking-[0.2em] font-bold text-[8px] italic leading-none">Resultado Consolidado dos Canais Diretos de Conversão — Maio</p>
              </div>

              {/* Grid 2 Columns for WhatsApp and Calls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-stretch">
                {/* Lado Esquerdo: WhatsApp */}
                <div className="md:col-span-6 flex flex-col">
                  <div className="glass-card p-4 rounded-2xl border-emerald-500/25 bg-emerald-500/[0.02] flex flex-col justify-between h-full shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] gap-3.5">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-400">
                          <MessageSquare size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-[11px] font-black uppercase text-emerald-400 tracking-[0.15em] block leading-none">RESULTADOS VIA WHATSAPP</span>
                          <p className="text-white/40 text-[8px] font-mono mt-0.5 leading-none">Conversas iniciadas no período</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-white/30 text-[7px] font-bold uppercase block tracking-wider leading-none">TOTAL</span>
                        <span className="text-2xl font-black text-emerald-400 font-mono italic leading-none block mt-0.5">79</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 justify-center">
                      {[
                        { name: "[AEG] [RP] - PROTEÇÃO VEICULAR", val: 33, label: "conversas", isCrm: false },
                        { name: "[AEG] [RP] - CONCORRENTES", val: 21, label: "conversas", isCrm: false },
                        { name: "[AEG] [RP] - CONCORRENTES TESTE CRM", val: 15, label: "conversas", isCrm: true },
                        { name: "[AEG] [RP] - PROTEÇÃO VEICULAR | CIDADES COM SEDES", val: 9, label: "conversas", isCrm: false },
                        { name: "[AEG] [RP] - PROTEÇÃO VEICULAR TESTE CRM", val: 1, label: "conversa", isCrm: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5 hover:border-emerald-500/30 transition-all">
                          <div className="flex items-center gap-2 min-w-0">
                            {item.isCrm && (
                              <span className="text-[6.5px] font-mono font-bold bg-amber-500/10 text-amber-500/80 border border-amber-500/15 px-1 py-0.5 rounded uppercase leading-none shrink-0">CRM</span>
                            )}
                            <span className="text-white/85 text-[10.5px] md:text-xs font-semibold truncate leading-none">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            <span className="text-[12.5px] md:text-sm font-black text-emerald-400 font-mono italic leading-none">{item.val}</span>
                            <span className="text-white/30 text-[7px] font-bold uppercase leading-none">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Ligações */}
                <div className="md:col-span-6 flex flex-col">
                  <div className="glass-card p-4 rounded-2xl border-brand-cyan/25 bg-brand-cyan/[0.02] flex flex-col justify-between h-full shadow-[0_0_30px_-15px_rgba(0,242,255,0.15)] gap-3.5">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-brand-cyan/10 rounded text-brand-cyan">
                          <Phone size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-[11px] font-black uppercase text-brand-cyan tracking-[0.15em] block leading-none">RESULTADOS VIA LIGAÇÕES</span>
                          <p className="text-white/40 text-[8px] font-mono mt-0.5 leading-none">Chamadas diretas geradas via Google</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-white/30 text-[7px] font-bold uppercase block tracking-wider leading-none">TOTAL</span>
                        <span className="text-2xl font-black text-brand-cyan font-mono italic leading-none block mt-0.5">124</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 justify-center">
                      {[
                        { name: "[AEG] [RP] - INSTITUCIONAL", val: 44, label: "ligações", isCrm: false },
                        { name: "[AEG] [RP] - INSTITUCIONAL TESTE CRM", val: 21, label: "ligações", isCrm: true },
                        { name: "[AEG] [RP] - PROTEÇÃO VEICULAR | CIDADES COM SEDES", val: 19, label: "ligações", isCrm: false },
                        { name: "[AEG] [RP] - PROTEÇÃO VEICULAR", val: 17, label: "ligações", isCrm: false },
                        { name: "[AEG] [RP] - PROTEÇÃO VEICULAR TESTE CRM", val: 16, label: "ligações", isCrm: true },
                        { name: "[AEG] [RP] - CONCORRENTES", val: 4, label: "ligações", isCrm: false },
                        { name: "[AEG] [RP] - CONCORRENTES TESTE CRM", val: 3, label: "ligações", isCrm: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5 hover:border-brand-cyan/30 transition-all">
                          <div className="flex items-center gap-2 min-w-0">
                            {item.isCrm && (
                              <span className="text-[6.5px] font-mono font-bold bg-amber-500/10 text-amber-500/80 border border-amber-500/15 px-1 py-0.5 rounded uppercase leading-none shrink-0">CRM</span>
                            )}
                            <span className="text-white/85 text-[10.5px] md:text-xs font-semibold truncate leading-none">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            <span className="text-[12.5px] md:text-sm font-black text-brand-cyan font-mono italic leading-none">{item.val}</span>
                            <span className="text-white/30 text-[7px] font-bold uppercase leading-none">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Análise Estratégica no rodapé do slide */}
              <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-left shadow-lg mt-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-brand-cyan tracking-[0.15em]">Análise Estratégica</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-1.5">
                  {[
                    "Alto volume de interações de alta intenção",
                    "Forte geração de contatos diretos via WhatsApp",
                    "Campanhas institucionais apresentaram maior volume de ligações",
                    "Estratégia focada em oportunidades comerciais qualificadas",
                    "Presença eficiente nas pesquisas de alta intenção do Google"
                  ].map((analise, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 bg-white/[0.01] border border-white/5 rounded-xl p-2.5 hover:border-brand-cyan/15 transition-colors">
                      <div className="p-0.5 bg-brand-cyan/10 rounded text-brand-cyan mt-0.5 shrink-0">
                        <Target size={10} />
                      </div>
                      <p className="text-white/80 text-[10px] leading-tight font-semibold">{analise}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SlideWrapper>
      </main>

      {/* Footer / Controls */}
      <footer className="py-4 px-6 md:py-5 md:px-8 flex justify-between items-center z-50">
        <div className="flex gap-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentSlide === i ? "w-12 bg-brand-cyan" : "w-3 bg-white/10"
              )} 
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-brand-cyan transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="px-6 h-12 rounded-full bg-white text-brand-black font-black italic tracking-widest flex items-center gap-2 hover:bg-brand-cyan transition-all active:scale-95 shadow-xl text-xs sm:text-sm"
          >
             {currentSlide === totalSlides - 1 ? "REINICIAR" : "PRÓXIMO"} <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
