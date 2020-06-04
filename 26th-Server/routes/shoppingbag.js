var express = require("express");
var router = express.Router();
let ShoppingBag = require("../models/shoppingbag");
let UserModel = require("../models/user");
let util = require("../modules/util");
let statusCode = require("../modules/statusCode");
let resMessage = require("../modules/responseMessage");

// 게시글 고유 id 값을 조회
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

    // 성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_SUCCESS, ShoppingBag));
});

// 선택한 제품 삭제
router.delete("/:productIdx", async (req, res) => {
    const productIdx = req.params.productIdx;

    // 삭제 작성

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_SHOPPINGBAG, {
        deleteIdx: productIdx
    }));
});

module.exports = router;