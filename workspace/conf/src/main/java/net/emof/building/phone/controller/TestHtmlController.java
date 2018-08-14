package net.emof.building.phone.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.phone.service.TestService;

@Controller
@RequestMapping("")
public class TestHtmlController {
	
	@Autowired
	private TestService srv;
	
	
	@ResponseBody
	@RequestMapping("testhtml/testlist")
	public List<Map<String, Object>> testlist(){
		return srv.getlist();
	}
	
	
	@ResponseBody
	@RequestMapping("testeh")
	public void testeh() throws EhCacheSessiconException{
	 srv.testeh();
	}
	
	
	@ResponseBody
	@RequestMapping("testeh2")
	public void testeh2() throws EhCacheSessiconException{
	 srv.testeh2();
	}
	
	
	

}
