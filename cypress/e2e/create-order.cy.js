/// <reference types="cypress" />

describe('create burger test', () => {
	it('try go to the site', () => {
		cy.visit('http://localhost:8080/');
	});

	it('drag-n-drop test', () => {
		it('should dragndrop', () => {
			cy.visit('http://localhost:8080/');

			cy.get('img[alt="Краторная булка N-200i"]')
				.drag('*[class^="burger-constructor-module__elementContainer"]')
				.then((success) => {
					assert.isTrue(success);
				});

			const dataTransfer = new DataTransfer();
			cy.get('img[alt="Филе Люминесцентного тетраодонтимформа"]')
				.drag('*[class^="burger-constructor-module__elementContainer"]')
				.then((success) => {
					assert.isTrue(success);
				});

			cy.get('img[alt="Соус с шипами Антарианского плоскоходца"]')
				.drag('*[class^="burger-constructor-module__elementContainer"]')
				.then((success) => {
					assert.isTrue(success);
				});

			cy.get('*[class^="burger-constructor-module__elementContainer"]')
				.eq(0)
				.should('contain', 'Краторная булка N-200i');

			cy.get('*[class^="burger-constructor-module__elementContainer"]')
				.eq(1)
				.should('contain', 'Филе Люминесцентного тетраодонтимформа');

			cy.get('*[class^="burger-constructor-module__elementContainer"]')
				.eq(2)
				.should('contain', 'Соус с шипами Антарианского плоскоходца');
		});
	});
});
