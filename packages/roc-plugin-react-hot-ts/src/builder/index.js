import path from 'path';
import { getSettings } from 'roc';

export default () => ({ previousValue: rocBuilder }) => (target) => () => {
    const {
        buildConfig,
        builder,
        info
    } = rocBuilder;

    const buildSettings = getSettings('build');
    const DEV = (buildSettings.mode === 'dev');
    const WEB = target === 'web';

    if (DEV && WEB) {
        // Add hot reloading capabilities for tsx-files
        const reactHotLoader = {
            test: /\.tsx?$/,
            loader: 'react-hot'
        };

        // Check if ts-loader has already been added to the loaders
        let tsLoaderIndex = -1;
        buildConfig.module.loaders.find((loader, index) => {
            if (loader.loader === 'ts-loader') {
                tsLoaderIndex = index;
                return true;
            }

            return false;
        });

        // If ts-loader has been added, add react-hot before ts-loader, or it won't work
        if (tsLoaderIndex >= 0) {
            buildConfig.module.loaders.splice(tsLoaderIndex, 0, reactHotLoader);
        } else {
            buildConfig.module.loaders.push(reactHotLoader);
        }

        const modulesPath = path.join(__dirname, '../../node_modules');
        rocBuilder.buildConfig.resolveLoader.root.push(modulesPath);
    }

    return {
        buildConfig,
        builder,
        info
    };
};
