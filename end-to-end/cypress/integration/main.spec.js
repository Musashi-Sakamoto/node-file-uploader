describe('ログイン画面', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/login')
    })

    it('ログインに成功する', () => {
        cy.get(`input[name='username']`).clear().type('musasho')
        cy.get(`input[name='password']`).clear().type('1292602b')
        cy.contains('Login').click();
        cy.url().should('eq', 'http://localhost:8000/')
        cy.getCookie('token').should('exist')
    })

    it('データあり', () => {
        cy.get(`hr`).its('length').should('be.gte', 1)
    })

    it('投稿', () => {
        cy.get('ul').next('button').click()
        cy.get(`input[id='title']`).clear().type('added title')
        cy.get(`textarea[id='description']`).clear().type('added description')
        cy.get('button').contains('Post').click();
        cy.get('li').first().contains('added title')
        cy.contains('added title').click()
        cy.get('ul').contains('added description')
    })
})