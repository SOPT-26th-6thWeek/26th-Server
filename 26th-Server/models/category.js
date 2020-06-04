const pool = require('../modules/pool');
let encryption = require('../modules/encryption');


const category = {
callCategoryName : async () => {
    const query = `SELECT * FROM category`;

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
},

callFurnitureList : async() => {
    // 만약 옵션이 안달린 가구면 가구 테이블이랑 가구옵션테이블에 index값 똑같이 해주고 하나만 나오게 해준다.
    const query1 = `SELECT * FROM category a , furniture b WHERE a.categoryIdx = b.categoryIdx`;
    // 옵션이 달린 가구 목록 보여주기.
    const query = `SELECT * FROM category a , furniture b, furnitureOption c WHERE a.categoryIdx = b.categoryIdx and b.f_idx = c.f_idx`;
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
    

},

callSubObject : async() => {
    const query = `SELECT d_name,d_price,d_sale,d_image FROM category a , furniture b, furnitureOption c WHERE a.categoryIdx = b.categoryIdx and b.f_idx = c.f_idx`;
    
    
    try{
        const result = await pool.queryParam(query);

        return result;
    }
    catch(err) {
        if(err.errno == 1062){
            console.log('signup ERROR : ', err.errno,err.code);
            return -1;
        }
        console.log('signup ERROR : ', err);
        throw err;
    }
}

}

module.exports = category;
