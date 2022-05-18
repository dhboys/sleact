const catchAsync = async (fn: Promise<any>) => {
  try {
    const responseData = await fn;
    console.log("catchAsync responseData", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default catchAsync;
