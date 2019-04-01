describe('测试 vue todomvc', () => {
  // 测试用例触发前调用的函数钩子
  before(() => {
    // 进入测试页面
    cy.visit('/')
  })

  describe('初始化测试', () => {
    it('进入vue-todomvc测试页面', () => {
      cy.get('#vue-todomvc').click()
    })
  })

  describe('测试添加 todo', () => {
    it('输入测试welcome', () => {
      cy.get('.new-todo').type('welcome')
    })

    it('按下回车', () => {
      cy.get('.new-todo').type('{enter}')
    })

    it('测试未完成todo总数', () => {
      cy.get('.todo-count').contains('1')
    })

    it('输入测试to', () => {
      cy.get('.new-todo').type('to')
    })

    it('按下回车', () => {
      cy.get('.new-todo').type('{enter}')
    })

    it('输入测试slim', () => {
      cy.get('.new-todo').type('slim')
    })

    it('按下回车', () => {
      cy.get('.new-todo').type('{enter}')
    })

    it('测试未完成todo总数', () => {
      cy.get('.todo-count').contains('3')
    })

    it('测试添加是否成功', () => {
      cy.get('.todo-list').first().contains('welcome')
      cy.get('.todo-list').last().contains('slim')
    })
  })

  describe('测试编辑 todo 文案', () => {
    it('修改todo内容', () => {
      cy.get('.todo label').first().dblclick()
      cy.clock()
      cy.tick(1000)
      cy.get('input.edit').first().type('WELCOME')
      cy.get('input.edit').first().type('{enter}')

      cy.get('.todo label').last().dblclick()
      cy.clock()
      cy.tick(1000)
      cy.get('input.edit').last().type('SLIM')
      cy.get('input.edit').last().type('{enter}')
    })

    it('测试修改是否成功', () => {
      cy.get('.todo-list').first().contains('welcomeWELCOME')
      cy.get('.todo-list').last().contains('slimSLIM')
    })
  })

  describe('测试编辑 todo 状态', () => {
    it('修改todo状态为完成', () => {
      cy.get('input.toggle').first().click()
    })

    it('测试未完成todo总数', () => {
      cy.get('.todo-count').contains('2')
    })

    it('测试修改是否成功', () => {
      cy.get('.todo.completed').contains('welcomeWELCOME')
    })
  })

  describe('测试过滤 todo 状态', () => {
    it('修改todo 过滤状态为完成', () => {
      cy.get('a').contains('Completed').click()
    })

    it('测试完成todo总数', () => {
      cy.get('li.todo').should('have.length', 1)
    })

    it('修改todo 过滤状态为未完成', () => {
      cy.get('a').contains('Active').click()
    })

    it('测试未完成todo总数', () => {
      cy.get('li.todo').should('have.length', 2)
    })

    it('修改todo 过滤状态为全部', () => {
      cy.get('a').contains('All').click()
    })

    it('测试全部todo总数', () => {
      cy.get('li.todo').should('have.length', 3)
    })
  })

  describe('测试删除第一个 todo', () => {
    it('测试删除welcomeWELCOME', () => {
      cy.get('button.destroy').first().invoke('show').click()
    })

    it('测试未完成todo总数', () => {
      cy.get('.todo-count').contains('2')
    })

    it('测试全部todo总数', () => {
      cy.get('li.todo').should('have.length', 2)
    })
  })

  describe('测试删除全部完成todo', () => {
    it('修改全部todo状态为完成', () => {
      cy.get('input.toggle').first().click()
      cy.get('input.toggle').last().click()
    })

    it('测试删除全部完成的todo', () => {
      cy.get('.clear-completed').first().click()
    })

    it('测试全部todo总数', () => {
      cy.get('li.todo').should('have.length', 0)
    })
  })

  after(() => {
    // 退出测试页面
    cy.visit("/");
  })
})
