package net.emof.building.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.util.DataMap;
import net.emof.building.web.service.Msg_web_Serivice;


/**
 * 移动端消息
 * @author baikun
 * @creation 2017年12月25日
 */
@Controller
@RequestMapping("msg_web")
public class Msg_web_Controller {

	@Autowired
	private Msg_web_Serivice srv;

	
	
 	/**
	 * 消息列表
	 * 
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param token
	 * @param page
	 * @param display
	 * @return
	 */
	@ResponseBody
	@RequestMapping("")
	public Map<String, Object> getList(String token, @RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "display", required = false) Integer display) {
		try {
			return srv.pageList(EhSessicon.getTokenInfo(token), page, display).data;
		} catch (EhCacheSessiconException e) {

			return new DataMap(null, 5, "登陆超时请重新登陆").data;
		}
	}

	
	
	
	/**
	 * 修改消息状态
	 * 
	 * @author baikun
	 * @creation 2017年12月22日
	 * @param bname
	 * @param introd
	 * @param imgs
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("update_islook")
	public Map<String, Object> update_islook(
			@RequestParam(value = "id", required = false) String id) {
		try {
			return srv.update_islook(id).data;
		} catch (Exception e) {
			return new DataMap(null, 5, "登陆超时请重新登陆").data;
		}

	}
	
	/**
	 * 删除
	 * @author wkx 
	 * @param id
	 * @param response
	 * @return
	 * @throws DeleteAdmException
	 */
	@ResponseBody
	@RequestMapping("/delete_info")
	public Map<String, Object> delete_info(String id,String ids, HttpServletResponse response, HttpServletRequest request)
			throws DeleteAdmException {
		Map<String, Object> map = new HashMap<String, Object>();
		int code= srv.delete_Msg(ids,id);
		if(code==1) {
			map.put("code", ""+code);
			map.put("msg", "删除成功");
		}else {
			map.put("code", ""+code);
			map.put("msg", "未删除成功");
		}
		return map;
	}
	
	/**
	 * 获取详情页
	 * @author wkx 
	 * @param id
	 * @param response
	 * @return
	 * @throws DeleteAdmException
	 */
	@ResponseBody
	@RequestMapping("/get_info")
	public Map<String, Object> get_info(String id, HttpServletResponse response, HttpServletRequest request)
			throws DeleteAdmException {
		Map<String, Object> map = new HashMap<String, Object>();
		DataMap datamap = srv.get_info(id);
		return datamap.data;
	}

}
