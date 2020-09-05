/**
 * @fileoverview Server application (Backend for forntend)
 */

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// Server instance
const server = polka()

// Static server
server.use(compression({ threshold: 0 }))
server.use(sirv('static', { dev }))


// Sapper middleware
server.use(sapper.middleware({
  session: (req, res) => ({
    user: req.user,
  })
}));


// Lauch server
server.listen(PORT, err => {
  if (err) throw new Error('Server Error')
  console.log(`Server listening on port: ${PORT}`)
})
