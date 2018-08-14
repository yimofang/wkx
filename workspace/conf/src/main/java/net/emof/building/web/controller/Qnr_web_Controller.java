package net.emof.building.web.controller;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.web.service.Qnr_web_Service;

@Controller
@RequestMapping("qnr_web")
public class Qnr_web_Controller {
	
	@Autowired
	private Qnr_web_Service qnrService;
	
	private Users sessicon_get_info(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		Users user = (Users) session.getAttribute("admin");
		if (user == null) {
			user = (Users) SecurityUtils.getSubject().getPrincipal();
			if (user == null) {
//				throw new Exception("【Sessicon 异常】返回值 " + user + " ,信息位置" + this.getClass().getName() + " "
//						+ Thread.currentThread().getStackTrace()[1].getMethodName());
			}
		}
		return user;
	}
	/**
	 * 添加问卷名称与说明
	 * @author YLS
	 * @creation 2017年12月15日
	 * @param token		登录识别标识
	 * @param name		问卷名称（标题）
	 * @param qbrief	问卷说明（介绍）
	 * @param confid	会议id
	 * @return
	 */
	/*@ResponseBody
	@RequestMapping("/addQurTitleAndBrief")
	public Map<String, Object> addQurTitleAndBrief(@RequestParam(value = "token", required = false) String token,
			@RequestParam(value = "confid", required = false) String confid,
			@RequestParam(value = "title", required = false) String name,
			@RequestParam(value = "brief", required = false) String qbrief) {
		DataMap dataMap = new DataMap();   
        if(confid==null || confid.trim().equals("")) {
        	 dataMap.addMsg_diy_obj(null, 5, "会议id不能为空");
             return dataMap.data;
        }
        if(name==null || name.trim().equals("") || name.length()>100) {
       	 dataMap.addMsg_diy_obj(null, 5, "标题长度为1-100个字！");
            return dataMap.data;
       }
        if(qbrief==null || qbrief.trim().equals("") || qbrief.length()>250) {
       	 dataMap.addMsg_diy_obj(null, 5, "简介长度为1-250个字数！");
        }
        return dataMap.data;
       }*/
	
	/**
	 * 添加问卷实体
	 * @author wukexue
	 * @creation 2018年5月25日
	 * @param token
	 * @param confid 会议id
	 * @param fname 标题
	 * @param qbrief 简介
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/addQurInfo")
	public Map<String, Object> addIntrod(@RequestParam(value = "token", required = false) String token,
			@RequestParam(value = "confid", required = false) String confid,
			@RequestParam(value = "fname", required = false) String fname,
			@RequestParam(value = "qbrief", required = false) String qbrief) {
		DataMap dataMap = new DataMap();
		try {
			Users user = null;
			try {
				user = EhSessicon.getTokenInfo(token);
			} catch (EhCacheSessiconException e1) {
				e1.printStackTrace();
			}
			dataMap = qnrService.addQurInfo(confid, user.getId(),user.getCodes(),fname,qbrief);
		} catch (Exception e) {
			e.printStackTrace();
			 dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
	         return dataMap.data;
		}
		System.out.println("dataMap.data="+dataMap.data);
		return dataMap.data;
	}
	
	
	/**
	 * 修改问卷信息
	 * @author xilongfei
	 * @creation 2017年12月16日
	 * @param id		问卷id	
	 * @param name		标题
	 * @param qbrief	说明
	 * @return
	 */
	/*@ResponseBody
	@RequestMapping("/alterQurInfo")
	public Map<String, Object> alterQurInfo(@RequestParam(value = "id", required = false) String id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "qbrief", required = false) String qbrief) {
		DataMap dataMap = qnrService.updateQnrInfo(id, name, qbrief);
		return dataMap.data;
	}*/
	
	/**
     * 根据会议id 查询问卷下的所有问题与问题选项 
     * @author xilongfei
     * @creation 2017年12月19日
     * @param confid	会议id
     * @param token		登录识别标识
     * @return
     */
	@ResponseBody
	@RequestMapping("/getQnrDetails")
	public Map<String, Object> getQnrDetails(@RequestParam(value = "confid", required = false) String confid,
			@RequestParam(value = "token", required = false) String token) {
		DataMap dataMap = new DataMap();
		try {
			dataMap = qnrService.getQnrDetails(confid, token, 2);
		} catch (EhCacheSessiconException e) {
			e.printStackTrace();
			dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
	        return dataMap.data;
		}
		return dataMap.data;
	}
	
	
	/**
	 * 删除问卷
	 * @author xilongfei
	 * @creation 2017年12月22日
	 * @param qnrid		问卷ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deleteQnrDetails")
	public Map<String, Object> deleteQnrDetails(@RequestParam(value = "qnrid", required = false) String qnrid) {
		DataMap dataMap = qnrService.deleteQnrDetails(qnrid);
		return dataMap.data;
	}
	
   /**
    * 问卷发布
    * @author xilongfei
    * @creation 2017年12月25日
    * @param qnrid	  问卷ID
    * @param isphone 问卷设置: 只能作答一次 1是, 2否
    * @return
    */
	@ResponseBody
	@RequestMapping("/qnrIssue")
	public Map<String, Object> qnrIssue(@RequestParam(value = "qnrid", required = false) String qnrid,
			@RequestParam(value = "isphone", required = false) Integer isphone) {
		DataMap dataMap = qnrService.updateQnrRls(qnrid, isphone);
		return dataMap.data;
	}
}
