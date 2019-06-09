export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    if (err.status >= 500) console.log('Error handler:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      status: 'failed',
      message: err.message || 'Internal server error',
      error: err.errorObject || {},
    };
  }
};
