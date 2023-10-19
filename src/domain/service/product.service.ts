import Product from "../../domain/entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number): Product[] {
        // Busca os produtos mais vendidos no ultimo mes e aumenta o preço em 10%

        products.forEach(product => {
            product.applyPercentageToPrice(percentage);
        });

        return products;
    }
}