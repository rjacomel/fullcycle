import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";

describe("Test for product update use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product 123", 100);
    await productRepository.create(product);
    const resultFind = await productRepository.find(product.id);

    expect(resultFind).toEqual(product);

    const inputUpdate = {
      id: product.id,
      name: "Product 456",
      price: 250,
    };

    const outputUpdate = await productUpdateUseCase.execute(inputUpdate);

    expect(outputUpdate).toEqual(inputUpdate);
  });
});
