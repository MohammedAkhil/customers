const { getUserValidation } = require('../utils/request.schema');

const { validationError } = require('./error.middleware');

export const validateRequest = (ctx, next, validation = getUserValidation) => {
  const {
    request: { body: requestBody },
  } = ctx;
  const validations = Object.entries(validation).map(([key, prop]) =>
    prop(requestBody),
  );
  Promise.all(validations)
    .then(result => {
      next();
    })
    .catch(err => {
      console.log(err);
      validationError(ctx, err);
    });
};
