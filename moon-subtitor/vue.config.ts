module.exports = {
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: "./src/types",
        components: "@/components",
        views: "@/views",
      },
    },
  },
};
