import React from "react";
import "./Cart.css";
// import { Grid } from "@material-ui/core";
import Subtotal from "../Subtotal/Subtotal";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, handleCartQty, handleRemCart }) => {
  const EmptyCart = () => (
    <>
      <br />
      <h2>Hey, it feels so light</h2>
      <h3>
        There's nothing in your cart,{" "}
        <Link className="cart__lite" to="/">
          start adding some
        </Link>
      </h3>
      <br />
      <br />
    </>
  );

  if (!cart?.line_items) return "Loading....";

  const FilledCart = () => (
    <>
      {cart?.line_items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          onUpdateCart={handleCartQty}
          onRemCart={handleRemCart}
        />
      ))}

      <br />
      <br />
      <p className="cart__promotion">
        The price and availability of items at Amazon.in are subject to change.
        <br /> The shopping cart is a temporary place to store a list of your
        items and reflects each item's most recent price.
        <br /> Do you have a promotional code? We'll ask you to enter your claim
        code when it's time to pay
      </p>
    </>
  );
  //   console.log(cart.subtoal.formatted_with_symbol);


  return (
    <div className="cart">
      <div className="cart__left">
        <img
          className="cart__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ad"
        />
        <div>
          {/*optional chaining is not null, but easier than a tri-catch block. a clean1 */}
          <h3>Hello, Guest</h3>
          <h2 className="cart__title">
            Your Shopping Cart : {cart?.total_items}
          </h2>
          {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
        </div>
      </div>

      <div className="cart__right">
        <div className="cart__subtotalAd">
          <img
            className="cart__rightAd"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
            alt="checkout_ad"
          />
          <br />
          <small>Your order is eligible for FREE delivery.</small>
          <br />
          <small>
            Select this option at checkout.
            <a
              href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200904360&pop-up=1"
              target="_blank"
              rel="noreferrer"
            >
              Details
            </a>
          </small>
        </div>
        <Subtotal value={cart?.subtotal?.formatted_with_symbol} />
      </div>
    </div>
  );
};

export default Cart;
