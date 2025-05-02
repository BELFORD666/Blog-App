import config from "../config/config";
import { Client, Storage,ID } from "appwrite";

class BucketService{

    client = new Client()
        .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.appwriteProjectId); // Your project ID
    
  storage = new Storage(this.client);
  async createFile(file){
    try {
        
        return  await this.storage.createFile(
            config.appwriteBucketId, // bucketId
            ID.unique()// fileId
            ,
            file
          
        );
    } catch (error) {
        console.log("errror occured in createFile()",error)
    }
  }
  async getFile(fileId){
    try {
        
        return await this.storage.getFile(
             config.appwriteBucketId, // bucketId
             fileId // fileId
         );
    } catch (error) {
        console.log("errror occured in getFile()",error)
    }
    

  }
  async deleteFile(fileId){
    try {
        
     
        await this.storage.deleteFile(
          config.appwriteBucketId, // bucketId
           fileId // fileId
       );
       return true
    } catch (error) {
        console.log("errror occured in deleteFile()",error)
        return false
    }
  }
  getPreview(fileId) {
    try {
      const url = this.storage.getFileView(config.appwriteBucketId, fileId);
     
      return url;
    } catch (error) {
      console.error("Error in getPreview:", error);
      return '';
    }
  }
  
  
}
const bucketService = new BucketService()
export default bucketService