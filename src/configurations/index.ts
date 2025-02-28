export default () => ({
    port: parseInt(process.env.PORT) || 7000,
    db_port: parseInt(process.env.DB_PORT),
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    secret_jwt: process.env.SECRET,
    expire_period_jwt: process.env.EXPIRED_JWT
})