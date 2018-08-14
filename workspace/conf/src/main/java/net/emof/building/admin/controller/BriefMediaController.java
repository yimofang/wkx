package net.emof.building.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.admin.service.BriefMediaService;
import net.emof.building.model.BriefMedia;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;

@Controller
@RequestMapping("briefmedia")
public class BriefMediaController {
	
	@Autowired
	private BriefMediaService srv;
	
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
		return "/hframe/briefmedia/briefmedia_list";
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
	 */
	@ResponseBody
	@RequestMapping("table_init")
	public Map<String, Object> table_init(PageInfo pageInfo,String limit, String offset, HttpServletResponse response, String sort,
			String sortOrder, HttpServletRequest request,
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
		Map<String, Object> map_res = srv.pagelist(pageInfo, limit,  offset, select, sort, sortOrder, agodate, backdate,
				aduser);
		return map_res;
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

	/**
	 *  查询简报名称信息
	 * @author YLS
	 * @creation 2018年4月17日
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("brief_list")
	public List<Map<String, Object>> brief_list(HttpServletRequest request) throws Exception {

		return srv.brief_list();
	}
	
	/**
	 * 查询媒体名称信息
	 * @author YLS
	 * @creation 2018年4月17日
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("media")
	public List<Map<String, Object>> getmedia() {

		return srv.getmedia();
	}
	
	/**
	 *  添加实体
	 * @author YLS
	 * @creation 2018年4月18日
	 * @param response
	 * @param bname 联系人姓名
	 * @param bphone 电话
	 * @param briefid 简报id
	 * @param ids  媒体id数组
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/add_info")
	public Map<String, Object> add_info(HttpServletResponse response, String bname,
			String bphone,String briefid,Integer[] ids) {
		DataMap map=new DataMap();
		BriefMedia record=new BriefMedia();
		record.setBname(bname);
		record.setBphone(bphone);
		record.setBriefid(briefid);
		 record.setMediaid(StringUtils.join(ids, ","));
		 try {
			map = srv.add_obj(record);
		} catch (AppendAdmException e) {
			e.printStackTrace();
		}
		return map.data;
	}
	
	// 根据ID 返回信息
	@ResponseBody
	@RequestMapping("/idbyinfo")
	public Map<String, Object> get_by_idinfo(String id, HttpServletResponse response) {
		Map<String, Object> map =null;
		try {
			map = srv.get_info(id);
		} catch (SelectAdmException e) {
			e.printStackTrace();
		}
		return  map;
	}
	
	/**
	 *  修改实体
	 * @author YLS
	 * @creation 2018年4月18日
	 * @param response
	 * @param bname 联系人姓名
	 * @param bphone 电话
	 * @param briefid 简报id
	 * @param ids  媒体id数组
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/update_info")
	public Map<String, Object> update_info(HttpServletResponse response,String id, String bname,
			String bphone,String briefid,Integer[] ids) {
		DataMap map=new DataMap();
		BriefMedia record=new BriefMedia();
		record.setId(id);
		record.setBname(bname);
		record.setBphone(bphone);
		record.setBriefid(briefid);
		 record.setMediaid(StringUtils.join(ids, ","));
		 try {
			map = srv.update_obj(record);
		} catch (UpdateAdmException e) {
			e.printStackTrace();
		}
		return map.data;
	}
	
	
	@ResponseBody
	@RequestMapping("/delete_info")
	public Map<String, Object> delete_info(String id, HttpServletResponse response, HttpServletRequest req) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map=srv.del_obj(id).data;
		} catch (DeleteAdmException e) {
			e.printStackTrace();
		}
		return map;

	}
}
