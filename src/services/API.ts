import { Alert } from 'react-native';

const API_URL = 'https://dev.dcktrp.id/vcms/api';

class Api {
  private token: string | null = null;

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    // Must be inside request function, coz in case token is new
    const headers = new Headers();
    headers.append('Accept', 'application/json');

    if (options.body instanceof FormData === false) {
      headers.append('Content-Type', 'application/json');
    }

    const requestOptions: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      ...options,
      headers
    };

    try {
      const response: Response = await fetch(`${API_URL}${path}`, requestOptions);
      const res: T = await response.json();

      if (!response.ok) {
        // Too Many Attempts
        if (response.status === 429) {
          Alert.alert('Terlalu banyak percobaan', 'Silahkan coba beberapa saat lagi');
        }

        // Bad Gateway
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          Alert.alert('Server sedang sibuk', 'Silahkan coba beberapa saat lagi');
        }

        throw res;
      }

      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('URL', `${API_URL}${path}`);
      console.error('error', error);
      return Promise.reject({
        ...error,
        message: error.message
      });
    }
  }

  get<T>(path: string): Promise<T> {
    return this.request(path);
  }

  put<T>(path: string, body: object): Promise<T> {
    return this.request(path, { method: 'PUT', body: JSON.stringify(body) });
  }

  patch<T>(path: string, body: object): Promise<T> {
    return this.request(path, { method: 'PATCH', body: JSON.stringify(body) });
  }

  remove<T>(path: string, body: object): Promise<T> {
    return this.request(path, { method: 'DELETE', body: JSON.stringify(body) });
  }

  post<T, B>(path: string, body: B): Promise<T> {
    return this.request(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    });
  }
}

const API = new Api();

export default API;
