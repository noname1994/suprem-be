
module.exports = {
  development: {
    database: {
      url: 'mongodb://localhost/suprem_db'
    },
    port: 8080,
    secret: 'development-secret'
  },

  production: {
    database: {
      url: 'mongodb://localhost/suprem_db'
    },
    port: 8080,
    secret: 'production-secret'
  }
};
