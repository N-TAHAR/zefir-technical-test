import { Fixtures, createTestConf } from '../../shared/test.helper';
import BusinessDataService from '../services/businessData.service';

describe('BusinessDataService', () => {
  let service: BusinessDataService;
  let fixtures: Fixtures;

  beforeEach(async () => {
    fixtures = await createTestConf();
    service = fixtures.businessDataService;
  });

  describe('computeNegotiationMargin', () => {
    it('when maxNegotiationMargin is the minimum, it returns maxNegotiationMargin', () => {
      const finalOfferPrice = 92;
      const targetSalePrice = 100;
      const maxNegotiationMargin = 0.07
      const margin = service.computeNegotiationMargin(finalOfferPrice, targetSalePrice, maxNegotiationMargin);

      expect(margin).toBe(maxNegotiationMargin);
    });

    it('when relativeMargin is the minimum, it returns relativeMargin', () => {
      const finalOfferPrice = 80;
      const targetSalePrice = 100;
      const relativeMargin = ((targetSalePrice / finalOfferPrice) - 1).toFixed(3);
      const maxNegotiationMargin = 0.5
      const margin = service.computeNegotiationMargin(finalOfferPrice, targetSalePrice, maxNegotiationMargin);
      
      expect(margin).toBe(Number(relativeMargin));
    });
  });

  describe('computeServiceFees', () => {
    it('returns the correct service fee', () => {
      expect(service.computeServiceFees(100000, '75000')).toBe(22000);
      expect(service.computeServiceFees(150000, '59000')).toBe(20000);
      expect(service.computeServiceFees(200000, '44000')).toBe(22000);
      expect(service.computeServiceFees(1000000, '44000')).toBe(999999);
      expect(service.computeServiceFees(1000000, '93000')).toBe(100000);
    });
  
    it('returns 0 if the region code is not found', () => {
      expect(service.computeServiceFees(100000, '99999')).toBe(0);
    });
  });
});
