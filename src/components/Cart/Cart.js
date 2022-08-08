import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsJSX = cartItems.map((item) => (
    <CartItem
      item={{
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        total: item.total,
        price: item.price,
      }}
    />
  ));

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartItemsJSX}</ul>
    </Card>
  );
};

export default Cart;
