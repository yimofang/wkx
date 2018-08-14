package net.emof.building.admin.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import net.emof.building.admin.service.ConfsSubuserService;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.ExcelView;
import net.emof.building.util.PageInfo;

@Controller
@RequestMapping("confssubuser")
public class ConfsSubuserController {

	@Autowired
	private ConfsSubuserService srv;

	/**
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("")
	public String golist(HttpServletRequest request, Model model, String confsid) throws Exception {
		Users userinfo = sessicon_get_info(request);
		model = get_conductlist(userinfo.getPowerlist(), model);
		model.addAttribute("confsid", confsid);
		return "/hframe/confssubuser/confssubuser_list";
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
	public Map<String, Object> table_init(PageInfo pageInfo, String limit,String offset, HttpServletResponse response, String sort,
			String sortOrder, HttpServletRequest request,
			@RequestParam(value = "select", required = false) String select,
			@RequestParam(value = "startdate", required = false) String agodate,
			@RequestParam(value = "overdate", required = false) String backdate,
			@RequestParam(value = "confsid", required = false) String confsid,
			@RequestParam(value = "opt", required = false) Integer opt) {
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
				backdate, aduser, confsid,  opt);
		return map_res;
	}
	
	
	/**
	 * 导出excel
	 * @author baikun
	 * @creation 2017年11月27日
	 * @param modelMap
	 * @param select
	 * @param teamid
	 * @param typeid
	 * @return
	 */
	@RequestMapping(value="/exportExcel")
	public ModelAndView exportExcel(ModelMap modelMap,
			@RequestParam(value = "confsid", required = false) String confsid){
		
 		List<Map<String,Object>> datalist = srv.getlist(confsid);
// 		if(datalist==null||datalist.size()<=0){
// 			return null;
// 		}
// 		if(datalist!=null&&datalist.get(0)==null){
// 			return null;
// 		}
 		String filename = "参会名单.xls";
 		modelMap.addAttribute("list", datalist);
 		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");  
 		modelMap.addAttribute("dateFormat", dateFormat);  
		return new ModelAndView(new ExcelView("/excelDemo.xls", filename),modelMap); 
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
