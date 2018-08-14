package net.emof.building.util.mongodb;

import org.bson.Document;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoDBParam 
 {
	private static MongoClient mongoClient;
	private static MongoDatabase mongodb =null;
	public static void readConnectParam(String ADBEnv){};

	
	public boolean initConnect()
	{
	/*	TGetConfig  dc = TGetConfig.getInstance();
		String sURL = dc.getProperties("mongo.url").trim();
		String sPort = dc.getProperties("mongo.port").trim();
		String sUser = dc.getProperties("mongo.user").trim();
		String sPassword = dc.getProperties("mongo.password").trim();
		String sMaxConnectins = dc.getProperties("mongo.maxconnection").trim();
		String sMinConnectins = dc.getProperties("mongo.minconnection").trim();
		String sDataBaseName = dc.getProperties("mongo.dbname").trim();
		*/
		String sURL ="127.0.0.1";//192.168.1.220
		String sPort ="27017";
		String sDataBaseName ="conf";
		String sMaxConnectins="5";
		String sMinConnectins="1";

		int iMinConnections=2,iMaxConnections=5;
        if (sMaxConnectins==null) sMaxConnectins="";
        if (sMinConnectins==null) sMinConnectins="";
        if(sMaxConnectins.length()>0)
        {
        	try
        	{
        		iMaxConnections = Integer.parseInt(sMaxConnectins);
             } catch (Exception e) {

           }
        	
                   			
        }

        if(sMinConnectins.length()>0)
        {
        	try
        	{
        		iMinConnections = Integer.parseInt(sMinConnectins);
             } catch (Exception e) {

           }
        	
                   			
        }
        MongoClientOptions.Builder  builder  =	new MongoClientOptions.Builder();
		builder.minConnectionsPerHost(iMinConnections);
		builder.connectionsPerHost(iMaxConnections);
		
	    mongoClient= new MongoClient(new ServerAddress(sURL,Integer.parseInt(sPort)),builder.build());
	    if(mongoClient==null) return false;
	    mongodb= mongoClient.getDatabase(sDataBaseName);
	    if(mongodb==null) return false;
	    return true;
	}
	
	public 	MongoCollection<Document> getCollection(String ACollName) {
 	   if (mongodb==null) 
	   if(!initConnect()) return null;;
       return mongodb.getCollection(ACollName);
       
	}
 
	  public void closeMongoClient() {  
          if (mongoClient != null) {  
              mongoClient.close();  
              mongodb=null;
          }  
          System.out.println("CloseMongoClient successfully");  

      }  
	
 }
