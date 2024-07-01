import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  try {
    
    // Store the events in S3
    const S3_BUCKET_NAME = process.env.ARTIFACTS_BUCKET;
    const objectKey = `event_logs/${Date.now()}.json`;
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: objectKey,
      Body: JSON.stringify(event.body),
    };
    await s3.putObject(params).promise();
    console.log('Recorded events:', event.body);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Events recorded' }),
    };
  } catch (error) {
    console.error('Error recording events:', error);

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
