import { FetchOptions } from './../../interface/FetchOptions';

const getRequest = async () => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/requests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: {
        message: 'Unable to connect to server. Please try again',
      },
    }));
};

export default getRequest;
