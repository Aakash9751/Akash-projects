import os
import boto3
from botocore.exceptions import ClientError

def upload_file_to_s3(file_path, bucket_name):
    """
    Uploads a file to an AWS S3 bucket.
    """
    print(f"Attempting to upload {file_path} to {bucket_name}...")
    
    # BUG: Hardcoded, expired, or invalid AWS credentials! 
    # This will always throw a credentials error in production.
    # It should ideally use os.getenv("AWS_ACCESS_KEY_ID") instead of hardcoding.
    s3_client = boto3.client(
        's3',
        aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
        aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
        region_name='us-east-1'
    )
    
    try:
        # BUG: The credentials will fail here.
        s3_client.upload_file(file_path, bucket_name, os.path.basename(file_path))
        print("Upload successful!")
        return True
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'InvalidAccessKeyId':
            raise Exception("Credentials Error: The AWS Access Key Id you provided does not exist in our records.")
        elif error_code == 'SignatureDoesNotMatch':
            raise Exception("Credentials Error: The request signature we calculated does not match the signature you provided.")
        else:
            raise Exception(f"Failed to upload to S3: {str(e)}")
    except Exception as e:
        raise Exception(f"Unknown error during upload: {str(e)}")

def fetch_s3_config():
    # Another bug: reading from a missing config file
    if not os.path.exists("aws_config.json"):
        raise ValueError("Credentials Error: aws_config.json is missing! Cannot authenticate with AWS.")
    return True
