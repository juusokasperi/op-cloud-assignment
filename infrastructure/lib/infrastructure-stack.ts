import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. FRONTEND: S3 Bucket for Static Website Hosting (PRIVATE)
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 2. FRONTEND: CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // 3. BACKEND: Lambda Function from Docker Image
    const backendFunction = new lambda.DockerImageFunction(this, 'BackendFunction', {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, '../../backend'),
        { platform: ecr_assets.Platform.LINUX_AMD64 },
      ),
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      architecture: lambda.Architecture.X86_64,
      environment: {
        PORT: '8080',
        FRONTEND_URL: `https://${distribution.distributionDomainName}`,
      },
    });

    // 4. BACKEND: API Gateway pointing to Lambda
    const api = new apigw.LambdaRestApi(this, 'BackendApi', {
      handler: backendFunction,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS, // Adjust
        allowMethods: apigw.Cors.ALL_METHODS, // Adjust
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      }
    });


    // 5. FRONTEND: Deploy React Build Output to S3
    const reactAppBuildPath = path.join(__dirname, '../../frontend/build');
    const reactDeployment = new s3deploy.BucketDeployment(this, 'DeployReactApp', {
      sources: [
        s3deploy.Source.asset(reactAppBuildPath),
      ],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
    });

    // 6. FRONTEND: Deploy config.json with API URL to S3
    const configDeployment = new s3deploy.BucketDeployment(this, 'DeployAppConfig', {
      sources: [
        s3deploy.Source.data(
          'config.json',
          JSON.stringify({
            apiUrl: api.url,
          })
        ),
      ],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/config.json'],
      prune: false,
    })

    configDeployment.node.addDependency(reactDeployment);

    // 7. OUTPUTS: Print Frontend URL and Backend API URL
    new cdk.CfnOutput(this, 'FrontendURL', {
      value: `https://${distribution.distributionDomainName}`,
    });

    new cdk.CfnOutput(this, 'BackendApiUrl', {
      value: api.url,
    });
  }
};
