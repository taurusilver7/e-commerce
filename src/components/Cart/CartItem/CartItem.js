import React from "react";
import "./CartItem.css";

const CartItem = ({ item, key, onUpdateCart, onRemCart }) => {
  
  const handleUpdateCartQty = (lineItemId, newQty) =>
    onUpdateCart(lineItemId, newQty);

  const handleRem4mCart = (lineItemId) => onRemCart(lineItemId);

  return (
    <div key={key} className="cartitem">
      <img
        className="cartitem__image"
        src={item?.media?.source}
        alt={item?.name}
      />

      <div className="cartitem__info">
        <h4 className="cartitemt__title">{item?.name}</h4>
        <h4 className="cartitem__price">
          <strong>{item?.line_total?.formatted_with_symbol}</strong>
        </h4>
        <br />
        <div className="cartitem__quantity">
          <button
            onClick={() => handleUpdateCartQty(item?.id, item?.quantity - 1)}
          >
            -
          </button>

          <p>&nbsp;{item?.quantity}&nbsp;</p>

          <button
            onClick={() => handleUpdateCartQty(item?.id, item?.quantity + 1)}
          >
            +
          </button>
        </div>

        <button
          onClick={() => handleRem4mCart(item?.id)}
          className="cartitem__btn"
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
