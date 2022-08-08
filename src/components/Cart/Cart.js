import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  let cartItemsList = [];

  if (cartItems.length > 0) {
    cartItemsList = cartItems.map((item) => {
      const { title, price, quantity, total } = item;
      return <CartItem key={title} item={{ title, quantity, total, price }} />;
    });
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartItemsList}</ul>
    </Card>
  );
};

export default Cart;
