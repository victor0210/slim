// cypress/integration/test.cypress.test.js
describe("测试 base counter", () => {
  // 测试用例触发前调用的函数钩子
  before(() => {
    // 进入测试页面
    cy.visit("/");
  });

  describe("初始化测试", () => {
    it("进入base-counter测试页面", () => {
      cy.get("#base-counter").click();
    });

    it("初始化状态为0", () => {
      cy.get("#count").contains("0");
    });
  });

  describe("测试加数", () => {
    it("测试增加数字", () => {
      cy.get(".increment").click();
      cy.get(".increment").click();
      cy.get(".increment").click();
    });

    it("状态变为3", () => {
      cy.get("#count").contains("3");
    });
  });

  describe("测试减数, 一次减5", () => {
    it("测试减少增加数字", () => {
      cy.get(".decrement").click();
      cy.clock();
      cy.tick(1000);
    });

    it("状态变为-2", () => {
      cy.get("#count").contains("-2");
    });
  });

  after(() => {
    // 进入测试页面
    cy.visit("/");
  })
});
