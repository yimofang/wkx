package net.emof.building.admin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import net.emof.building.admin.service.LoginUsersService;
import net.emof.building.model.Users;

@Controller
@RequestMapping("")
public class AdminIndexController {

	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	@Autowired
	private LoginUsersService aduser;

	@RequestMapping("/adminindex")
	public String adminindex(HttpServletResponse response, Model model, HttpServletRequest request) throws Exception {

		try {
			if (sessicon_get_info(request) == null) {
				return "redirect:/.do";
			}
		} catch (Exception e) {
			logger.error("【sessicon方法异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber()+"【异常报告】"+e.getMessage());
			return "redirect:/.do";
		}
		model.addAttribute("menulist",
				aduser.index_menu(((Users) SecurityUtils.getSubject().getPrincipal()).getPowerid()));

		return "/hframe/index";
	}

	@RequestMapping("*")
	public String indexx() throws Exception {
		return "/index";
	}

	@RequestMapping("/index")
	public String indexs(HttpServletResponse response, Model model, HttpServletRequest request) throws Exception {

		return "/index";
	}

	@RequestMapping("/")
	public String index(HttpServletResponse response, Model model, HttpServletRequest request) throws Exception {

		return "/index";
	}

	/**
	 * 返回 sessicon 中保存的 当前用户实体
	 * 
	 * @author baikun
	 * @creation 2017年3月13日
	 * @param request
	 * @return
	 */
	private Users sessicon_get_info(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		Users user = (Users) session.getAttribute("admin");
		if (user == null) {
			user = (Users) SecurityUtils.getSubject().getPrincipal();
			if (user == null) {
				throw new Exception("【Sessicon 异常】返回值 " + user + " ,信息位置" + this.getClass().getName() + " "
						+ Thread.currentThread().getStackTrace()[1].getMethodName());
			}
		}
		return user;
	}
}
