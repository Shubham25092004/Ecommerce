import React, { useContext } from "react";
import CardContext from "../hook/CardContext";

const Cart = () => {
  const { card, removeFromCart } = useContext(CardContext);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center bg-info">Your Cart</h3>

      {card.length === 0 ? (
        <h5 className="text-center text-warning  mt-4 ">Cart is Empty ⚪</h5>
      ) : (
        <div className="row">
          {card.map((item, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div className="card shadow-sm mb-3">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "180px", objectFit: "contain" }}
                />

                <div className="card-body text-center">
                  <h6 className="card-title">{item.title.slice(0, 30)}...</h6>

                  <p className="card-text">
                    <strong>${item.price}</strong>
                     
                  </p>
                  <p>${item.description}</p>
                    <h6 className="card-text mb-2">Rating: {item.rating.rate} ⭐</h6>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
