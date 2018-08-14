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

import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.admin.service.MediaService;
import net.emof.building.model.Media;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;

@Controller
@RequestMapping("/media")
public class MediaController {

	@Autowired
	private MediaService srv;

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
		return "/hframe/media/media_list";
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
	/**
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param pageInfo 分页类
	 * @param limit 总页数
	 * @param offset 当前页
	 * @param select  mname按照名子查找  可为null
	 * @param sort 排序字段  可为null
	 * @param sortOrder  排序字段  可为null
	 * @param agodate 开始日期 可为null
	 * @param backdate  结束日期 可为null
	 * @param sessiconAdmin  当前用户
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
		System.out.println("aaaaaaaaaaaaaa");
		Users aduser = null;
		try {
			aduser = sessicon_get_info(request);
		} catch (Exception e) {
			return new DataMap(null, 5, "查询失败").data;
		}
		if (aduser == null) {
			return new DataMap(null, 6, "登陆超时,请重新登陆").data;
		}
		Map<String, Object> map_res = srv.pagelist( pageInfo, limit,  offset, select, sort, sortOrder, agodate, backdate,aduser);
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
	public Map<String, Object> add_info(@RequestParam(value = "bname", required = false) String mname,
			@RequestParam(value = "brief", required = false) String brief) {
		Media media = new Media();
		media.setMname(mname);
		media.setBrief(brief);
		DataMap dataMap = null;
		try {
			dataMap = srv.getInfo((Integer) srv.add_obj(media).getObj_row());

		} catch (AppendAdmException e) {
			return new DataMap(media, 5, "添加信息失败~！请查检提交数据").data;
		}

		return dataMap.data;
	}

	/**
	 * 修改信息
	 * @author YLS
	 * @creation 2018年4月16日
	 * @param mname
	 * @param brief
	 * @return
	 */
	@ResponseBody
	@RequestMapping("update_info")
	public Map<String, Object> update_info(@RequestParam(value = "bname", required = false) String mname,
			@RequestParam(value = "brief", required = false) String brief,
			@RequestParam(value = "id", required = false) Integer id)  {
		Media media = new Media();
		media.setId(id);
		media.setMname(mname);
		media.setBrief(brief);
		DataMap dataMap = null;
		try {
			dataMap = srv.getInfo((Integer) srv.update_obj(media).data.get("row"));

		} catch (UpdateAdmException e) {
			return new DataMap(media, 5, "修改信息失败~！请查检提交数据").data;
		}

		return dataMap.data;
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
	 * 逻辑删除
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param id
	 */
	@ResponseBody
	@RequestMapping("isdelete")
	public Map<String, Object> isdelete(Integer id) {

		try {
			srv.isDelete(id);

		} catch (DeleteAdmException e) {
			return new DataMap(null, 5, "删除失败，信息不存在").data;
		}
		return new DataMap(null, 0).data;
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
