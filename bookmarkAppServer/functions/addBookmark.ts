import * as AWS from 'aws-sdk';
import { randomBytes } from "crypto";
const documentClient = new AWS.DynamoDB.DocumentClient();

export const addBookmark = async (bookmark: Bookmark) => {
    try {

        const addBookmark = {
            id: randomBytes(32).toString("hex"),
            title: bookmark.title,
            url: bookmark.url,
            user: bookmark.user
        }

        const params = {
            TableName: process.env.TABLE_NAME || "bookmarkTable",
            Item: addBookmark
        }

        await documentClient.put(params).promise()
        return addBookmark
    } catch (err) {
        console.log(err);
        return null;
    }
} 