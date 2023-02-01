import { Storage } from 'aws-amplify'


export const getPublicImageURL = (key) => `https://healthstaticbucket210034-dev.s3.ap-south-1.amazonaws.com/public/${key}`; 