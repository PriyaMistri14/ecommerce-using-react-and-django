import { fetchUtils } from 'ra-core';







function CustomJwtTokenAuthProvider(options){
 
 
  const opts = {
    obtainAuthTokenUrl: 'http://127.0.0.1:8000/auth/login/',
    ...options,
  };
  return {
    login: async ({ username, password }) => {
      const request = new Request(opts.obtainAuthTokenUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      const response = await fetch(request);
      if (response.ok) {
        const responseJSON = await response.json();
        localStorage.setItem('access_token', responseJSON.access);
        localStorage.setItem('refresh_token', responseJSON.refresh);
        return {redirectTo: '/category'};
      }
      if (response.headers.get('content-type') !== 'application/json') {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      const error = json.non_field_errors;
      throw new Error(error || response.statusText);
    },
    logout: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return Promise.resolve();
    },
    checkAuth: () =>
      localStorage.getItem('access_token') ? Promise.resolve() : Promise.reject(),
    checkError: error => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject();
      }
      return Promise.resolve();
    },
    getPermissions: () => {
      return Promise.resolve();
    },
  };
}

export function createOptionsFromJWTToken() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return {};
  }
  return {
    user: {
      authenticated: true,
      token: 'Bearer ' + token,
    },
  };
}

export function fetchJsonWithAuthJWTToken(url, options) {
  return fetchUtils.fetchJson(
    url,
    Object.assign(createOptionsFromJWTToken(), options)
  );
}

export default CustomJwtTokenAuthProvider;