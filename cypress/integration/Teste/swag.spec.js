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

describe('Add to Cart', () => {
    it('deve permitir adicionar um produto ao carrinho', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Validar se existe os items
        cy.get('[class=inventory_item]').should('be.visible');

        //adiciona todos os items ao carrinho
        cy.get('button').should('contain', 'Add to cart').click({ multiple: true });

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


describe('Finalização da Compra', () => {

    it('deve permitirfinalizar a compra', () => {
        cy.visit('https://saucedemo.com/');
        cy.get('[data-test=username]').type('standard_user');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.contains('Login').click();

        // Validar se existe os items
        cy.get('[class=inventory_item]').should('be.visible');

        //adiciona todos os items ao carrinho
        cy.get('button').should('contain', 'Add to cart').click({ multiple: true });

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


        //Finaliza a compra
        cy.get('[data-test=finish]').click();


    });

});