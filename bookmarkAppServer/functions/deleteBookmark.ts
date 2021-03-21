import * as AWS from 'aws-sdk';
const documentClient = new AWS.DynamoDB.DocumentClient();

export const deleteBookmark = async (bookmarkId: string) => {
    try {
        const params = {
            TableName: process.env.TABLE_NAME || "bookmarkTable",
            Key: {
                id: bookmarkId
            }
        }
        await documentClient.delete(params).promise()
        return bookmarkId;
    } catch (err) {
        console.log(err);
        return null;
    }
} 