const express = require('express');
const usersRoute = require('./users.route');
const preferencesRoute = require('./preferences.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: usersRoute,
  },
  {
    path: '/preferences',
    route: preferencesRoute,
  }
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });


module.exports = router;