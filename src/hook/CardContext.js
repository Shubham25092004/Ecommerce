
import { createContext } from "react";

const CardContext = createContext({
  card: [],
  addToCart: () => {},
  removeFromCart: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export default CardContext;
