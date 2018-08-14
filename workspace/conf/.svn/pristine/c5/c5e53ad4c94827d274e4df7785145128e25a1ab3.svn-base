package net.emof.building.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import net.emof.building.admin.service.MenusService;
import net.emof.building.model.Menus;
import net.emof.building.model.Users;
 

/**
 * 菜单管理类
 * 
 * @author baikun
 * @creation 2017年2月25日
 */
@Controller
@RequestMapping("menus")
public class MenusController {

	@Autowired
	private MenusService msservice;

	/**
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @return
	 */
	@RequestMapping("")
	public String golist(HttpServletRequest request, Model model) {
		Users userinfo = sessicon_get_info(request);
		model = get_conductlist(userinfo.getPowerlist(), model);
		System.out.println(model.toString());
		return "/hframe/menus/menus_list";
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
	private Users sessicon_get_info(HttpServletRequest request) {

		HttpSession session = request.getSession();
		Users aduser = (Users) session.getAttribute("admin");
		if (aduser == null) {
			return null;
		}
		return aduser;
	}

	/**
	 * 初始化表格
	 * 
	 * @author baikun
	 * @creation 2017年2月24日
	 * @param pageInfo
	 * @param limit
	 * @param offset
	 * @param response
	 * @param sort
	 * @param sortOrder
	 * @param select
	 * @param opt
	 * @return
	 */
	@ResponseBody
	@RequestMapping("menus_list")
	public Map<String, Object> bootstrap_table(Integer page, Integer display,
			HttpServletResponse response, String sort, String sortOrder,
			@RequestParam(value = "select", required = false) String select) {

		Map<String, Object> map_res = msservice.bootstrap_table(page, display, select, sort, sortOrder);
		map_res.put("rows", map_res.get("row"));
		return map_res;
	}

	// ------------------Bootstrap Table 结束-----------------------------

	// 根据ID 返回信息
	@ResponseBody
	@RequestMapping("/idbyinfo")
	public Map<String, Object> get_by_idinfo(Integer id, HttpServletResponse response) {
		Map<String, Object> map = msservice.get_info(id, null);
		return map;
	}

	/**
	 * 修改实体信息
	 * 
	 * @author 白琨
	 * @see 2016-11-22
	 * @param response
	 * @param record
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/update_info", method = RequestMethod.POST)
	public Map<String, Object> update_info(HttpServletResponse response, Menus record) {

		Map<String, Object> map = provinginfo(record);

		if ((int) map.get("code") != 2) {

			Map<String, Object> past_info = msservice.idByInfo(record.getId());
			// 独立验证
			if (!past_info.get("name").toString().equals(record.getName())) {

				if (msservice.count_nub("name", record.getName()) > 0) {
					map.put("code", 2);
					map.put("info", record);
					map.put("msg", "名称已存在请更换");
					return map;
				}
			}

			int judge = msservice.update_obj(record);

			if (judge > 0) {
				map.put("code", 1);
				map.put("row", msservice.idByInfo(record.getId()));
				map.put("msg", "修改成功");
			} else {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "修改失败");
				System.out.println("update_info 执行修改失败:");
			}
		}

		return map;

	}

	/**
	 * @author 白琨
	 * @see 2016-11-22
	 * @param record
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/add_info")
	public Map<String, Object> add_info(HttpServletResponse response, Menus record) {

		Map<String, Object> map = provinginfo(record);
		if ((int) map.get("code") != 2) {

			if (msservice.count_nub("name", record.getName()) > 0) {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "名称已存在请更换");
				return map;
			}
			if (record.getController().trim()==null || record.getController().trim().equals("")) {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "短连接不能为空");
				return map;
			}
			int judge = msservice.add_obj(record);
			if (judge > 0) {
				map.put("code", 1);
				map.put("row", msservice.get_info(record.getId(), null));
				map.put("msg", "添加成功");
			} else {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "添加失败");
				System.out.println("add_info 执行添加失败");
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
	 */
	@ResponseBody
	@RequestMapping("/delete_info")
	public Map<String, Object> delete_info(Integer id, HttpServletResponse response, HttpServletRequest req) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", msservice.isDelete(id));
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
	protected Map<String, Object> provinginfo(Menus record) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", 1);
		// 填写字段验证信息
		if (record.getName() == null || record.getName().toString().trim() == ""
				|| record.getName().toString().trim().length() < 2) {
			map.put("code", 2);
			map.put("msg", "名称填写格式不正确，最少两个字");
			map.put("info", record);
		}
		return map;
	}

	/**
	 * 返回菜单list
	 * 
	 * @author baikun
	 * @creation 2017年3月3日
	 * @return
	 */
	@ResponseBody
	@RequestMapping("get_menu_list")
	public List<Map<String, Object>> get_menu_list() {
		return msservice.get_list();
	}

}
