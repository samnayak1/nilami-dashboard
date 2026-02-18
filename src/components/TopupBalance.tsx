import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { useNavigate } from 'react-router';
import axiosClient from '../api/services/axiosClient';



function TopUpBalance() {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(20);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setMessage('');

        try {
            const response = await axiosClient.post(
                import.meta.env.VITE_INTENT_URL, 
                {
                    amount: amount,
                    currency: 'usd'
                }
            );

            const { clientSecret } = response.data;
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setMessage('Card element not found');
                return;
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setMessage(`Error: ${error.message}`);
            } else if (paymentIntent.status === 'succeeded') {
                setMessage('Payment successful! Your balance will be updated shortly. Please contact the helpline if it does not reflect within a few minutes.');
                cardElement.clear();

                setTimeout(() => {
                       navigate('/'); // Navigate to your home route
                   }, 2000);
                
            }
        } catch (err:any) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 flex flex-col items-center bg-fresh-light text-main-text'>
            <h2 className='text-xl'>Top Up Balance</h2>

            <form onSubmit={handleSubmit} className='flex flex-col gap-12 mt-4'>
                <div className='flex w-full text-center gap-2'>
                    <label>Enter Amount (USD)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className='border pl-2 rounded-md'
                        min="10"
                        step="1"
                    />
                </div>

                <div>
                    <label>Card Details</label>
                    <CardElement options={CARD_ELEMENT_OPTIONS}/>
                </div>

                <button
                className='border py-2 text-cream bg-fresh px-4 '
                type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : `Pay`}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#2e4d32", 
      fontFamily: 'inherit',
      fontSize: "16px",
      "::placeholder": {
        color: "#8c9b8d", 
      },
    },
    invalid: {
      color: "#9e2146", 
      iconColor: "#9e2146",
    },
  },
};

export default TopUpBalance;