// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add ('fillMandatoryFieldsAndSubmit', (data ={
    //desta forma, deixo como padrão esses argumentos no caso de eu não passar o "data" como parâmetro no meu teste - se eu passar data, ele vai puxar o q eu definie no .data)
    firstName: 'John' ,
    lastName: 'Doe',
    email: 'johndoe@exemple.com',
    text: 'text',
}) =>{

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)    
    cy.contains('button', 'Enviar').click()
})