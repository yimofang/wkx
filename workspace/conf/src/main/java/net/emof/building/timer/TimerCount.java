package net.emof.building.timer;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;

import net.emof.building.model.Confs;
import net.emof.building.model.Wechat;
import net.emof.building.util.ToolsUtil;
import net.emof.building.web.service.Confs_web_Service;
import net.emof.building.web.service.WechatService;
import net.emof.building.web.wechat.WechatSendRequest;


/**
 * @Description: TODO
 * @author 作者: 习龙飞
 * @date 创建时间：2016年9月12日 上午10:16:10
 */
@Component
public class TimerCount {
	/**
	 * 日志
	 */
	private final Logger logger = Logger.getLogger(TimerCount.class);

	@Autowired
	private Confs_web_Service confsService;
//	@Autowired
//	private WechatService wechatService;
	
	
	
	@Bean
    public TaskScheduler scheduledExecutorService() {
     ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler(); 
     scheduler.setPoolSize(8); 
     scheduler.setThreadNamePrefix("scheduled-thread-"); 
     return scheduler; 
     }
	
	
	/**
	 * 删除前一天未发布的会议
	 * @author xilongfei
	 * @creation 2017年12月26日
	 * @return
	 */
	@Scheduled(cron = "0 0 17 * * ?")
	public void deleteBespeak() {
		logger.info("--------进入定时删除未发布的会议--------");
		String date = ToolsUtil.getDayAfter(new Date(), 1);
		List<Confs> confs = confsService.selectNoRlsConfs(date); //查询未发布的会议
		if(!confs.isEmpty()) {
			int num = confsService.deleteNoRlsConfs(confs);
			logger.info("--------已结束定时删除待支付订单----状态:--" + num + "--");
		}
	}
	
	

	/**
	 * 获取微信全局token,api_ticket 
	 * @author wkx
	 * @creation 2018年7月23日
	 * fixedRate = 1000 * 60 * 60
	 */
	@Scheduled(fixedRate = 1000 * 60 * 60 * 2)
	public void getWechatToken() {
		// 获取token
		logger.error("--------进入获取token--------");
		
String url="http://weihuiyi.zcgljg.com/wechat_web/setTicket.do";
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
		 logger.error("---------demoJson---------"+demoJson.toString());
		
	}
	
	
	
	
	/**
	 * 获取微信全局token,api_ticket 
	 * @author xilongfei
	 * @creation 2017年12月7日
	 */
	/*@Scheduled(fixedRate = 1000 * 60 * 60)
	public void getWechatToken() {
		// 获取token
		logger.error("--------进入获取token--------");
		Wechat wechat = wechatService.getWechatInfo();
		if(wechat == null){
			logger.error("--------未找到微信配置信息--------");
			return;
		}
		JSONObject json = WechatSendRequest.getReturmParam( 
				WechatSendRequest.getTokenUrl(wechat.getAppid().trim(), wechat.getAppSecret().trim()));
		if(json == null || json.getString("access_token").equals("")) {
			logger.error("返回微信信息josn----------------"+json);
			return;
		}
		String token = json.getString("access_token"); 
		System.out.println("-----------------------token值：--------" + token);
		logger.error("-----------------------token值：--------" + token);
		
		JSONObject ApiTicket = WechatSendRequest.getReturmParam( 
				WechatSendRequest.getApiTicket(token));
		if(json == null || json.getString("ticket").equals("")) {
			logger.error("返回微信ApiTicket信息josn----------------"+json);
			return;
		}
		String ticket = ApiTicket.getString("ticket"); 
		wechat.setAccesstoken(token);
		wechat.setTicket(ticket);
		int num = wechatService.updateWechatInfo(wechat);
		System.out.println("-------------------结束----更换状态：--------" + num);
	}
	*/
	
}