import { createTestConf, Fixtures } from '../../shared/test.helper';

describe('home test', () => {
  let fixtures: Fixtures;

  beforeEach(async () => {
    fixtures = await createTestConf();
  });

  describe('createHome', () => {
    it('can create a home', async () => {
      const home = await fixtures.homeResolver.createHome({
        zipcode: '75016',
        surfaceM2: 20,
      });
      expect(home.surfaceM2).toBe(20);
      expect(home.zipcode).toBe('75016');
      expect(await fixtures.homeService.getAllHomes()).toHaveLength(1);
    });
  });

  describe('getHome', () => {
    it('can get a home by ID', async () => {
      const home = await fixtures.homeService.createHome({
        zipcode: '75016'
      });

      const retrievedHome = await fixtures.homeResolver.getHome(home.uuid);

      expect(retrievedHome).toEqual(home);
    });

    it('throws an error for unknown ID', async () => {
      try {
        await fixtures.homeResolver.getHome('unknown_id');
      } catch (error) {
        const typedError = error as Error;
        expect(typedError.message).toContain('Could not find home with uuid unknown_id');
      }
    });
  });
});
