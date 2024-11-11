import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"; // Import the Button component
import { setCartItems } from "../../store/cart/cart.action"; // Import the action to update cart items

import { ProductCartContainer, Footer, Name, Price } from "./product-card.styles";

// Helper function to add a product to the cart
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  
  // Use useSelector at the top level of the component to access Redux state
  const cartItems = useSelector((state) => state.cart.cartItems); // Select cart items from Redux state
  
  const dispatch = useDispatch(); // Get dispatch function

  const addProductToCart = () => {
    // Add the product to the cart using the helper function
    const newCartItems = addCartItem(cartItems, product);

    // Calculate new cart count and total
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    // Dispatch the action to update the cart in Redux
    dispatch(setCartItems(newCartItems, newCartTotal, newCartCount));
  };

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart} // Dispatch action on button click
      >
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;