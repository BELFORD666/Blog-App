import config from "../config/config";
import { Client, Account ,ID} from "appwrite";
class AuthService{

    client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(config.appwriteProjectId); // Your project ID
    
    account = new Account(this.client);
     async createAccount({email,password}){
        const promise =  await this.account.create(ID.unique(), email, password);

        try{

           return  await this.login({email,password})
        }
        catch (error){
            throw error
        }
       
    }
    async login({email,password}){
        try{
            console.log("Logging in...");
            const session = await this.account.createEmailPasswordSession(email, password);
             console.log("Session created:", session);
             const jwtResponse = await this.account.createJWT();
             console.log("JWT created:", jwtResponse);
             console.log(jwtResponse);
            //  await this.account.deleteSession("current");
            //  console.log("Session deleted");
             this.client.setJWT(jwtResponse.jwt);
             return jwtResponse;
        }

        catch (error) {
            throw error
          }
    }
    async getUser(){
          try {
              const result = await this.account.get();
            if(result){
                return result
            }
          } catch (error) {
            throw error
          }
    }
    async logout(){
        try {
            const result = await this.account.deleteSessions();
          if(result){
              return result
          }
        } catch (error) {
          throw error
        }
    }

    
 
   
    
}

const authservice = new AuthService();
export default authservice