/// <reference types="cypress"/>

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preencha os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("Estou validando o sucesso nos campos obrigatórios e utilizando um texto longo para também validar o delay", 10);

    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Puntel");
    cy.get("#email").type("pedro@teste.com.br");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Puntel");
    cy.get("#email").type("pedroteste.com.br");
    cy.get("#open-text-area").type('testando', { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com um valor não numérico", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Puntel");
    cy.get("#email").type("pedro@teste.com.br");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type(
      "Estou validando erro ao não informar o telefone quando obrigatório"
    );
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Pedro").clear().should("have.value", "");

    cy.get("#lastName").type("Puntel").clear().should("have.value", "");

    cy.get("#email")
      .type("pedro@teste.com.br")
      .clear()
      .should("have.value", "");

    cy.get("#phone").type("5199999999").clear().should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formulário utilizando comandos customizados", () => {
    const data = {
      firstName: "Pedro",
      lastName: "Puntel",
      email: "pedro@teste.com.br",
      text: "Teste",
    };

    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu valor (value)", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu valor (value)", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"], [value="feedback"]')
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((tipoAtendimento) => {
      cy.wrap(tipoAtendimento).check().should("be.checked");
    });

    ///cy.get('input[type="radio"]')
    ///.check("feedback")
    ///.should('have.value', 'feedback')

    ///cy.get('input[type="radio"]')
    /// .check("elogio")
    /// .should('have.value', 'elogio')

    ///  cy.get('input[type="radio"]')
    /// .check("ajuda")
    /// .should('have.value', 'ajuda')
    
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("be.empty");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type=file]")
      .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })       
  })

   it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type=file]")
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })       
  })

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile")
    cy.get("input[type=file]")
      .selectFile("@sampleFile")
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })       
  })

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', "_blank")

  })

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  
  })

  it("testa a página da política de privacidade de forma independente", () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    cy.contains('p', 'Talking About Testing'). should('be.visible')

  })

});
