const sequelize = require('sequelize')
const moment = require('moment')
const today = moment().toISOString()
console.log(today);
let yesterday = moment().subtract(1, 'days').toISOString()
const start = moment().startOf('day').toISOString()
const end = moment().endOf('day').toISOString()
module.exports = {
  Comment: {
    RestaurantId: '(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'
  },
  Order: {
    UserId: '(SELECT COUNT(*) FROM Orders WHERE Orders.UserId = User.id)'
  },
  char: {
    date: [sequelize.fn('date_format', sequelize.col('require_date'), '%Y%c%d'), 'date'],
    time: [sequelize.fn('date_format', sequelize.col('require_date'), '%H:%i'), 'time'],
    date_for_dashboard: [sequelize.fn('DATE_FORMAT', sequelize.col('require_date'), '%m/%d'), 'date'],
    date_for_admin_dashboard: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%m/%d'), 'date']
  },
  geo: {
    geometry: 'ST_Distance_Sphere',
    random: 'rand()'
  },
  literal: {
    name: [sequelize.literal('(SELECT name FROM Users WHERE Users.id = Comment.UserId)'), 'name'],
    subscribeUsers: [sequelize.literal(`(SELECT COUNT(*) FROM Users WHERE Users.expired_date > '${today}')`), 'subscribeUsers'],
    nonsubscribeUsers: [sequelize.literal(`(SELECT COUNT(*) FROM Users WHERE Users.expired_date < '${today}' OR Users.expired_date IS NULL)`), 'nonsubscribeUsers'],
    userIncreased: [sequelize.literal(`(SELECT COUNT(*) FROM Users WHERE Users.createdAt < '${today}')-(SELECT COUNT(*) FROM Users WHERE Users.createdAt < '${yesterday}')`), 'userIncreased'],
    restIncreased: [sequelize.literal(`(SELECT COUNT(*) FROM Restaurants WHERE Restaurants.createdAt < '${today}')-(SELECT COUNT(*) FROM Restaurants WHERE Restaurants.createdAt < '${yesterday}')`), 'restIncreased'],
    subtIncreased: [sequelize.literal(`(SELECT COUNT(*) FROM Subscriptions WHERE Subscriptions.createdAt < '${today}')-(SELECT COUNT(*) FROM Subscriptions WHERE Subscriptions.createdAt < '${yesterday}')`), 'subtIncreased'],
    todayOrders: [sequelize.literal(`(SELECT COUNT(*) FROM Orders WHERE Orders.require_date > '${start}' AND Orders.require_date < '${end}')`), 'todayOrders']
  }
}