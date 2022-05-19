const catchAsync = async (fn: Promise<any>) => {
  try {
    const responseData = await fn;
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default catchAsync;
