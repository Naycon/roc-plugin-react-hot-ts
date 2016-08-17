import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';
import builder from '../builder';

import { name } from './util';

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
    },
    required: {
        'roc-plugin-typescript': '^1.0.3',
        'roc-plugin-react': '^1.0.0-alpha.2'
    }
};
