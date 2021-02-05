import React, { useEffect, useState } from "react";
import FormInput from "./CustomText";
import { commerce } from "../../../lib/commerce";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, test }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  // console.log(countries);
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  // console.log(subdivisions);

  const options = shippingOptions.map((so) => ({
    id: so.id,
    label: `${so.desription} - (${so?.price?.formatted_with_symbol}`,
  }));

  const fetchShipCountries = async (chkoutToknId) => {
    const response = await commerce.services?.localeListShippingCountries(
      chkoutToknId
    );
    console.log(response?.countries);
    setShippingCountries(response?.countries);
    // keys are the named titles >> AL, IN, US.. get the first one.
    setShippingCountry(Object.keys(response?.countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    // console.log(subdivisions);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0]?.id);
  };

  useEffect(() => {
    fetchShipCountries(checkoutToken?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput
              required
              defaultValue="firstName"
              name="firstName"
              label="First Name"
            />
            <FormInput
              required
              defaultValue="lastName"
              name="lastName"
              label="Last Name"
            />
            <FormInput
              required
              defaultValue="address1"
              name="address1"
              label="Address 1"
            />
            <FormInput
              required
              defaultValue="email"
              name="email"
              label="Email"
            />
            <FormInput required defaultValue="city" name="city" label="City" />
            <FormInput
              required
              defaultValue="zip"
              name="zip"
              label="ZIP / Postal code"
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={e => setShippingOption(e.target.value)}>
              {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {Option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */}
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
