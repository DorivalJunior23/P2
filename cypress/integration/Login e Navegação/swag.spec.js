/// <reference types="cypress"/>

describe('Login e Navegação', () => {
    it('deve permitir o login com usuário e senha válidos', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Validar redirecionamento para página inicial
        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html');
    });

    it('deve redirecionar para a página inicial após o login', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Validar redirecionamento para página inicial
        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html');

        // Validar título da página
        cy.get('span.title').should('contain', 'Products');
    });

    it('deve permitir a navegação entre as páginas do menu', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Clicar no botao de menu
        cy.get('[id=react-burger-menu-btn]').click();

        // Clicar no link "Logout"
        cy.contains('Logout').click();

        // Validar redirecionamento para a página de login
        cy.url().should('equal', 'https://www.saucedemo.com/');

        //Realiza novamente login 
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Clicar no botao de menu
        cy.get('[id=react-burger-menu-btn]').click();

        // Clicar no carrinho
        cy.get('[class=shopping_cart_link]').click();

        // Validar redirecionamento para a página cart
        cy.url().should('equal', 'https://www.saucedemo.com/cart.html');
    });

    it('deve exibir os elementos de navegação corretamente em todas as páginas', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Validar posição do link "Products"
        cy.contains('Products').should('be.visible');

        // Validar se existe os items
        cy.get('[class=inventory_item]').should('be.visible');

        //adiciona item ao carrinho
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();

        // Validar posição do botão Cart
        cy.get('[class=shopping_cart_link]').should('be.visible');

        //Entra no carrinho
        cy.get('[class=shopping_cart_link]').click();

        //Remove item do carrinho
        cy.get('[data-test=remove-sauce-labs-backpack]').click();

        // Validar redirecionamento para a página cart
        cy.url().should('equal', 'https://www.saucedemo.com/cart.html');

        cy.get('[id=react-burger-menu-btn]').should('be.visible');

        cy.get('[id=react-burger-menu-btn]').click();

        cy.get('[id=inventory_sidebar_link]').click();

        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html');

        // Validar posição do botao de menu
        cy.get('[id=react-burger-menu-btn]').should('be.visible');

    });
});
