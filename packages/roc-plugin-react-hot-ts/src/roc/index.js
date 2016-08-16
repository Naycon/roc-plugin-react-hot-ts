import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name } from './util';

import builder from './builder';

export default {
    name,
    config,
    meta,
    actions: {
        reactHotTs: {
            hook: 'build-webpack',
            description: 'Adds hot reload support via webpacks HMR to projects using react and typescript.',
            action: builder
        }
    }
};
