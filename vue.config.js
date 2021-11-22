module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/github_api/'
    : '/',
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/assets/global.scss";
          `
        }
      }
    }
  };