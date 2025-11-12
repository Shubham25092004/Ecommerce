import React, { useContext, useState } from "react";
import useCustomAPI from "../hook/useCustomAPI";
import CardContext from "../hook/CardContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductList = ( {onApplyClick}) => {
  const { products, loading, error } = useCustomAPI(
    "https://fakestoreapi.com/products"
  );

  const { card, addToCart, productdetails } = useContext(CardContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (loading) return <div className="spinner-border" role="status"></div>;
  if (error) return <p>Error while getting products... {error.message}</p>;

  const handleCategorySelect = (category) => {
    setSearch(category);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center"> All Product </h3>

      {/* Search + Category Filter */}
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center mb-4">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-25"
        />

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Category
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCategorySelect("men's clothing")}
              >
                men's clothing
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCategorySelect("jewelery")}
              >
                jewelery
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCategorySelect("electronics")}
              >
                electronics
              </button>
            </li>
          </ul>
        </div>
        <button className="btn btn-primary" onClick={onApplyClick}>Check Highest selling Products</button>
      </div>

     
      <div className="row">
        {products
          .filter((prod) =>
            search === ""
              ? true
              : prod.title.toLowerCase().includes(search.toLowerCase()) ||
                prod.category.toLowerCase().includes(search.toLowerCase())
          )
          .map((prod, i) => {
            const inCart = card.some((item) => item.id === prod.id);

            return (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={i}>
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={prod.image}
                        className="img-fluid rounded-start"
                        alt={prod.title}
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {prod.title.slice(0, 25)}...
                        </h5>
                        <p className="card-text">
                          {prod.description.slice(0, 50)}...
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Price: ${prod.price}
                          </small>
                        </p>

                        <button
                          className="btn btn-success mb-2"
                          onClick={() => {
                            addToCart(prod);
                            navigate("/cart");
                          }}
                        >
                          Add to Cart
                        </button>

                        <Link
                          to={`/productdetails/${prod.id}`}
                          className="btn btn-warning"
                          onClick={() => productdetails(prod)}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
