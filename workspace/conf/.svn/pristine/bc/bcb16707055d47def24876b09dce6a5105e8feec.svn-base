package net.emof.building.web.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import net.emof.building.web.service.Subuser_web_Service;

@Controller
@RequestMapping("")
public class Subuser_web_Controller {

	@Autowired
	private Subuser_web_Service srv;

	/**
	 * 添加用户
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param realname
	 * @param phone
	 * @param pass
	 * @return
	 */
	@ResponseBody
	@RequestMapping("addsub_web")
	public Map<String, Object> addSubuser(@RequestParam(value = "realname", required = false) String realname,
			@RequestParam(value = "phone", required = false) String phone,
			@RequestParam(value = "pass", required = false) String pass) {
		return srv.add_info(realname, phone, pass).data;
	}

	/**
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param phone
	 * @param pass
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getsub_web")
	public Map<String, Object> getSubuser(@RequestParam("phone") String phone, @RequestParam("pass") String pass) {
		return srv.phone_pass_getinfo(phone,pass).data;
	}

}
