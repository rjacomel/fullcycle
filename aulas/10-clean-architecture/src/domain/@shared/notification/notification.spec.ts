import Notification from "./notification";

describe("Unit tests for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const error2 = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });

  it("should create product errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product",
    };

    notification.addError(error);

    expect(notification.messages("product")).toBe("product: error message,");

    const error2 = {
      message: "error message2",
      context: "product",
    };
    notification.addError(error2);

    expect(notification.messages("product")).toBe(
      "product: error message,product: error message2,"
    );

    const error3 = {
        message: "error message3",
        context: "product",
      };
      notification.addError(error3);
  
      expect(notification.messages("product")).toBe(
        "product: error message,product: error message2,product: error message3,"
      );
  });

  it("should check if notification has at least one product error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all product errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "product",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});
