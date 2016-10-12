export default {
  database: {
    data: {
      host: 'localhost',
      port: 27017,
      db: 'nyao'
    },
    session: {
      host: 'localhost',
      port: 6379,
      prefix: 'nyao_'
    }
  },
  session: {
    key: 'SID',
    secret: 'luke skywalker'
  }
}