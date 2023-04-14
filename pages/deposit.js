import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div`
  color: white;
  background-color: #242424;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-left: 40%;
  padding-top: 2%; */
  height: 5vh;

  @media only screen and (min-width: 850px) {
    /* padding-left: 46%;
    padding-top: 0.4%; */
    font-size: 1.2em;
  }
`;

const Input = styled.div`
  padding: 20%;
  input {
    border: none;
    height: 25px;
    border-right: 1px solid black;
    border-radius: 8px 0 0 8px;
  }
  button {
    border: none;
    height: 25px;
    border-radius: 0 8px 8px 0;
  }

  @media only screen and (min-width: 850px) {
    padding-left: 15%;
  }

  input {
    border: none;
    height: 50px;
    width: 70%;
    border-right: 1px solid black;
    border-radius: 8px 0 0 8px;
  }
  button {
    border: none;
    height: 50px;
    width: 30%;
    border-radius: 0 8px 8px 0;
  }
`;

const Deposit = () => {
  const { data: session } = useSession();

  const amountRef = useRef(0);

  const handleClick = async () => {
    let n = amountRef.current.value;
    if (n == 0) return [0];
    // n = Math.floor(n); // needed for decimal numbers
    var arr = [];
    var i = 1;

    while (n > 0) {
      arr.unshift(n % 10);
      n = Math.floor(n / 10);
      i *= 10;
    }

    console.log(arr);
    console.log(amountRef.current.value);
    // return arr;

    let stripePromise = null;

    const ten = "price_1LvR6fIlSCUFGeF0gpX2Okrx";
    const hundred = "price_1LvySWIlSCUFGeF0TJUh22Jv";
    const thousand = "price_1LvySgIlSCUFGeF0gudM7hcG";
    const tenQuantity = arr.at(-2);
    const hundredQuantity = arr.at(-3);
    const thousandQuantity = arr.at(-4);

    let lineItems = [];
    tenQuantity && lineItems.push({ price: ten, quantity: tenQuantity });
    hundredQuantity &&
      lineItems.push({ price: hundred, quantity: hundredQuantity });
    thousandQuantity &&
      lineItems.push({ price: thousand, quantity: thousandQuantity });

    const getStripe = async () => {
      if (!stripePromise) {
        stripePromise = await loadStripe(
          "pk_test_51LvR1aIlSCUFGeF0fjCBT1QXLbS6IJSbDKHV7vMFYblNWNoYE3MFYpiEVydH4xO5EL9WiG82S1p29rnPQV1UQoRH00fxqV2qRN"
        );
      }
      console.log(stripePromise);
      return stripePromise;
    };

    const stripe = await getStripe();

    stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: `${window.location.origin}/deposit/?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
      customerEmail: session.user?.email,
    });
  };

  return (
    <Container>
      <Header>
        <p className="Deposit">Deposit</p>
      </Header>
      <Input>
        <input type="text" name="amount" ref={amountRef} placeholder="$0.00" />
        <button type="submit" className="mainButton" onClick={handleClick}>
          Deposit{" "}
        </button>
      </Input>
      {/* <a target="_blank" href='https://buy.stripe.com/test_8wM6oH6zUeMyg5q001'><button type="submit" className="mainButton">Custom Deposit</button></a> */}
    </Container>
  );
};

export default Deposit;
