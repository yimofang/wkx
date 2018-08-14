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

import net.emof.building.admin.service.PowersService;
import net.emof.building.model.Powers;
import net.emof.building.model.Users;
import net.emof.building.util.PageInfo;
 

/**
 * 权限表管理
 * 
 * @author baikun
 * @creation 2017年2月24日
 */
@Controller
@RequestMapping("powers")
public class PowersController {

	@Autowired
	private PowersService psservice;

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

		return "/hframe/powers/powers_list";
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
	@RequestMapping("powers_list")
	public Map<String, Object> bootstrap_table(PageInfo pageInfo,String limit, String offset, 
			HttpServletResponse response, String sort,String sortOrder,
			@RequestParam(value = "select", required = false) String select) {

		Map<String, Object> map_res = psservice.bootstrap_table(pageInfo, limit,  offset, select, sort, sortOrder);
		return map_res;
	}

	// ------------------Bootstrap Table 结束-----------------------------

	// 根据ID 返回信息
	@ResponseBody
	@RequestMapping("/idbyinfo")
	public Map<String, Object> get_by_idinfo(Integer id, HttpServletResponse response) {
		Map<String, Object> map = psservice.idByInfo(id);
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
	public Map<String, Object> update_info(HttpServletResponse response, Powers record) {

		Map<String, Object> map = provinginfo(record);

		if ((int) map.get("code") != 2) {

			Map<String, Object> past_info = psservice.idByInfo(record.getId());
			// 独立验证
			if (!past_info.get("powername").toString().equals(record.getPowername())) {

				if (psservice.count_nub("powername", record.getPowername()) > 0) {
					map.put("code", 2);
					map.put("info", record);
					map.put("msg", "名称已存在请更换");
					return map;
				}
			}

			int judge = psservice.update_obj(record);

			if (judge > 0) {
				map.put("code", 1);
				map.put("row", psservice.idByInfo(record.getId()));
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
	public Map<String, Object> add_info(HttpServletResponse response, Powers record) {

		Map<String, Object> map = provinginfo(record);
		if ((int) map.get("code") != 2) {

			if (psservice.count_nub("powername", record.getPowername()) > 0) {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "名称已存在请更换");
				return map;
			}
			int judge = psservice.add_obj(record);
			if (judge > 0) {
				map.put("code", 1);
				map.put("row", psservice.idByInfo(record.getId()));
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
	public Map<String, Object> delete_info(Integer id, HttpServletResponse response, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", psservice.isDelete(id));
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
	protected Map<String, Object> provinginfo(Powers record) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", 1);
		// 填写字段验证信息
		if (record.getPowername() == null || record.getPowername().toString().trim() == ""
				|| record.getPowername().toString().trim().length() < 2) {
			map.put("code", 2);
			map.put("msg", "名称填写格式不正确");
			map.put("info", record);
		}

		return map;

	}

	@ResponseBody
	@RequestMapping("getmenu")
	public Map<String, Object> getmenu(Integer id) {
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("list", psservice.getmenu(id));

		return map;
	}

	/**
	 * 添加分配菜单
	 * 
	 * @author baikun
	 * @creation 2017年3月4日
	 * @param response
	 * @param id
	 *            当前权限ID
	 * @param ids
	 *            当前选中的复选框id集合
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/add_menu")
	public Map<String, Object> add_menu(HttpServletResponse response, Integer id, Integer[] ids) {

		Map<String, Object> map = psservice.add_power_menu(id, ids);

		return map;

	}

}
