// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// *******************************************************
Cypress.Commands.add("backgroundLogin", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.config().apiUrl}users/login`,
    body: {
      user: {
        email: "agilizei-rwc@mail.com",
        password: "12345678",
      },
    },
  }).then((loginRespoonse) => {
    console.log(loginRespoonse.body);
    cy.log(loginRespoonse.body.user.token);

    cy.visit("editor", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("jwtToken", loginRespoonse.body.user.token);
      },
    });
  });
});
