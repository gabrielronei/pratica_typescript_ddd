import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "../../infrastructure/repository/product.repository";

describe("Product repository test", () => {

    let sequelize: Sequelize;


    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'memory',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto Um", 100);
        
        await productRepository.create(product);


        const productModel = await ProductModel.findOne({where: {id: "1"}})

        expect(productModel.toJSON()).toStrictEqual({id: "1", name: "Produto Um", price: 100});
    });


    afterEach(async () => {
        await sequelize.close();
    });

});