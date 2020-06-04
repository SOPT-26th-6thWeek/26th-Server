const pool = require('../modules/pool');
const table = 'banner';
let encryption = require('../modules/encryption');
const banner = {

        selectAllBanner : async () => {
            const query = `SELECT * FROM ${table}`;

            try{
                const result = await pool.queryParam(query);
                return result;

            }catch(err) {
                if(err.errno == 1062){
                    console.log('signup ERROR : ', err.errno, err.code);
                    return -1;
                }

                console.log('signup ERROR : ', err);
                throw err;
            }
    } 
}


module.exports = banner;