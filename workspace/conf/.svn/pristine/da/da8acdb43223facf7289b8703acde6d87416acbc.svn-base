package net.emof.building.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.service.PowerMenuService;
import net.emof.building.model.PowerMenu;
import net.emof.building.model.Powers;

 

/**
 * 菜单分配 和行为操作
 * 
 * @author baikun
 * @creation 2017年3月10日
 */
@Controller
@RequestMapping("powermenu")
public class PowerMenuController {

	@Autowired
	private PowerMenuService pmserver;

	@RequestMapping("")
	public String golist(Model model, Integer powerid) {

		Powers powerinfo = new Powers();
		Map<String, Object> map_info = pmserver.idByInfo(powerid, "powers");
		powerinfo.mapsetInfo(map_info);
		model.addAttribute("info", powerinfo);
		return "/hframe/powermenu/powermenu_list";
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
	@RequestMapping("powermenu_list")
	public Map<String, Object> bootstrap_table(Integer page, Integer display, HttpServletResponse response, String sort,
			String sortOrder, @RequestParam(value = "powerid", required = false) Integer powerid) {
		Map<String, Object> map_res = pmserver.bootstrap_table(page, display, sort, sortOrder, powerid);
		map_res.put("rows", map_res.get("row"));
		return map_res;
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
	public Map<String, Object> update_info(HttpServletResponse response, Integer id, String find, Integer state) {

		Map<String, Object> map = new HashMap<String, Object>();

		Map<String, Object> past_info = pmserver.idByInfo(id, "power_menu");
		// 独立验证
		PowerMenu record = new PowerMenu();

		int judge = pmserver.update_obj(record);

		if (judge > 0) {
			map.put("code", 1);
			map.put("row", pmserver.get_info(record.getId()));
			map.put("msg", "修改成功");
		} else {
			map.put("code", 2);
			map.put("info", record);
			map.put("msg", "修改失败");
			System.out.println("update_info 执行修改失败:");
		}

		return map;
	}

	/**
	 * 添加
	 * 
	 * @author 白琨
	 * @see 2016-11-22
	 * @param record
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/add_info")
	public Map<String, Object> add_info(HttpServletResponse response, Integer powerid, Integer menuid, Integer[] ids) {

		Map<String, Object> map = new HashMap<String, Object>();

		int j = pmserver.add_obj(powerid, menuid, ids);

		map.put("msg", "操作成功");

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
		map.put("code", pmserver.delete(id));
		map.put("msg", "删除成功");
		return map;

	}

	/**
	 * 初始化复选框
	 * 
	 * @author baikun
	 * @creation 2017年3月6日
	 * @return
	 */
	@ResponseBody
	@RequestMapping("conduct_list")
	public Map<String, Object> conduct_list(Integer id, Integer menuid) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", pmserver.get_opt_get_conduct(id, menuid));

		return map;
	}

}
