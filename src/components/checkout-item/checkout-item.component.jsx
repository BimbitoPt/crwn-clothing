import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from react-redux
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";
import { setCartItems } from "../../store/cart/cart.action"; // Import the action to update cart items

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  // Access cartItems from the Redux state using useSelector (if needed elsewhere)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Dispatch action to update cart state in Redux
    dispatch(setCartItems(newCartItems, newCartTotal, newCartCount));
  };

  const clearItemHandler = () => {
    const newCartItems = cartItems.filter((item) => item.id !== cartItem.id);
    updateCartItems(newCartItems);
  };

  const addItemHandler = () => {
    const newCartItems = cartItems.map((item) =>
      item.id === cartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCartItems(newCartItems);
  };

  const removeItemHandler = () => {
    const newCartItems = cartItems.map((item) =>
      item.id === cartItem.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0); // Filter out items with quantity 0
    updateCartItems(newCartItems);
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;