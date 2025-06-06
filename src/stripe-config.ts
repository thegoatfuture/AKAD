export const products = {
  academy: {
    id: 'prod_SRn3BMWIRKMioj',
    priceId: 'price_1RWtTUCjlPQkil09pzr8f5uY',
    name: 'AKAD Academy',
    description: 'Rejoignez AKAD Academy et bénéficiez chaque mois d\'un coaching pro, d'analyses exclusives et d\'un accompagnement personnalisé. Optimisez vos performances et devenez un trader rentable avec notre communauté.',
    mode: 'subscription'
  },
  propfirm10k: {
    id: 'prod_SRn0ZfcROf9xV2',
    priceId: 'price_1RWtQwCjlPQkil09hIYp4f32',
    name: 'PropFirm 10K AKAD',
    description: 'Accès au challenge AKAD 10 000€ – évaluez vos compétences et devenez trader financé.',
    mode: 'payment'
  },
  propfirm25k: {
    id: 'prod_SRn0ktsG5wzcoU',
    priceId: 'price_1RWtQACjlPQkil09rkFpEpEM',
    name: 'PropFirm 25K AKAD',
    description: 'Accès au challenge AKAD 25 000€ – évaluez vos compétences et devenez trader financé.',
    mode: 'payment'
  },
  propfirm50k: {
    id: 'prod_SRmz62OcZOxf9u',
    priceId: 'price_1RWtPWCjlPQkil09HhejFyL6',
    name: 'PropFirm 50K AKAD',
    description: 'Accès au challenge AKAD 50 000€ – évaluez vos compétences et devenez trader financé.',
    mode: 'payment'
  },
  propfirm100k: {
    id: 'prod_SRmyh2MpsyxXmS',
    priceId: 'price_1RWtOoCjlPQkil09TVZuoLx1',
    name: 'PropFirm 100K AKAD',
    description: 'Accès au challenge AKAD 100 000€ – évaluez vos compétences et devenez trader financé.',
    mode: 'payment'
  },
  propfirm200k: {
    id: 'prod_SRmvegCeNA5b4f',
    priceId: 'price_1RWtM7CjlPQkil09jpfF1Qh5',
    name: 'PropFirm 200k AKAD',
    description: 'Accès au challenge AKAD 200 000€ – évaluez vos compétences et devenez trader financé.',
    mode: 'payment'
  }
} as const;

export type ProductId = keyof typeof products;