import AWS from "aws-sdk";

// Fetch the S3 bucket name from the environment variable
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

export const handler = async (event) => {
  try {
    const artifactId = event.pathParameters.hash;
    const teamIdentifier =
      event.queryStringParameters.slug ?? event.queryStringParameters.team ?? event.queryStringParameters.teamId;

    if (!teamIdentifier) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "querystring should have required property 'team', 'slug', or 'teamId'" }),
      };
    }

    // Create an S3 client using the AWS SDK
    const s3 = new AWS.S3();

    // Check if the artifact exists in the S3 bucket
    await s3
      .headObject({
        Bucket: S3_BUCKET_NAME,
        Key: `${teamIdentifier}/${artifactId}`,
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    };
  } catch (err) {
    console.error(err);
    if (err.name === "NotFound") {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Artifact not found" }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    }
  }
};
