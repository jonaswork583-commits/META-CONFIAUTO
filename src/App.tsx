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
  const [funnelWeek, setFunnelWeek] = useState<'week1' | 'week2' | 'week3'>('week3');
  const [funnelSource, setFunnelSource] = useState<'consolidated' | 'meta' | 'google'>('consolidated');
  const [funnelMode, setFunnelMode] = useState<'channels' | 'comparison'>('channels');

  const unifiedFunnelData = {
    consolidated: {
      label: "Formatos Unificados (Meta + Google)",
      investment: 128092.40,
      reach: 1578851,
      clicks: 79557,
      visits: 10966,
      leads: 1464,
      ctr: "5,04%",
      loadingRate: "13,78%",
      conversionRate: "13,35%"
    },
    meta: {
      label: "Meta Ads unicamente",
      investment: 97379.56,
      reach: 809461,
      clicks: 75385,
      visits: 10436,
      leads: 1391,
      ctr: "9,31%",
      loadingRate: "13,84%",
      conversionRate: "13,33%"
    },
    google: {
      label: "Google Ads unicamente",
      investment: 30712.84,
      reach: 769390,
      clicks: 4172,
      visits: 530,
      leads: 73,
      ctr: "0,54%",
      loadingRate: "12,70%",
      conversionRate: "13,77%"
    }
  };

  const lpFunnelData = {
    label: "Campanha de LP (Landing Page)",
    investment: 57724.39,
    reach: 460000,
    clicks: 36800,
    visits: 5520,
    leads: 702,
    ctr: "8,00%",
    loadingRate: "15,00%",
    conversionRate: "12,72%",
    cpl: 82.23
  };

  const crmFunnelData = {
    label: "Campanha de CRM (Esteira Direta)",
    investment: 43558.09,
    reach: 349461,
    clicks: 38585,
    visits: 4916,
    leads: 750,
    ctr: "11,04%",
    loadingRate: "12,74%",
    conversionRate: "15,26%",
    cpl: 58.08
  };

  const selectedUnified = unifiedFunnelData[funnelSource];

  const funnelData = {
    week1: {
      label: "Semana 1 (01 a 08 de Junho)",
      investment: 24947.34,
      reach: 491540,
      ctr: "2.12%",
      clicks: 10420,
      loadingRate: "12.86%",
      visits: 1340,
      conversionRate: "11.94%",
      leads: 183,
      lpLeads: 160,
      crmLeads: 23,
      cplCommercial: 117.37,
      visitsPeril: 1871
    },
    week2: {
      label: "Semana 2 (09 a 15 de Junho)",
      investment: 28884.03,
      reach: 180184,
      ctr: "2.25%",
      clicks: 4054,
      loadingRate: "29.60%",
      visits: 1200,
      conversionRate: "16.00%",
      leads: 273,
      lpLeads: 192,
      crmLeads: 81,
      cplCommercial: 97.57,
      visitsPeril: 561
    },
    week3: {
      label: "Semana 3 (16 a 22 de Junho)",
      investment: 29464.16,
      reach: 210140,
      ctr: "3.05%",
      clicks: 6408,
      loadingRate: "14.03%",
      visits: 899,
      conversionRate: "16.46%",
      leads: 417,
      lpLeads: 148,
      crmLeads: 269,
      cplCommercial: 65.42,
      visitsPeril: 1980
    }
  };

  const selectedFunnel = funnelData[funnelWeek];
  const totalSlides = 8; // Capa Meta + 5 Campanhas Meta + 1 Pareto + Funil Consolidado de Tráfego

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
  const totalWeek3Investment = PERFORMANCE_DATA.campaigns.reduce((sum, c) => sum + (c.week3.investment || 0), 0);
  const totalWeek4Investment = PERFORMANCE_DATA.campaigns.reduce((sum, c) => sum + (c.week4?.investment || 0), 0);
  const totalWeek5Investment = PERFORMANCE_DATA.campaigns.reduce((sum, c) => sum + (c.week5?.investment || 0), 0);
  const totalPeriodInvestment = totalWeek1Investment + totalWeek2Investment + totalWeek3Investment + totalWeek4Investment + totalWeek5Investment;

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
                  Foco no resultado consolidado de Junho e início de Julho
                </p>
              </div>

              {/* Tabela de Resumo Consolidado de Investimento */}
              <div className="w-full max-w-3xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 relative overflow-hidden mt-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-brand-cyan" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Investimento Acumulado por Semana</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-cyan">Junho e Julho 2026</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 1 (01-08 Jun)</span>
                    <span className="text-base font-bold font-mono mt-2 text-white/80">
                      R$ {totalWeek1Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 2 (09-15 Jun)</span>
                    <span className="text-base font-bold font-mono mt-2 text-white/95">
                      R$ {totalWeek2Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 3 (16-22 Jun)</span>
                    <span className="text-base font-bold font-mono mt-2 text-white/95">
                      R$ {totalWeek3Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 4 (23-29 Jun)</span>
                    <span className="text-base font-bold font-mono mt-2 text-white/95">
                      R$ {totalWeek4Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-white/[0.015] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Semana 5 (01-07 Jul)</span>
                    <span className="text-base font-black font-mono mt-2 text-brand-cyan">
                      R$ {totalWeek5Investment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-brand-cyan/5 border border-brand-cyan/20 p-4 rounded-xl flex flex-col justify-between col-span-2 md:col-span-1">
                    <span className="text-[9px] text-brand-cyan font-black uppercase tracking-wider">Consolidado Total</span>
                    <span className="text-lg font-black font-mono mt-2 text-brand-cyan cyan-glow">
                      R$ {totalPeriodInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-white/30 uppercase">
                  <span>Variação de Aporte Semanal</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-white/75 font-semibold">
                      S1 ➔ S2: {totalWeek2Investment >= totalWeek1Investment ? '+' : ''}{(((totalWeek2Investment - totalWeek1Investment) / totalWeek1Investment) * 100).toFixed(1)}%
                    </span>
                    <span className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-white/75 font-semibold">
                      S2 ➔ S3: {totalWeek3Investment >= totalWeek2Investment ? '+' : ''}{(((totalWeek3Investment - totalWeek2Investment) / totalWeek2Investment) * 100).toFixed(1)}%
                    </span>
                    <span className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-white/75 font-semibold">
                      S3 ➔ S4: {totalWeek4Investment >= totalWeek3Investment ? '+' : ''}{(((totalWeek4Investment - totalWeek3Investment) / totalWeek3Investment) * 100).toFixed(1)}%
                    </span>
                    <span className="px-2 py-0.5 rounded-md border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan font-bold">
                      S4 ➔ S5: {totalWeek5Investment >= totalWeek4Investment ? '+' : ''}{(((totalWeek5Investment - totalWeek4Investment) / totalWeek4Investment) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-white/30 text-[9px] uppercase tracking-widest font-medium flex items-center gap-2">
                <span>Clique nos botões abaixo ou use as setas do teclado para navegar</span>
              </div>
            </div>
          )}

          {/* SLIDES DE CAMPANHAS INDIVIDUAIS DE META ADS */}
          {currentSlide > 0 && currentSlide <= 6 && currentSlide !== 3 && (() => {
            const campaignIndex = currentSlide < 3 ? currentSlide - 1 : currentSlide - 2;
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

            const w3Val = campaign.id === 'alcance' 
              ? campaign.week3.reach 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week3.visits 
                : campaign.week3.leads;

            const w4Val = campaign.id === 'alcance' 
              ? campaign.week4?.reach 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week4?.visits 
                : campaign.week4?.leads;

            const w5Val = campaign.id === 'alcance' 
              ? campaign.week5?.reach 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week5?.visits 
                : campaign.week5?.leads;

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

            const w3UnitVal = campaign.id === 'alcance' 
              ? campaign.week3.cpm 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week3.cpv 
                : campaign.week3.cpl;

            const w4UnitVal = campaign.id === 'alcance' 
              ? campaign.week4?.cpm 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week4?.cpv 
                : campaign.week4?.cpl;

            const w5UnitVal = campaign.id === 'alcance' 
              ? campaign.week5?.cpm 
              : campaign.id === 'trafego_perfil' 
                ? campaign.week5?.cpv 
                : campaign.week5?.cpl;

            // Variações de Semana 1 para Semana 2
            const varInvestS1S2 = getChange(campaign.week1.investment, campaign.week2.investment);
            const varVolumeS1S2 = getChange(w1Val, w2Val);
            const varUnitS1S2 = getChange(w1UnitVal, w2UnitVal, true);

            // Variações de Semana 2 para Semana 3
            const varInvestS2S3 = getChange(campaign.week2.investment, campaign.week3.investment);
            const varVolumeS2S3 = getChange(w2Val, w3Val);
            const varUnitS2S3 = getChange(w2UnitVal, w3UnitVal, true);

            // Variações de Semana 3 para Semana 4
            const varInvestS3S4 = getChange(campaign.week3.investment, campaign.week4?.investment);
            const varVolumeS3S4 = getChange(w3Val, w4Val);
            const varUnitS3S4 = getChange(w3UnitVal, w4UnitVal, true);

            // Variações de Semana 4 para Semana 5
            const varInvestS4S5 = getChange(campaign.week4?.investment, campaign.week5?.investment);
            const varVolumeS4S5 = getChange(w4Val, w5Val);
            const varUnitS4S5 = getChange(w4UnitVal, w5UnitVal, true);

            // Budget Weight em relação à semana 5 (atual corrente)
            const budgetShareWeek5 = campaign.week5 ? ((campaign.week5.investment / totalWeek5Investment) * 100).toFixed(1) : "0.0";

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
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Participação da Verba (S5)</span>
                      <span className="text-sm md:text-base font-black text-brand-cyan cyan-glow font-mono leading-none">{budgetShareWeek5}%</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/15" />
                    <div className="text-right">
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Investido Acumulado</span>
                      <span className="text-[11px] md:text-xs font-mono font-bold text-white/80">
                        R$ {(campaign.week1.investment + campaign.week2.investment + campaign.week3.investment + (campaign.week4?.investment || 0) + (campaign.week5?.investment || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid de KPIs Centrais - COMPARATIVO S1 vs S2 vs S3 vs S4 vs S5 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 w-full" id={`kpi-grid-${campaign.id}`}>
                  
                  {/* KPI 1: INVESTIMENTO DIRETO */}
                  <div className="glass-card p-5 rounded-2xl border-white/5 bg-white/[0.01] flex flex-col justify-between relative overflow-hidden h-[155px] hover:border-brand-cyan/20 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[9px] font-mono font-black uppercase tracking-widest">Investimento Semanal</span>
                      <span className="p-1.5 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                        <DollarSign size={15} />
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-0.5 mt-2 pt-1.5 border-t border-white/[0.03]">
                      <div>
                        <span className="text-[7px] text-white/30 uppercase font-mono block">Semana 1</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/60 leading-none mt-1">
                          R$ {campaign.week1.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 2</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          R$ {campaign.week2.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 3</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          R$ {campaign.week3.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 4</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          R$ {campaign.week4?.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-brand-cyan uppercase font-mono block">Semana 5</span>
                        <p className="text-[9.5px] font-black font-mono text-brand-cyan leading-none mt-1">
                          R$ {campaign.week5?.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-white/[0.02] flex items-center justify-between gap-1">
                      <span className="text-[7px] text-white/20 uppercase font-mono tracking-wider shrink-0">Variação s./s.</span>
                      <div className="flex gap-0.5 text-[7px] flex-wrap">
                        {varInvestS1S2 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varInvestS1S2.colorClass)}>
                            S2: {varInvestS1S2.pct}
                          </span>
                        )}
                        {varInvestS2S3 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varInvestS2S3.colorClass)}>
                            S3: {varInvestS2S3.pct}
                          </span>
                        )}
                        {varInvestS3S4 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varInvestS3S4.colorClass)}>
                            S4: {varInvestS3S4.pct}
                          </span>
                        )}
                        {varInvestS4S5 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varInvestS4S5.colorClass)}>
                            S5: {varInvestS4S5.pct}
                          </span>
                        )}
                      </div>
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

                    <div className="grid grid-cols-5 gap-0.5 mt-2 pt-1.5 border-t border-white/[0.03]">
                      <div>
                        <span className="text-[7px] text-white/30 uppercase font-mono block">Semana 1</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/60 leading-none mt-1">
                          {w1Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 2</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          {w2Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 3</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          {w3Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 4</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          {w4Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-brand-cyan uppercase font-mono block">Semana 5</span>
                        <p className="text-[9.5px] font-black font-mono text-brand-cyan leading-none mt-1">
                          {w5Val?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-white/[0.02] flex items-center justify-between gap-1">
                      <span className="text-[7px] text-white/20 uppercase font-mono tracking-wider shrink-0">Variação s./s.</span>
                      <div className="flex gap-0.5 text-[7px] flex-wrap">
                        {varVolumeS1S2 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varVolumeS1S2.colorClass)}>
                            S2: {varVolumeS1S2.pct}
                          </span>
                        )}
                        {varVolumeS2S3 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varVolumeS2S3.colorClass)}>
                            S3: {varVolumeS2S3.pct}
                          </span>
                        )}
                        {varVolumeS3S4 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varVolumeS3S4.colorClass)}>
                            S4: {varVolumeS3S4.pct}
                          </span>
                        )}
                        {varVolumeS4S5 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono", varVolumeS4S5.colorClass)}>
                            S5: {varVolumeS4S5.pct}
                          </span>
                        )}
                      </div>
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

                    <div className="grid grid-cols-5 gap-0.5 mt-2 pt-1.5 border-t border-white/[0.03]">
                      <div>
                        <span className="text-[7px] text-white/30 uppercase font-mono block">Semana 1</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/60 leading-none mt-1">
                          R$ {w1UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 2</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          R$ {w2UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 3</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          R$ {w3UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-white/40 uppercase font-mono block">Semana 4</span>
                        <p className="text-[9.5px] font-semibold font-mono text-white/70 leading-none mt-1">
                          R$ {w4UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[7px] text-emerald-400 uppercase font-mono block">Semana 5</span>
                        <p className="text-[9.5px] font-black font-mono text-emerald-400 leading-none mt-1">
                          R$ {w5UnitVal?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-white/[0.02] flex items-center justify-between gap-1">
                      <span className="text-[7px] text-white/20 uppercase font-mono tracking-wider shrink-0">Desempenho s./s.</span>
                      <div className="flex gap-0.5 text-[7px] flex-wrap">
                        {varUnitS1S2 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono font-bold", varUnitS1S2.colorClass)}>
                            S2: {varUnitS1S2.label}
                          </span>
                        )}
                        {varUnitS2S3 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono font-bold", varUnitS2S3.colorClass)}>
                            S3: {varUnitS2S3.label}
                          </span>
                        )}
                        {varUnitS3S4 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono font-bold", varUnitS3S4.colorClass)}>
                            S4: {varUnitS3S4.label}
                          </span>
                        )}
                        {varUnitS4S5 && (
                          <span className={cn("px-1 py-0.25 rounded border font-mono font-bold", varUnitS4S5.colorClass)}>
                            S5: {varUnitS4S5.label}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>



              </div>
            );
          })()}

          {/* SLIDE 3: GRÁFICO DE PARETO & DIREÇÃO/PROJEÇÃO DE LEADS */}
          {currentSlide === 3 && (
            <div className="w-full max-w-5xl px-2 sm:px-4 flex flex-col justify-center gap-5 md:gap-6 animate-fade-in select-none" id="slide-pareto-leads">
              {/* Header do Slide */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                      Análise Estratégica
                    </span>
                    <span className="text-white/40 text-[9px] font-mono tracking-wider">
                      Slide {currentSlide} de {totalSlides - 1} • Pareto & Tendência de Resultados
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white font-display mt-2 sm:mt-2.5">
                    DIRECIONAL DE CRESCIMENTO DE LEADS EM TRÁFEGO
                  </h2>
                  <p className="text-white/50 text-[10px] md:text-xs tracking-wide font-medium mt-1">
                    Análise comparativa do volume de leads no tráfego pago (LPA e CRM) de Junho e início de Julho de 2026
                  </p>
                </div>

                <div className="bg-white/[0.015] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Acumulado de Leads</span>
                    <span className="text-base font-black text-brand-cyan cyan-glow font-mono leading-none">1.452 Leads</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div className="text-right">
                    <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Média de Leads</span>
                    <span className="text-xs font-mono font-bold text-white/70">~39.2 leads/dia</span>
                  </div>
                </div>
              </div>

              {/* Grid principal */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                
                {/* Lado Esquerdo: Gráfico de Pareto (Recharts) */}
                <div className="lg:col-span-12 xl:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 md:p-6 relative overflow-hidden flex flex-col hover:border-brand-cyan/15 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl rounded-full" />
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/[0.03]">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">Comparativo Semanal (LPA + CRM)</span>
                    <span className="text-[8px] font-mono text-white/40 uppercase">Tendência Semanal de Leads</span>
                  </div>
                  
                  {/* Container para o Recharts ComposedChart */}
                  <div className="h-[240px] w-full mt-2" style={{ minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={[
                          { name: 'Semana 1', leads: 183, trend: 183 },
                          { name: 'Semana 2', leads: 273, trend: 273 },
                          { name: 'Semana 3', leads: 417, trend: 417 },
                          { name: 'Semana 4', leads: 438, trend: 438 },
                          { name: 'Semana 5', leads: 141, trend: 141 }
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
                          domain={[0, 500]}
                          label={{ value: 'Vol. Leads em Tráfego', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: 9, offset: 5 }}
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
                          barSize={32}
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
                      <span>Leads em Tráfego (Barras)</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="w-2.5 h-[2px] bg-white" />
                      <span>Linha de Tendência de Leads</span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Compilado Mensal & Projeção */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4">
                  
                  {/* Comparativo de Semanas com Seta Direcional */}
                  <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 hover:border-brand-cyan/25 transition-all duration-300">
                    <span className="text-[8px] text-white/40 font-black uppercase tracking-widest block mb-3 font-mono">Evolução do Volume de Leads em Tráfego (LPA + CRM)</span>
                    
                    <div className="flex flex-wrap justify-between items-center bg-white/[0.015] p-3 rounded-xl border border-white/[0.03] gap-y-3 gap-x-1">
                      <div className="text-center flex-1 min-w-[45px]">
                        <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider block">S1</span>
                        <p className="text-sm font-black font-mono text-white mt-1">183</p>
                        <span className="text-[6px] text-white/30 font-mono block">01-08 Jun</span>
                      </div>

                      <div className="flex flex-col items-center px-0.5 min-w-[30px]">
                        <span className="text-[6.5px] font-black text-emerald-400 bg-emerald-500/10 px-0.5 py-0.25 rounded border border-emerald-500/20 mb-0.5">
                          +49%
                        </span>
                      </div>

                      <div className="text-center flex-1 min-w-[45px]">
                        <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider block">S2</span>
                        <p className="text-sm font-black font-mono text-white mt-1">273</p>
                        <span className="text-[6px] text-white/30 font-mono block">09-15 Jun</span>
                      </div>

                      <div className="flex flex-col items-center px-0.5 min-w-[30px]">
                        <span className="text-[6.5px] font-black text-emerald-400 bg-emerald-500/10 px-0.5 py-0.25 rounded border border-emerald-500/20 mb-0.5">
                          +52%
                        </span>
                      </div>

                      <div className="text-center flex-1 min-w-[45px]">
                        <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider block">S3</span>
                        <p className="text-sm font-black font-mono text-white mt-1">417</p>
                        <span className="text-[6px] text-white/30 font-mono block">16-22 Jun</span>
                      </div>

                      <div className="flex flex-col items-center px-0.5 min-w-[30px]">
                        <span className="text-[6.5px] font-black text-emerald-400 bg-emerald-500/10 px-0.5 py-0.25 rounded border border-emerald-500/20 mb-0.5">
                          +5%
                        </span>
                      </div>

                      <div className="text-center flex-1 min-w-[45px]">
                        <span className="text-[8px] text-white/40 font-bold uppercase tracking-wider block">S4</span>
                        <p className="text-sm font-black font-mono text-white mt-1">438</p>
                        <span className="text-[6px] text-white/30 font-mono block">23-29 Jun</span>
                      </div>

                      <div className="flex flex-col items-center px-0.5 min-w-[30px]">
                        <span className="text-[6.5px] font-black text-amber-400 bg-amber-500/10 px-0.5 py-0.25 rounded border border-amber-500/20 mb-0.5">
                          Parcial
                        </span>
                      </div>

                      <div className="text-center flex-1 min-w-[45px]">
                        <span className="text-[8px] text-brand-cyan font-bold uppercase tracking-wider block">S5</span>
                        <p className="text-sm font-black font-mono text-brand-cyan cyan-glow mt-1">141</p>
                        <span className="text-[6px] text-brand-cyan/40 font-mono block font-bold">01-07 Jul</span>
                      </div>
                    </div>

                    {/* Quality Shift Explanation */}
                    <div className="mt-3 bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-lg flex gap-2 items-center">
                      <TrendingUp size={14} className="text-brand-cyan shrink-0" />
                      <p className="text-[9.5px] leading-snug text-white/60">
                        <strong className="text-brand-cyan font-semibold">Início de Julho (Semana 5):</strong> A geração de leads manteve-se ativa com <span className="text-brand-cyan font-mono font-bold">141 novos leads</span> entre 01 e 07 de Julho. A média acumulada no período de Junho a Julho consolida-se em <span className="text-white font-mono font-bold">39,2 leads/dia</span>, mostrando estabilidade na tração e prontidão dos canais.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

            {/* SLIDE 7: FUNIL CONSOLIDADO DE TRÁFEGO */}
          {currentSlide === 7 && (
            <div className="w-full max-w-4xl px-4 flex flex-col justify-center gap-4 animate-fade-in select-none py-2" id="slide-7-funnel">
              
              {/* Header do Slide */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 border-b border-white/5 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                      {funnelMode === 'channels' ? 'DESEMPENHO TOTAL • FUNIL DE TRÁFEGO UNIFICADO' : 'ANÁLISE COMPARATIVA • LP VS CRM'}
                    </span>
                    <span className="text-white/40 text-[9px] font-mono tracking-wider">
                      Slide {currentSlide} de {totalSlides - 1} • Funil de Tráfego Integrado
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white font-display mt-2 sm:mt-2.5">
                    {funnelMode === 'channels' ? 'FUNIL DE TRÁFEGO UNIFICADO' : 'COMPARATIVO LP VS CRM'}
                  </h2>
                  <p className="text-white/40 text-[10px] md:text-xs tracking-wide font-medium mt-1 uppercase font-mono">
                    {funnelMode === 'channels' 
                      ? `Consolidação de Métricas (${selectedUnified.label})` 
                      : 'Análise detalhada das etapas de conversão e eficiência das campanhas de leads'}
                  </p>
                </div>

                {/* Valor investido destacado no topo do slide */}
                <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-xl px-5 py-2 flex flex-col justify-center items-end shrink-0 relative overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.05)] text-right" key={funnelMode === 'channels' ? funnelSource + 'inv' : 'comp_inv'}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/15 blur-2xl rounded-full pointer-events-none" />
                  <span className="text-[8px] text-brand-cyan font-black uppercase tracking-[0.15em] relative z-10 block">INVESTIMENTO NO PERÍODO</span>
                  <span className="text-xl font-black text-white cyan-glow font-mono mt-0.5 relative z-10 leading-none">
                    R$ {funnelMode === 'channels' 
                      ? selectedUnified.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) 
                      : (lpFunnelData.investment + crmFunnelData.investment).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[7.5px] text-white/50 block font-medium mt-0.5">
                    {funnelMode === 'channels' ? 'Canais Combinados' : 'Soma de LP e CRM'}
                  </span>
                </div>
              </div>

              {/* Seletor de Modo de Visualização do Funil */}
              <div className="flex bg-[#0b0e14] border border-white/5 rounded-xl p-1 gap-2 self-start mb-1" id="funnel-mode-tabs">
                <button
                  onClick={() => setFunnelMode('channels')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wide transition-all uppercase",
                    funnelMode === 'channels'
                      ? "bg-brand-cyan text-[#07090e] font-black italic shadow-md shadow-brand-cyan/10"
                      : "text-white/40 hover:text-white/80"
                  )}
                  id="btn-mode-channels"
                >
                  Visualizar por Canais
                </button>
                <button
                  onClick={() => setFunnelMode('comparison')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wide transition-all uppercase",
                    funnelMode === 'comparison'
                      ? "bg-brand-cyan text-[#07090e] font-black italic shadow-md shadow-brand-cyan/10"
                      : "text-white/40 hover:text-white/80"
                  )}
                  id="btn-mode-comparison"
                >
                  Comparativo LP vs CRM
                </button>
              </div>

              {funnelMode === 'channels' ? (
                <>
                  {/* Segmented Selector for Channels */}
                  <div className="flex bg-[#0b0e14] border border-white/5 rounded-xl p-1 gap-2 self-start mb-1">
                    {(['consolidated', 'meta', 'google'] as const).map((source) => (
                      <button
                        key={source}
                        onClick={() => setFunnelSource(source)}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wide transition-all uppercase",
                          funnelSource === source
                            ? "bg-brand-cyan text-[#07090e] font-black italic shadow-md shadow-brand-cyan/10"
                            : "text-white/40 hover:text-white/80"
                        )}
                      >
                        {source === 'consolidated' ? 'Formatos Unificados (Meta + Google)' : source === 'meta' ? 'Meta Ads' : 'Google Ads'}
                      </button>
                    ))}
                  </div>

                  {/* Corpo Principal: Funil de Conversão Centralizado */}
                  <div className="flex flex-col items-center justify-center w-full">
                    
                    {/* DESENHO DO FUNIL */}
                    <div className="w-full flex flex-col items-center justify-center py-2 relative" key={funnelSource}>
                      
                      {/* ETAPA 1: INVESTIMENTO - TOPO REAL DO FUNIL */}
                      <div className="w-full max-w-[460px] relative transition-all hover:scale-[1.01] duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/25 via-brand-cyan/5 to-brand-cyan/25 rounded-2xl border-t border-x border-brand-cyan/35 blur-sm pointer-events-none" />
                        <div className="relative bg-[#0d121c]/80 border border-brand-cyan/35 rounded-2xl p-2.5 md:py-3 md:px-4.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />
                          
                          <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2.5 font-sans">
                              <div className="w-7 h-7 rounded-md bg-brand-cyan/15 border border-brand-cyan/35 flex items-center justify-center text-brand-cyan shrink-0">
                                <DollarSign size={14} />
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-white uppercase tracking-tight font-sans">Investimento Total</h3>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[7px] text-white/30 uppercase font-mono block font-bold">Investido</span>
                              <span className="text-lg font-black font-mono text-white tracking-tight cyan-glow">
                                R$ {selectedUnified.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                              <span className="text-[7.5px] text-white/50 block font-medium -mt-0.5">Junho de 2026</span>
                            </div>
                          </div>

                          {funnelSource === 'consolidated' && (
                            <div className="flex justify-between w-full mt-2 pt-2 border-t border-white/[0.04] text-[8.5px] font-mono text-white/50">
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-brand-cyan rounded-full shrink-0" />
                                Meta Ads: <strong className="text-white/80 font-mono">R$ 97.379,56</strong> (76,0%)
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full shrink-0" />
                                Google Ads: <strong className="text-white/80 font-mono">R$ 30.712,84</strong> (24,0%)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Transition Indicator 1 */}
                      <div className="my-[4px] flex flex-col items-center relative z-20">
                        <div className="w-[1.2px] h-3.5 bg-gradient-to-b from-brand-cyan/60 to-brand-cyan/40" />
                      </div>

                      {/* ETAPA 2: ALCANCE */}
                      <div className="w-full max-w-[410px] relative transition-all hover:scale-[1.01] duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 via-transparent to-brand-cyan/20 rounded-2xl border-t border-x border-brand-cyan/25 blur-xs pointer-events-none" />
                        <div className="relative bg-[#0b0e15]/90 border border-brand-cyan/25 rounded-2xl p-2.5 md:py-3 md:px-4.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                          
                          <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2.5 font-sans">
                              <div className="w-7 h-7 rounded-md bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                                <Users size={14} />
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-white/90 uppercase tracking-tight font-sans">Alcance</h3>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[7px] text-white/30 uppercase font-mono block font-bold">Público Único</span>
                              <span className="text-lg font-black font-mono text-brand-cyan">
                                {selectedUnified.reach.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[7.5px] text-brand-cyan/70 block font-medium -mt-0.5">Pessoas</span>
                            </div>
                          </div>

                          {funnelSource === 'consolidated' && (
                            <div className="flex justify-between w-full mt-2 pt-2 border-t border-white/[0.04] text-[8.5px] font-mono text-white/50">
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-brand-cyan rounded-full shrink-0" />
                                Meta: <strong className="text-white/80 font-mono">809.461</strong> (51,3%)
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full shrink-0" />
                                Google: <strong className="text-white/80 font-mono">769.390</strong> (48,7%)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Transition Indicator 2 */}
                      <div className="my-[4px] flex flex-col items-center relative z-20">
                        <div className="w-[1.2px] h-3.5 bg-gradient-to-b from-brand-cyan/40 to-brand-cyan/20" />
                        <span className="absolute text-[6.5px] font-mono font-black text-brand-cyan/70 bg-[#07090e] px-1.5 py-[1px] rounded border border-brand-cyan/10 -translate-y-0.5 whitespace-nowrap">
                          CTR Geral: {selectedUnified.ctr}
                        </span>
                      </div>

                      {/* ETAPA 3: CLIQUE NO LINK */}
                      <div className="w-full max-w-[310px] relative transition-all hover:scale-[1.01] duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 via-transparent to-brand-cyan/10 rounded-2xl border-t border-x border-brand-cyan/15 blur-xs pointer-events-none" />
                        <div className="relative bg-[#080a0f]/95 border border-brand-cyan/15 rounded-2xl p-2.5 md:py-3 md:px-4 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                          
                          <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2.5 font-sans">
                              <div className="w-7 h-7 rounded-md bg-brand-cyan/5 border border-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                                <MousePointer2 size={13} className="-rotate-90" />
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-white/80 uppercase tracking-tight font-sans">Clique no Link</h3>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[7px] text-white/30 uppercase font-mono block font-bold">Volume</span>
                              <span className="text-base font-black font-mono text-white/90">
                                {selectedUnified.clicks.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[7.5px] text-white/50 block font-medium -mt-0.5 font-sans">Cliques</span>
                            </div>
                          </div>

                          {funnelSource === 'consolidated' && (
                            <div className="flex justify-between w-full mt-2 pt-2 border-t border-white/[0.04] text-[8.5px] font-mono text-white/50">
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-brand-cyan rounded-full shrink-0" />
                                Meta: <strong className="text-white/80 font-mono">75.385</strong> (CTR: 9,31%)
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full shrink-0" />
                                Google: <strong className="text-white/80 font-mono">4.172</strong> (CTR: 0,54%)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Transition Indicator 3 */}
                      <div className="my-[4px] flex flex-col items-center relative z-20">
                        <div className="w-[1.2px] h-3.5 bg-gradient-to-b from-brand-cyan/30 to-brand-cyan/10" />
                        <span className="absolute text-[6.5px] font-mono font-black text-brand-cyan/70 bg-[#07090e] px-1.5 py-[1px] rounded border border-brand-cyan/10 -translate-y-0.5 whitespace-nowrap">
                          Tx. Carregamento (Loading): {selectedUnified.loadingRate}
                        </span>
                      </div>

                      {/* ETAPA 4: VISUALIZAÇÃO DA PÁGINA DE DESTINO */}
                      <div className="w-full max-w-[260px] relative transition-all hover:scale-[1.01] duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/15 via-transparent to-brand-cyan/15 rounded-2xl border-t border-x border-brand-cyan/10 blur-xs pointer-events-none" />
                        <div className="relative bg-[#07090e]/95 border border-brand-cyan/10 rounded-2xl p-2.5 md:py-3 md:px-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                          
                          <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2 font-sans">
                              <div className="w-6 h-6 rounded-md bg-brand-cyan/5 border border-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                                <Layers size={11} />
                              </div>
                              <div>
                                <h3 className="text-[11px] font-bold text-white/70 uppercase tracking-tight font-sans">Page Views</h3>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[7px] text-white/30 uppercase font-mono block font-bold">Visualizações</span>
                              <span className="text-sm font-black font-mono text-white/80">
                                {selectedUnified.visits.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[7.5px] text-white/50 block font-medium -mt-0.5 font-sans">Visualizações</span>
                            </div>
                          </div>

                          {funnelSource === 'consolidated' && (
                            <div className="flex justify-between w-full mt-2 pt-2 border-t border-white/[0.04] text-[8.5px] font-mono text-white/50">
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-brand-cyan rounded-full shrink-0" />
                                Meta: <strong className="text-white/80 font-mono">10.436</strong> (Tx: 13,84%)
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full shrink-0" />
                                Google: <strong className="text-white/80 font-mono">530</strong> (Tx: 12,70%)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Transition Indicator 4 */}
                      <div className="my-[4px] flex flex-col items-center relative z-20">
                        <div className="w-[1.2px] h-3.5 bg-gradient-to-b from-brand-cyan/25 to-brand-cyan/10" />
                        <span className="absolute text-[6.5px] font-mono font-black text-emerald-400 bg-[#07090e] px-1.5 py-[1px] rounded border border-emerald-500/10 -translate-y-0.5 whitespace-nowrap">
                          Conversão LP: {selectedUnified.conversionRate}
                        </span>
                      </div>

                      {/* ETAPA 5: LEADS - BASE DO FUNIL */}
                      <div className="w-full max-w-[215px] relative transition-all hover:scale-[1.01] duration-300">
                        <div className="absolute inset-0 bg-brand-cyan/10 blur-md rounded-2xl opacity-40 pointer-events-none" />
                        <div className="relative bg-[#22d3ee]/[0.02] border-2 border-brand-cyan/45 rounded-2xl p-2.5 md:py-3 md:px-3 shadow-[0_10px_30px_rgba(34,211,238,0.08)] overflow-hidden">
                          <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-brand-cyan/10 blur-2xl rounded-full pointer-events-none" />
                          
                          <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2 font-sans">
                              <div className="w-6 h-6 rounded-md bg-[#22d3ee]/[0.15] border border-brand-cyan/[0.35] flex items-center justify-center text-brand-cyan shrink-0 animate-pulse">
                                <Target size={12} />
                              </div>
                              <div>
                                <h3 className="text-[11px] font-black text-white uppercase tracking-tight font-sans">Conversões</h3>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[7px] text-white/40 uppercase font-mono block font-black">Total Leads</span>
                              <span className="text-lg font-black font-mono text-brand-cyan cyan-glow">
                                {selectedUnified.leads.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[7.5px] text-brand-cyan font-black block -mt-0.5 font-sans">Leads</span>
                            </div>
                          </div>

                          {funnelSource === 'consolidated' && (
                            <div className="flex justify-between w-full mt-2 pt-2 border-t border-white/[0.04] text-[8.5px] font-mono text-white/50">
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-brand-cyan rounded-full shrink-0" />
                                Meta: <strong className="text-white/80 font-mono">1.391</strong> (95,0%)
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full shrink-0" />
                                Google: <strong className="text-white/80 font-mono">73</strong> (5,0%)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </>
              ) : (
                <>
                  {/* Side-by-Side LP vs CRM Funnel Comparison */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 pt-1" id="funnel-comparison-container">
                    
                    {/* COLUNA 1: CAMPANHA LP */}
                    <div className="bg-[#0b0e14]/60 border border-brand-cyan/15 rounded-2xl p-4 flex flex-col items-center hover:border-brand-cyan/40 transition-all duration-300" id="funnel-col-lp">
                      <div className="w-full flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,242,255,0.5)]" />
                          <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Campanha LP A</h4>
                        </div>
                        <span className="text-[8px] font-mono font-bold bg-brand-cyan/10 text-brand-cyan px-1.5 py-0.5 rounded border border-brand-cyan/25">
                          Geração Landing Page
                        </span>
                      </div>

                      {/* Funnel LP Diagram */}
                      <div className="w-full flex flex-col items-center justify-center space-y-1">
                        
                        {/* Passo 1: Investimento */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#0d121c]/60 border border-brand-cyan/20 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Investimento</span>
                              <span className="font-bold font-mono text-white">R$ {lpFunnelData.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha LP 1 */}
                        <div className="h-2 w-[1px] bg-brand-cyan/25" />

                        {/* Passo 2: Alcance */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#0b0e15]/70 border border-brand-cyan/15 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Alcance</span>
                              <span className="font-bold font-mono text-white/80">{lpFunnelData.reach.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha LP 2 + CTR */}
                        <div className="flex flex-col items-center relative z-10 w-full">
                          <div className="h-3.5 w-[1px] bg-brand-cyan/20" />
                          <span className="absolute text-[6px] font-mono font-black text-brand-cyan/70 bg-[#07090e] px-1 py-[0.5px] rounded border border-brand-cyan/10 -translate-y-0.5">
                            CTR: {lpFunnelData.ctr}
                          </span>
                        </div>

                        {/* Passo 3: Cliques */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#080a0f]/80 border border-brand-cyan/10 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Cliques</span>
                              <span className="font-bold font-mono text-white/70">{lpFunnelData.clicks.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha LP 3 + Loading */}
                        <div className="flex flex-col items-center relative z-10 w-full">
                          <div className="h-3.5 w-[1px] bg-brand-cyan/20" />
                          <span className="absolute text-[6px] font-mono font-black text-brand-cyan/70 bg-[#07090e] px-1 py-[0.5px] rounded border border-brand-cyan/10 -translate-y-0.5">
                            Carregamento: {lpFunnelData.loadingRate}
                          </span>
                        </div>

                        {/* Passo 4: Visitas */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#07090e]/90 border border-brand-cyan/10 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Page Views (Visitas)</span>
                              <span className="font-bold font-mono text-white/60">{lpFunnelData.visits.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha LP 4 + Conversão */}
                        <div className="flex flex-col items-center relative z-10 w-full">
                          <div className="h-3.5 w-[1px] bg-brand-cyan/20" />
                          <span className="absolute text-[6px] font-mono font-black text-emerald-400 bg-[#07090e] px-1 py-[0.5px] rounded border border-emerald-500/10 -translate-y-0.5">
                            Conversão LP: {lpFunnelData.conversionRate}
                          </span>
                        </div>

                        {/* Passo 5: Leads */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-brand-cyan/5 border border-brand-cyan/35 rounded-xl p-2 shadow-[0_0_15px_rgba(34,211,238,0.02)]">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-brand-cyan uppercase font-mono font-bold">Leads Gerados</span>
                              <span className="font-black font-mono text-brand-cyan cyan-glow">{lpFunnelData.leads.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Métricas de Eficiência LP */}
                      <div className="w-full mt-3 pt-2.5 border-t border-white/5 grid grid-cols-2 gap-2 text-center">
                        <div className="bg-white/[0.015] border border-white/5 rounded-lg p-1.5">
                          <span className="text-[7px] text-white/40 uppercase block font-mono">CPL Médio</span>
                          <span className="text-xs font-black font-mono text-white mt-0.5 block">
                            R$ {lpFunnelData.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="bg-white/[0.015] border border-white/5 rounded-lg p-1.5">
                          <span className="text-[7px] text-white/40 uppercase block font-mono">Conversão Global</span>
                          <span className="text-xs font-bold text-white/70 block mt-0.5 font-mono">1,91%</span>
                        </div>
                      </div>

                    </div>

                    {/* COLUNA 2: CAMPANHA CRM */}
                    <div className="bg-[#0b0e14]/60 border border-emerald-500/15 rounded-2xl p-4 flex flex-col items-center hover:border-emerald-400/40 transition-all duration-300" id="funnel-col-crm">
                      <div className="w-full flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                          <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Campanha CRM</h4>
                        </div>
                        <span className="text-[8px] font-mono font-bold bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/25">
                          Esteira Integrada
                        </span>
                      </div>

                      {/* Funnel CRM Diagram */}
                      <div className="w-full flex flex-col items-center justify-center space-y-1">
                        
                        {/* Passo 1: Investimento */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#0d121c]/60 border border-emerald-500/20 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Investimento</span>
                              <span className="font-bold font-mono text-white">R$ {crmFunnelData.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha CRM 1 */}
                        <div className="h-2 w-[1px] bg-emerald-500/25" />

                        {/* Passo 2: Alcance */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#0b0e15]/70 border border-emerald-500/15 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Alcance</span>
                              <span className="font-bold font-mono text-white/80">{crmFunnelData.reach.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha CRM 2 + CTR */}
                        <div className="flex flex-col items-center relative z-10 w-full">
                          <div className="h-3.5 w-[1px] bg-emerald-500/20" />
                          <span className="absolute text-[6px] font-mono font-black text-emerald-400 bg-[#07090e] px-1 py-[0.5px] rounded border border-emerald-500/10 -translate-y-0.5">
                            CTR: {crmFunnelData.ctr}
                          </span>
                        </div>

                        {/* Passo 3: Cliques */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#080a0f]/80 border border-emerald-500/10 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Cliques</span>
                              <span className="font-bold font-mono text-white/70">{crmFunnelData.clicks.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha CRM 3 + Loading */}
                        <div className="flex flex-col items-center relative z-10 w-full">
                          <div className="h-3.5 w-[1px] bg-emerald-500/20" />
                          <span className="absolute text-[6px] font-mono font-black text-emerald-400 bg-[#07090e] px-1 py-[0.5px] rounded border border-emerald-500/10 -translate-y-0.5">
                            Carregamento: {crmFunnelData.loadingRate}
                          </span>
                        </div>

                        {/* Passo 4: Visitas */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-[#07090e]/90 border border-emerald-500/10 rounded-xl p-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-white/50 uppercase font-mono font-bold">Atendimentos (Visitas)</span>
                              <span className="font-bold font-mono text-white/60">{crmFunnelData.visits.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setinha CRM 4 + Conversão */}
                        <div className="flex flex-col items-center relative z-10 w-full">
                          <div className="h-3.5 w-[1px] bg-emerald-500/20" />
                          <span className="absolute text-[6px] font-mono font-black text-emerald-400 bg-[#07090e] px-1 py-[0.5px] rounded border border-emerald-500/10 -translate-y-0.5">
                            Conversão CRM: {crmFunnelData.conversionRate}
                          </span>
                        </div>

                        {/* Passo 5: Leads */}
                        <div className="w-full relative transition-all hover:scale-[1.01] duration-300">
                          <div className="relative bg-emerald-500/5 border border-emerald-500/35 rounded-xl p-2 shadow-[0_0_15px_rgba(52,211,153,0.02)]">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[8px] text-emerald-400 uppercase font-mono font-bold">Leads Gerados</span>
                              <span className="font-black font-mono text-emerald-400 emerald-glow">{crmFunnelData.leads.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Métricas de Eficiência CRM */}
                      <div className="w-full mt-3 pt-2.5 border-t border-white/5 grid grid-cols-2 gap-2 text-center">
                        <div className="bg-white/[0.015] border border-white/5 rounded-lg p-1.5">
                          <span className="text-[7px] text-white/40 uppercase block font-mono">CPL Médio</span>
                          <span className="text-xs font-black font-mono text-emerald-400 mt-0.5 block">
                            R$ {crmFunnelData.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-1.5">
                          <span className="text-[7px] text-emerald-400 uppercase block font-mono">Eficiência Relativa</span>
                          <span className="text-[10px] font-black text-emerald-400 block mt-0.5">
                            -29,4% CPL!
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Comparativo Resumo / Insight */}
                  <div className="w-full bg-white/[0.015] border border-white/5 p-3 rounded-xl mt-3 flex items-start gap-3" id="funnel-comparison-insight">
                    <TrendingUp size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-[11px] font-bold text-white uppercase tracking-wider">Destaque de Eficiência da Operação</h5>
                      <p className="text-[9.5px] text-white/60 mt-0.5 leading-relaxed">
                        A <strong className="text-emerald-400">Campanha de CRM</strong> apresentou alta performance técnica com um <strong className="text-emerald-400">CPL 29.4% menor</strong> (R$ 58,08 vs R$ 82,23 da LP) e uma <strong className="text-emerald-400">taxa de conversão superior (15,26% vs 12,72%)</strong>. Isso se deu principalmente pelo CTR superior de 11,04% em canais de menor fricção, enquanto a <strong className="text-brand-cyan">Campanha de LP A</strong> destaca-se pela alta qualificação do lead gerado, absorvendo maior volume absoluto inicial com robustez de página.
                      </p>
                    </div>
                  </div>
                </>
              )}
              
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
