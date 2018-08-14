package net.emof.building.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.web.service.Media_web_Service;
 
@Controller
@RequestMapping("media_web")
public class Media_web_Controller {
	
	
	@Autowired
	private Media_web_Service srv;
	
	
	/**
	 * 返回媒体列表
	 * @author baikun
	 * @creation 2017年12月19日
	 * @return
	 */
	@ResponseBody
	@RequestMapping("")
	public Map<String,Object> getlist(){
		return srv.getlist();
	}

}
