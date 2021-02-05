import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import AddressForm from "./AddressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";

import { commerce } from "../../lib/commerce";

import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment Details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [chkoutTkn, setChkoutTkn] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce?.checkout?.generateToken(cart.id, {
            type: "cart",
          });
          // console.log(token);
          setChkoutTkn(token);
        } catch (error) {
          if (activeStep !== steps?.length) history.push("/");
        }
      };
      generateToken();
    }
  }, [cart]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeOut = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : isFinished ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  // if (error) {
  //   Confirmation = () => (
  //     <>
  //       <Typography variant="h5">Error: {error}</Typography>
  //       <br />
  //       <Button component={Link} variant="outlined" type="button" to="/">
  //         Back to home
  //       </Button>
  //     </>
  //   );
  // }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={chkoutTkn}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={chkoutTkn}
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeOut={timeOut}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps?.length ? (
              <Confirmation />
            ) : (
              chkoutTkn && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
