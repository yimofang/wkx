package net.emof.building.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.util.DataMap;
import net.emof.building.web.service.ConfsTrailer_web_Service;

@Controller
@RequestMapping("/trailer_web")
public class ConfsTrailer_web_Controller {
	
	@Autowired
	private ConfsTrailer_web_Service trailerService;
	
	
	/**
	 * 添加会议-下期预告
	 * @author xilongfei
	 * @creation 2017年12月29日
	 * @param confid	会议ID
	 * @param token		登陆者识别标识
	 * @param introd	预告信息
	 * @param imgs		预告配图
	 * @return
	 * @throws EhCacheSessiconException
	 */
	@ResponseBody
	@RequestMapping("/addAdvance")
	public Map<String, Object> addAdvance(@RequestParam(value = "confid", required = false) String confid,
			@RequestParam(value = "imgs", required = false) String imgs,
			@RequestParam(value = "introd", required = false) String introd,
			@RequestParam(value = "token", required = false) String token) {
		DataMap dataMap = new DataMap();
		try {
			dataMap = trailerService.insertTrailerInfo(confid, token, introd, imgs);
		} catch (EhCacheSessiconException e) {
			e.printStackTrace();
			dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
			return dataMap.data;
		}
		return dataMap.data;
	}
	
	/**
	 * 查询会议-下期预告
	 * @author xilongfei
	 * @creation 2017年12月29日
	 * @param confid	会议ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getAdvance")
	public Map<String, Object> getAdvance(@RequestParam(value = "confid", required = false) String confid) {
		DataMap dataMap = trailerService.selectTrailer(confid);
		return dataMap.data;
	}
	
	
	
	
}
