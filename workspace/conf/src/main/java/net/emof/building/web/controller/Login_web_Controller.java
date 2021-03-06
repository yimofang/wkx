package net.emof.building.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.util.DataMap;
import net.emof.building.util.DesEncryption;
import net.emof.building.util.ToolsUtil;
import net.emof.building.web.service.Login_web_Service;

@Controller
@RequestMapping("/login_web")
public class Login_web_Controller {

	@Autowired
	private Login_web_Service loginWebService;

	/**
	 * 跳转组织者登录页面
	 * 
	 * @author xilongfei
	 * @creation 2017年11月10日
	 * @return
	 */
	/*
	 * @RequestMapping("") public String login(){ return "/web/login/login"; }
	 */

	/**
	 * 组织者登录-验证
	 * 
	 * @author baikun
	 * @creation 2017年11月10日
	 * @param name
	 *            账号
	 * @param pass
	 *            密码
	 * @return 用户信息
	 * @throws EhCacheSessiconException
	 */
	@ResponseBody
	@RequestMapping("")
	public Map<String, Object> verifyID(@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "pass", required = false) String pass) throws EhCacheSessiconException {
		DataMap dataMap = new DataMap();

		if (name == null || name.trim().equals("") || name.trim().length() < 1) {
			dataMap.addMsg_diy_obj(null, 6, "请填写正确账号");
			return dataMap.data;
		}
		if (pass == null || pass.trim().equals("") || pass.trim().length() < 1) {
			dataMap.addMsg_diy_obj(null, 6, "请填写正确密码");
			return dataMap.data;
		}
		if (!ToolsUtil.isValid(name)) {
			return dataMap.data;
		}
		if (!ToolsUtil.isValid(pass)) {
			return dataMap.data;
		}
		dataMap = loginWebService.verifyID(name, pass);
		return dataMap.data;
	}

	
	/**
	 * des加密 
	 * @author baikun
	 * @creation 2018年1月2日
	 * @param url
	 * @return
	 */
	@ResponseBody
	@RequestMapping("http")
	public Map<String, Object> deshttp(String url) {
		DataMap dataMap = new DataMap();

		String urlstr = url;
		DesEncryption desEncryption = null;
		try {
			desEncryption = new DesEncryption();
			System.out.println(desEncryption.encrypt(url));
			dataMap.addMsg_obj(desEncryption.encrypt(url), 0);
		} catch (Exception e) {
			dataMap.addMsg_diy_obj(url, 1, "格式不正确");
			return dataMap.data;
		}

		System.out.println(urlstr);

		return dataMap.data;
	}
	
	/**
	 * 修改密码
	 * @author xilongfei
	 * @creation 2018年1月15日
	 * @param token		识别标识
	 * @param pass		旧密码
	 * @param newpass   新密码
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/changePass")
	public Map<String, Object> changePass(@RequestParam(value = "token", required = false) String token,
	@RequestParam(value = "pass", required = false) String pass,
	@RequestParam(value = "newpass", required = false) String newpass) {
		DataMap dataMap = new DataMap();
		try {
			dataMap = loginWebService.updatePass(token, pass, newpass);
		} catch (EhCacheSessiconException e) {
		   dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
		   return dataMap.data;
		}
		return dataMap.data;
	}
	
	

}
