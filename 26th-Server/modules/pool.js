const poolPromise = require('../config/database');

module.exports = {
    queryParam: async (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await poolPromise;
                const connection = await pool.getConnection();
                try {
                    const result = await connection.query(query);
                    pool.releaseConnection(connection);
                    resolve(result);
                } catch (err) {
                    pool.releaseConnection(connection);
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        });
    },
    queryParam_None: async (...args) => {
        const query = args[0]
        let result
        const pool = await poolPromise;
        try {
            var connection = await pool.getConnection() // connection을 pool에서 하나 가져온다.
            result = await connection.query(query) || null // query문의 결과 || null 값이 result에 들어간다.
        } catch (err) {
            console.log(err)
            connection.rollback(() => {})
        } finally {
            pool.releaseConnection(connection) // waterfall 에서는 connection.release()를 사용했지만, 이 경우 pool.releaseConnection(connection) 을 해준다.
            return result
        }
    },
    queryParamArr: async (query, value) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await poolPromise;
                const connection = await pool.getConnection();
                try {
                    const result = await connection.query(query, value);
                    pool.releaseConnection(connection);
                    resolve(result);
                } catch (err) {
                    pool.releaseConnection(connection);
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        });
    },
    Transaction: async (...args) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await poolPromise;
                const connection = await pool.getConnection();
                try {
                    await connection.beginTransaction();
                    args.forEach(async (it) => await it(connection));
                    await connection.commit();
                    pool.releaseConnection(connection);
                    resolve(result);
                } catch (err) {
                    await connection.rollback()
                    pool.releaseConnection(connection);
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}