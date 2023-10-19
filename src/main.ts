import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/oder";
import OrderItem from "./domain/entity/order_item";
import Product from "./domain/entity/product";

const customer = new Customer("123", "Gabriel Ronei", new Address("rua francisco cid", 78, "02726080", "São Paulo"));
customer.activate();

const product = new Product("1", "produto do bem", 10);

const firstItem = new OrderItem("1", "Ordem Um", 100, product.id, 1);
const secondItem = new OrderItem("2", "Ordem Dois", 200, product.id, 1);
const order = new Order("1", customer.id, [firstItem, secondItem]);