import axios from 'axios';

const BASE_URL = 'https://637631bab5f0e1eb8505360f.mockapi.io';

export default axios.create({
    baseURL: BASE_URL,
});
