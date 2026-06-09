/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CampaignData {
  id: string;
  name: string;
  investment: number;
  leads?: number;
  reach?: number;
  visits?: number;
  cpl: number;
  cpm?: number;
  objective: string;
  tag: string;
  description: string;
}

export const PERFORMANCE_DATA = {
  client: "Confiauto Proteção Veicular",
  period: "01 a 08 de Junho de 2026",
  campaigns: [
    {
      id: "lp_original",
      name: "Campanha LP Original",
      investment: 12770.76,
      leads: 138,
      cpl: 92.54,
      objective: "Geração de Leads Qualificados na LP Principal",
      tag: "Líder de Conversões",
      description: "Campanha de alta relevância com foco na página de pouso original. Segue capitaneando a captação principal com excelente volume de leads."
    },
    {
      id: "lp_b",
      name: "Campanha LP B",
      investment: 2942.24,
      leads: 22,
      cpl: 133.73,
      objective: "Geração de Leads na Landing Page B (Teste de Funil)",
      tag: "Ambiente de Teste A/B",
      description: "Campanha paralela focada no teste alternativo da LP B. Apresentou CPL de R$ 133,73, característico do período de aprendizagem de novos criativos e otimizações de conversão."
    },
    {
      id: "crm",
      name: "Campanha CRM",
      investment: 5764.96,
      leads: 23,
      cpl: 250.60,
      objective: "Captação com Integração Direta de CRM",
      tag: "Esteira Técnica Integral",
      description: "Campanha criada com objetivo de validar a sincronização e recepção de contatos diretos no CRM, aplicando critérios técnicos refinados."
    },
    {
      id: "alcance",
      name: "Campanha de Alcance",
      investment: 1128.80,
      reach: 491540,
      cpl: 250.60,
      cpm: 2.30, // 1128.80 / (491540 / 1000) = ~2.30
      objective: "Expansão de Reconhecimento de Marca & Branding",
      tag: "Maximização de Impressões",
      description: "Estratégia focada na captação regional de público com altíssima taxa de entrega. Gerou alcance expressivo de 491.540 pessoas sob CPM econômico de R$ 2,30."
    },
    {
      id: "trafego_perfil",
      name: "Tráfego para Perfil",
      investment: 678.55,
      visits: 1871,
      cpl: 0.36,
      objective: "Atração e Engajamento para o Perfil Oficial",
      tag: "Aquecimento de Base",
      description: "Campanha voltada para direcionamento ao perfil corporativo do Instagram, gerando interação de qualidade e alcançando excelentes 1.871 visitas a custo unitário baixíssimo de R$ 0,36."
    },
    {
      id: "contratacao",
      name: "Campanha de Contratação",
      investment: 1662.03,
      leads: 314,
      cpl: 5.29,
      objective: "Captação para Expansão da Força de Vendas de RH",
      tag: "Surgimento de Consultores",
      description: "Foco no processo seletivo e atração de novos talentos comerciais. Consolidou-se como o maior destaque de volume absoluto gerando 314 candidatos com CPL excelente de R$ 5,29."
    }
  ] as CampaignData[]
};
