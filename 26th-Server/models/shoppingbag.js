const pool = require("../modules/pool");
const table = "shoppingbag";
let encryption = require("../modules/encryption");
const shoppinbag = {
    // 장바구니 조회
    selectAllBag: async (uid) => {
        const query = `SELECT * FROM ${table} WHERE uid = "${uid}"`;

        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log("signup ERROR : ", err.errno, err.code);
                return -1;
            }

            console.log("signup ERROR : ", err);
            throw err;
        }
    },

    // 장바구니 추가
    productAddBag: async (uid, productIdx) => {
        const query1 = `SELECT quantity FROM ${table} WHERE uid = "${uid}" AND productIdx = ${productIdx}`;
        const quantity = await pool.queryParam(query1);

        console.log(quantity[0])

        if (quantity[0] == undefined) {
            quantity[0] = 1;

            const fields = "uid, productIdx, quantity";
            const questions = `?,?,?`
            const values = [uid, productIdx, quantity];
            const query2 = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
            try {
                const result = await pool.queryParamArr(query2, values);
                return result;
            } catch (err) {
                if (err.errno == 1062) {
                    console.log("signup ERROR : ", err.errno, err.code);
                    return -1;
                }

                console.log("signup ERROR : ", err);
                throw err;
            }
        } else {
            const q = quantity[0].quantity + 1;
            console.log(q)

            const query3 = `UPDATE ${table} SET quantity = ${q} WHERE productIdx = ${productIdx}`
            try {
                const result = await pool.queryParamArr(query3);
                return result;
            } catch (err) {
                if (err.errno == 1062) {
                    console.log("signup ERROR : ", err.errno, err.code);
                    return -1;
                }

                console.log("signup ERROR : ", err);
                throw err;
            }
        }
    },

    // 장바구니 삭제
    productDeleteBag: async (productIdx) => {
        const query = `DELETE FROM ${table} WHERE uid = "iOS" AND productIdx = ${productIdx}`;

        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log("signup ERROR : ", err.errno, err.code);
                return -1;
            }

            console.log("signup ERROR : ", err);
            throw err;
        }
    }
};

module.exports = shoppinbag;