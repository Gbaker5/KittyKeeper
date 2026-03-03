const User = require('../models/User')
const OwnerProfile = require('../models/Owner')
const SitterProfile = require('../models/SitterInfo')
const Cat = require('../models/Cat')
const Booking = require('../models/Booking')


module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },

    getProfile: (req,res) => {
        res.render('profile.ejs')
    },




    
    getCreateProfile: async (req,res) => {

       let owner = await OwnerProfile.findOne({userId: req.user._id});
        // if no owner profile exists, pass an empty object to avoid errors in the template
        if (!owner) owner = {};


        res.render('createProfile.ejs', {user: req.user,})
    },

     putCreateProfile: async (req,res) =>{

       

     try{
       

     } catch (err){
        console.log(err)
     }


    },

    getCreateOwner: async (req,res) => {

        let owner = await OwnerProfile.findOne({userId: req.user._id});
        // if no owner profile exists, pass an empty object to avoid errors in the template
        if (!owner) owner = {};


        res.render('ownerCreate.ejs', {user: req.user, owner: owner})
    },

     putCreateOwner: async (req,res) =>{

       

     try{
       

     } catch (err){
        console.log(err)
     }


    },

    getCreateSitter: async (req,res) => {

       

        res.render('createSitter.ejs', {user: req.user})
    },

     putCreateSitter: async (req,res) =>{

       

     try{
       

     } catch (err){
        console.log(err)
     }


    },

    getCreatePet: async (req,res) => {

       let kitty = await Cat.findOne({ownerId: req.user._id});
        // if no cat profile exists, pass an empty object to avoid errors in the template
        if (!kitty) kitty = {};

        res.render('createPet.ejs', {user: req.user, kitty: kitty})
    },

     putCreatePet: async (req,res) =>{

       

     try{
       

     } catch (err){
        console.log(err)
     }


    },

   
}