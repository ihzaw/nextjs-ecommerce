const BASE_URL = process.env.BASE_URL

export const getItemsApi = `${BASE_URL}/api/products/?format=json`
export const loginApi = `${BASE_URL}/api/login`
export const logoutApi = `${BASE_URL}/api/logout`
export const registerApi = `${BASE_URL}/api/register`
export const orderApi = `${BASE_URL}/api/orders`
export const ordersHistoryApi = `${BASE_URL}/api/orders-without-user/?format=json`