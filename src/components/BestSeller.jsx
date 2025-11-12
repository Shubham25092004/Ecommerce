import React from "react";
import useCustomAPI from "../hook/useCustomAPI";
import { Link } from "react-router-dom";

const Bestseller = () => {

  const { products, loading, error } = useCustomAPI("https://fakestoreapi.com/products");

  if (loading) return <h3 className="text-center text-info mt-5">Loading...</h3>;
  if (error) return <h3 className="text-center text-danger mt-5">Error fetching data</h3>;

  const sorted = [...products].sort((a, b) => b.rating.rate - a.rating.rate);
  const topProducts = sorted.slice(0, 6);

  return (
    <div className="bg-dark text-white py-5 mt-5">
      <h2 className="text-center mb-4">🔥 Higher Selling Products</h2>

      <div className="container">
        <div className="row g-4 justify-content-center">
          {topProducts.map((prod) => (
            <div className="col-12 col-md-4" key={prod.id}>
              <div className="card text-dark shadow-sm p-3 text-center" style={{ height: "280px" }}>
                
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="img-fluid mx-auto"
                  style={{ height: "140px", objectFit: "contain" }}
                />

                <h6 className="mt-2" style={{ fontSize: "14px" }}>
                  {prod.title.slice(0, 30)}...
                </h6>

                <p className="text-success fw-bold mb-1">${prod.price}</p>

                <p className="text-warning fw-semibold mb-2" style={{ fontSize: "13px" }}>
                  ⭐ {prod.rating.rate} ({prod.rating.count})
                </p>

                <div className="text-center">
                  <Link
                    to={`/productdetails/${prod.id}`}
                    className="btn btn-warning btn-sm w-50 mb-2"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Bestseller;
