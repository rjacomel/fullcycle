import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";

describe("Test create product use case", () => {
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

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Product 456", 30);
    product.changeName("Product 123");
    product.changePrice(100);

    const input = {
      type: "a",
      name: product.name,
      price: product.price,
    };

    const resultCreate = await usecase.execute(input);

    const output = {
      id: resultCreate.id,
      name: resultCreate.name,
      price: resultCreate.price,
    };

    expect(resultCreate).toEqual(output);

    const result = await productRepository.find(resultCreate.id);

    expect({
      id: result.id,
      name: result.name,
      price: result.price,
    }).toEqual({
      id: resultCreate.id,
      name: product.name,
      price: product.price,
    });
  });
});
