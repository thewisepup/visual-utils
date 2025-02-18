# Web App TODO List

## Today's TODO


## Deployment

- [x] Create Next.js application
- [x] Set up GitHub repository
- [x] Integrate GitHub with Vercel
- [x] Test that the URL is accessible
- [x] Test continuous deployment

## File Uploads

- [x] Create FileUploader Component
- [X] Create API to generate presigned URL for uploading images
- [X] Generate unique object key for each file upload
- [X] Update FileUploader component to use presigned URL to upload image to S3

## Backend and Infrastructure

- [X] Create AWS Account
- [X] Set up IaaC package
- [X] Create S3 bucket for user uploads
- [X] Set up Next.js and S3/AWS integration

## Image Processing

- [X] Create Hello World Lambda
- [X] Create S3 Trigger to invoke Lambda
- [X] Create S3 bucket for processed images
- [X] Test uploading a mock image to the processed images S3 bucket
- [X] Implement RGB splitting functionality

## Polling and Status Updates

- [ ] Create API to poll the status of image processing
- [ ] Implement in-progress indicator while the image is processing

## Download Processed Image

- [ ] Create API to download image from the processed S3 bucket
- [ ] Display processed image to user
- [ ] Enable user to download processed image
