const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


router.get('/', homeController.getIndex) 
router.get('/profile', homeController.getProfile);

router.get('/createProfile', homeController.getCreateProfile);

router.get('/createOwner', homeController.getCreateOwner);
router.put('/createOwner', homeController.putCreateOwner);

router.get('/createPet', homeController.getCreatePet);
router.put('/createPet', homeController.putCreatePet);

router.get('/createSitter', homeController.getCreateSitter);
router.put('/createSitter', homeController.putCreateSitter);





module.exports = router