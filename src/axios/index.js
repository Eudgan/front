import axios from "axios";

const instance = axios.create({
    baseURL: 'https://quua.ru/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
});

export default instance;