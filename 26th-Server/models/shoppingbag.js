const pool = require("../modules/pool");
const bag_table = "shoppingbag";
const fO_table = "furnitureOption";
let encryption = require("../modules/encryption");

const shoppinbag = {
  // 장바구니 조회
  selectBasicBag: async (uid) => {
    const query1 = `SELECT * FROM (SELECT * FROM ${bag_table} s LEFT JOIN ${fO_table} f ON s.productIdx = f.d_Idx WHERE s.uid = "${uid}") t WHERE t.d_delivery = "basic"`;
    const result1 = [];

    try {
      const myBagList1 = await pool.queryParam(query1);
      myBagList1.forEach(async (product, index) => {
        //const query3 = `SELECT d_color, d_size FROM ${fO_table} WHERE d_Idx = ${product.productIdx}`;
        result1[index] = {
          productIdx: myBagList1[index].productIdx,
          img: myBagList1[index].d_image,
          name: myBagList1[index].d_name,
          delivery_charge: myBagList1[index].d_delivery_charge,
          savings: myBagList1[index].d_savings,
          price: myBagList1[index].d_price,
          quantity: myBagList1[index].quantity,
          option: [myBagList1[index].d_color, myBagList1[index].d_size],
        };
      });
      console.log(result1);

      return result1;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("signup ERROR : ", err.errno, err.code);
        return -1;
      }

      console.log("signup ERROR : ", err);
      throw err;
    }
  },

  selectIndividualBag: async (uid) => {
    const query2 = `SELECT * FROM (SELECT * FROM ${bag_table} s LEFT JOIN ${fO_table} f ON s.productIdx = f.d_Idx WHERE s.uid = "${uid}") t WHERE t.d_delivery = "individual"`;
    const result2 = [];

    try {
      const myBagList2 = await pool.queryParam(query2);
      myBagList2.forEach(async (product, index) => {
        //const query4 = `SELECT d_color, d_size FROM ${fO_table} WHERE d_Idx = ${product.productIdx}`;
        result2[index] = {
          productIdx: myBagList2[index].productIdx,
          img: myBagList2[index].d_image,
          name: myBagList2[index].d_name,
          delivery_charge: myBagList2[index].d_delivery_charge,
          savings: myBagList2[index].d_savings,
          price: myBagList2[index].d_price,
          quantity: myBagList2[index].quantity,
          option: [myBagList2[index].d_color, myBagList2[index].d_size],
        };
      });

      return result2;
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
    const query1 = `SELECT quantity FROM ${bag_table} WHERE uid = "${uid}" AND productIdx = ${productIdx}`;
    const quantity = await pool.queryParam(query1);

    console.log(quantity[0]);

    if (quantity[0] == undefined) {
      quantity[0] = 1;

      const fields = "uid, productIdx, quantity";
      const questions = `?,?,?`;
      const values = [uid, productIdx, quantity];
      const query2 = `INSERT INTO ${bag_table}(${fields}) VALUES(${questions})`;
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
      console.log(q);

      const query3 = `UPDATE ${bag_table} SET quantity = ${q} WHERE productIdx = ${productIdx}`;
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
    const query = `DELETE FROM ${bag_table} WHERE uid = "iOS" AND productIdx = ${productIdx}`;

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
};
module.exports = shoppinbag;