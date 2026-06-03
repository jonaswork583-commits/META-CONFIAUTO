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
  const totalSlides = 9;

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
                      <p className="text-white/80 text-[10.5px] leading-relaxed font-semibold">
                        Desempenho histórico liderando a campanha de ponta a ponta. Canalizou <strong className="text-white">591 contatos diretos</strong> de candidatos engajados no WhatsApp com custo de <strong className="text-white font-mono">R$ 1,38</strong>.
                      </p>
                    </div>
                  </div>
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
