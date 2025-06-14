import React, { useState } from 'react';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/complete',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'card error');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  } as const;

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export { CheckoutForm };
