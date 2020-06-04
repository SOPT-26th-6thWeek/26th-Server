var express = require('express');
var router = express.Router();
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');
let banner = require('../models/banners');
let category = require('../models/category');


// 배너불러오기
router.get('/banner', async function(req,res){
    const result = await banner.selectAllBanner();

    if(result.length ==0 ){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.BANNER_FAIL));
        
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.BANNER_SUCCESS,{result}));
}),

// 카테고리 목록 불러오기
router.get('/category',async function(req,res){
    const result = await category.callCategoryName();

    if(result.length ==0 ){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.CATEGORY_FAIL));
        
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_SUCCESS,{ result}));
     
}),

//홈 화면 가구 리스트 불러오기
// 가구리스트 불러올때와 동일

router.get('/', async function(req,res){
    const result = await category.callFurnitureList();


    if(result.length ==0 ){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.CATEGORY_FAIL));
        
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_SUCCESS,{ result  }));
})

// 가구 리스트 전체 불러오기
router.get('/category/furniture', async function(req,res){

    const result = await category.callFurnitureList();


    if(result.length ==0 ){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.CATEGORY_FAIL));
        
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_SUCCESS,{ result  }));
      

})


//하위가구 보여주기
router.get('/category/subobject', async function(req,res){

    const result = await category.callSubObject();


    if(result.length ==0 ){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.CATEGORY_FAIL));
        
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CATEGORY_SUCCESS,{ result  }));
      

})

module.exports = router;
