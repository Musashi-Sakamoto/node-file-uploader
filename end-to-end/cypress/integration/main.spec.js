describe('メイン画面', () => {
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

    it('編集', () => {
        cy.scrollTo(0, 0)
        cy.get('ul>li>button').eq(1).click()
        cy.get(`input[id='title']`).should('have.value', 'added title')
        cy.get(`textarea[id='description']`).should('have.value', 'added description')
        cy.get(`input[id='title']`).clear().type('added title2')
        cy.get(`textarea[id='description']`).clear().type('added description2')
        cy.get('button').contains('Edit').click();
        cy.get('li').first().contains('added title2')
        cy.contains('added title2').click()
        cy.get('ul').contains('added description2')
    })

    it('削除', () => {
        cy.scrollTo(0, 0)
        cy.get('ul>li>button').first().click()
        cy.get('button').contains('OK').click()
        cy.get(`input[id='title']`).should('not.have.value', 'added title2')
        cy.contains('added title2 has been deleted')
    })
})