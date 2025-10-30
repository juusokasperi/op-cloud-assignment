import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Infrastructure from '../lib/infrastructure-stack';
import { ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';

describe('InfrastructureStack Tests', () => {
	let template: Template;

	beforeAll(() => {
		const app = new cdk.App();
		const stack = new Infrastructure.InfrastructureStack(app, 'TestStack');
		template = Template.fromStack(stack);
	});

	test('CloudFormation template matches snapshot', () => {
		expect(template.toJSON()).toMatchSnapshot();
	});

	test('Backend Lambda correct environment variables', () => {
		template.hasResourceProperties('AWS::Lambda::Function', {
			Environment: {
				Variables: {
					PORT: '8080',
					FRONTEND_URL: Match.anyValue(),
				}
			},
			MemorySize: 128,
			Timeout: 10,
			Architectures: ['x86_64'],
			PackageType: 'Image',
		});
	});

	test('S3 Bucket proxy integration', () => {
		template.hasResource('AWS::ApiGateway::Resource', {
			Properties: {
				PathPart: '{proxy+}'
			}
		});
	});

	test('CloudFront points to S3 Origin with OAC', () => {
		template.hasResourceProperties('AWS::CloudFront::Distribution', {
			DistributionConfig: {
				Origins: Match.arrayWith([
					Match.objectLike({
						S3OriginConfig: {},
						OriginAccessControlId: Match.anyValue()
					})
				]),
				DefaultCacheBehavior: Match.objectLike({
					ViewerProtocolPolicy: 'redirect-to-https'
				}),
				DefaultRootObject: 'index.html',
				CustomErrorResponses: Match.arrayWith([
					Match.objectLike({ ErrorCode: 404, ResponseCode: 200, ResponsePagePath: '/index.html' }),
					Match.objectLike({ ErrorCode: 403, ResponseCode: 200, ResponsePagePath: '/index.html' })
				])
			}
		});
	});
});
