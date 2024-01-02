require('dotenv').config();
const UserService = require('./user.service');
const B2cClient = require('./B2cClient');

describe('User Service integration', () => {
  let userService;

  beforeAll(() => {
    const client = new B2cClient(
      process.env.B2C_TENANT_ID,
      process.env.B2C_CLIENT_ID,
      process.env.B2C_CLIENT_SECRET
    )
    userService = new UserService(client);
  })

  describe('create, update, delete scenario', () => {
    it('should create, update and delete a user', async () => {
      let userId;

      // initial list
      const usersBefore = await userService.list();
      expect(usersBefore.value.find(user => user.mail === 'john.doe@johndoe.com')).toBeUndefined();

      // creation
      const user = {
        displayName: 'John Doe',
        mail: 'john.doe@johndoe.com',
        identities: [
          {
            signInType: 'userName',
            issuer: 'metyisfrancekedriondev.onmicrosoft.com',
            issuerAssignedId: 'john.doe'
          },
          {
            signInType: 'emailAddress',
            issuer: 'metyisfrancekedriondev.onmicrosoft.com',
            issuerAssignedId: 'john.doe@johndoe.com'
          }
        ],
        passwordProfile: {
          password: '$So218pwd',
          forceChangePasswordNextSignIn: false
        },
        passwordPolicies: 'DisablePasswordExpiration'
      };

      try {
        console.log('Creating user', user.displayName, '...');
        const createdUser = await userService.create(user);
        expect(createdUser).toBeDefined();
        const usersBetween = await userService.list();
        expect(usersBetween.value.find(user => user.mail === 'john.doe@johndoe.com')).toBeDefined();
        console.log('User successfully created', createdUser.id);

        userId = createdUser.id;

        // update
        console.log('Updating user', createdUser.id, '...');
        const updatedUser = await userService.update(createdUser.id, {
          displayName: 'Jane Doe'
        });
        const updatedUserCheck = await userService.get(createdUser.id);
        expect(updatedUserCheck.displayName).toBe('Jane Doe');
        console.log('User successfully updated', updatedUserCheck.id);
      } finally {
        if (userId) {
          // deletion
          console.log('Deleting user', userId, '...');
          await userService.delete(userId);
          const usersAfter = await userService.list();
          expect(usersAfter.value.find(user => user.mail === 'john.doe@johndoe.com')).toBeUndefined();
          console.log('User successfully deleted', userId);
        }
      }

    }, 15000)
  })
})
