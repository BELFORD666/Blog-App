import config from "../config/config";
import { Client, Databases ,Query} from "appwrite";

class DatabaseService {
    client = new Client()
        .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.appwriteProjectId); // Your project ID
    
     databases = new Databases(this.client);
    async getPost(slug){
        try {
            
            return await this.databases.getDocument(
                 config.appwriteDatabaseId, // databaseId
                 config.appwriteCollectionId, // collectionId
                 slug, // documentId
                 
             );
        } catch (error) {
            console.log("error of getPost",error)
        }
        
    }
    async getPosts(){
        try {
            
           return await this.databases.listDocuments(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                
            );
        } catch (error) {
            console.log("error of getPosts",error)
        } 
    }
    async createPost({title,slug,content,featuredImage,userid}){
        try {
            
            return await this.databases.createDocument(
               config.appwriteDatabaseId, // databaseId
               config.appwriteCollectionId, // collectionId
               slug, // documentId
               {
                title,
                content,
                featuredImage,
                userid,
                slug
               }, // data
               
           );
        } catch (error) {
            console.log("error of createPost",error)
        }
    }
    async updatePost(id, {title, content, featuredImage, status,slug}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id,
                {
                    title, content, featuredImage, status,slug
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateDocument() :: ", error);
            return false
        }
    }

    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug // documentId
            );
            return true;
        } catch (error) {
            console.log("error of DeletePost",error)
        }
    }
}
const databaseService = new DatabaseService()
export default databaseService