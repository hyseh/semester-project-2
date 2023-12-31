import { BASE_URL, REGISTER_ENDPOINT } from '../api.js';

export async function register(name, email, password) {
  try {
    const res = await fetch(`${BASE_URL}${REGISTER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
