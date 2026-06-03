/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PERFORMANCE_DATA = {
  client: "Confiauto Proteção Veicular",
  period: "Maio de 2026",
  campaign1: {
    name: "Campanha Original (Performance)",
    totalInvestment: 16446.52,
    totalLeads: 174,
    avgCpl: 94.52,
    ads: [
      { name: "Seu veículo está protegido?", leads: 429, spent: 5142.06, cpl: 11.99 },
      { name: "Barato Sai Caro", leads: 4, spent: 51.22, cpl: 12.81 },
      { name: "Equipe Preparada", leads: 0, spent: 50.54, cpl: 0 }
    ]
  },
  campaign2: {
    name: "Campanha Estáticos (Novos)",
    totalInvestment: 11006.79,
    totalLeads: 166,
    avgCpl: 66.31,
    championCreative: {
      name: "ADS01 - 99,00 mensais.",
      leads: 148,
      cpl: 65.98,
      spent: 9764.73,
      percentageOfLeads: "89.2%",
      coverages: [
        "Colisão",
        "Roubo e Furto",
        "Carro Reserva",
        "Assistência 24h",
        "Rastreamento"
      ]
    },
    creatives: [
      {
        name: "ADS01 - 99,00 mensais.",
        investment: 9764.73,
        leads: 148,
        cpl: 65.98,
        isChamp: true
      },
      {
        name: "ADS02 - Planos com adesão facilitada!",
        investment: 782.08,
        leads: 11,
        cpl: 71.10,
        isChamp: false
      },
      {
        name: "ADS04 - PROTEÇÃO VEICULAR",
        investment: 314.14,
        leads: 5,
        cpl: 62.83,
        isChamp: false
      },
      {
        name: "ADS05 - RASTREAMENTO",
        investment: 113.95,
        leads: 1,
        cpl: 113.95,
        isChamp: false
      },
      {
        name: "ADS03 - IMPREVISTO NA ESTRADA?",
        investment: 31.89,
        leads: 1,
        cpl: 31.89,
        isChamp: false
      }
    ]
  },
  crmLpTest: {
    name: "Teste LP do CRM",
    totalInvestment: 9415.67,
    totalLeads: 758,
    avgCpl: 12.42,
    creatives: [
      {
        name: "Criativo: Seu veículo está protegido?",
        investment: 9151.53,
        leads: 743,
        cpl: 12.32,
        isChamp: true
      },
      {
        name: "Criativo: Barato Sai Caro",
        investment: 127.22,
        leads: 8,
        cpl: 15.90,
        isChamp: false
      },
      {
        name: "Criativo: Equipe Preparada",
        investment: 136.92,
        leads: 7,
        cpl: 19.56,
        isChamp: false
      }
    ]
  },
  awarenessCampaign: {
    name: "[AEG] [CBO] [RECONHECIMENTO] [ALCANCE]",
    week1: {
      period: "Sem. Inicial (05-11/05)",
      totalInvestment: 1320.00,
      reach: 242200,
      cpm: 5.45
    },
    week2: {
      period: "Sem. Anterior (12-18/05)",
      totalInvestment: 1551.05,
      reach: 294316,
      cpm: 5.27
    },
    week3: {
      period: "Sem. Atual (19-25/05)",
      totalInvestment: 1552.81,
      reach: 290000,
      cpm: 5.35
    },
    combined: {
      totalInvestment: 4423.86,
      reach: 826516,
      cpm: 5.35
    },
    creatives: [
      {
        name: "ADS02 - Cobertura Campeã",
        spent: 966.54,
        reach: 401527,
        cpm: 2.41
      },
      {
        name: "ADS01 - A Confiauto segue",
        spent: 3457.32,
        reach: 715891,
        cpm: 4.83
      }
    ]
  },
  trafficToProfile: {
    name: "Tráfego para Perfil",
    week1: {
      period: "Sem. Inicial (05-11/05)",
      totalInvestment: 900.00,
      visits: 2100,
      cpv: 0.43
    },
    week2: {
      period: "Sem. Anterior (12-18/05)",
      totalInvestment: 1050.00,
      visits: 2800,
      cpv: 0.38
    },
    week3: {
      period: "Sem. Atual (19-25/05)",
      totalInvestment: 1052.10,
      visits: 3361,
      cpv: 0.31
    },
    combined: {
      totalInvestment: 3002.10,
      visits: 8261,
      cpv: 0.36
    },
    creatives: [
      {
        name: "ADS01 - A Confiauto segue",
        spent: 2277.11,
        visits: 5964,
        cpv: 0.38
      },
      {
        name: "ADS02 - gleisson",
        spent: 724.99,
        visits: 2297,
        cpv: 0.32
      }
    ]
  },
  hiringCampaign: {
    name: "Campanha de Contratação",
    week1: {
      period: "Sem. Inicial (05-11/05)",
      totalInvestment: 2150.00,
      leads: 450,
      cpl: 4.78
    },
    week2: {
      period: "Sem. Anterior (12-18/05)",
      totalInvestment: 2850.00,
      leads: 620,
      cpl: 4.60
    },
    week3: {
      period: "Sem. Atual (19-25/05)",
      totalInvestment: 3347.30,
      leads: 762,
      cpl: 4.39
    },
    combined: {
      totalInvestment: 8347.30,
      leads: 1832,
      cpl: 4.57
    },
    creatives: [
      {
        name: "ADS1 - CONSULTOR INTERNO SÃO GERALDO",
        spent: 813.81,
        leads: 591,
        cpl: 1.38
      },
      {
        name: "ADS2 - CONSULTOR VENDAS",
        spent: 301.27,
        leads: 141,
        cpl: 2.14
      }
    ]
  },
  weeklyInvestment: [
    { period: "01 a 04 de Maio", amount: 9888.33 },
    { period: "05 a 11 de Maio", amount: 29048.61 },
    { period: "12 a 18 de Maio", amount: 30695.99 },
    { period: "19 a 25 de Maio", amount: 23966.45 },
    { period: "26 a 31 de Maio", amount: 19810.86 }
  ],
  weeklyInvestmentTotal: 113410.24,
  comparisonOriginal: {
    totalInvestment: 70268.85,
    totalLeads: 711,
    avgCpl: 98.83,
    lpb: {
      totalInvestment: 5007.01,
      totalLeads: 29,
      avgCpl: 172.66
    },
    original: {
      totalInvestment: 65261.84,
      totalLeads: 682,
      avgCpl: 95.69
    },
    originalCreatives: [
      { name: "ADS02 - CAMPANHA COMPARATIVOS C...", leads: 144, cpl: 82.10, spent: 11822.40, category: "volume" },
      { name: "ADS02 - CAMPANHA COMPARATIVOS C...", leads: 84, cpl: 86.19, spent: 7239.96, category: "volume" },
      { name: "ADS04 - ENTRE PREÇO E QUALIDADE", leads: 73, cpl: 81.72, spent: 5965.56, category: "intermediario" },
      { name: "ADS05 - Seu veículo está protegido", leads: 39, cpl: 76.13, spent: 2969.07, category: "eficiencia" },
      { name: "ADS07 - O BARATO QUE SAI CARO", leads: 38, cpl: 78.71, spent: 2990.98, category: "eficiencia" }
    ],
    lpbCreatives: [
      { name: "META LEAD | Criativo: Barato Sai Caro Teste LP", leads: 22, cpl: 82.45, spent: 1813.85, category: "eficiencia" }
    ]
  },
  comparisonEstaticos: {
    week1: {
      totalInvestment: 1540.35,
      totalLeads: 20,
      avgCpl: 77.02
    },
    week2: {
      totalInvestment: 3411.65,
      totalLeads: 51,
      avgCpl: 66.90
    },
    week3: {
      totalInvestment: 3538.36,
      totalLeads: 56,
      avgCpl: 63.19
    },
    combined: {
      totalInvestment: 8490.36,
      totalLeads: 127,
      avgCpl: 66.85
    }
  }
};
