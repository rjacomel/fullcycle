import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      let customer = new Customer("", "Ricardo");
    }).toThrowError("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("customer: Name is required");
  });

  it("should throw error when name and id are empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError("customer: Id is required,customer: Name is required");
  });

  it("should change name", () => {
    // Triple A (Arrange, Act, Assert)
    // Arrange

    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Ricardo");

    // Assert
    expect(customer.name).toBe("Ricardo");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Cusotmer 1");
    const address = new Address("Street 1", 123, "12345-678", "Araucária");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Cusotmer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
