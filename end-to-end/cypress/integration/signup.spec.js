describe('サインアップ画面に遷移', () => {
    before(() => {
        cy.clearCookies()
    })

    it('ログインにリダイレクト', () => {
        cy.visit('/')
        cy.url().should('include', '/login')
    })

    it('サインアップへ遷移', () => {
        cy.visit('/signup')
        cy.url().should('include', '/signup')
    })
})