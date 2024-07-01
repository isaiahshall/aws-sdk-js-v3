import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  try {
    // Check if the S3 bucket is accessible
    await s3.headBucket({ Bucket: process.env.ARTIFACTS_BUCKET }).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'enabled' }),
    };
  } catch (error) {
    console.error('Error getting remote cache status:', error);

    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.name === 'UnauthorizedError') {
      statusCode = 401;
      errorMessage = 'Unauthorized';
    } else if (error.name === 'ForbiddenError') {
      statusCode = 403;
      errorMessage = 'Forbidden';
    } else if (error.name === 'BadRequestError') {
      statusCode = 400;
      errorMessage = 'Bad request';
    }

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
