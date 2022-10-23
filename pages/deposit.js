import React, { useEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const deposit = () => {

  const amountRef = useRef(0);


const customClick = () => {

  // https://buy.stripe.com/test_6oEfZh2jE5bY7yU4gg
  
};


const handleClick = async() => {
    let n = amountRef.current.value;
    if (n == 0) return [0];
    // n = Math.floor(n); // needed for decimal numbers
    var arr = [];
    var i = 1;
  
    while (n > 0) {
      arr.unshift((n % 10));
      n = Math.floor(n / 10);
      i *= 10
    }
  
    console.log(arr)
    console.log(amountRef.current.value)
    // return arr;


  let stripePromise = null;

  const ten = 'price_1LvR6fIlSCUFGeF0gpX2Okrx';
  const hundred = 'price_1LvySWIlSCUFGeF0TJUh22Jv';
  const thousand = 'price_1LvySgIlSCUFGeF0gudM7hcG';
  const tenQuantity = arr.at(-2);
  const hundredQuantity = arr.at(-3);
  const thousandQuantity = arr.at(-4);

  let lineItems = [];
  tenQuantity && lineItems.push({price: ten, quantity: tenQuantity});
  hundredQuantity && lineItems.push({price: hundred, quantity: hundredQuantity});
  thousandQuantity && lineItems.push({price: thousand, quantity: thousandQuantity});

  const getStripe = async () =>{
    if (!stripePromise){
      stripePromise = await loadStripe("pk_test_51LvR1aIlSCUFGeF0fjCBT1QXLbS6IJSbDKHV7vMFYblNWNoYE3MFYpiEVydH4xO5EL9WiG82S1p29rnPQV1UQoRH00fxqV2qRN");

    }
    console.log(stripePromise);
    return stripePromise;
  }

  const stripe = await getStripe();
  
  stripe.redirectToCheckout({
    lineItems,
    mode: 'payment',
    successUrl: `${window.location.origin}/deposit/?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  })
};

  return (
    <div>
      <div>deposit amount: </div>
      <input type="text" name="amount" ref={amountRef} placeholder="Amount" />
      <button type="submit" className="mainButton" onClick={handleClick}>Deposit</button>
      {/* <a target="_blank" href='https://buy.stripe.com/test_8wM6oH6zUeMyg5q001'><button type="submit" className="mainButton">Custom Deposit</button></a> */}
    </div>
  )
}

export default deposit