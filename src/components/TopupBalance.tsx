import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axiosClient from '../configs/axiosClient';
import { useNavigate } from 'react-router';



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
        <div>
            <h2>Top Up Balance</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount (USD)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        min="1"
                        step="0.01"
                    />
                </div>

                <div>
                    <label>Card Details</label>
                    <CardElement />
                </div>

                <button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default TopUpBalance;