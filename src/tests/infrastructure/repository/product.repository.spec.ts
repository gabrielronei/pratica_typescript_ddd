import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import Product from "../../../domain/entity/product";
import ProductRepository from "../../../infrastructure/repository/product.repository";

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


        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({id: "1", name: "Produto Um", price: 100});
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto Um", 100);
        
        await productRepository.create(product);


        const productModel = await ProductModel.findOne({where: {id: "1"}})

        expect(productModel.toJSON()).toStrictEqual({id: "1", name: "Produto Um", price: 100});

        product.applyPercentageToPrice(10);

        await productRepository.update(product);

        const anotherProductModel = await ProductModel.findOne({ where: {id: product.id }});

        expect(anotherProductModel.toJSON()).toStrictEqual({id: "1", name: "Produto Um", price: 110});

    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto Um", 100);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});
        const repositoryProduct = await productRepository.find(product.id);

        expect(productModel.toJSON()).toStrictEqual({id: repositoryProduct.id, name: repositoryProduct.name, price: repositoryProduct.price});
    });

    it("should findAll products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto Um", 100);
        const productTwo = new Product("2", "Produto Dois", 200);

        await productRepository.create(product);
        await productRepository.create(productTwo);

        const products = [product, productTwo];
        const foundProducts = await productRepository.findAll();

        expect(products).toEqual(foundProducts);
    });

    afterEach(async () => {
        await sequelize.close();
    });

});