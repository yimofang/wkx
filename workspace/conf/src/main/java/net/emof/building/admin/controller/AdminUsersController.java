package net.emof.building.admin.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.admin.service.AdminUsersService;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.RegexUtils;
import net.emof.building.util.Security;

/**
 * 后台用户表管理类
 * 
 * @author baikun
 * @creation 2017年2月21日
 */
@Controller
@RequestMapping("adminusers")
public class AdminUsersController {

	@Autowired
	private AdminUsersService aduservice;

	/**
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("")
	public String golist(HttpServletRequest request, Model model) throws Exception {
		Users userinfo = sessicon_get_info(request);
		model = get_conductlist(userinfo.getPowerlist(), model);
		System.out.println(model.toString());
		return "/hframe/adminusers/adminusers_list";
	}

	/**
	 * 返回当前权限下的操作行为
	 * 
	 * @author baikun
	 * @creation 2017年3月10日
	 * @param powerlist
	 * @param model
	 * @return
	 */
	private Model get_conductlist(List<Map<String, Object>> powerlist, Model model) {

		List<Map<String, Object>> power_list = powerlist;

		// 用当前用户的权限查询当前controller 的操作行为
		System.out.println(this.getClass().getName());

		String classname = this.getClass().getName().substring(this.getClass().getName().lastIndexOf(".") + 1);

		Map<String, Object> info = null;
		for (int i = 0; i < power_list.size(); i++) {
			info = power_list.get(i);
			if (classname.equals(info.get("controller"))) {
				break;
			} else {
				continue;
			}
		}
		if (info != null) {
			List<Map<String, Object>> conductlist = (List<Map<String, Object>>) info.get("conductlist");
			for (int x = 0; x < conductlist.size(); x++) {
				String key = conductlist.get(x).get("symbol").toString();
				model.addAttribute(key, key);
			}

		}

		return model;
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

	/**
	 * 分页信息列表
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param pageInfo
	 *            分页类
	 * @param limit
	 *            总页数
	 * @param offset
	 *            当前页
	 * @param response
	 * @param sort
	 *            排序列名
	 * @param sortOrder
	 *            排序规则
	 * @param select
	 *            搜索框内容
	 * @param agodate
	 *            开始日期
	 * @param backdate
	 *            结束日期
	 * @param opt
	 *            分类
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("adminusers_list")
	public Map<String, Object> table_init(PageInfo pageInfo, String display, String page,
			HttpServletResponse response, HttpServletRequest request, String sort, String sortOrder,
			@RequestParam(value = "select", required = false) String select,
			@RequestParam(value = "startdate", required = false) String agodate,
			@RequestParam(value = "overdate", required = false) String backdate,
			@RequestParam(value = "opt", required = false) String opt,
			@RequestParam(value = "organizids", required = false) Integer organizid) throws Exception {
		
		Users aduser = sessicon_get_info(request);
		if (aduser == null) {
			return null;
		}
		Map<String, Object> map_res = aduservice.bootstrap_table(pageInfo, display, page, select, sort, sortOrder, agodate,
				backdate, aduser, opt, organizid);
//		Map<String, Object> map_res = aduservice.bootstrap_table(page, display, select, sort, sortOrder, agodate,
//				backdate, opt, organizid, aduser);
//		map_res.put("rows", map_res.get("row"));
		
		
		return map_res;

	}

	/**
	 * 修改用户状态
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @param state
	 *            1.正常 2.停用
	 * @param request
	 * @return
	 * @throws SelectAdmException
	 */
	@ResponseBody
	@RequestMapping("update_state")
	public Map<String, Object> update_state(Integer id, @RequestParam(value = "stateid") Integer state,
			HttpServletRequest request) throws SelectAdmException {
		Map<String, Object> map = new HashMap<String, Object>();
		int judge = aduservice.update_state(id, state);
		if (judge > 0) {
			map.put("code", 1);
			map.put("row", aduservice.get_info(id));
			map.put("msg", "操作成功");
		} else {
			map.put("code", 2);
			map.put("msg", "操作失败");
			System.out.println("update_info 执行修改失败:");
		}
		return map;
	}

	/**
	 * 添加方法
	 * 
	 * @author baikun
	 * @creation 2017年2月22日
	 * @param request
	 * @param record
	 *            表单对象
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("add_info")
	public Map<String, Object> add_info(HttpServletRequest request, Users record) throws Exception {

		Users aduser = sessicon_get_info(request);
		if (aduser == null) {
			return null;
		}

		Map<String, Object> map = provinginfo(record);
		// 独立验证

		// 验证手机号是否已经存在
		if (aduservice.count_nub("phone", record.getPhone()) > 0) {
			map.put("code", 2);
			map.put("info", record);
			map.put("msg", "手机号已存在，请更换");
			return map;
		}
		if (aduservice.count_loginname(record.getLoginname()) > 0) {
			map.put("code", 2);
			map.put("info", record);
			map.put("msg", "帐号已存在，请更换");
			return map;
		}

		if (aduservice.count_nub("nub", record.getNub()) > 0) {
			map.put("code", 2);
			map.put("info", record);
			map.put("msg", "证件号已存在，请更换");
			return map;
		}

		if ((int) map.get("code") != 2) {

			record.setCreatetime(new Date());
			// 查询当前用户子级最后一个识别码 (保留 用户表codes 字段，识别由谁创建 的谁)
			Map<String, Object> code_map = aduservice.get_code_map(aduser.getCodes());
			// 重组识别码code
			if (code_map.get("code") != null && !code_map.get("code").toString().trim().equals("")) {
				record.setCodes(aduser.getCodes() + (Integer.parseInt(code_map.get("code").toString()) + 1));
			} else {
				record.setCodes(aduser.getCodes() + (100 + 1));
			}
			// 设置新用户默123456
			record.setAdminpass(Security.getSHA1("123456"));
			DataMap datamap = aduservice.add_obj(record);
			if (datamap.errorJudge()) {
				map.put("code", 1);
				map.put("row", aduservice.get_info(record.getId()));
				map.put("msg", "操作成功");
			} else {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "操作失败");
				System.out.println("update_info 执行修改失败:");
			}
		}
		return map;
	}

	/**
	 * 修改方法
	 * 
	 * @author baikun
	 * @creation 2017年2月22日
	 * @param request
	 * @param record
	 *            表单对象
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("update_info")
	public Map<String, Object> update_info(HttpServletRequest request, Users record) throws Exception {

		Users aduser = sessicon_get_info(request);
		if (aduser == null) {
			return null;
		}
		Map<String, Object> map = provinginfo(record);

		Map<String, Object> past_info = aduservice.idByInfo(record.getId(), "users");
		// 独立验证
		if (!past_info.get("phone").toString().equals(record.getPhone())) {
			// 验证手机号是否已经存在
			if (aduservice.count_nub("phone", record.getPhone()) > 0) {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "手机号已存在，请更换");
				return map;
			}

		}

		if (past_info.get("loginname") != null) {
			if (!past_info.get("loginname").toString().equals(record.getLoginname())) {
				// 验证帐号
				if (aduservice.count_loginname(record.getLoginname()) > 0) {
					map.put("code", 2);
					map.put("info", record);
					map.put("msg", "帐号已存在，请更换");
					return map;
				}
			}
		}

		if (!past_info.get("nub").toString().equals(record.getNub())) {
			// 验证证件号是否存在
			if (aduservice.count_nub("nub", record.getNub()) > 0) {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "证件号已存在，请更换");
				return map;
			}
		}

		if ((int) map.get("code") != 2) {
			record.setCreatetime(new Date());

			DataMap datamap = aduservice.update_obj(record);
			if (datamap.errorJudge()) {
				map.put("code", 1);
				map.put("row", aduservice.get_info(record.getId()));
				map.put("msg", "操作成功");
			} else {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "操作失败");
				System.out.println("update_info 执行修改失败:");
			}
		}
		return map;
	}

	/**
	 * 删除
	 * 
	 * @author 白琨 2016-11-11
	 * @param id
	 * @param response
	 * @return
	 * @throws DeleteAdmException
	 */
	@ResponseBody
	@RequestMapping("/delete_info")
	public Map<String, Object> delete_info(Integer id, HttpServletResponse response, HttpServletRequest request)
			throws DeleteAdmException {
		Map<String, Object> map = new HashMap<String, Object>();
		DataMap datamap = aduservice.isDelete(id);
		map.put("code", datamap.getObj_row());
		map.put("msg", "删除成功");
		return map;

	}

	/**
	 * 验证数据是否返回正常
	 * 
	 * @author 白琨
	 * @see 2016-11-22
	 * @return map
	 */
	protected Map<String, Object> provinginfo(Users record) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", 1);

		if (record.getRealname() == null || record.getRealname().trim().equals("")) {
			map.put("code", 2);
			map.put("msg", "未填写姓名");
			map.put("info", record);
			return map;
		}

		if (record.getOrganizid() == null || record.getOrganizid() < 1) {
			map.put("code", 2);
			map.put("msg", "未选择组织");
			map.put("info", record);
			return map;
		}

		if (record.getLoginname() == null || !RegexUtils.checkNubLetter(record.getLoginname())) {
			map.put("code", 2);
			map.put("msg", "帐号必须由数字或字母组成，不小于两位");
			map.put("info", record);
			return map;
		}

		if (record.getNub() == null || record.getNub().trim().equals("")) {
			map.put("code", 2);
			map.put("msg", "未填写证件号");
			map.put("info", record);
			return map;
		}

		if (record.getPhone() == null || record.getPhone().trim().equals("")
				|| record.getPhone().trim().length() < 11) {
			map.put("code", 2);
			map.put("msg", "手机号信息不完整或位数不正确");
			map.put("info", record);
			return map;
		}

		if (!RegexUtils.checkMobile(record.getPhone())) {
			map.put("code", 2);
			map.put("info", record);
			map.put("msg", "手机号格式不正确");
			return map;
		}

		if (record.getGenre() == 1) {
			// 验证身份证
			if (record.getNub().trim().length() < 18) {
				map.put("code", 2);
				map.put("msg", "证件号位数不正确");
				map.put("info", record);
				return map;
			}
			if (!RegexUtils.checkCard(record.getNub())) {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "证件号格式不正确");
				return map;
			}

		}

