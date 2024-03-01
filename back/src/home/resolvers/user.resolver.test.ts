import { createTestConf, Fixtures } from '../../shared/test.helper';

describe('UserResolver', () => {
  let fixtures: Fixtures;

  beforeEach(async () => {
    fixtures = await createTestConf();
  });

  describe('createUser', () => {
    it('can create a user', async () => {
      const userInput = {
        email: 'najib@example.com',
        firstName: 'Najib',
        lastName: 'Tahar',
      };

      const user = await fixtures.userResolver.createUser(userInput);

      expect(user.email).toBe(userInput.email);
      expect(user.firstName).toBe(userInput.firstName);
      expect(user.lastName).toBe(userInput.lastName);
      expect(await fixtures.userService.getAllUsers()).toHaveLength(1);
    });
  });

  describe('getUser', () => {
    it('can get a user by ID', async () => {
      const userInput = {
        email: 'najib@example.com',
        firstName: 'Najib',
        lastName: 'Tahar',
      };

      const createdUser = await fixtures.userService.createUser(userInput);

      const retrievedUser = await fixtures.userResolver.getUser(createdUser.uuid);

      expect(retrievedUser).toEqual(createdUser);
    });

    it('throws an error for unknown ID', async () => {
      try {
        await fixtures.userResolver.getUser('unknown_id');
      } catch (error) {
        const typedError = error as Error;
        expect(typedError.message).toContain('Could not find user with uuid unknown_id');
      }
    });
  });
});
