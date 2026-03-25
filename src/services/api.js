import axios from 'axios';

// Lightweight, simple Axios instance
// Using an open exchange rate API as an example since it's a finance app
export const apiClient = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4/latest',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetches exchange rates relative to a base currency.
 * Designed to fail gracefully so the app won't break if offline or API is down.
 */
export const fetchExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await apiClient.get(`/${baseCurrency}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.warn("API Fetch warning: Running locally without API data.", error.message);
    
    // Return gracefully so the UI doesn't crash during Viva!
    return { 
      data: null, 
      error: 'Could not fetch live exchange rates. App will continue offline perfectly.' 
    };
  }
};
