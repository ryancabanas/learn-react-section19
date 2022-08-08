import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItemQuantity = useSelector(
    (state) => state.cart.totalItemQuantity
  );

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCartVisibility());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemQuantity}</span>
    </button>
  );
};

export default CartButton;
