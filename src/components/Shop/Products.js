import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'My first book',
    price: 6,
    description: 'The first book I ever wrote',
  },
  {
    id: 'p2',
    title: 'My second book',
    price: 5,
    description: 'The second book I ever wrote',
  },
];

const productsListJSX = DUMMY_PRODUCTS.map((product) => (
  <ProductItem
    key={product.id}
    id={product.id}
    title={product.title}
    price={product.price}
    description={product.description}
  />
));

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productsListJSX}</ul>
    </section>
  );
};

export default Products;
