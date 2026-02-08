// frontend/constants.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export const API_ENDPOINTS = {
  LAW_BOT: `${BASE_URL}/lawbot`,
  GET_RIGHTS: (category) => `${BASE_URL}/rights/${category}`,
  REFRESH_RIGHTS: (category) => `${BASE_URL}/rights/refresh/${category}`,
  GET_STATE_LAWS: (state) => `${BASE_URL}/state-laws/${state}`,
  REFRESH_STATE_LAWS: (state) => `${BASE_URL}/state-laws/refresh/${state}`,
};
