import AWS from "aws-sdk";

// Fetch the S3 bucket name from the environment variable
const S3_BUCKET_NAME = process.env.ARTIFACTS_BUCKET;

export const handler = async (event) => {
  try {
    const artifactId = event.pathParameters.hash;
    const teamIdentifier =
      event.queryStringParameters.slug ?? event.queryStringParameters.team ?? event.queryStringParameters.teamId;

    if (!teamIdentifier) {
      let error = new Error("Query parameters should have required property 'teamId', 'team', or 'slug'");
      error.name = "BadRequestError";
      throw error;
    }

    // Create an S3 client using the AWS SDK
    const s3 = new AWS.S3();

    // Upload the artifact to the S3 bucket
    await s3
      .putObject({
        Bucket: S3_BUCKET_NAME,
        Key: `${teamIdentifier}/${artifactId}`,
        Body: event.body,
      })
      .promise();

    console.log(`Artifact uploaded to ${teamIdentifier}/${artifactId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ urls: [`${teamIdentifier}/${artifactId}`] }),
    };
  } catch (err) {
    console.error(err);
    // we need 4xx error throw since turbo retries if the error is in 5xx range
    let statusCode = 412;
    if (err.name === "BadRequestError") {
      statusCode = 400;
    }

    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error during the artifact creation", error: err.message }),
    };
  }
};
