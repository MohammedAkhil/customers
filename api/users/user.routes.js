'use strict';

const controller = require('./user.controller');
const { getUserValidation } = require('../../utils/request.schema');
const { validateRequest } = require('../../middleware/validation.middleware');
const authenticated = require('../../middleware/auth.middleware');

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router.post('/', async (ctx, next) =>
    validateRequest(ctx, next, getUserValidation),
  );

  router
    .get('/:userId', controller.getOne)
    .get('/', authenticated, controller.getAll)
    .post('/', controller.createOne);

  return router;
};
