'use strict';
const faker = require('faker')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const opening_hour = '11:00'
const closing_hour = '14:00'
const users = require('../location/users.json')
const stores = require('../location/stores.json')
const foodImg = require('../location/foodImg.json')
const restImg = require('../location/restImg.json')
const categories = require('../location/categories.json')

function createUsers(users) {
  let userData = []
  for (let i = 0; i < users.length; i++) {
    let role = 'User'
    if (i === 0) role = 'Admin'
    if (i > 1 && i < (stores.length + 2)) role = 'Owner'
    const seedUser = {
      name: i === 0 ? 'root' : faker.name.findName(),
      email: i === 0 ? 'root@example.com' : `user${i}@example.com`,
      password: bcrypt.hashSync('12345678', 10),
      avatar: `https://i.pravatar.cc/400?img=${Math.floor(Math.random() * 70 + 1)}`,
      role: role,
      dob: faker.date.past(60, new Date(2001, 0, 1)),
      location: users[i].location,
      prefer: categories[Math.floor(Math.random() * 5) + 1].name,
      address: users[i].address,
      lat: users[i].lat,
      lng: users[i].lng,
      geometry: Sequelize.fn('ST_GeomFromText', `POINT(${users[i].lng} ${users[i].lat})`),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    userData.push(seedUser)
  }
  return userData
}

function createRest(store) {
  let restData = []
  for (let i = 0; i < store.length; i++) {
    const seedRest = {
      name: store[i].name,
      description: store[i].description.substring(0, 101),
      tel: faker.phone.phoneNumber(),
      location: store[i].location,
      address: store[i].address,
      UserId: i + 3,
      opening_hour: opening_hour,
      closing_hour: closing_hour,
      CategoryId: Math.floor(Math.random() * 7) + 1,
      image: restImg[Math.floor(Math.random() * restImg.length)],
      lat: store[i].lat,
      lng: store[i].lng,
      geometry: Sequelize.fn('ST_GeomFromText', `POINT(${store[i].lng} ${store[i].lat})`),
      rating: parseFloat(Math.random() * 4 + 1).toFixed(1),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    restData.push(seedRest)
  }
  return restData
}


function randomTime() {
  let tomorrow = moment().add(1, 'days').startOf('day')
  tomorrow.set('Hour', (Math.floor(Math.random() * 3) + 11)).set('minute', ((Math.random() > 0.5) ? 0 : 30))
  tomorrow = new Date(tomorrow)
  return tomorrow
}

function pastOrder() {
  let date = faker.date.past(1, new Date(Date.now()))
  date = moment(date).startOf('day')
  date.set('Hour', (Math.floor(Math.random() * 3) + 11)).set('minute', ((Math.random() > 0.5) ? 0 : 30)).toDate()
  date = new Date(date)
  return date
}
const Sequelize = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let allUser = createUsers(users)
    let allStore = createRest(stores)
    let usersOrders = []
    let OrdersItem = []
    for (let i = 0; i < 400; i++) {
      let order_status = '明日'
      let past, orderPast
      const random = Math.floor(Math.random() * 3) + 1
      if (i === 99) {
        past = randomTime()
      }
      if (i < 99) {
        past = pastOrder()
        order_status = '今日'
      }
      orderPast = new Date(moment(past).subtract(1, 'days'))
      const seedOrders = {
        UserId: i < 100 ? 2 : Math.ceil(Math.random() * (users.length - stores.length + 2)) + stores.length + 2,
        require_date: i < 100 ? past : randomTime(),
        order_date: i < 100 ? orderPast : new Date(),
        order_status: order_status,
        hasComment: false,
        amount: random,
        createdAt: i < 100 ? orderPast : new Date(),
        updatedAt: i < 100 ? orderPast : new Date()
      }
      const seedOrderItem = {
        OrderId: i + 1,
        MealId: i < 384 ? Math.ceil(Math.random() * 496) + 1 : 1,
        quantity: random,
        createdAt: i < 100 ? orderPast : new Date(),
        updatedAt: i < 100 ? orderPast : new Date()
      }
      usersOrders.push(seedOrders)
      OrdersItem.push(seedOrderItem)
    }
    // // //add Users
    await queryInterface.bulkInsert('Users', allUser, {})

    // // //add restaurants
    await queryInterface.bulkInsert('Restaurants', allStore, {});

    // add categories
    await queryInterface.bulkInsert("Categories", categories.map((item, index) =>
      ({
        id: index + 1,
        name: item.name,
        image: item.image,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    ), {});

    // add meals
    await queryInterface.bulkInsert("Meals",
      Array.from({ length: stores.length }).map((item, index) => (
        {
          name: faker.name.findName(),
          image: foodImg[Math.floor(Math.random() * foodImg.length)],
          RestaurantId: index + 1,
          quantity: 50,
          description: faker.lorem.text(),
          isServing: true,
          nextServing: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      , {});

    // // add orders
    await queryInterface.bulkInsert("Orders", usersOrders, {});

    // add orderitems
    await queryInterface.bulkInsert("OrderItems", OrdersItem, {});

    // add subscriptions
    return queryInterface.bulkInsert("Subscriptions",
      Array.from({ length: 3 }).map((item, index) => (
        {
          UserId: index + 1,
          sub_name: '輕量型',
          sub_price: 1000,
          sub_description: '一個月10餐',
          sub_balance: 10,
          sub_date: index < 3 ? new Date() : null,
          sub_expired_date: index < 3 ? moment().add(30, 'days').endOf('day').toDate() : null,
          payment_status: index < 3 ? true : false,
          sn: index < 3 ? Date.now() + index : null,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      , {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, { truncate: true })
    queryInterface.bulkDelete('Categories', null, { truncate: true })
    queryInterface.bulkDelete('Meals', null, { truncate: true })
    queryInterface.bulkDelete('Subscriptions', null, { truncate: true })
    queryInterface.bulkDelete('Orders', null, { truncate: true })
    queryInterface.bulkDelete('OrderItems', null, { truncate: true })
    return queryInterface.bulkDelete('Restaurants', null, { truncate: true })
  }
};
