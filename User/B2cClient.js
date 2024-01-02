const { Client } = require("@microsoft/microsoft-graph-client");
const { TokenCredentialAuthenticationProvider } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const { ClientSecretCredential } = require("@azure/identity");

/**
 * @typedef {Object} UserCreationDto
 * @property {string} displayName
 * @property {string[]} businessPhones
 * @property {string} givenName
 * @property {string} jobTitle
 * @property {string} mail
 * @property {string} mobilePhone
 * @property {string} officeLocation
 * @property {string} preferredLanguage
 * @property {Object[]} identities
 * @property {string} identities[].signInType
 * @property {string} identities[].issuer
 * @property {string} identities[].issuerAssignedId
 * @property {Object} passwordProfile
 * @property {string} passwordProfile.password
 * @property {boolean} passwordProfile.forceChangePasswordNextSignIn
 * @property {string} passwordPolicies
 */

/**
 * @typedef {Object} UserUpdateDto
 * @property {string} displayName
 * @property {string[]} businessPhones
 * @property {string} givenName
 * @property {string} jobTitle
 * @property {string} mail
 * @property {string} mobilePhone
 * @property {string} officeLocation
 * @property {string} preferredLanguage
 */

class B2cClient {
  constructor(tenantId, clientId, clientSecret) {
    this.credential = new ClientSecretCredential(
      tenantId, clientId, clientSecret
    );
    this.authProvider = new TokenCredentialAuthenticationProvider(this.credential, {
      scopes: ['https://graph.microsoft.com/.default'],
    });
    this.graphClient = Client.initWithMiddleware({ authProvider: this.authProvider });
  }

  async getUser(id) {
    return await this.graphClient.api(`/users/${id}`).get();
  }

  /**
   * Create a user.
   * @param {UserCreationDto} user
   */
  async createUser(user) {
    return await this.graphClient.api(`/users`).create(user);
  }

  /**
   * Update a user.
   * @param {string} id
   * @param {UserUpdateDto} user
   */
  async updateUser(id, user) {
    return await this.graphClient.api(`/users/${id}`).update(user);
  }

  /**
   * Delete a user.
   * @param {string} id
   */
  async deleteUser(id) {
    return await this.graphClient.api(`/users/${id}`).delete();
  }

  /**
   * List all users.
   */
  async listUsers() {
    return await this.graphClient.api('/users').get();
  }
}

module.exports = B2cClient;
