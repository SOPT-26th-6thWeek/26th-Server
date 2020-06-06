var express = require("express");
var router = express.Router();
let ShoppingBag = require("../models/shoppingbag");
let UserModel = require("../models/user");
let util = require("../modules/util");
let statusCode = require("../modules/statusCode");
let resMessage = require("../modules/responseMessage");

// 해당 id 장바구니 조회
router.get("/:uid", async (req, res) => {
    const uid = req.params.uid;

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const user = UserModel.filter((user) => user.id == uid);
    if (user[0] === undefined) {
        res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    // 장바구니 조회
    const result = await ShoppingBag.selectAllBag(uid);
    if (result.length == 0) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
    }

    // 성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_SUCCESS, result));
});

// 선택한 제품 추가
router.post("/add", async (req, res) => {
    const {
        uid,
        productIdx
    } = req.body;

    // NULL VALUE 확인
    if (!uid || !productIdx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const user = UserModel.filter((user) => user.id == uid);
    if (user[0] === undefined) {
        res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    // 장바구니 추가
    const result = await ShoppingBag.productAddBag(uid, productIdx);

    // 성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ADD_SHOPPINGBAG, {
        addIdx: productIdx
    }));
})

// 선택한 제품 삭제
router.delete("/:productIdx", async (req, res) => {
    const productIdx = req.params.productIdx;

    // 장바구니 삭제
    const result = await ShoppingBag.productDeleteBag(productIdx);

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_SHOPPINGBAG, {
        deleteIdx: productIdx
    }));
});

module.exports = router;