package net.emof.building.admin.controller;

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

import net.emof.building.admin.service.ConductService;
import net.emof.building.admin.service.ConfsTypeService;
import net.emof.building.model.Conduct;
import net.emof.building.model.ConfsType;
import net.emof.building.model.Msg;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;

/**
 * 行为管理
 * @author YLS
 * @creation 2018年4月10日
 */
@Controller
@RequestMapping("conduct")
public class ConductController {

	@Autowired
	private ConductService srv;

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
		return "/hframe/conduct/conduct_list";
	}

	/**
	 * 返回行为管理列表信息
	 * @author YLS
	 * @creation 2018年4月10日
	 * @param pageInfo  分页类
	 * @param limit 总页数
	 * @param offset 当前页
	 * @param response
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("table_init")
	public Map<String, Object> table_init(PageInfo pageInfo,String limit, String offset,
			HttpServletResponse response, HttpServletRequest request) {
		Users aduser = null;
		try {
			aduser = sessicon_get_info(request);
		} catch (Exception e) {
			return new DataMap(null, 5, "查询失败").data;
		}
		if (aduser == null) {
			return new DataMap(null, 6, "登陆超时,请重新登陆").data;
		}
		Map<String, Object> map_res = srv.pagelist( pageInfo,  limit,  offset);
		return map_res;
	}

	/**
	 * 添加行为管理信息
	 * @author YLS
	 * @creation 2018年4月10日
	 * @param record 行为管理实体
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("add_info")
	public Map<String, Object> add_info(Conduct record,HttpServletRequest request) {
		DataMap dataMap = null;
		if(!srv.checkName(record.getName())) {
			return new DataMap(record, 4, "名称已存在，请修改！").data;
		}
		if(!srv.checkSymbol(record.getSymbol())) {
			return new DataMap(record, 4, "标签已存在，请修改！").data;
		}
		try {
			Integer ctid = Integer.parseInt(srv.add_obj(record).getObj_row().toString());
			dataMap = srv.getInfo(ctid);
		} catch (Exception e) {
			return new DataMap(record, 5, "添加信息失败~！请查检提交数据").data;
		}
		return dataMap.data;
	}

	
	/**
	 * 修改行为管理信息
	 * @author baikun
	 * @creation 2017年12月26日
	 * @param id
	 * @param tname
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("update_info")
	public Map<String, Object> update_info(Conduct record, HttpServletRequest request) {
		DataMap dataMap = null;
		if(!srv.checkName(record.getName())) {
			return new DataMap(record, 4, "名称已存在，请修改！").data;
		}
		if(!srv.checkSymbol(record.getSymbol())) {
			return new DataMap(record, 4, "标签已存在，请修改！").data;
		}
		try {
			srv.update_obj(record);
			dataMap = srv.getInfo(record.getId());
		} catch (Exception e) {
			return new DataMap(record, 5, "添加信息失败~！请查检提交数据").data;
		}
		return dataMap.data;
	}
	
	/**
	 * 
	 * @author baikun
	 * @creation 2018年4月10日
	 * @param record 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("isdelete")
	public Map<String, Object> isdelete(Integer id, HttpServletRequest request) {
		try {
			srv.isDelete(id);
		} catch (Exception e) {
			return new DataMap(id, 5, "添加信息失败~！请查检提交数据").data;
		}
		return new DataMap().data;
	}

	/**
	 * 返回行为管理实体信息
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("get_info")
	public Map<String, Object> get_info(@RequestParam(value = "id", required = true) Integer id) {
		return srv.getInfo(id).data;
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

}
