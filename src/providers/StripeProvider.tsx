import type { ReactNode } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function StripeProvider({children}:{children:ReactNode}) {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    return (<div>

      <Elements stripe={stripePromise}>
        {children}
    </Elements>
    </div>  );
}

export default StripeProvider;