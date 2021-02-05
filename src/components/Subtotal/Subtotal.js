import React from "react";
import { Link } from "react-router-dom";
import "./Subtotal.css";

const Subtotal = ({ value }) => {
  return (
    <>
    <div className="subtotal">
      <>
        <p>
          Subtotal : <strong>{value}</strong>
        </p>
        <small className="subtotal__gift">
          <input type="checkbox" />
          This order contains a gift
        </small>
      </>
      <Link to="/checkout">
        <button className="subtotal__btn">Proceed to Buy</button>
      </Link>
    </div>
    <div>
      <img className="subtotal__ad" src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="publish" />
    </div>
    </>
  );
};

export default Subtotal;
