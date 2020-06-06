const pool = require('../modules/pool');
let encryption = require('../modules/encryption');


const category = {
    callCategoryName: async () => {
        const query = `SELECT * FROM category`;

        try {
            const result = await pool.queryParam(query);
            return result;

        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }

            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    callProductList: async (cate) => {
        try {
            const result = []
            const query1 = `SELECT * FROM ${cate}`;
            const furnitureList = await pool.queryParam(query1);
            furnitureList.forEach(async (furniture, index) => {
                const query2 = `SELECT d_name, d_price, d_sale, d_image FROM (SELECT * FROM furnitureOption b LEFT JOIN furniture c ON b.f_Idx = c.Idx) t WHERE t.Idx=${furniture.Idx}`;
                //console.log(await pool.queryParam(query2))
                result[index] = {
                    name: furnitureList[index].name,
                    content: furnitureList[index].content,
                    like: furnitureList[index].like,
                    image: furnitureList[index].image,
                    //sub: await pool.queryParam(query2)
                }
            });
            return result;

        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }

            console.log('signup ERROR : ', err);
            throw err;
        }
    }
}

module.exports = category;