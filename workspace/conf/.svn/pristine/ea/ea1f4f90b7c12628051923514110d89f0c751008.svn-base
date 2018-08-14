package net.emof.building.web.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.admin.service.AdminUsersService;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;

/**
 * 用户接口
 * 
 * @author wkx
 * @creation 2018年4月28日
 */
@Controller
@RequestMapping("adminUsers_web")
public class AdminUsers_web_Controller {

	@Autowired
	private AdminUsersService aduservice;

	
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
		List<Map<String, Object>> organiz_list =  aduservice.organiz_list(Integer.parseInt(map.get("pid").toString()));
		map.put("organiz_list", organiz_list);
		List<Map<String, Object>> power_list =  aduservice.getPowerList();
		map.put("power_list", power_list);
		return map;
	}
	
	/**
	 * 修改方法
	 * 
	 * @author wkx
	 * @creation 2018年5月4日
	 * @param 	
		usersid users表ID 
		headimg  新图片名  
		deleteimg旧图片名
		organizid 下拉框ID  
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("update_info")
	public Map<String, Object> update_info(HttpServletRequest request, Integer usersid,Integer organizid,String headimg,String deleteimg,String token,String organizstr) throws Exception {
		Users record=new Users();
		record.setId(usersid);
		if(null!=headimg&&!headimg.equals("")) {
			
		record.setHeadimg(headimg);}
		if(null!=organizid&&!organizid.equals("")) {
			record.setOrganizid(organizid);}
	/*token
	 *  token:Token,
            usersid:id,
            headimg:headimg,
            deleteimg:deleteimg
	 * */
		          //18050709345073zRQHT79f001kD9pplb=usersid=1==null==56979678.jpeg==     null        =getHeadimg=56979678.jpeg
System.out.println( organizstr+"=organizstr="+ usersid+"=="+ organizid+"=="+ headimg+"=="+       deleteimg+"=getHeadimg="+record.getHeadimg());
		//Map<String, Object> map = provinginfo(record);80022425.jpg
		Map<String, Object> map = new HashMap<String, Object>();
//
		if (record.getId()== null||record.getId().toString().equals("")) {
			// 验证id是否存在
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "usersid不能为空！！");
				return map;
		}

			record.setCreatetime(new Date());
			DataMap datamap = aduservice.update_obj(record);
			if (datamap.errorJudge()) {
				map.put("code", 1);
				map.put("row", aduservice.get_info(record.getId()));
				map.put("msg", "操作成功");
				if(token!=null&&!token.equals("")) {
					if(null!=headimg&&!headimg.equals("")) {
						Users users = EhSessicon.getTokenInfo(token);
						users.setHeadimg(headimg);
						EhSessicon.updateToken(token, users);
					}
					if(null!=organizid&&!organizid.equals("")) {
						Users users = EhSessicon.getTokenInfo(token);
						users.setOrganizid(organizid);
						Map<String,Object> datum=new HashMap<>();
						datum=users.getDatum();
						datum.put("organizstr", organizstr);
						users.setDatum(datum);
						EhSessicon.updateToken(token, users);
					}

				}
			} else {
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "操作失败");
				System.out.println("update_info 执行修改失败:");
			}
		
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
		/*
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
*/
		if (record.getHeadimg() == null || record.getHeadimg().trim().equals("") || record.getHeadimg().length() < 1) {
			record.setHeadimg(null);
		}

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

//		Users aduser = (Users) sessicon_get_info(request);
//		if (aduser == null) {
			return null;
//		}
//		return aduservice.organiz_list(aduser.getId());
	}
	
	
	
	
	
}
