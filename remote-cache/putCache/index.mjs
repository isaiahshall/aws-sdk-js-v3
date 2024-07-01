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

    // Upload the artifact to the S3 bucket
    await s3.putObject({
      Bucket: S3_BUCKET_NAME,
      Key: `${teamIdentifier}/${artifactId}`,
      Body: event.body
    }).promise()

    console.log(`Artifact uploaded to ${teamIdentifier}/${artifactId}`)

    return {
      statusCode: 200,
      body: JSON.stringify({ urls: [`${teamIdentifier}/${artifactId}`] })
    }
  } catch (err) {
    console.error(err)
    // we need this error throw since turbo retries if the error is in 5xx range
    return {
      statusCode: 412,
      body: JSON.stringify({ message: 'Error during the artifact creation', error: err.message })
    }
  }
}
