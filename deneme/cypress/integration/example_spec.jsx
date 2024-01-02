describe('My App', () => {
    it('should display the homepage', () => {
        cy.visit('/')
        cy.contains('Welcome to My App')
    })

    it('should navigate to about page', () => {
        cy.visit('/')
        cy.get('a[href="/about"]').click()
        cy.url().should('include', '/about')
    })


})
