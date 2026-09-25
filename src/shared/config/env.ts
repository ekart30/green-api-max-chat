const GREEN_API_URL = import.meta.env.VITE_GREEN_API_URL;

if (!GREEN_API_URL) {
  throw new Error('VITE_GREEN_API_URL is not defined');
}

export { GREEN_API_URL };
