import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemsModel } from "../repository/invoice-items.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice facade tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Ricardo Jacomel",
      document: "1234567890",
      street: "Street 123",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "12345-678",
      items: [
        { id: "1", name: "Item 1", price: 50 },
        { id: "2", name: "Item 2", price: 100 },
      ],
    };

    const result = await facade.generate(input);

    const invoice = await InvoiceModel.findOne({
      where: { id: result.id },
      include: ["items"],
    });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(result.id);
    expect(invoice.name).toBe(result.name);
    expect(invoice.document).toBe(result.document);
    expect(invoice.street).toBe(result.street);
    expect(invoice.number).toBe(result.number);
    expect(invoice.complement).toBe(result.complement);
    expect(invoice.city).toBe(result.city);
    expect(invoice.state).toBe(result.state);
    expect(invoice.zipcode).toBe(result.zipCode);
  });

  it("should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Ricardo Jacomel",
      document: "1234567890",
      street: "Street 123",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "12345-678",
      items: [
        { id: "1", name: "Item 1", price: 50 },
        { id: "2", name: "Item 2", price: 100 },
      ],
    };

    const result = await facade.generate(input);

    const invoice = await facade.find({ id: result.id });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(result.id);
    expect(invoice.name).toBe(result.name);
    expect(invoice.document).toBe(result.document);
    expect(invoice.address.street).toBe(result.street);
    expect(invoice.address.number).toBe(result.number);
    expect(invoice.address.complement).toBe(result.complement);
    expect(invoice.address.city).toBe(result.city);
    expect(invoice.address.state).toBe(result.state);
    expect(invoice.address.zipCode).toBe(result.zipCode);
  });
});
