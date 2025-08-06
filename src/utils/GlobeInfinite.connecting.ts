import { Pool, PoolClient, QueryResult } from 'pg';
import { DATABASE_CONFIG } from 'src/constants/DatabaseConfig';

class GlobeInfinite {
    private pool: Pool;

    constructor(config: any) {
        this.pool = new Pool(config);
    }
  
    public async query(sql: string, params?: any[]): Promise<QueryResult | undefined> {
        let client: PoolClient = await this.pool.connect()

        try {
            const result = await client.query(sql, params);
            return result;
        } catch (error) {
            console.log("Error with connecting to globe infinite database: ", error)
        } finally {
            if (client) {
                client.release()
            };
        }
    }

    public async close(): Promise<void> {
        await this.pool.end();
    }
}

const globeInfinite = new GlobeInfinite(DATABASE_CONFIG)

export default globeInfinite