		if (record.getGenre() == 2) {
			// 验证警号
			if (record.getNub().trim().length() < 6) {
				map.put("code", 2);
				map.put("msg", "证件号位数不正确");
				map.put("info", record);
				return map;
			}
		}

		if (record.getHeadimg() == null || record.getHeadimg().trim().equals("") || record.getHeadimg().length() < 1) {
			record.setHeadimg(null);
		}

		return map;
	}

	/**
	 * 根据 ID返回 实体对象
	 * 
	 * @author baikun
	 * @creation 2017年2月22日
	 * @param id
	 * @param request
	 * @return
	 * @throws SelectAdmException
	 */
	@ResponseBody
	@RequestMapping("idbyinfo")
	public Map<String, Object> idbyinfo(Integer id, HttpServletRequest request) throws SelectAdmException {
		Map<String, Object> map = aduservice.get_info(id);
		return map;
	}

	/**
	 * 重置密码
	 * 
	 * @author baikun
	 * @creation 2017年2月23日
	 * @return
	 * @throws UpdateAdmException
	 */
	@ResponseBody
	@RequestMapping("update_pass")
	public Map<String, Object> update_pass(Integer id) throws UpdateAdmException {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> past_info = aduservice.idByInfo(id, "users");
		Users u = new Users();
		u.mapsetInfo(past_info);
		u.setAdminpass(Security.getSHA1("123456"));
		aduservice.update_obj(u);
		map.put("msg", "密码重置成功(默认为123456)");
		return map;

	}

	/**
	 * 返回权限列表
	 * 
	 * @author baikun
	 * @creation 2017年3月7日
	 * @return
	 */
	@ResponseBody
	@RequestMapping("power_list")
	public List<Map<String, Object>> power_list() {
		return aduservice.getPowerList();
	}

	/**
	 * 返回组织机构列表
	 * 
	 * @author baikun
	 * @creation 2017年3月7日
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("organiz_list")
	public List<Map<String, Object>> organiz_list(HttpServletRequest request) throws Exception {

		Users aduser = (Users) sessicon_get_info(request);
		if (aduser == null) {
			return null;
		}

		return aduservice.organiz_list(aduser.getId());
	}

	@ResponseBody
	@RequestMapping("organiz_list_name")
	public List<Map<String, Object>> organiz_list_name(HttpServletRequest request,
			@RequestParam(value = "ozname") String name) throws Exception {
		Users aduser = (Users) sessicon_get_info(request);
		if (aduser == null) {
			return null;
		}
		if (name == null || name.trim().equals("") || name.trim().length() <= 0) {
			name = null;
		}
		return aduservice.organiz_list_name(aduser.getId(), name);
	}
}
