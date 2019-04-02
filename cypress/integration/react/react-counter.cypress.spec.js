describe("测试 react counter", () => {
  // 测试用例触发前调用的函数钩子
  before(() => {
    // 进入测试页面
    cy.visit("/");
  });

  describe("初始化测试", () => {
    it("进入react-counter测试页面", () => {
      cy.get("#react-counter").click();
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

    it("奇偶状态为 Even", () => {
      cy.get("#count").contains("Even");
    });
  });

  describe("测试减数", () => {
    it("测试减少增加数字", () => {
      cy.get(".decrement").click();
    });

    it("状态变为2", () => {
      cy.get("#count").contains("2");
    });

    it("奇偶状态为 Odd", () => {
      cy.get("#count").contains("Odd");
    });
  });

  after(() => {
    // 进入测试页面
    cy.visit("/");
  })
});
