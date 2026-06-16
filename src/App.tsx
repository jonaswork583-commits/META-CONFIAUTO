/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Target, 
  DollarSign, 
  MousePointer2, 
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Calendar,
  Search,
  Filter,
  Layers
} from 'lucide-react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { PERFORMANCE_DATA, CampaignData, GOOGLE_ADS_DATA, GoogleCampaign } from './constants';

const SlideWrapper = ({ children, slideKey }: { children: React.ReactNode; slideKey: number }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={slideKey}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-start p-4 md:py-6 md:px-12 overflow-y-auto"
      id={`slide-wrapper-${slideKey}`}
    >
      <div className="w-full max-w-5xl my-auto py-2 flex flex-col items-center justify-center" id={`slide-container-${slideKey}`}>
        {children}
      </div>
    </motion.div>
  </AnimatePresence>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9; // Capa Meta + 6 Campanhas Meta + 1 Pareto + Funil Consolidado de Vendas

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

  // Calcular o Investimento Total de cada semana
  const totalWeek1Investment = PERFORMANCE_DATA.campaigns.reduce((sum, c) => sum + (c.week1.investment || 0), 0);
  const totalWeek2Investment = PERFORMANCE_DATA.campaigns.reduce((sum, c) => sum + (c.week2.investment || 0), 0);
  const totalJuneInvestment = totalWeek1Investment + totalWeek2Investment;

  // Calculador de variação para KPI
  function getChange(val1: number | undefined, val2: number | undefined, invertColor = false) {
    if (!val1 || !val2) return null;
    const pct = ((val2 - val1) / val1) * 100;
    const isPositive = pct >= 0;
    const absPct = Math.abs(pct).toFixed(1);
    
    let colorClass = "";
    if (invertColor) {
      colorClass = isPositive ? "text-rose-400 bg-rose-500/10 border-rose-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    } else {
      colorClass = isPositive ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }
    
    return {
      label: `${isPositive ? '↑' : '↓'} ${absPct}%`,
      pct: isPositive ? `+${absPct}%` : `-${absPct}%`,
      colorClass,
      isPositive
    };
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col relative text-white antialiased overflow-hidden font-sans" id="app-root">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/5 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" id="bg-glow-1" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" id="bg-glow-2" />

      {/* Header */}
      <header className="py-3 px-6 md:py-4 md:px-8 flex justify-between items-center z-50 border-b border-white/5 bg-[#07090e]/60 backdrop-blur-md" id="app-header">
        <div className="flex items-center gap-4" id="header-brand">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tighter">AEG<span className="text-brand-cyan font-semibold">MEDIA</span></span>
            <span className="text-[8px] text-white/40 tracking-[0.2em] font-extrabold uppercase -mt-1">Performance Report</span>
          </div>
        </div>
        <div className="text-right" id="header-meta">
          <p className="text-[10px] text-brand-cyan uppercase tracking-[0.15em] font-black italic">CONFIAUTO PROTEÇÃO VEICULAR</p>
          <p className="text-[8px] text-white/40 tracking-widest font-mono uppercase mt-0.5">{PERFORMANCE_DATA.period}</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center w-full min-h-[500px]" id="slide-viewer">
        <SlideWrapper slideKey={currentSlide}>
          
          {/* SLIDE 0: CAPA / COMPARATIVO GLOBAL */}
          {currentSlide === 0 && (
            <div className="w-full max-w-4xl px-4 flex flex-col justify-center items-center gap-8 animate-fade-in py-6" id="slide-0-capa">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
                  <h2 className="text-brand-cyan text-xs sm:text-sm font-black tracking-[0.6em] uppercase text-center">Apresentação de Performance</h2>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter leading-[0.9] uppercase text-center font-display">
                  RELATÓRIO COMPARATIVO <br />
                  <span className="text-brand-cyan cyan-glow font-extrabold">CONFIAUTO</span>
                </h1>
                
                <p className="text-white/40 font-mono tracking-widest text-[9px] uppercase">
                  Foco total no resultado consolidado de junho
                </p>
              </div>

              {/* Tabela de Resumo Consolidado de Investimento */}
              <div className="w-full max-w-2xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 relative overflow-hidden mt-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-brand-cyan" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Investimento Acumulado no Período</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-cyan">Junho 2026</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 1 (01-08 Jun)</span>
                    <span className="text-lg font-black font-mono mt-2 text-white/90">
                      R$ {totalWeek1Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 2 (09-15 Jun)</span>
                    <span className="text-lg font-black font-mono mt-2 text-brand-cyan">
                      R$ {totalWeek2Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-brand-cyan/5 border border-brand-cyan/20 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-brand-cyan font-black uppercase tracking-wider">Consolidado Total</span>
                    <span className="text-xl font-black font-mono mt-2 text-brand-cyan cyan-glow">
                      R$ {totalJuneInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30 uppercase">
                  <span>Variação de Aporte Semanal</span>
                  <span className="px-2 py-0.5 rounded-md border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan font-bold">
                    + {(((totalWeek2Investment - totalWeek1Investment) / totalWeek1Investment) * 100).toFixed(1)}% na segunda semana
                  </span>
                </div>
              </div>

              <div className="text-white/30 text-[9px] uppercase tracking-widest font-medium flex items-center gap-2">
                <span>Clique nos botões abaixo ou use as setas do teclado para navegar</span>
              </div>
            </div>
          )}

          {/* SLIDES DE CAMPANHAS INDIVIDUAIS DE META ADS */}
          {currentSlide > 0 && currentSlide <= 7 && currentSlide !== 4 && (() => {
            const campaignIndex = currentSlide < 4 ? currentSlide - 1 : currentSlide - 2;
            const campaign: CampaignData = PERFORMANCE_DATA.campaigns[campaignIndex];
            
            // Unpack week values dynamically
            const w1Val = campaign.id === 'alcance' 
              ? campaign.week1.reach 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week1.visits 
                : campaign.week1.leads;

            const w2Val = campaign.id === 'alcance' 
              ? campaign.week2.reach 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week2.visits 
                : campaign.week2.leads;

            const w1UnitVal = campaign.id === 'alcance' 
              ? campaign.week1.cpm 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week1.cpv 
                : campaign.week1.cpl;

            const w2UnitVal = campaign.id === 'alcance' 
              ? campaign.week2.cpm 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week2.cpv 
                : campaign.week2.cpl;

            // Variações
            const varInvest = getChange(campaign.week1.investment, campaign.week2.investment);
            const varVolume = getChange(w1Val, w2Val);
            // Redução de custo (CPL/CPM/CPV) é boa (verde), aumento de custo é ruim (vermelho). Por isso, invertColor = true
            const varUnit = getChange(w1UnitVal, w2UnitVal, true);

            // Budget Weight em relação à semana 2 (atual corrente)
            const budgetShareWeek2 = ((campaign.week2.investment / totalWeek2Investment) * 100).toFixed(1);

            return (
              <div className="w-full max-w-5xl px-4 flex flex-col justify-center gap-6 md:gap-8 animate-fade-in select-none" id={`slide-campaign-${campaign.id}`}>
                
                {/* Header do Slide */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                        {campaign.tag}
                      </span>
                      <span className="text-white/40 text-[9px] font-mono tracking-wider">
                        Slide {currentSlide} de {totalSlides - 1} • Meta Ads
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white font-display mt-2 sm:mt-2.5">
                      {campaign.name}
                    </h2>
                    <p className="text-white/50 text-[10px] md:text-xs tracking-wide font-medium mt-1">
                      Objetivo: {campaign.objective}
                    </p>
                  </div>

                  <div className="bg-white/[0.015] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Fatia do Budget (Semana 2)</span>
                      <span className="text-base font-black text-brand-cyan cyan-glow font-mono leading-none">{budgetShareWeek2}%</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/15" />
                    <div className="text-right">
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Total Semana 2</span>
                      <span className="text-xs font-mono font-bold text-white/70">
                        R$ {campaign.week2.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid de KPIs Centrais - COMPARATIVO S1 vs S2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 w-full" id={`kpi-grid-${campaign.id}`}>
                  
                  {/* KPI 1: INVESTIMENTO DIRETO */}
                  <div className="glass-card p-5 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between relative overflow-hidden h-[155px] hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[9px] font-mono font-black uppercase tracking-widest">Investimento Semanal</span>
                      <span className="p-1.5 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                        <DollarSign size={15} />
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-1 border-t border-white/[0.03]">
                      <div>
                        <span className="text-[7.5px] text-white/30 uppercase font-mono block">Semana 1</span>
                        <p className="text-sm md:text-base font-bold font-mono text-white/80 leading-none mt-1">
                          R$ {campaign.week1.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7.5px] text-brand-cyan uppercase font-mono block">Semana 2</span>
                        <p className="text-sm md:text-base font-black font-mono text-brand-cyan leading-none mt-1">
                          R$ {campaign.week2.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-[8px] font-mono text-white/20 uppercase">Variação</span>
                      {varInvest && (
                        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border", varInvest.colorClass)}>
                          {varInvest.pct}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* KPI 2: VOLUME DE RESULTADOS */}
                  <div className="glass-card p-5 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between relative overflow-hidden h-[155px] hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[9px] font-mono font-black uppercase tracking-widest">
                        Volume: {campaign.metricLabel}
                      </span>
                      <span className="p-1.5 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                        {campaign.id === 'alcance' ? <Eye size={15} /> : campaign.id === 'trafego_perfil' ? <MousePointer2 size={15} /> : <Users size={15} />}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-1 border-t border-white/[0.03]">
                      <div>
                        <span className="text-[7.5px] text-white/30 uppercase font-mono block">Semana 1</span>
                        <p className="text-base md:text-lg font-bold font-mono text-white/80 leading-none mt-1">
                          {w1Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7.5px] text-brand-cyan uppercase font-mono block">Semana 2</span>
                        <p className="text-base md:text-lg font-black font-mono text-brand-cyan leading-none mt-1 animate-pulse">
                          {w2Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-[8px] font-mono text-white/20 uppercase">Variação</span>
                      {varVolume && (
                        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border", varVolume.colorClass)}>
                          {varVolume.pct}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* KPI 3: CUSTO UNITÁRIO */}
                  <div className="glass-card p-5 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between relative overflow-hidden h-[155px] hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[9px] font-mono font-black uppercase tracking-widest">
                        Custo Unitário ({campaign.unitLabel})
                      </span>
                      <span className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Target size={15} />
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-1 border-t border-white/[0.03]">
                      <div>
                        <span className="text-[7.5px] text-white/30 uppercase font-mono block">Semana 1</span>
                        <p className="text-sm md:text-base font-bold font-mono text-white/80 leading-none mt-1">
                          R$ {w1UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7.5px] text-emerald-400 uppercase font-mono block">Semana 2</span>
                        <p className="text-sm md:text-base font-black font-mono text-emerald-400 leading-none mt-1">
                          R$ {w2UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-[8px] font-mono text-white/20 uppercase">Desempenho</span>
                      {varUnit && (
                        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1", varUnit.colorClass)}>
                          {varUnit.isPositive ? '↑' : '↓'} {Math.abs(((w2UnitVal! - w1UnitVal!) / w1UnitVal!) * 100).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Sub-painel detalhado por base para a Campanha de Contratação */}
                {campaign.id === "contratacao" && campaign.week2Bases && (
                  <div className="w-full bg-white/[0.015] border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col gap-4 animate-fade-in" id="contratacao-bases-panel">
                    <div className="border-b border-white/5 pb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-brand-cyan" />
                        <span className="text-xs font-black uppercase tracking-wider text-white">Detalhamento por Base (Semana 2)</span>
                      </div>
                      <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono">Últimos 7 dias • 09 a 15 de Junho</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {campaign.week2Bases.map((base, idx) => (
                        <div key={idx} className="bg-[#0c0f17] border border-white/5 rounded-xl p-4 hover:border-brand-cyan/20 transition-all duration-300">
                          <h4 className="text-white font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 mb-3 border-b border-white/5 pb-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                            {base.name}
                          </h4>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-white/40">Investimento</span>
                              <span className="font-mono font-semibold text-white/80">
                                R$ {base.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-white/40">Contatos (Leads)</span>
                              <span className="font-mono font-bold text-brand-cyan">{base.leads}</span>
                            </div>
                            <div className="flex justify-between text-[11px] pt-1 border-t border-white/[0.03]">
                              <span className="text-brand-cyan/70 font-bold">Custo por Lead (CPL)</span>
                              <span className="font-mono font-black text-emerald-400">
                                R$ {base.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })()}

          {/* SLIDE 4: GRÁFICO DE PARETO & DIREÇÃO/PROJEÇÃO DE LEADS */}
          {currentSlide === 4 && (
            <div className="w-full max-w-5xl px-2 sm:px-4 flex flex-col justify-center gap-5 md:gap-6 animate-fade-in select-none" id="slide-pareto-leads">
              {/* Header do Slide */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                      Análise Estratégica
                    </span>
                    <span className="text-white/40 text-[9px] font-mono tracking-wider">
                      Slide 4 de {totalSlides - 1} • Pareto & Tendência de Resultados
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white font-display mt-2 sm:mt-2.5">
                    DIRECIONAL DE CRESCIMENTO COMERCIAL
                  </h2>
                  <p className="text-white/50 text-[10px] md:text-xs tracking-wide font-medium mt-1">
                    Análise comparativa do volume conjunto das campanhas de Vendas (LPA, LPB e CRM) entre a Semana 1 e 2
                  </p>
                </div>

                <div className="bg-white/[0.015] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Acumulado Comercial</span>
                    <span className="text-base font-black text-brand-cyan cyan-glow font-mono leading-none">456 Leads</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div className="text-right">
                    <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Média Comercial</span>
                    <span className="text-xs font-mono font-bold text-white/70">~30.4 leads/dia</span>
                  </div>
                </div>
              </div>

              {/* Grid principal */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                
                {/* Lado Esquerdo: Gráfico de Pareto (Recharts) */}
                <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 md:p-6 relative overflow-hidden flex flex-col hover:border-brand-cyan/15 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl rounded-full" />
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/[0.03]">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">Comparativo Semanal (LPA + LPB + CRM)</span>
                    <span className="text-[8px] font-mono text-white/40 uppercase">Tendência Semanal de Vendas</span>
                  </div>
                  
                  {/* Container para o Recharts ComposedChart */}
                  <div className="h-[240px] w-full mt-2" style={{ minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={[
                          { name: 'Semana 1', leads: 183, trend: 183 },
                          { name: 'Semana 2', leads: 273, trend: 273 }
                        ]}
                        margin={{ top: 15, right: 15, bottom: 0, left: -20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis 
                          dataKey="name" 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={11} 
                          fontFamily="Inter"
                          fontWeight="bold"
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={9} 
                          fontFamily="monospace"
                          domain={[0, 320]}
                          label={{ value: 'Vol. Leads Comerciais', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: 9, offset: 5 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0c0f17', 
                            borderColor: 'rgba(255, 255, 255, 0.1)', 
                            borderRadius: '12px',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: '11px'
                          }} 
                          itemStyle={{ color: '#fff' }}
                        />
                        <Bar 
                          dataKey="leads" 
                          name="Volume de Leads"
                          fill="#00f2ff" 
                          radius={[6, 6, 0, 0]} 
                          barSize={50}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="trend" 
                          name="Direcionador de Crescimento"
                          stroke="#ffffff" 
                          strokeWidth={3}
                          dot={{ fill: '#00f2ff', r: 5, stroke: '#07090e', strokeWidth: 2 }}
                          activeDot={{ r: 7 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex gap-4 items-center justify-center text-[9px] font-mono text-white/40 mt-3 pt-2 border-t border-white/[0.03]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="w-2.5 h-2.5 bg-brand-cyan rounded-sm" />
                      <span>Leads Comerciais (Barras)</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="w-2.5 h-[2px] bg-white" />
                      <span>Linha de Tendência de Vendas (+49.2%)</span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Compilado Mensal & Projeção */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  {/* Comparativo de Semanas com Seta Direcional */}
                  <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 hover:border-brand-cyan/25 transition-all duration-300">
                    <span className="text-[8px] text-white/40 font-black uppercase tracking-widest block mb-3">Movimento do Volume de Leads Comerciais</span>
                    
                    <div className="flex justify-between items-center bg-white/[0.015] p-3 rounded-xl border border-white/[0.03]">
                      <div className="text-center flex-1">
                        <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider">Semana 1</span>
                        <p className="text-2xl font-black font-mono text-white mt-1">183</p>
                        <span className="text-[7px] text-white/30 font-mono">01 a 08 Jun</span>
                      </div>

                      {/* Line Vector representing the direction / projection */}
                      <div className="flex flex-col items-center px-1 relative min-w-[70px]">
                        <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mb-1">
                          +49.2%
                        </span>
                        {/* Custom SVG horizontal arrow showing upward total line direction */}
                        <svg className="w-12 h-6" viewBox="0 0 50 20" fill="none">
                          <path d="M5 10H42" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="3 3"/>
                          <path d="M38 6L44 10L38 14" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[7px] text-emerald-400/90 font-mono text-center leading-none mt-1 uppercase tracking-tighter">Forte Alta</span>
                      </div>

                      <div className="text-center flex-1">
                        <span className="text-[8px] text-brand-cyan font-bold uppercase tracking-wider">Semana 2</span>
                        <p className="text-2xl font-black font-mono text-brand-cyan cyan-glow mt-1">273</p>
                        <span className="text-[7px] text-brand-cyan/40 font-mono">09 a 15 Jun</span>
                      </div>
                    </div>

                    {/* Quality Shift Explanation */}
                    <div className="mt-3 bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-lg flex gap-2 items-center">
                      <TrendingUp size={14} className="text-brand-cyan shrink-0 animate-pulse" />
                      <p className="text-[9.5px] leading-snug text-white/60">
                        <strong className="text-brand-cyan font-semibold">Excelente Tração:</strong> Graças ao excelente desempenho de conversão e otimizações, o volume de vendas das campanhas de <span className="text-white">vendas comerciais reais (LPA + LPB + CRM)</span> saltou de <span className="text-white font-mono font-bold">183</span> para <span className="text-brand-cyan font-mono font-bold">273 (+49,2%)</span>, trazendo um crescimento vigoroso no fluxo comercial de novos clientes.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* SLIDE 8: FUNIL CONSOLIDADO DE VENDAS */}
          {currentSlide === 8 && (
            <div className="w-full max-w-4xl px-4 flex flex-col justify-center gap-6 animate-fade-in select-none py-2" id="slide-8-funnel">
              
              {/* Header do Slide */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                      MARCO HISTÓRICO • JUNHO ACUMULADO
                    </span>
                    <span className="text-white/40 text-[9px] font-mono tracking-wider">
                      Slide 8 de {totalSlides - 1} • Funil de Marketing Integrado
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white font-display mt-2 sm:mt-2.5">
                    FUNIL CONSOLIDADO DE VENDAS
                  </h2>
                  <p className="text-white/40 text-[10px] md:text-sm tracking-wide font-medium mt-1 uppercase font-mono">
                    Estrutura Completa de Conversão (01 a 15 de Junho)
                  </p>
                </div>

                {/* Valor investido destacado no topo do slide */}
                <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-xl px-5 py-2.5 flex flex-col justify-center items-end shrink-0 relative overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.05)] text-right">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/15 blur-2xl rounded-full pointer-events-none" />
                  <span className="text-[8px] text-brand-cyan font-black uppercase tracking-[0.15em] relative z-10 block">INVESTIMENTO TOTAL DO MÊS</span>
                  <span className="text-xl font-black text-white cyan-glow font-mono mt-0.5 relative z-10 leading-none">R$ 66.373,00</span>
                </div>
              </div>

              {/* Corpo Principal: Lado Esquerdo Grafico do Funil / Lado Direito Comentários de Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">
                
                {/* LADO ESQUERDO: O DESENHO DO FUNIL */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center py-2 relative">
                  
                  {/* ETAPA 1: ALCANCE - TOPO DO FUNIL */}
                  <div className="w-full max-w-[460px] relative transition-all hover:scale-[1.01] duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 via-brand-cyan/5 to-brand-cyan/20 rounded-2xl border-t border-x border-brand-cyan/30 blur-sm pointer-events-none" />
                    <div className="relative bg-[#0d121c]/80 border border-brand-cyan/30 rounded-2xl p-4 md:py-5 md:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />
                      
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                            <Layers size={18} />
                          </div>
                          <div>
                            <span className="text-[10px] text-brand-cyan font-mono font-black uppercase tracking-wider block">TOPO DO FUNIL</span>
                            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Alcance & Impressões</h3>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[8px] text-white/30 uppercase font-mono block">Mês Completo</span>
                          <span className="text-2xl font-black font-mono text-white tracking-tight cyan-glow">671.724</span>
                          <span className="text-[9px] text-white/50 block font-medium -mt-1">Pessoas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transition Indicator 1 */}
                  <div className="my-1.5 flex flex-col items-center relative z-20">
                    <div className="w-[1.5px] h-6 bg-gradient-to-b from-brand-cyan/50 to-brand-cyan/10 animate-pulse" />
                    <span className="absolute text-[8px] font-mono font-bold text-brand-cyan/60 bg-[#07090e] px-1.5 py-0.5 rounded-full border border-brand-cyan/10 -translate-y-0.5">
                      Atração para o Perfil
                    </span>
                  </div>

                  {/* ETAPA 2: TRÁFEGO PARA PERFIL - MEIO DO FUNIL */}
                  <div className="w-full max-w-[370px] relative transition-all hover:scale-[1.01] duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/15 via-transparent to-brand-cyan/15 rounded-2xl border-t border-x border-brand-cyan/20 blur-xs pointer-events-none" />
                    <div className="relative bg-[#0b0e15]/90 border border-brand-cyan/20 rounded-2xl p-3.5 md:py-4.5 md:px-5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                      
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-brand-cyan/5 border border-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0">
                            <Users size={16} />
                          </div>
                          <div>
                            <span className="text-[9px] text-white/50 font-mono font-black uppercase tracking-wider block">MEIO DO FUNIL</span>
                            <h3 className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-tight">Tráfego de Perfil</h3>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[8px] text-white/30 uppercase font-mono block">Volume Ativo</span>
                          <span className="text-xl font-black font-mono text-brand-cyan">2.432</span>
                          <span className="text-[8px] text-brand-cyan/70 block font-medium">Visitas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transition Indicator 2 */}
                  <div className="my-1.5 flex flex-col items-center relative z-20">
                    <div className="w-[1.5px] h-6 bg-gradient-to-b from-brand-cyan/40 to-brand-cyan/10" />
                    <span className="absolute text-[8px] font-mono font-black text-brand-cyan bg-[#07090e] px-2 py-0.5 rounded-full border border-brand-cyan/30 -translate-y-0.5 shadow-[0_0_10px_rgba(34,211,238,0.1)] animate-pulse">
                      23,85% Conversão Final
                    </span>
                  </div>

                  {/* ETAPA 3: CONVERSÃO - BASE DO FUNIL */}
                  <div className="w-full max-w-[280px] relative transition-all hover:scale-[1.01] duration-300">
                    <div className="absolute inset-0 bg-brand-cyan/10 blur-xl rounded-2xl opacity-40 pointer-events-none" />
                    <div className="relative bg-brand-cyan/[0.04] border-2 border-brand-cyan/50 rounded-2xl p-4 shadow-[0_10px_40px_rgba(34,211,238,0.1)] overflow-hidden">
                      <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-brand-cyan/10 blur-2xl rounded-full pointer-events-none" />
                      
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0 animate-bounce">
                            <Target size={20} />
                          </div>
                          <div>
                            <span className="text-[10px] text-brand-cyan font-mono font-black uppercase tracking-wider block">BASE DO FUNIL</span>
                            <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">Conversão</h3>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[8px] text-white/40 uppercase font-mono block font-black">Meta de Leads</span>
                          <span className="text-2xl sm:text-3xl font-black font-mono text-brand-cyan cyan-glow">580</span>
                          <span className="text-[10px] text-brand-cyan font-black block -mt-1 font-sans">Leads Gerados</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* LADO DIREITO: COMENTÁRIOS E INSIGHTS EXECUTIVOS */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4">
                  
                  {/* Card 1: Eficiência do Funil */}
                  <div className="bg-white/[0.010] border border-white/5 rounded-2xl p-5 hover:border-brand-cyan/15 transition-all duration-300">
                    <div className="flex items-center gap-2.5 mb-3">
                      <TrendingUp size={18} className="text-brand-cyan" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">Eficiência Comercial</h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-start text-xs border-b border-white/[0.02] pb-2">
                        <span className="text-white/40 font-mono">Custo Médio / Lead:</span>
                        <span className="font-bold font-mono text-brand-cyan">R$ 114,44</span>
                      </li>
                      <li className="flex justify-between items-start text-xs border-b border-white/[0.02] pb-2">
                        <span className="text-white/40 font-mono">Taxa de Conversão:</span>
                        <span className="font-bold font-mono text-emerald-400">23,85%</span>
                      </li>
                      <li className="flex justify-between items-start text-xs">
                        <span className="text-white/40 font-mono">Custo por Visita Perfil:</span>
                        <span className="font-bold font-mono text-white/90">R$ 27,29</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 2: Diretriz Estratégica */}
                  <div className="bg-white/[0.010] border border-white/5 rounded-2xl p-5 hover:border-[#ffffff10] transition-all duration-300">
                    <div className="flex items-center gap-2.5 mb-2 border-b border-white/5 pb-2">
                      <Filter size={16} className="text-white/50" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/80">Comentário Analítico</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/60">
                      O aporte financeiro estratégico de <span className="text-white font-mono font-bold">R$ 66.373,00</span> gerou um impacto expressivo, somando mais de <span className="text-white font-bold">671.724 impressões qualificadas</span> (alcance amplo no topo).
                    </p>
                    <p className="text-[11px] leading-relaxed text-white/60 mt-1.5">
                      No nível médio de consideração, registramos <span className="text-brand-cyan font-bold">2.432 visitas no perfil</span>. A base converteu com alta eficiência, resultando no volume histórico consolidado de <span className="text-brand-cyan font-mono font-bold">580 leads qualificados gerados</span> para a Confiauto até o dia 15 deste mês.
                    </p>
                  </div>

                </div>

              </div>
              
            </div>
          )}

        </SlideWrapper>
      </main>

      {/* Footer / controls */}
      <footer className="py-4 px-6 md:py-5 md:px-8 flex justify-between items-center z-50 border-t border-white/5 bg-[#07090e]/60 backdrop-blur-md" id="app-footer">
        <div className="flex gap-2 sm:gap-3" id="indicator-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 hover:bg-brand-cyan/80",
                currentSlide === i ? "w-10 bg-brand-cyan" : "w-2.5 bg-white/10"
              )} 
              title={`Ir para o Slide ${i}`}
              id={`bullet-${i}`}
            />
          ))}
        </div>

        <div className="flex gap-4" id="carousel-buttons">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-brand-cyan transition-all active:scale-95 hover:border-brand-cyan/20 border-white/5 bg-white/[0.01]"
            title="Slide Anterior"
            id="prev-btn"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="px-6 h-12 rounded-full bg-white text-[#07090e] font-black italic tracking-widest flex items-center gap-2 hover:bg-brand-cyan transition-all active:scale-95 shadow-xl text-xs sm:text-sm shadow-blue-500/5 hover:text-white"
            title="Próximo Slide"
            id="next-btn"
          >
             {currentSlide === totalSlides - 1 ? "REINICIAR" : "PRÓXIMO"} <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
