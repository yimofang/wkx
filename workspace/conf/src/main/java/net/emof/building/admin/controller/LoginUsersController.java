package net.emof.building.admin.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AccountException;

import org.apache.shiro.authc.ExpiredCredentialsException;
import org.apache.shiro.authc.IncorrectCredentialsException;

import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import net.emof.building.admin.service.LoginUsersService;
import net.emof.building.admin.shiro.ShiroToken;
import net.emof.building.admin.shiro.UserRealm;
import net.emof.building.model.Users;
import net.emof.building.util.Security;

/**
 * 后台登陆、修改密码、退出类
 * 
 * @author baikun
 * @creation 2017年2月20日
 */
@Controller
@RequestMapping("/admin")
public class LoginUsersController {

	@Autowired
	private LoginUsersService aduser;

	/**
	 * 登陆页面跳转
	 * 
	 * @author 白琨
	 * @creation 2017年2月20日
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping("")
	public String login(Model model, HttpServletRequest request) throws Exception {

		if (sessicon_get_info(request)!=null) {
			return "redirect:/adminindex.do";
		}
		model.addAttribute("msg", null);
		return "/hframe/admin/login";
	}

	private Users sessicon_get_info(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		Users user = (Users) session.getAttribute("admin");
		if (user == null) {
			user = (Users) SecurityUtils.getSubject().getPrincipal();
			if (user == null ) {
				 SecurityUtils.getSubject().isAuthenticated();
				/*throw new Exception("【Sessicon 异常】返回值 " + user + " ,信息位置" + this.getClass().getName() + " "
						+ Thread.currentThread().getStackTrace()[1].getMethodName());*/
			}
		}
		return user;
	}

 

	/**
	 * 登陆后台
	 * 
	 * @author 白琨
	 * @creation 2017年2月20日
	 * @param username
	 *            验证登陆帐号（phone 手机号）
	 * @param userpass
	 *            验证登陆密码 (pass 登陆密码 adminpass)
	 * @param model
	 * @param req
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "adminlogin", method = RequestMethod.POST)
	public String adminlogin(@RequestParam(value = "username") String loginname,
			@RequestParam(value = "pass") String userpass, HttpServletResponse response, Model model,
			HttpServletRequest request) throws IOException {

		if (loginname == null || loginname.trim().length() < 1) {
			// return "redirect:/hframe/admin/login";
			return "redirect:/admin.do";
		}
		if (userpass == null || userpass.trim().length() < 1) {
			// return "redirect:/hframe/admin/login";
			return "redirect:/admin.do";
		}

		ShiroToken token = new ShiroToken(loginname, null, Security.getSHA1(userpass));
		String msg;
		try {
			SecurityUtils.getSubject().login(token);

		} catch (AccountException e) {
			msg =e.getMessage();
			model.addAttribute("message", msg);
			return "redirect:/admin.do";
		} catch (IncorrectCredentialsException e) {
			msg = e.getMessage();
			model.addAttribute("message", msg);
			return "redirect:/admin.do";

		} catch (ExpiredCredentialsException e) {
			msg = "帐号已过期. the account for username " + token.getPrincipal() + "  was expired.";
			model.addAttribute("message", msg);
			return "redirect:/admin.do";

		} catch (UnauthorizedException e) {
			msg = "您没有得到相应的授权！" + e.getMessage();
			model.addAttribute("message", msg);

			return "redirect:/admin.do";
		}

		return "redirect:/adminindex.do";

	}

	/**
	 * 跳转修改密码页
	 * 
	 * @author baikun
	 * @creation 2017年2月20日
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "editpass", method = RequestMethod.GET)
	public String editpass_get(HttpServletRequest request, Model model) {

		if (!SecurityUtils.getSubject().isAuthenticated()) {
			return "/hframe/admin/login";
		}
		HttpSession session = request.getSession();
		Users adminuser = (Users) session.getAttribute("admin");
		model.addAttribute("ids", adminuser.getId());

		return "/hframe/admin/editpass";
	}

	/**
	 * 修改密码
	 * 
	 * @author baikun
	 * @creation 2017年2月20日
	 * @param request
	 * @param model
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "editpass", method = RequestMethod.POST)
	public String editpass(Model model, HttpServletRequest request, HttpServletResponse response, Integer id,
			String pass_j, String pass_new, String pass_to) throws IOException {

		if (!SecurityUtils.getSubject().isAuthenticated()) {
			return "/hframe/admin/login";
		}
		HttpSession session = request.getSession();
		Users adminuser = (Users) session.getAttribute("admin");

		if (pass_new.length() < 6) {

			model.addAttribute("ids", adminuser.getId());

			model.addAttribute("errorMsg", "密码长度不正确");

			return "/hframe/admin/editpass";
		}

		if (pass_j == null || pass_j.trim().equals("") || !adminuser.getAdminpass().equals(Security.getSHA1(pass_j))) {

			model.addAttribute("ids", adminuser.getId());

			model.addAttribute("errorMsg", "旧密码填写不正确");

			return "/hframe/admin/editpass";

		}

		if (pass_new == null || pass_new.trim().equals("")) {
			model.addAttribute("ids", adminuser.getId());

			model.addAttribute("errorMsg", "新密码填写不正确");

			return "/hframe/admin/editpass";
		}

		if (pass_to == null || pass_to.trim().equals("") || pass_to.length() < 5) {
			model.addAttribute("ids", adminuser.getId());

			model.addAttribute("errorMsg", "密码验证填写不正确");

			return "/hframe/admin/editpass";
		}

		if (!pass_new.trim().equals(pass_to.trim())) {
			model.addAttribute("ids", adminuser.getId());

			model.addAttribute("errorMsg", "两次密码验证填写不正确");

			return "/hframe/admin/editpass";
		}

		PrintWriter out = response.getWriter();
		String path = request.getContextPath();
		String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
		if (aduser.updatepass(id, Security.getSHA1(pass_new)) >= 1) {

			model.addAttribute("errorMsg", "<script language=\"javascript\">alert('" + basePath
					+ "/admin/quit');location.href='" + basePath + "/admin/quit.do'</script>");

		}

		return "/hframe/admin/editpass";
	}

	/**
	 * 退出登陆
	 * 
	 * @author baikun
	 * @creation 2017年2月20日
	 * @param req
	 * @param model
	 * @return
	 */
	@RequestMapping("quit")
	public String quit(HttpServletRequest request, Model model) {

		if (SecurityUtils.getSubject().isAuthenticated()) {
			SecurityUtils.getSubject().logout();
			new UserRealm().clearAllCachedAuthorizationInfo();
		}
		HttpSession session = request.getSession();
		session.removeAttribute("admin");
		session.invalidate();
		model.addAttribute("msg", null);
		return "redirect:/admin.do";
	}

}
