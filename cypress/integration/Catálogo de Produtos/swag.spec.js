/// <reference types="cypress"/>

describe('Catálogo de Produtos', () => {
    it('deve listar todos os produtos', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        //Verifica se os produtos estao viziveis
        cy.get('[class=inventory_item]').should('be.visible');

        // Deve achar 6 elementos
        cy.get('[class=inventory_item]').should(($p) => {
            expect($p).to.have.length(6)
        })
    });

    it('deve verificar todos os items dos produtos', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        //Verifica se os produtos estao viziveis
        cy.get('[class=inventory_item]').should('be.visible');

        // Deve achar 6 imagens e titulos
        cy.get('[id=item_0_img_link ]').should('be.visible');
        cy.get('[id=item_0_title_link]').should('be.visible');
        cy.get('[id=item_1_img_link ]').should('be.visible');
        cy.get('[id=item_1_title_link]').should('be.visible');
        cy.get('[id=item_2_img_link ]').should('be.visible');
        cy.get('[id=item_2_title_link]').should('be.visible');
        cy.get('[id=item_3_img_link ]').should('be.visible');
        cy.get('[id=item_3_title_link]').should('be.visible');
        cy.get('[id=item_4_img_link ]').should('be.visible');
        cy.get('[id=item_4_title_link]').should('be.visible');
        cy.get('[id=item_5_img_link ]').should('be.visible');
        cy.get('[id=item_5_title_link]').should('be.visible');

    });

    it('deve verificar os filtros de produtos', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        //Verifica se os filtros de produtos estao viziveis
        cy.get('[data-test=product_sort_container]').should('be.visible');

        //filtra de Z-A
        cy.get('[data-test=product_sort_container]').select('za');


        // Deve achar 6 elementos
        cy.get('[class=inventory_item]').should(($p) => {
            expect($p).to.have.length(6)
        })

        
        //filtra de mais caro a mais barato
        cy.get('[data-test=product_sort_container]').select('hilo');


        // Deve achar 6 elementos
        cy.get('[class=inventory_item]').should(($p) => {
            expect($p).to.have.length(6)
        })

        
        //filtra de mais barato a mais caro  
        cy.get('[data-test=product_sort_container]').select('lohi');


        // Deve achar 6 elementos
        cy.get('[class=inventory_item]').should(($p) => {
            expect($p).to.have.length(6)
        })

        
        //filtra de A-Z
        cy.get('[data-test=product_sort_container]').select('az');


        // Deve achar 6 elementos
        cy.get('[class=inventory_item]').should(($p) => {
            expect($p).to.have.length(6)
        })

    });

});