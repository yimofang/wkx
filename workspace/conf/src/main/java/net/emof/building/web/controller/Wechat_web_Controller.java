package net.emof.building.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.dao.WechatMapper;
import net.emof.building.model.Wechat;
import net.emof.building.util.DataMap;
import net.emof.building.web.service.ConfsTrailer_web_Service;
import net.emof.building.web.service.WechatService;

@Controller
@RequestMapping("/wechat_web")
public class Wechat_web_Controller {
	
//	@Autowired
//	private ConfsTrailer_web_Service trailerService;
	@Autowired
	private WechatService wechatService;
	
	/**
	 * 获取微信信息
	 * @author wkx
	 * @creation 2018年7月11日
	 * @param token		登陆者识别标识
	 * @param url	url
	 * @return
	 * @throws EhCacheSessiconException
	 */
	@ResponseBody
	@RequestMapping("/getWechatSign")
	public Map<String, Object> getWechatSign(@RequestParam(value = "token", required = false) String token,
			@RequestParam(value = "url", required = false) String url) {
		DataMap dataMap = new DataMap();
		dataMap=wechatService.getWechatSign(url);
		return dataMap.data;
	}
	
	/**
	 * 获取微信全局ID
	 * @author wkx
	 * @creation 2018年7月11日
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/setTicket")
	public Map<String, Object> setTicket() {
		DataMap dataMap = new DataMap();
		
		String ifor = wechatService.updateWechatInfo();

		if(!ifor.equals("")) {
			dataMap.addMsg_diy_obj(ifor, 0, "存储成功！");
		}else {
			dataMap.addMsg_diy_obj(null, 6, "未存储成功！");
		}
		return dataMap.data;
	}
	
	
	
	
}
