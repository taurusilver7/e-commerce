import React from "react";
import "./Product.css";

const Product = ({ product, key, rating, onAddToCart }) => {
  // console.log(product);

  const handleAddToCart = () => onAddToCart(product?.id, 1);

  return (
    <div key={key} className="product">
      <div className="info">
        <p>{product?.name}</p>
        <p className="product__price">
          <strong>{product?.price?.formatted_with_symbol}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐⭐⭐</p>
            ))}
        </div>
      </div>
      <img
        className="product__img"
        src={product?.media?.source}
        alt={product?.name}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
