package net.emof.building.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.emof.building.util.SystemUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 硬件操作类
 * @author baikun
 * @creation 2017年12月14日
 */
@Controller
@RequestMapping()
public class Hardware_web_Controller {

	
	/**
	 * 获取设备mac地址
	 * @author baikun
	 * @creation 2017年12月14日
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getMac_web")
	public void getMac(HttpServletRequest request, HttpServletResponse response) throws IOException {

		 System.out.println(SystemUtils.getIpAddr(request));
         System.out.println(SystemUtils.getMacAddress(SystemUtils.getIpAddr(request)));
	}

	 

}
