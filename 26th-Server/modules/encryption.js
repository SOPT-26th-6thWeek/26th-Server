const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

const makesalt = () =>{
    return crypto.randomBytes(32).toString('hex');
}; // salt를 만드는 함수를 정의 해준다. 

const encrypt = (password, salt) => {
    return new Promise(async (res,rej) => {
        pbkdf2.pbkdf2(password,salt,1,32,'sha512',(err,derivedKey)=> {
            if(err) throw err;
            const hashed = derivedKey.toString('hex');
            res(hashed);
        })
    })
}

module.exports = {
    makesalt : makesalt,
    encrypt: encrypt
}