/// <reference types="cypress" />

const url = 'http://localhost:8080/';
const bunName = 'Краторная булка N-200i';
const fillName = 'Филе Люминесцентного тетраодонтимформа';
const sauseName = 'Соус с шипами Антарианского плоскоходца';

describe('create burger test', () => {
	it('try go to the site', () => {
		cy.visit(url);
	});

	it('should dragndrop', () => {
		cy.visit(url);

		cy.get('img[alt="' + bunName + '"]').as('bunCard');
		cy.get('img[alt="' + fillName + '"]').as('fillCard');
		cy.get('img[alt="' + sauseName + '"]').as('sauseCard');

		cy.get('*[class^="burger-constructor-module__elementContainer"]').as(
			'costructor'
		);

		cy.get('@bunCard')
			.drag('@costructor')
			.then((success) => {
				assert.isTrue(success);
			});

		const dataTransfer = new DataTransfer();
		cy.get('@fillCard')
			.drag('@costructor')
			.then((success) => {
				assert.isTrue(success);
			});

		cy.get('@sauseCard')
			.drag('@costructor')
			.then((success) => {
				assert.isTrue(success);
			});

		cy.get('@costructor').eq(0).should('contain', bunName);

		cy.get('@costructor').eq(1).should('contain', sauseName);

		cy.get('@costructor').eq(2).should('contain', fillName);
	});
});
