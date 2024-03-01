import { createTestConf, Fixtures } from '../../shared/test.helper';

describe('BusinessDataResolver', () => {
  let fixtures: Fixtures;

  beforeEach(async () => {
    fixtures = await createTestConf();
  });

  describe('generateBusinessDataForHome', () => {
    it('can generate business data for a home', async () => {
      const home = await fixtures.homeService.createHome({
        zipcode: '93000'
      });
      const initialOfferPrice = 100000;
      const finalOfferPrice = 120000;
      const targetSalePrice = 150000;

      const businessData = await fixtures.businessDataResolver.generateBusinessDataForHome(
        home.uuid,
        initialOfferPrice,
        finalOfferPrice,
        targetSalePrice
      );

      expect(businessData.initialOfferPrice).toBe(initialOfferPrice);
      expect(businessData.finalOfferPrice).toBe(finalOfferPrice);
      expect(businessData.targetSalePrice).toBe(targetSalePrice);
    });
  });
});

