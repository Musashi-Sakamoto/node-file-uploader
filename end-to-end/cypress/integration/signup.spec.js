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

    it('テキストフィールド未入力', () => {
        cy.contains('Signup').click();
        cy.contains('Username or Password should not be blank')
    })

    it('存在しているアドレス', () => {
        cy.get(`input[name='email']`).clear().type('1292602b@gmail.com')
        cy.get(`input[name='username']`).clear().type('musasho')
        cy.get(`input[name='password']`).clear().type('1292602b')
        cy.contains('Signup').click();
        cy.contains('User already exists.')
    })

    it('存在しているユーザ名', () => {
        cy.get(`input[name='email']`).clear().type('1292602a@gmail.com')
        cy.get(`input[name='username']`).clear().type('musao')
        cy.get(`input[name='password']`).clear().type('1292602b')
        cy.contains('Signup').click();
        cy.contains('User already exists.')
    })
})