import React from "react";
import "./Home.css";
import loading from "../../assets/home_loading.gif";

import Product from "../Product/Product";
// import { v4 as uuidv4 } from "uuid";
import { Grid } from "@material-ui/core";

const Home = ({ products, onAddToCart }) => {
  if (!products.length)
    return (
      <>
        <div className="home__loading">
          <br />
          <br />
          <img src={loading} alt="loading" />
          <h1>Please wait a sec, Rummaging the store for you....</h1>
          <br />
          <br />
          <br />
        </div>
      </>
    );

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="banner"
        />
        <div className="home__row">
          <Grid container justify="center" spacing={4}>
            {products.map((product) => (
              <div className="home__row">
                <Product
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
