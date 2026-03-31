const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Block Metro from watching Android build artifact directories inside node_modules.
 * These directories are created/deleted by Gradle during builds and cause ENOENT
 * crashes in the Metro file watcher (especially react-native-video's buildOutput_* dirs).
 */
const androidBuildExclusions = /node_modules[/\\].*[/\\]android[/\\](\.cxx|build|buildOutput_[^/\\]*|\.gradle|intermediates|generated|tmp)[/\\].*/;

module.exports = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    blockList: [androidBuildExclusions],
  },
});
