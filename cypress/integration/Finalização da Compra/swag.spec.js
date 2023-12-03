/// <reference types="cypress"/>

describe('Finalização da Compra', () => {
   
    it('deve permitirfinalizar a compra', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();
  
     // Validar se existe os items
     cy.get('[class=inventory_item]').should('be.visible');

     //adiciona todos os items ao carrinho
     cy.get('button').should('contain','Add to cart').click({ multiple: true });

     // Validar posição do botão Cart
     cy.get('[class=shopping_cart_link]').should('be.visible');

     //Entra no carrinho
     cy.get('[class=shopping_cart_link]').click();
    
     // Deve achar 6 elementos
     cy.get('[class=cart_item]').should(($p) => {
        expect($p).to.have.length(6)
    
    })

    //Confirma compra
    cy.get('[data-test=checkout]').click();

    //coloca as informaçoes de entrega
    cy.get('[data-test=firstName]').type('standard');
    cy.get('[data-test=lastName]').type('user');
    cy.get('[data-test=postalCode]').type('secret_sauce');
    cy.get('[data-test=continue]').click();

       
     // Deve achar 6 elementos
    cy.get('[class=cart_item]').should(($p) => {
        expect($p).to.have.length(6)
    
    });

    //Verifica as informaçoes do cartao e etc... 

    //Finaliza a compra
    cy.get('[data-test=finish]').click();

    });

});