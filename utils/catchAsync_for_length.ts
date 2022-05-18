import React from "react";

const catchAsyncForLength = async (fn: Promise<any>) => {
  try {
    const responseData = await fn.then((result) => result).then((res) => res.data.length);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default catchAsyncForLength;