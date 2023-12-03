/// <reference types="cypress"/>

describe('Add to Cart', () => {
    it('deve permitir adicionar um produto ao carrinho', () => {
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

    });
  });

  