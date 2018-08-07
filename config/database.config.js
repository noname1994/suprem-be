
module.exports = {
  development: {
    database: {
      // url: 'mongodb://localhost/suprem_db',
      url: 'mongodb://ninh.td:abc13579@ds215502.mlab.com:15502/suprem_db'
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
