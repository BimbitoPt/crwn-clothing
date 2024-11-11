import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from react-redux
import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";
import { setIsCartOpen } from "../../store/cart/cart.action"; // Import the action to set cart visibility

const CartIcon = () => {
  // Access cartCount and isCartOpen from Redux store using useSelector
  const cartCount = useSelector((state) => state.cart.cartCount);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const toggleIsCartOpen = () => {
    // Dispatch action to toggle cart visibility in Redux
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;