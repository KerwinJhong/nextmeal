const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const db = require('../models')
const Restaurant = db.Restaurant
const { validationResult } = require('express-validator');

let ownerController = {
  getRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findAll({
        where: {UserId: req.user.id}
      })
      if (restaurant.length === 0) {
        return res.status(200).json({status: 'success',  message: 'You have not restaurant yet.'})
      }
      res.status(200).json({status: 'success', restaurant, message: 'Successfully get the restaurant information.'})
    } catch (error) {
      res.status(500).json({ status: 'error', message: error })
    }
  },
  
  postRestaurant: async (req, res) => {
    try{
      const errors = validationResult(req)
      let restaurant = await Restaurant.findAll({where: {UserId: 1}})
      if (restaurant) return res.status(422).json({ status: 'error', message: 'You already have a restaurant.' });

      if (!errors.isEmpty()) {
        return res.status(422).json({ status: 'error', errors: errors.array(), message: 'restautant information should be filled' });
      }
      const { file } = req
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, async (err, img) => {
          await Restaurant.create({
            name: req.body.name,
            description: req.body.description,
            image: img.data.link,
            tel: req.body.tel,
            rating: 0,
            location: req.body.location,
            CategoryId: req.body.CategoryId,
            address: req.body.address,
            opening_hour: req.body.opening_hour,
            closing_hour: req.body.closing_hour,
            latitude: req.body.lat,
            longitude: req.body.lng,
            UserId: req.user.id
          })
          return res.status(200).json({
            status: 'success',
            message: 'Successfully create the restaurant information with image.'
          })
        })
      } else {
        await Restaurant.create({
          name: req.body.name,
          description: req.body.description,
          image: 'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_960_720.jpg',
          tel: req.body.tel,
          rating: 0,
          location: req.body.location,
          CategoryId: req.body.CategoryId,
          address: req.body.address,
          opening_hour: req.body.opening_hour,
          closing_hour: req.body.closing_hour,
          latitude: req.body.lat,
          longitude: req.body.lng,
          UserId: req.user.id
        })
        return res.status(200).json({
          status: 'success',
          message: 'Successfully create the restaurant information.'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 'error', message: error })
    }
  },

  putRestaurant: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ status: 'error', errors: errors.array(), message: 'restautant information should be filled' });
      }
      let restaurant = await Restaurant.findOne({where: {UserId: 1}})
      
      if (!restaurant) {
        return res.status(400).json({ status: 'error', message: 'The restaurant is not exist.' })
      }
      const { file } = req      
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, async (err, img) => {
          await restaurant.update({
            name: req.body.name,
            description: req.body.description,
            image: file ? img.data.link : restaurant.image,
            tel: req.body.tel,
            address: req.body.address,
            opening_hour: req.body.opening_hour,
            closing_hour: req.body.closing_hour,
            latitude: req.body.lat,
            longitude: req.body.lng
          })
          return res.status(200).json({
            status: 'success',
            message: 'Successfully update restaurant information with image.'
          })
        })
      } else {
        await restaurant.update(req.body)
        return res.status(200).json({
          status: 'success',
          message: 'Successfully update restaurant information.'
        })
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: error })
    }
  },
}

module.exports = ownerController