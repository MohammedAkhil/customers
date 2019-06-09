const { validationError } = require('./error.middleware');

export const validateRequest = (ctx, next, validation = {}) => {
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
