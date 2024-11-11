import styled from "styled-components";

import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
} from "../button/button.styles";

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 260px; /* Increased width for better visual alignment */
  height: 380px; /* Slightly taller dropdown */
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #000;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added subtle shadow for better visibility */

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
  color: #777; /* Soft color for the empty message */
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Changed from 'scroll' to 'auto' for more efficient scrolling behavior */
  padding-right: 10px; /* Added padding to avoid content being cut off when scrollbar appears */
  
  &::-webkit-scrollbar {
    width: 8px; /* Custom scrollbar width */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Scroll thumb color */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Darken scrollbar thumb when hovered */
  }
`;