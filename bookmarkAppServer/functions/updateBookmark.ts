import * as AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();

type Params = {
    TableName: string,
    Key: {},
    ExpressionAttributeNames: any,
    ExpressionAttributeValues: any,
    UpdateExpression: string,
    ReturnValues: string
}

export const updateBookmark = async (editedBookmark: any) => {
    try {

        // const editedBookmark = {
        //     id: bookmark.id,
        //     title: bookmark.title,
        //     url: bookmark.url
        // }

        const params : Params = {
            TableName: process.env.TABLE_NAME || "bookmarkTable",
            Key: {
                id: editedBookmark.id,
            },
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
            UpdateExpression: "",
            ReturnValues: "UPDATED_NEW"
        }

        const attributes = Object.keys(editedBookmark);
        let prefix = "set "
        for (let i = 0; i < attributes.length; i++)
        {
            let attribute = attributes[i];
            if (attribute !== "id")
            {
                params["UpdateExpression"] += prefix + `#${attribute} = :${attribute}`
                params["ExpressionAttributeNames"][`#${attribute}`] = attribute
                params["ExpressionAttributeValues"][`:${attribute}`] = editedBookmark[attribute]
                prefix=", "
            }
        }

        await documentClient.update(params).promise()
        return editedBookmark
    } catch (err) {
        console.log(err);
        return null;
    }
} 