import { FetchOptions } from '../../interface/FetchOptions';

export const stripeConnect = async () => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rate: 10 }),
    credentials: 'include',
  };
  return await fetch(`/stripe/connect`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default stripeConnect;
