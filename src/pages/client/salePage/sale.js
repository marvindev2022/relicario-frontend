import { Link } from "react-router-dom";

import React, { useState } from 'react';

function Checkout() {
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  function handleBillingAddressChange(event) {
    setBillingAddress(event.target.value);
  }

  function handleShippingAddressChange(event) {
    setShippingAddress(event.target.value);
  }

  function handlePaymentMethodChange(event) {
    setPaymentMethod(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Lógica para enviar os dados do checkout para o backend
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <label htmlFor="billingAddress">Billing Address:</label>
      <input type="text" id="billingAddress" value={billingAddress} onChange={handleBillingAddressChange} />
      <label htmlFor="shippingAddress">Shipping Address:</label>
      <input type="text" id="shippingAddress" value={shippingAddress} onChange={handleShippingAddressChange} />
      <label htmlFor="paymentMethod">Payment Method:</label>
      <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
        <option value="creditCard">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      <button type="submit">Place Order</button>
    </form>
  );
}



export default function SalePage(){

  return (
    <main>
      <Checkout/>
      <Link to="/">voltar</Link>
    </main>
  );
}