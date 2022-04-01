import { FetchOptions } from '../../../interface/FetchOptions';

const createConversation = async (receiver: string, description: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiver, description }),
    credentials: 'include',
  };
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/conversations/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

// const getAllMessages = async (conversationId: string) => {
//   const fetchOptions: FetchOptions = {
//     method: 'GET',
//     credentials: 'include',
//   };
//   return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/conversations/${conversationId}/messages`, fetchOptions)
//     .then((res) => res.json())
//     .catch(() => ({
//       error: { message: 'Unable to connect to server. Please try again' },
//     }));
// };

// const getConversations = async () => {
//   const fetchOptions: FetchOptions = {
//     method: 'GET',
//     credentials: 'include',
//   };
//   return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/conversations/all`, fetchOptions)
//     .then((res) => res.json())
//     .catch(() => ({
//       error: { message: 'Unable to connect to server. Please try again' },
//     }));
// };

// const sendMessage = async (description: string, conversationId: string) => {
//   const fetchOptions: FetchOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ description, conversationId }),
//     credentials: 'include',
//   };
//   return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/conversations/message`, fetchOptions)
//     .then((res) => res.json())
//     .catch(() => ({
//       error: { message: 'Unable to connect to server. Please try again' },
//     }));
// };

export default createConversation;
