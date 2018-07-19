module.exports = options => {
  return Object.assign({
    server: {
      // https: true,
    },
    ghostMode: false,
    logLevel: "debug",
  }, options);

};