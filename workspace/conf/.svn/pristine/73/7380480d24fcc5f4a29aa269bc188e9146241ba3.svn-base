package net.emof.building.web.wechat;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Random;

import org.apache.log4j.Logger;
import org.json.JSONObject;


/**
 * 微信接口调用时配置
 * @author Administrator
 *
 */
public class WechatSendRequest {
	//日志
	private static final Logger logger = Logger.getLogger(WechatSendRequest.class);
	
	
	/**
	 * 返回全局token url
	 * @author xilongfei
	 * @creation 2018年1月23日
	 * @param appid		
	 * @param secret
	 * @return
	 */
	public static String getTokenUrl(String appid, String secret){
		return "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+secret;
	}
	
	/**
	 * 返回api_ticket url
	 * @authour xilongfei
	 * @param token  全局token
	 * @return
	 */
	public static String getApiTicket(String token){
		return "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+token+"&type=jsapi";
	}
	
	/**
	 * 返回字典排序后签名字符串
	 * @param ticket	微信js_API使用
	 * @param noncestr  随机字符串
	 * @param timestamp 时间戳
	 * @param url		当前访问页面
	 * @return
	 */
	public static String getSignstr(String ticket, String noncestr, String timestamp, String url){
		StringBuffer buffer = new StringBuffer("jsapi_ticket=").append(ticket).append("&noncestr=").
		append(noncestr).append("&timestamp=").append(timestamp).
		append("&url=").append(url);
		System.out.println("buffer.toString()="+buffer.toString());
		return buffer.toString();
	}
	
	/**
	 * http请求后获取json数据 
	 * @authour 潘建磊
	 * @param url 请求的地址
	 * @return
	 * @see 潘建磊2016年11月25日 上午11:54:21 创建
	 */
	public static JSONObject getReturmParam(String url){
		JSONObject demoJson = null;
		try {
			 logger.info("请求微信url："+url);
			 URL getUrl=new URL(url);
			 HttpURLConnection http=(HttpURLConnection)getUrl.openConnection();
			 http.setRequestMethod("GET"); 
			 http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			 http.setDoOutput(true);
			 http.setDoInput(true);
			 http.connect();
			 InputStream is = http.getInputStream(); 
			 int size = is.available(); 
			 byte[] b = new byte[size];
			 is.read(b);
			 String message = new String(b, "UTF-8");
			 System.out.println("------------------------------------微信请求结果："+message+"--------------------------------------");
			 demoJson = new JSONObject(message);
			 logger.info("微信回调结果转json："+demoJson);
		 } catch (MalformedURLException e) {
			 e.printStackTrace();
			 logger.error(e.getMessage());
		 } catch (IOException e) {
			 e.printStackTrace();
			 logger.error("---------2"+e.getMessage());
		 }
		 return demoJson;
	} 
	
	
	/**
	 * 获取随机字符串
	 * @param length 字符长度(微信一般为  24)
	 * @return
	 */
	public static String getNoncestr(int length) {  
        String base = "abcdefghijklmnopqrstuvwxyz0123456789";  
        Random random = new Random();  
        StringBuffer sb = new StringBuffer();  
        for (int i = 0; i < length; i++) {  
            int number = random.nextInt(base.length());  
            sb.append(base.charAt(number));  
        }  
        return sb.toString();  
    }
    
    /**
     * 时间截
     * @return
     */
  	public static String getTimeStamp() {
  		return String.valueOf(System.currentTimeMillis() / 1000);//System.currentTimeMillis() / 1000
  	}
	
}
