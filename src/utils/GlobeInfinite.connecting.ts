import { DATABASE_CONFIG } from 'src/constants/DatabaseConfig';
import mysql, { FieldPacket, QueryResult } from "mysql2/promise"

class GlobeInfinite {
    public async query(sql: string): Promise<[QueryResult, FieldPacket[]] | null> {
        const connection = await mysql.createConnection({
            host: DATABASE_CONFIG.host, 
            port: DATABASE_CONFIG.port, 
            user: DATABASE_CONFIG.user, 
            password: DATABASE_CONFIG.password,
            database: DATABASE_CONFIG.database,
            ssl: { rejectUnauthorized: false } 
        });

        try {
            const result = await connection.query(sql)
            await connection.end()
            return result
        } catch (error) {
            await connection.end()
            console.log("Error with globe infinity")
            return null
        }
    }
}

const globeInfinite = new GlobeInfinite()

export default globeInfinite

