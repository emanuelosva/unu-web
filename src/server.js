/**
 * @fileoverview Server application (Backend for forntend)
 */

import sirv from 'sirv';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';

import axios from 'axios';
import config from './config';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// Server instance
const server = express()

// Cockie manage
server.use(cookieParser())

// Body parsers
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Static server
server.use(compression({ threshold: 0 }))
server.use(sirv('static', { dev }))


/**
 * Auth proxi API
 */
const base = config.api.base;

// Login 
server.post('/api/login', async (req, res) => {
  try {
    const { data, status } = await axios({
      url: `${base}/users/login`,
      method: 'POST',
      data: { ...req.body }
    });
    if (status === 200) {
      res.cookie('token', data.accessToken, {
        maxAge: 7200 * 1000,
        httpOnly: !dev,
        secure: !dev,
      });

      res.status(200).json(data)
    }
  } catch (error) {
    res.status(error.response.status).json({})
  }
});

// Signup
server.post('/api/signup', async (req, res) => {
  try {
    const { data, status } = await axios({
      url: `${base}/users/signup`,
      method: 'POST',
      data: { ...req.body }
    });
    if (status === 201) {
      res.cookie('token', data.accessToken, {
        maxAge: 7200 * 1000,
        httpOnly: !dev,
        secure: !dev,
      });
      res.status(201).json(data)
    }
  } catch (error) {
    res.status(error.response.status).json({})
  }
});

// Logout
server.post('/api/logout', (req, res) => {
  res.cookie('token', undefined)
  res.end();
});


/**
 * Sapper Middleware and session coockie.
 */

server.use((req, res, next) => {
  const { token } = req.cookies;
  return sapper.middleware({
    session: () => {
      return { user: token, token }
    }
  })(req, res, next);
});


/**
 * Launch server
 */
server.listen(PORT, err => {
  if (err) throw new Error('Server Error')
  console.log(`Server listening on port: ${PORT}`)
})
