/**
 * @fileoverview Api request utils
 */

import axios from 'axios';
import config from '../config';

export const apiRequest = async (path, method, body) => {
  const token = localStorage.getItem("token");

  try {
    const { data, status } = await axios({
      url: `${config.api.base}${path}`,
      headers: { Authorization: `Bearer ${token}` },
      method,
      data: { ...body },
    })

    return { data, status };

  } catch (error) {
    return { status: error.response.status, data: {} };
  }
};