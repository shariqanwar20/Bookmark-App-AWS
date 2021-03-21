import * as AWS from 'aws-sdk';
const documentClient = new AWS.DynamoDB.DocumentClient();

export const getBookmarks = async (user: string) => {
    try {
        const params = {
            TableName: process.env.TABLE_NAME || "bookmarkTable",
            FilterExpression: "#user = :user",
            ExpressionAttributeNames: {
                "#user": "user",
            },
            ExpressionAttributeValues: { 
                ":user": `${user}` 
            }
        }
        const data = await documentClient.scan(params).promise()
        return data.Items;
    } catch (err) {
        console.log(err);
        return null;
    }
} 