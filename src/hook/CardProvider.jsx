import React, { useState } from "react";
import CardContext from "./CardContext";

const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCard((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCard((prev) => prev.filter((item) => item.id !== id));
  };

    const productdetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <CardContext.Provider
      value={{
        card,
        addToCart,
        removeFromCart,
        selectedProduct,
        productdetails,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
