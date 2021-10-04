import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export async function getUserInfo(id) {
  const response = await axios.get(`https://kainthca.ngrok.io/users/${id}`);
  return response.data;
}
