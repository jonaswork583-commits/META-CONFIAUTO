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
  Eye
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PERFORMANCE_DATA, CampaignData } from './constants';

const SlideWrapper = ({ children, slideKey }: { children: React.ReactNode; slideKey: number }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={slideKey}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-start md:justify-start p-4 md:py-6 md:px-12 overflow-y-auto"
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
  const totalSlides = 7; // Slide 0 (Capa) + 6 slides de campanhas

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

  // Calcular o Investimento Total de Junho (01 a 08 de Junho)
  const totalJuneInvestment = PERFORMANCE_DATA.campaigns.reduce((sum, c) => sum + c.investment, 0);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col relative text-white antialiased overflow-hidden font-sans" id="app-root">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" id="bg-glow-1" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" id="bg-glow-2" />

      {/* Header */}
      <header className="py-3 px-6 md:py-4 md:px-8 flex justify-between items-center z-50 border-b border-white/5 bg-brand-black/40 backdrop-blur-md" id="app-header">
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
      <main className="flex-1 relative overflow-hidden flex items-center justify-center w-full" id="slide-viewer">
        <SlideWrapper slideKey={currentSlide}>
          
          {/* SLIDE 0: CAPA */}
          {currentSlide === 0 && (
            <div className="text-center space-y-6 max-w-5xl animate-fade-in" id="slide-0-capa">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
                  <h2 className="text-brand-cyan text-xs sm:text-sm font-black tracking-[0.6em] uppercase text-center">Apresentação de Performance</h2>
                </div>
                
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-6 uppercase text-center font-display">
                  RESULTADOS <br />
                  <span className="text-brand-cyan cyan-glow">CONFIAUTO</span> <br />
                  <span className="text-white text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] block mt-5 font-black not-italic">META ADS</span>
                </h1>
                
                <div className="h-1 text-center w-28 bg-brand-cyan mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.6)]" />
              </motion.div>
              
              <div className="pt-8 text-white/50 font-mono tracking-[0.3em] text-[10px] sm:text-xs uppercase flex items-center justify-center gap-2" id="capa-date-footer">
                <span>Relatório Consolidado</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="text-brand-cyan font-bold font-mono">{PERFORMANCE_DATA.period}</span>
              </div>
            </div>
          )}

          {/* SLIDES 1 A 6: CAMPANHAS ESPECÍFICAS */}
          {currentSlide > 0 && currentSlide <= 6 && (() => {
            const campaign: CampaignData = PERFORMANCE_DATA.campaigns[currentSlide - 1];
            const budgetShare = ((campaign.investment / totalJuneInvestment) * 100).toFixed(1);

            return (
              <div className="w-full max-w-5xl px-4 flex flex-col justify-center gap-8 animate-fade-in select-none" id={`slide-campaign-${campaign.id}`}>
                
                {/* Header do Slide */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                        {campaign.tag}
                      </span>
                      <span className="text-white/40 text-[9px] font-mono tracking-wider">
                        Slide {currentSlide} de {totalSlides - 1} • Meta Ads
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white font-display mt-2">
                      {campaign.name}
                    </h2>
                    <p className="text-white/50 text-[10px] md:text-xs tracking-wide font-medium mt-1">
                      Foco: {campaign.objective}
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Fatia de Orçamento</span>
                      <span className="text-base font-black text-brand-cyan cyan-glow font-mono leading-none">{budgetShare}%</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <div className="text-right">
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.15em] font-extrabold block">Junho Total</span>
                      <span className="text-xs font-mono font-bold text-white/70">R$ {totalJuneInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Grid de KPIs Centrais */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full" id={`kpi-grid-${campaign.id}`}>
                  
                  {/* KPI 1: INVESTIMENTO DA CAMPANHA */}
                  <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02] flex flex-col justify-between relative overflow-hidden h-36 hover:border-brand-cyan/30 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[9px] font-mono font-black uppercase tracking-widest">Investimento Direto</span>
                      <span className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                        <DollarSign size={16} />
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-3xl md:text-4xl font-black italic tracking-tighter text-white font-sans leading-none">
                        R$ {campaign.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* KPI 2: VOLUME DE RESULTADOS (LEADS, ALCANCE OU VISITAS) */}
                  <div className="glass-card p-6 rounded-2xl border-brand-cyan/20 bg-brand-cyan/[0.01] flex flex-col justify-between relative overflow-hidden h-36 hover:border-brand-cyan/45 transition-all duration-300">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-cyan/5 rounded-full blur-xl pointer-events-none" />
                    <div className="flex justify-between items-center">
                      <span className="text-brand-cyan text-[9px] font-mono font-black uppercase tracking-widest">
                        {campaign.id === 'alcance' ? 'Pessoas Alcançadas' : campaign.id === 'trafego_perfil' ? 'Visitas ao Perfil' : 'Volume de Leads'}
                      </span>
                      <span className="p-2 bg-brand-cyan/15 rounded-lg text-brand-cyan animate-pulse">
                        {campaign.id === 'alcance' ? <Eye size={16} /> : campaign.id === 'trafego_perfil' ? <MousePointer2 size={16} /> : <Users size={16} />}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-4xl font-black italic tracking-tighter text-brand-cyan cyan-glow font-sans leading-none">
                        {campaign.id === 'alcance' 
                          ? campaign.reach?.toLocaleString('pt-BR') 
                          : campaign.id === 'trafego_perfil' 
                            ? campaign.visits?.toLocaleString('pt-BR') 
                            : campaign.leads}
                      </p>
                    </div>
                  </div>

                  {/* KPI 3: CUSTO UNITÁRIO (CPL, CPM OU CPV) */}
                  <div className="glass-card p-6 rounded-2xl border-emerald-500/20 bg-emerald-500/[0.01] flex flex-col justify-between relative overflow-hidden h-36 hover:border-emerald-500/40 transition-all duration-300">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 text-[9px] font-mono font-black uppercase tracking-widest">
                        {campaign.id === 'alcance' ? 'CPM / Custo Mil' : campaign.id === 'trafego_perfil' ? 'CPV / Visita' : 'CPL / Custo Lead'}
                      </span>
                      <span className="p-2 bg-emerald-500/15 rounded-lg text-emerald-400">
                        <Target size={16} />
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-4xl font-black italic tracking-tighter text-emerald-400 emerald-glow font-sans leading-none">
                        R$ {campaign.id === 'alcance' 
                          ? campaign.cpm?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) 
                          : campaign.cpl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })()}

        </SlideWrapper>
      </main>

      {/* Footer / controls */}
      <footer className="py-4 px-6 md:py-5 md:px-8 flex justify-between items-center z-50 border-t border-white/5 bg-brand-black/40 backdrop-blur-md" id="app-footer">
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
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-brand-cyan transition-all active:scale-95 hover:border-brand-cyan/20 border-white/5"
            title="Slide Anterior"
            id="prev-btn"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="px-6 h-12 rounded-full bg-white text-brand-black font-black italic tracking-widest flex items-center gap-2 hover:bg-brand-cyan transition-all active:scale-95 shadow-xl text-xs sm:text-sm"
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
