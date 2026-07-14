/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MetricSet {
  investment: number;
  leads?: number;
  reach?: number;
  visits?: number;
  cpl?: number; // Cost Per Lead
  cpm?: number; // Cost Per Thousand (Alcance)
  cpv?: number; // Cost Per Visit (Tráfego Perfil)
}

export interface BaseDetail {
  name: string;
  investment: number;
  leads: number;
  cpl: number;
}

export interface CampaignData {
  id: string;
  name: string;
  objective: string;
  tag: string;
  metricLabel: string; // "Leads", "Visitas", "Alcance"
  unitLabel: string; // "CPL", "CPV", "CPM"
  week1: MetricSet;
  week2: MetricSet;
}

export const PERFORMANCE_DATA = {
  client: "Confiauto Proteção Veicular",
  period: "01 a 12 de Julho de 2026",
  campaigns: [
    {
      id: "lp_original",
      name: "Campanha LP A",
      objective: "Geração de Leads Qualificados na LP Principal",
      tag: "Líder de Conversões",
      metricLabel: "Leads",
      unitLabel: "CPL",
      week1: {
        investment: 4997.55,
        leads: 106,
        cpl: 47.14
      },
      week2: {
        investment: 6696.32,
        leads: 101,
        cpl: 66.30
      }
    },
    {
      id: "crm",
      name: "Campanha CRM",
      objective: "Captação com Integração Direta de CRM",
      tag: "Esteira Técnica Integral",
      metricLabel: "Leads",
      unitLabel: "CPL",
      week1: {
        investment: 4914.22,
        leads: 35,
        cpl: 140.41
      },
      week2: {
        investment: 8023.48,
        leads: 35,
        cpl: 229.32
      }
    },
    {
      id: "contratacao",
      name: "Campanha de Contratação",
      objective: "Captação para Expansão da Força de Vendas de RH",
      tag: "Surgimento de Consultores",
      metricLabel: "Leads",
      unitLabel: "CPL",
      week1: {
        investment: 635.00,
        leads: 129,
        cpl: 4.92
      },
      week2: {
        investment: 848.58,
        leads: 148,
        cpl: 5.73
      }
    },
    {
      id: "trafego_perfil",
      name: "Tráfego para Perfil",
      objective: "Atração e Engajamento para o Perfil Oficial",
      tag: "Aquecimento de Base",
      metricLabel: "Visitas no Perfil",
      unitLabel: "CPV",
      week1: {
        investment: 253.65,
        visits: 1006,
        cpv: 0.25
      },
      week2: {
        investment: 6.15,
        visits: 25,
        cpv: 0.25
      }
    },
    {
      id: "alcance",
      name: "Campanha de Alcance",
      objective: "Expansão de Reconhecimento de Marca & Branding",
      tag: "Maximização de Impressões",
      metricLabel: "Pessoas Alcançadas",
      unitLabel: "CPM",
      week1: {
        investment: 562.79,
        reach: 270851,
        cpm: 2.08
      },
      week2: {
        investment: 552.76,
        reach: 271435,
        cpm: 2.04
      }
    }
  ] as CampaignData[]
};

export interface GoogleCampaign {
  name: string;
  description: string;
  cost: string;
  conversions: string;
  cpc: string;
  status: 'active' | 'testing' | 'inactive';
}

export const GOOGLE_ADS_DATA: GoogleCampaign[] = [
  {
    name: "[AEG] [RP] - CONCORRENTES",
    description: "Foco em pesquisas de usuários buscando empresas concorrentes no setor de proteção veicular. Esta campanha captura leads qualificados na fase final do funil de decisão, convertendo público que já busca opções de mercado.",
    cost: "R$ 2.271,60",
    conversions: "21,00",
    cpc: "R$ 108,17",
    status: "active"
  },
  {
    name: "[AEG] [RP] - PROTEÇÃO VEÍCULAR",
    description: "Palavras-chave genéricas e buscas recorrentes sobre proteção veicular. É a campanha de pesquisa de base que conecta o portfólio diretamente com os interessados gerais em assistência e coberturas de veículos.",
    cost: "R$ 1.427,41",
    conversions: "8,50",
    cpc: "R$ 167,93",
    status: "active"
  },
  {
    name: "[AEG] [RP] - INSTITUCIONAL",
    description: "Pesquisas diretas de termos associados à marca AEG e Confiauto. Garante domínio total do topo de resultados do Google nas buscas proprietárias, direcionando o tráfego com o menor custo de aquisição (CPA) da conta.",
    cost: "R$ 1.101,24",
    conversions: "31,50",
    cpc: "R$ 34,96",
    status: "active"
  },
  {
    name: "[AEG] [RP] - SEGURO VEÍCULAR",
    description: "Direcionada para termos relacionados à contratação de seguros convencionais de automóvel. Funciona como alternativa inteligente e competitiva oferecendo proteção veicular com foco no excelente custo-benefício.",
    cost: "R$ 688,29",
    conversions: "2,00",
    cpc: "R$ 344,15",
    status: "active"
  },
  {
    name: "[AEG] [RP] - PROTEÇÃO VEÍCULAR TESTE CRM",
    description: "Estrutura dedicada ao controle experimental de performance e testes de canais em tempo real, integrando funis de leads comerciais com a esteira do CRM.",
    cost: "R$ 614,08",
    conversions: "0,00",
    cpc: "R$ 0,00",
    status: "testing"
  },
  {
    name: "[AEG] [RP] - PROTEÇÃO VEÍCULAR | CIDADES COM SEDES",
    description: "Filtros e direcionamento geográfico direcionados para audiências em cidades estratégicas com a presença de sedes físicas do grupo, reforçando autoridade regional.",
    cost: "R$ 392,00",
    conversions: "0,00",
    cpc: "R$ 0,00",
    status: "testing"
  },
  {
    name: "[AEG] [RP] - CONCORRENTES TESTE CRM",
    description: "Segmentação experimental em termos de concorrência com foco em automatizar as conversões diretamente para operadores dedicados de vendas no CRM.",
    cost: "R$ 301,56",
    conversions: "0,00",
    cpc: "R$ 0,00",
    status: "testing"
  },
  {
    name: "[AEG] [RP] - INSTITUCIONAL TESTE CRM",
    description: "Ambiente piloto para tráfego que direciona buscas diretas proprietárias para fluxos de atendimento ou landing pages integradas ao CRM de proteção veicular.",
    cost: "R$ 181,44",
    conversions: "0,00",
    cpc: "R$ 0,00",
    status: "testing"
  }
];
