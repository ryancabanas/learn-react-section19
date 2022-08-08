import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          id="Test"
          title="Test"
          price={6}
          description="This is a first product - amazing!"
        />
        <ProductItem
          id="Chinese Junk"
          title="Chinese Junk"
          price={0.5}
          description="This product will break within a month"
        />
        <ProductItem
          id="German Made"
          title="German Made"
          price={20}
          description="This product will last a lifetime"
        />
      </ul>
    </section>
  );
};

export default Products;
