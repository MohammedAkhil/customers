'use strict';

const controller = require('./user.controller');
const { getUserValidation } = require('../../utils/request.schema');
const { validateRequest } = require('../../middleware/validation.middleware');

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router.post('/', (ctx, next) =>
    validateRequest(ctx, next, getUserValidation),
  );

  router
    .get('/:userId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
