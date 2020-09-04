/**
 * @fileoverview Cliend hydrate by sapper
 */

import * as sapper from '@sapper/app';

sapper.start({
  target: document.querySelector('#app')
});
