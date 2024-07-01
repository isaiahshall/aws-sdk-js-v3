import AWS from 'aws-sdk'

// Fetch the S3 bucket name from the environment variable
const S3_BUCKET_NAME = process.env.ARTIFACTS_BUCKET

export const handler = async (event) => {
  try {
    const { id: artifactId, teamId, team, slug } = event.pathParameters
    let teamIdentifier = teamId ?? team ?? slug

    if (!teamIdentifier) {
      throw new Error('Path parameters should have required property \'teamId\', \'team\', or \'slug\'')
    }

    // Create an S3 client using the AWS SDK
    const s3 = new AWS.S3()

    // Fetch the artifact from the S3 bucket
    const { Body } = await s3.getObject({
      Bucket: S3_BUCKET_NAME,
      Key: `${teamIdentifier}/${artifactId}`
    }).promise()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: Body.toString('base64'),
      isBase64Encoded: true
    }
  } catch (err) {
    console.error(err)
    let statusCode = 500
    let errorMessage = 'Internal server error'

    if (err.name === 'UnauthorizedError') {
      statusCode = 401
      errorMessage = 'Unauthorized'
    } else if (err.name === 'ForbiddenError') {
      statusCode = 403
      errorMessage = 'Forbidden'
    } else if (err.name === 'BadRequestError') {
      statusCode = 400
      errorMessage = 'Bad request'
    }

    return {
        statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: errorMessage }),
      };

  }
}
