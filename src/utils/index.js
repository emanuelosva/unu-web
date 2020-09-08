/**
 * @fileoverview Utils for app
 */

import { stores } from "@sapper/app"
import axios from "axios";
import config from "../config";

/**
 * @description Redirect to login and make secure logout.
 */
export const goToLogin = async () => {
  await fetch("/api/logout", { method: "POST" })
  window.location.href = "/login";
};


/**
 * @description Make a request to API
 * @param {string} path - The specific api endpoint.
 * @param {string} method - The http method.
 * @param {object} body - The request body.
 * @param {object} headers - The request header.
 *  
 */
export const apiRequest = async ({ path, method, body, headers }) => {

  try {
    const { data, status } = await axios({
      url: `${config.api.base}${path}`,
      method,
      headers: headers,
      data: body,
    });

    return { data, status };
  } catch (error) {
    if (!error.response) return { data: {}, status: 500 };
    return { data: {}, status: error.response.status };
  }
};


/**
 * @description Create a new reader to encode a imge to base64 string.
 * @param {BinaryType} image - The image to encode
 */
export const imageReader = (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  return reader;
};
