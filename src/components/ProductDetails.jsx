import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardContext from "../hook/CardContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, selectedProduct } = useContext(CardContext);
  const [product, setProduct] = useState(selectedProduct);

  useEffect(() => {
    if (!product) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.log(err));
    }
  }, [id, product]);

  if (!product)
    return <h3 className="text-center mt-5 text-danger">Loading product...</h3>;

  return (
    <div className="container mt-5">
  <h2 className="text-center mb-4">Details</h2>

  <div className="card mb-3 shadow border-0 mx-auto" style={{ maxWidth: "900px" }}>
    <div className="row g-0 align-items-center">

      {/* IMAGE SECTION */}
      <div className="col-12 col-md-5 text-center p-3">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid"
          style={{ maxHeight: "350px", objectFit: "contain" }}
        />
      </div>

      {/* DETAILS SECTION */}
      <div className="col-12 col-md-7 p-4">
        <h5 className="fw-bold">{product.title}</h5>

        <p className="text-muted">{product.description}</p>

        <p className="fw-semibold">Category: {product.category}</p>

        <h4 className="text-success fw-bold">${product.price}</h4>

        <p>
          ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </p>

        <button
          className="btn btn-warning mt-3"
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>

    </div>
  </div>
</div>

  );
};

export default ProductDetails;
