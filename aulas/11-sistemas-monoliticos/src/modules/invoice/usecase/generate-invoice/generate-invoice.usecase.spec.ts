import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate invoice use case unit tests", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "Ricardo",
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

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items.length).toEqual(input.items.length);
  });
});
