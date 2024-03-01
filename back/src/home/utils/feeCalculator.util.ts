export default function calculateServiceFee(finalOfferPrice: number, regionCode: string): number {
  const regionFeeStructure = feeStructures[regionCode];

  if (regionFeeStructure) {
    const { fee } = regionFeeStructure.find(({ threshold }) => finalOfferPrice < threshold) || {};

    if (fee !== undefined) {
      return fee > 1 ? fee : fee * finalOfferPrice
    }
  }
  return 0;
}


const feeStructures: Record<string, { threshold: number, fee: number }[]> = {
  '75': [
    { threshold: 100000, fee: 20000 },
    { threshold: 145000, fee: 22000 },
    { threshold: 200000, fee: 23000 },
    { threshold: 400000, fee: 0.11 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.1 }
  ],
  '92': [
    { threshold: 100000, fee: 20000 },
    { threshold: 145000, fee: 22000 },
    { threshold: 200000, fee: 23000 },
    { threshold: 400000, fee: 0.11 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.1 }
  ],
  '93': [
    { threshold: 100000, fee: 20000 },
    { threshold: 145000, fee: 22000 },
    { threshold: 200000, fee: 23000 },
    { threshold: 400000, fee: 0.11 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.1 }
  ],
  '94': [
    { threshold: 100000, fee: 20000 },
    { threshold: 145000, fee: 22000 },
    { threshold: 200000, fee: 23000 },
    { threshold: 400000, fee: 0.11 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.1 }
  ],
  '59': [
    { threshold: 100000, fee: 15000 },
    { threshold: 145000, fee: 19000 },
    { threshold: 200000, fee: 20000 },
    { threshold: 400000, fee: 0.1 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.3 }
  ],
  '44': [
    { threshold: 100000, fee: 20000 },
    { threshold: 145000, fee: 22000 },
    { threshold: 200000, fee: 23000 },
    { threshold: 400000, fee: 0.11 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.999999 }
  ],
  '69': [
    { threshold: 100000, fee: 20000 },
    { threshold: 145000, fee: 22000 },
    { threshold: 200000, fee: 23000 },
    { threshold: 400000, fee: 0.11 },
    { threshold: 650000, fee: 0.08 },
    { threshold: Infinity, fee: 0.999999 }
  ]
};