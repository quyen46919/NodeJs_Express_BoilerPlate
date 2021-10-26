const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const studentRoute = require('./student.route');
const classRoute = require('./class.route');
const categoryRoute = require('./category.route');
const productRoute = require('./product.route');
const apparelSizeRoute = require('./apparelSize.route');
const nhaCungCapRoute = require('./nhaCungCap.route');
const loaiDichVuRoute = require('./loaiDichVu.route');
const mucPhiRoute = require('./mucPhi.route');
const dongXeRoute = require('./dongXe.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/class',
    route: classRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/apparel-size',
    route: apparelSizeRoute,
  },
  {
    path: '/nha-cung-cap',
    route: nhaCungCapRoute,
  },
  {
    path: '/loai-dich-vu',
    route: loaiDichVuRoute,
  },
  {
    path: '/muc-phi',
    route: mucPhiRoute,
  },
  {
    path: '/dong-xe',
    route: dongXeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
