# Azure-B2C-User-CRUD-Example

This script is a demonstration of how to use the Azure AD B2C User API to create, update and delete customer accounts (aka. users with local account identities).

## Prerequisites

You need an Azure subscription, with an Azure AD B2C tenant and an application registered in that tenant.

You also need to create a client secret for that application.

See the [Resources](#resources) section for more information.

## Setup

Install all dependencies:

```bash
npm ci
```

Create a `.env` file in the root of the project (copy the `.env.example` file) and fill in the required values.

## Usage

Run the test script which will create, update and delete a user:

```bash
npm run test
```

## Resources

- [Azure AD B2C User Creation API](https://learn.microsoft.com/en-us/graph/api/user-post-users?view=graph-rest-1.0&tabs=http#example-2-create-a-user-with-social-and-local-account-identities)
- [Azure AD B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant) tenant
- [Azure AD B2C Application](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga) with the following permission:
    - `User.ReadWrite.All`
- [Node.js](https://nodejs.org/en/download/)
