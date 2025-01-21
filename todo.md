# Web App TODO List


## Deployment
- [X] Create Next.js application
- [X] Set up GitHub repository
- [X] Integrate GitHub with Vercel
- [X] Test that the URL is accessible
- [X] Test continuous deployment

## File Uploads
- [ ] Create FileUploader Component
- [ ] Restrict file types to images
- [ ] Restrict file size to XXX MB
- [ ] Placeholder to generate presigned URL and upload image to s3

## Backend and Infrastructure
- [ ] Create AWS Account
- [ ] Set up IaaC package
- [ ] Create S3 bucket for user uploads
- [ ] Set up Next.js and S3/AWS integration
- [ ] Create API to generate presigned URL for uploading images
- [ ] Generate unique object key for each file upload
- [ ] Update FileUploader component to use presigned URL to upload image to S3

## Image Processing
- [ ] Create Hello World Lambda
- [ ] Create S3 Trigger to invoke Lambda
- [ ] Create S3 bucket for processed images
- [ ] Test uploading a mock image to the processed images S3 bucket
- [ ] Implement RGB splitting functionality

## Polling and Status Updates
- [ ] Create API to poll the status of image processing
- [ ] Implement in-progress indicator while the image is processing

## Download Processed Image
- [ ] Create API to download image from the processed S3 bucket
- [ ] Display processed image to user
- [ ] Enable user to download processed image
