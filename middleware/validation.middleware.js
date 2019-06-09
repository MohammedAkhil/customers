import ApiError from '../utils/api.error';

export const validateRequest = async (ctx, next, validation = {}) => {
  const {
    request: { body: requestBody },
  } = ctx;
  const validations = Object.entries(validation(requestBody)).map(
    ([key, value]) => {
      return {
        [key]: value(requestBody) ? 'valid' : 'invalid',
        value: requestBody[key],
        error: !value(requestBody),
      };
    },
  );

  const errors = validations.filter(obj => obj.error);
  if (errors.length > 0) {
    throw new ApiError({
      validations: errors,
      message: 'Validation error',
      status: 400,
    });
  } else {
    ctx.request.validations = validations;
    await next();
  }
};
