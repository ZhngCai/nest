import { HotModuleReplacementPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
export default function (options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    watch: true,
    externals: [nodeExternals({ whitelist: ['webpack/hot/poll?100'] })],
    plugins: [...options.plugins, new HotModuleReplacementPlugin()],
  };
}
