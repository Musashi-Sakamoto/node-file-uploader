describe('ログイン画面', () => {
    before(() => {
        cy.clearCookies()
    })

    it('ログインにリダイレクト', () => {
        cy.visit('/')
        cy.url().should('include', '/login')
    })

    it('テキストフィールド未入力', () => {
        cy.contains('Login').click();
        cy.contains('Username or Password should not be blank')
    })

    it('存在しないユーザー', () => {
        cy.get(`input[name='username']`).clear().type('dummyusername')
        cy.get(`input[name='password']`).clear().type('dummypassword')
        cy.contains('Login').click();
        cy.contains('Incorect username.')
    })

    it('誤ったパスワード', () => {
        cy.get(`input[name='username']`).clear().type('musasho')
        cy.get(`input[name='password']`).clear().type('dummypassword')
        cy.contains('Login').click();
        cy.contains('Incorrect password.')
    })

    it('ログインに成功する', () => {
        cy.get(`input[name='username']`).clear().type('musasho')
        cy.get(`input[name='password']`).clear().type('1292602b')
        cy.contains('Login').click();
        cy.url().should('eq', 'http://localhost:8000/')
        cy.getCookie('token').should('exist')
    })

    it('ログアウトに成功する', () => {
        cy.contains('Logout').click();
        cy.url().should('eq', 'http://localhost:8000/login')
        cy.getCookie('token').should('not.exist')
    })
})