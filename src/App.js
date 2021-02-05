import React, { useEffect, useState } from "react";
import "./App.css";

// all the backend are dealt with this
import { commerce } from "./lib/commerce";

import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header, Home, Footer, Cart, Checkout } from "./components";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  // fetch app products from commerce
  const [cart, setCart] = useState({});

  // get orders & error message to the checkout
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProducts = async () => {
    // commerce returns a promise (response) with a list of products alrdy added to store.
    const { data } = await commerce?.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce?.cart.retrieve();
    setCart(cart);
    // setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, qnty) => {
    const item = await commerce?.cart?.add(productId, qnty);

    setCart(item?.cart);
  };

  const handleUpdateCartQty = async (lineItemId, qnty) => {
    const response = await commerce?.cart?.update(lineItemId, { qnty });

    setCart(response?.cart);
  };

  const handleRem4mCart = async (lineItemId) => {
    const response = await commerce?.cart?.remove(lineItemId);

    setCart(response?.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce?.cart?.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce?.checkout?.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data?.error?.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  // console.log(products);
  // console.log(cart);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header
              totalItems={cart?.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Home
              products={products}
              onAddToCart={handleAddToCart}
              handleUpdateCartQty
            />
            <br />
            <Footer />
          </Route>

          <Route path="/cart">
            <Header
              totalItems={cart?.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Cart
              cart={cart}
              handleCartQty={handleUpdateCartQty}
              handleRemCart={handleRem4mCart}
            />
            <br />
            <Footer />
          </Route>

          <Route exact path="/checkout">
            <Header
              totalItems={cart?.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMsg}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
