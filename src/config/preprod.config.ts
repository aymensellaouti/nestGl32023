export const preprodConfig = () => ({
  port: 3001,
  secret: 'preprodSecret',
  db: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    name: 'ref9',
  },
});
