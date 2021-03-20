import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as cognito from '@aws-cdk/aws-cognito';

export class BookmarkAppServerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const userPool = new cognito.UserPool(this, "BookmarkAppUserPool", {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      userVerification: {
        emailSubject: "Verify your identity on your Bookmark App",
        emailBody: "Hello {username}, welcome to your bookmark app. Use this {####} code to register",
        emailStyle: cognito.VerificationEmailStyle.CODE
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true
        },
        phoneNumber: {
          required: true,
          mutable: true
        }
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY
    })

    const userPoolClient = new cognito.UserPoolClient(this, "BookmarkClient", {
      userPool
    })


    const api = new appsync.GraphqlApi(this, 'BookmarkGraphQlApi', {
      name: 'BookmarkGraphQlApi',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      }
    });

    const bookmarkLambdaFunction = new lambda.Function(this, "BookmarkLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("functions"),
      handler: "main.handler",
      timeout: cdk.Duration.seconds(10)
    })

    const bookmarkTable = new ddb.Table(this, "BookmarkTable", {
      tableName: "bookmarkTable",
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING
      }
    })
    bookmarkTable.grantFullAccess(bookmarkLambdaFunction)
    bookmarkLambdaFunction.addEnvironment("TABLE_NAME", bookmarkTable.tableName)

    const bookmarkLambdaDataSource = api.addLambdaDataSource("bookmarkLambdaDataSource", bookmarkLambdaFunction)

    bookmarkLambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: "getBookmark",
    })

    bookmarkLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addBookmark",
    })

    bookmarkLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateBookmark",
    })

    bookmarkLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteBookmark",
    })

    new cdk.CfnOutput(this, "GraphqlUrl", {
      value: api.graphqlUrl
    })

    new cdk.CfnOutput(this, "graphqlApiKey", {
      value: api.apiKey!
    })

    new cdk.CfnOutput(this, "userPoolId", {
      value: userPool.userPoolId
    })

    new cdk.CfnOutput(this, "userPoolClientId", {
      value: userPoolClient.userPoolClientId
    })
  }
}
