import axios from 'axios';

class HttpService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_HOST;
  }

  async request(config) {
    try {
      const response = await axios({
        ...config,
        baseURL: this.baseURL,
        headers: {
          Authorization: config.token ? `Bearer ${config.token}` : '',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || error.response.statusText);
      } else {
        throw new Error(error.message);
      }
    }
  }

  upload(url, formData, config = {}) {
    return this.request({
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config.headers || {}),
      },
    });
  }
}

export default HttpService;
