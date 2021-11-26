import axios from 'axios';
import { ACCESS_TOKEN, APP_ID, APP_SECRET } from '../data';

// 获取token
const getAccessToken = async () => {
  const res = await axios.get(ACCESS_TOKEN, {
    params: {
      appid: APP_ID,
      grant_type: 'client_credential',
      secret: APP_SECRET,
    },
  });
  if (res.data.errcode) {
    console.error(res.data);
  }
  return res.data.access_token;
};
