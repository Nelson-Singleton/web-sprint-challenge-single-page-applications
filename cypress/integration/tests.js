describe('My Tests', function(){


it('Can type something in the "text" input boxes', () => {
  cy.visit('http://localhost:3000/pizza')
    cy.get('.nametab')
    .type('test name')
    
    
    cy.get('.specialtab')
    .type('testing special instructions')
    
  })


it('Can click multiple checkboxes', () => {
  
  cy.visit('http://localhost:3000/pizza')
  cy.get('.sausagebox').click()
  cy.get('.baconbox').click()
  cy.get('.peppersbox').click()
  cy.get('.onionsbox').click()

  
    
  })

  it('Can click submit button', () => {
  cy.visit('http://localhost:3000/pizza')
  cy.get('.submitbutton').click()
  })

})