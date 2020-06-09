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

    callFurnitureList: async (id) => {
        // 만약 옵션이 안달린 가구면 가구 테이블이랑 가구옵션테이블에 index값 똑같이 해주고 하나만 나오게 해준다.
        //const query1 = `SELECT * FROM category a , furniture b WHERE a.categoryIdx = b.categoryIdx`;
        // 옵션이 달린 가구 목록 보여주기.

        // const query1 = `SELECT * FROM category a , furniture b, furnitureOption c WHERE a.categoryIdx = b.categoryIdx and b.f_idx = c.f_idx`;
        //const query2 = `SELECT d_name,d_price,d_sale,d_image FROM category a , furniture b, furnitureOption c WHERE a.categoryIdx = b.categoryIdx and b.f_idx = c.f_idx`;

        const query = `SELECT * FROM furniture WHERE categoryIdx = ${id}`;

        try {
            const result = await pool.queryParam(query)

            //const result2 = [];

            // for(var i = 0; i< 50; i++){


            //     const query2 = `SELECT d_name,d_price,d_sale,d_image FROM category a , furniture b, furnitureOption c WHERE a.categoryIdx = b.categoryIdx and b.f_idx = c.f_idx`;

            //     result3[i] = {
            //         result1[i].,
            //         subobject : await pool.queryParam(query2)
            //     }   
            // }

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

    countOptionNum: async (id) => {

        const query = `SELECT * FROM furnitureOption WHERE f_idx = ${id}`;

        try {
            const result = await pool.queryParam(query);

            return result.length;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    callSubObject: async (id) => {
        const query = `SELECT d_name,d_price,d_sale FROM furnitureOption WHERE f_Idx = ${id}`;


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
    }

}

module.exports = category;