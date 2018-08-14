package net.emof.building.admin.controller;

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
import net.emof.building.admin.service.ConfsTypeService;
import net.emof.building.model.ConfsType;
import net.emof.building.model.Msg;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;

/**
 * 会议分类
 * 
 * @author baikun
 * @creation 2017年12月26日
 */
@Controller
@RequestMapping("confstype")
public class ConfsTypeController {

	@Autowired
	private ConfsTypeService srv;

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
		return "/hframe/confstype/confstype_list";
	}

	/**
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param page
	 * @param display
	 * @param response
	 * @param sort
	 * @param sortOrder
	 * @param request
	 * @param select
	 * @param agodate
	 * @param backdate
	 * @return
	 * @throws Exception
	 * 
	 * 	public Map<String, Object> table_init(Integer page, Integer display, HttpServletResponse response, String sort,
			String sortOrder, HttpServletRequest request,
			@RequestParam(value = "select", required = false) String select)
	 * 
	 * 	public Map<String, Object> table_init(PageInfo pageInfo, String limit, String offset,
			HttpServletResponse response, HttpServletRequest request, String sort, String sortOrder,
			@RequestParam(value = "select", required = false) String select,
			@RequestParam(value = "startdate", required = false) String agodate,
			@RequestParam(value = "overdate", required = false) String backdate,
			@RequestParam(value = "opt", required = false) Integer opt)
	 * 
	 */
	@ResponseBody
	@RequestMapping("table_init")
	public Map<String, Object> table_init(PageInfo pageInfo, String limit, String offset,
			HttpServletResponse response, HttpServletRequest request, String sort, String sortOrder,
			@RequestParam(value = "select", required = false) String select,
			@RequestParam(value = "startdate", required = false) String agodate,
			@RequestParam(value = "overdate", required = false) String backdate) {
		Users aduser = null;
		try {
			aduser = sessicon_get_info(request);
		} catch (Exception e) {
			return new DataMap(null, 5, "查询失败").data;
		}
		if (aduser == null) {
			return new DataMap(null, 6, "登陆超时,请重新登陆").data;
		}
		Map<String, Object> map_res = srv.bootstrap_table(pageInfo, limit, offset, select, sort, sortOrder, agodate,
				backdate, aduser);
		return map_res;
	}

	/**
	 * 添加信息
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param media
	 * @return
	 */
	@ResponseBody
	@RequestMapping("add_info")
	public Map<String, Object> add_info(@RequestParam(value = "tname", required = false) String tname,
			HttpServletRequest request) {
		ConfsType ct = new ConfsType();
		DataMap dataMap = null;
		ct.setTname(tname);
		try {
			Integer ctid = Integer.parseInt(srv.add_obj(ct).getObj_row().toString());
			dataMap = srv.getInfo(ctid);
		} catch (Exception e) {
			return new DataMap(ct, 5, "添加信息失败~！请查检提交数据").data;
		}
		return dataMap.data;
	}

	
	/**
	 * 修改信息
	 * @author baikun
	 * @creation 2017年12月26日
	 * @param id
	 * @param tname
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("update_info")
	public Map<String, Object> update_info(@RequestParam(value = "id", required = false) Integer id,
			@RequestParam(value = "tname", required = false) String tname, HttpServletRequest request) {
		ConfsType ct = new ConfsType();
		DataMap dataMap = null;
		ct.setId(id);
		ct.setTname(tname);
		try {
			srv.update_obj(ct);
			dataMap = srv.getInfo(id);
		} catch (Exception e) {
			return new DataMap(ct, 5, "添加信息失败~！请查检提交数据").data;
		}
		return dataMap.data;
	}

	
	/**
	 * 删除
	 * @author wkx 
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
		DataMap datamap = srv.isDelete(id);
		map.put("code", datamap.getObj_row());
		map.put("msg", "删除成功");
		return map;
	}
	
	
	/**
	 * 返回实体信息
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
