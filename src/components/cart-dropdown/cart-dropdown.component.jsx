import { useSelector, useDispatch } from "react-redux";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropDownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles.jsx";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../store/cart/cart.action.js"; // Import action for toggling cart visibility

const CartDropdown = () => {
  // Access cartItems and other state from Redux
  const { cartItems} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  const closeCartHandler = () => {
    dispatch(setIsCartOpen(false)); // Close the cart when clicked
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
      <Button onClick={closeCartHandler}>Close</Button> {/* Optionally add close button */}
    </CartDropDownContainer>
  );
};

export default CartDropdown;