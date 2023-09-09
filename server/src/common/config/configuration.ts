export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  session: {
    host: process.env.SESSION_HOST,
    port: process.env.SESSION_PORT,
    prefix: process.env.SESSION_PREFIX,
    secret: process.env.SESSION_SECRET,
  },
})
