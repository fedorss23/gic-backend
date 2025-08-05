export const DATABASE_CONFIG = {
  user: process.env.GLOBE_INFINITE_DB_USERNAME,
  host: process.env.GLOBE_INFINITE_DB_HOST,
  database: process.env.GLOBE_INFINITE_DB_NAME,
  password: process.env.GLOBE_INFINITE_DB_PASSWORD,
  port: process.env.GLOBE_INFINITE_DB_PORT, 
};

export function QUERY_TO_GET_USER(email: string) { 
    return `SELECT * FROM users WHERE email=${email}`
}