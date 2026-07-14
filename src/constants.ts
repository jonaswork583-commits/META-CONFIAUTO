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
  period: "29 de Junho a 12 de Julho de 2026",
  campaigns: [
    {
      id: "lp_original",
      name: "Campanha LP A",
      objective: "Geração de Leads Qualificados na LP Principal",
      tag: "Líder de Conversões",
      metricLabel: "Leads",
      unitLabel: "CPL",
      week1: {
        investment: 4534.36,
        leads: 115,
        cpl: 39.42
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
        investment: 7363.56,
        leads: 94,
        cpl: 78.34
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
        investment: 413.41,
        leads: 87,
        cpl: 4.75
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
        investment: 348.64,
        visits: 1358,
        cpv: 0.26
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
        investment: 566.97,
        reach: 266028,
        cpm: 2.13
      },
      week2: {
        investment: 552.76,
        reach: 271435,
        cpm: 2.04
      }
    }
  ] as CampaignData[]
};

export interface AudienceData {
  name: string;
  investment: number;
  leads: number;
  cpl: number;
  desc: string;
}

export const LP_AUDIENCES_DATA = {
  week1: [
    {
      name: "Público Semelhante aos Leads Concluídos",
      investment: 1727.20,
      leads: 42,
      cpl: 41.12,
      desc: "Público semelhante aos leads que já converteram"
    },
    {
      name: "Público dos Estáticos",
      investment: 1062.38,
      leads: 37,
      cpl: 28.71,
      desc: "Anúncios estáticos com foco em benefícios diretos"
    },
    {
      name: "Público Aberto",
      investment: 1053.95,
      leads: 26,
      cpl: 40.54,
      desc: "Segmentação ampla para expansão de topo de funil"
    },
    {
      name: "Público de Remarketing",
      investment: 690.83,
      leads: 10,
      cpl: 69.08,
      desc: "Reimpacto em usuários que visitaram mas não converteram"
    }
  ] as AudienceData[],
  week2: [
    {
      name: "Estáticos",
      investment: 1779.31,
      leads: 35,
      cpl: 50.83,
      desc: "Anúncios estáticos com foco em benefícios diretos"
    },
    {
      name: "Público Aberto",
      investment: 1969.17,
      leads: 30,
      cpl: 65.63,
      desc: "Segmentação ampla para expansão de topo de funil"
    },
    {
      name: "LAL Leads Concluídos",
      investment: 2245.73,
      leads: 28,
      cpl: 80.20,
      desc: "Público semelhante aos leads que já converteram"
    },
    {
      name: "Remarketing",
      investment: 702.11,
      leads: 8,
      cpl: 87.76,
      desc: "Reimpacto em usuários que visitaram mas não converteram"
    }
  ] as AudienceData[]
};

export const CRM_AUDIENCES_DATA = {
  week1: [
    {
      name: "Público Aberto",
      investment: 2226.11,
      leads: 46,
      cpl: 48.39,
      desc: "Foco em audiência ampla e expansão de funil direto"
    },
    {
      name: "Público Semelhante a Leads Concluídos",
      investment: 2588.11,
      leads: 31,
      cpl: 83.49,
      desc: "Semelhante a perfis de conversão de leads finalizados"
    },
    {
      name: "Público de Remarketing",
      investment: 2549.31,
      leads: 17,
      cpl: 149.96,
      desc: "Reimpacto na esteira de usuários interessados no CRM"
    }
  ] as AudienceData[],
  week2: [
    {
      name: "Público de Estáticos",
      investment: 1255.55,
      leads: 4,
      cpl: 313.88,
      desc: "Anúncios estáticos com foco em criativos institucionais"
    },
    {
      name: "Público Aberto",
      investment: 1372.90,
      leads: 8,
      cpl: 171.61,
      desc: "Foco em audiência ampla e expansão de funil direto"
    },
    {
      name: "LAL Leads Concluídos",
      investment: 2688.80,
      leads: 12,
      cpl: 224.06,
      desc: "Semelhante a perfis de conversão de leads finalizados"
    },
    {
      name: "Remarketing",
      investment: 2706.23,
      leads: 11,
      cpl: 246.02,
      desc: "Reimpacto na esteira de usuários interessados no CRM"
    }
  ] as AudienceData[]
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
