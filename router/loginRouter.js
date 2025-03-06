const express=require('express');
//internal imports
const { getLogin, login } = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { doLoginValidators, doLoginValidationHandler } = require('../middlewares/login/loginValidators');



const router=express.Router();

router.get('/',decorateHtmlResponse('Login'),getLogin);
router.post('/',decorateHtmlResponse('Login'),doLoginValidators,doLoginValidationHandler,login)

module.exports=router;
