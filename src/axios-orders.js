import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-the-complete-guide-48780.firebaseio.com/'
});

export default instance;