# Web App TODO List

## Today's TODO

- [x] Create FileUploader Component
- [x] Display image preview
- [x] Restrict file types to images
- [x] Restrict file size to XXX MB
- [x] Placeholder to generate presigned URL and upload image to s3

## Deployment

- [x] Create Next.js application
- [x] Set up GitHub repository
- [x] Integrate GitHub with Vercel
- [x] Test that the URL is accessible
- [x] Test continuous deployment

## File Uploads

- [x] Create FileUploader Component
- [ ] Create API to generate presigned URL for uploading images
- [ ] Generate unique object key for each file upload
- [ ] Update FileUploader component to use presigned URL to upload image to S3

## Backend and Infrastructure

- [X] Create AWS Account
- [X] Set up IaaC package
- [X] Create S3 bucket for user uploads
- [X] Set up Next.js and S3/AWS integration

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
