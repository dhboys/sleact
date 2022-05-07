import React from "react";

const catchAsync = async (fn: Promise<any>) => {
  try {
    const responseData = await fn.then((result) => result).then((res) => res.data);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default catchAsync;
