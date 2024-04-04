describe('KvikForm', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('GET', 'https://glkltp5rvo76hkmz4fraevhshu0yluco.lambda-url.eu-central-1.on.aws/problem', {
      statusCode: 200,
      body: {
        introText: 'Introduction Text',
        description: 'Problem Description',
        problemText: 'Problem Text start {{input0}} problem text end',
      },
    }).as('getProblem')

    cy.intercept('POST', 'https://glkltp5rvo76hkmz4fraevhshu0yluco.lambda-url.eu-central-1.on.aws/check', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            isCorrect: true,
            correctAnswer: { input0: 'dog' }
          },
        });
    }).as('checkAnswer')
  })

  it('should display introduction text', () => {
    cy.contains('Introduction Text').should('be.visible')
  })

  it('should display problem description', () => {
    cy.contains('Problem Description').should('be.visible')
  })

  it('should display problemText', () => {
  cy.get('[data-cy="input"]').should('have.value', '')
  cy.get('[data-cy="input"]').focus()
  cy.get('[data-cy="problem-text"]').should('contain', 'Problem Text start').should('contain', 'problem text end')
})

  it('should have an empty input field initially', () => {
    cy.get('[data-cy="input"]').should('have.value', '')
  })

  it('should contain a button with the text "Tjek mit svar"', () => {
    cy.get('button').contains('Tjek mit svar').should('be.visible')
  })

  it('should change button name based on input value', () => {
    cy.get('[data-cy="input"]').should('have.value', '')

    cy.get('[data-cy="input"]').focus().type('dog')

    cy.get('[data-cy="button"]').should('be.visible').click()

    cy.wait('@checkAnswer').then(() => {
      cy.get('[data-cy="button"]').should('have.text', 'Næste opgave')
    })
  })

  it('should change button name to "Prøv igen" for wrong answer', () => {

        cy.intercept('POST', 'https://glkltp5rvo76hkmz4fraevhshu0yluco.lambda-url.eu-central-1.on.aws/check', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            isCorrect: false,
            correctAnswer: { input0: 'dog' }
          },
        });
    }).as('checkAnswer')

    cy.get('[data-cy="input"]').should('have.value', '')

    cy.get('[data-cy="input"]').focus().type('wrong')

    // eslint-disable-next-line testing-library/await-async-utils
    cy.get('[data-cy="button"]').should('be.visible').click().wait(3000)
    cy.get('[data-cy="button"]').should('be.visible').click()

    cy.wait('@checkAnswer').then(() => {
      cy.get('[data-cy="button"]').should('have.text', 'Prøv igen')
    })
  })

})