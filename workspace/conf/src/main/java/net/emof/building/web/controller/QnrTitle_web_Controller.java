package net.emof.building.web.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.util.DataMap;
import net.emof.building.web.service.QnrTitle_web_Service;

/**
 * 问卷问题
 * @author xilongfei
 * @creation 2017年12月16日
 */
@Controller
@RequestMapping("/qnrTitle_web")
public class QnrTitle_web_Controller {
	
	@Autowired
	private QnrTitle_web_Service qnrTitleService;
	
	
	
	
	/**
     * 添加问卷wkx
     *
     * @param confsid 会议ID
     * @param token   用户token
     * @param qnrid   问卷ID
     * @param rls   发布状态
     * @param tstate1	问题类型   1单选 
	 * @param tstate2	问题类型   2多选  
	 * @param tstate3	问题类型   3填空
     * @return
     * @author anshiyuan
     * @method error = 0  添加成功
     * 
     * 
http://192.168.2.220:8080/conf/qnrTitle_web/addTitleInfoPc.do?confsid=180129085908jxC9ESSS&token=180626152859266ONI4PFG82GSGkOhkb&qnrid=180116151522SsiOtQNE&tstate1=[{"id":"180626164820C4HngXq9","name":"单选名","isitem":"1","options":[{"oid":"1806261648209xWdQG15","option":"单1"},{"oid":"180626164820wvYP2ZR1","option":"单2"}]}]&tstate2=[{"id":"180626164820cUoDF3Ys","name":"多选名","isitem":"1","qnrmin":"1","qnrmax":"8","options":[{"oid":"180626164820v3tZZWEX","option":"多1"},{"oid":"180626164820NU9BF0TU","option":"多2"}]}]&tstate3=[{"id":"180626164820Dw7yRSQO","name":"填空名2","isitem":"1"}]
http://192.168.2.220:8080/conf/qnrTitle_web/addTitleInfoPc.do?confsid=180129085908jxC9ESSS&token=180626152859266ONI4PFG82GSGkOhkb&qnrid=180116151522SsiOtQNE&tstate1=[{"id":"","name":"单选名称","isitem":"1","options":[{"oid":"","option":"单选1"},{"oid":"","option":"单选2"}]}]&tstate2=[{"id":"","name":"多选名称","isitem":"1","qnrmin":"1","qnrmax":"8","options":[{"oid":"","option":"多选1"},{"oid":"","option":"多选2"}]}]&tstate3=[{"id":"","name":"填空","isitem":"1"}]
http://192.168.2.220:8080/conf/qnrTitle_web/addTitleInfoPc.do?confsid=180129085908jxC9ESSS&token=18062616461926rntSVrTz297p9Gqbo5&qnrid=180116151522SsiOtQNE&tstate1=[{%22id%22:%22%22,%22name%22:%22%E5%8D%95%E9%80%89%E5%90%8D%E7%A7%B0%22,%22isitem%22:%221%22,%22options%22:[{%22oid%22:%22%22,%22option%22:%22%E5%8D%95%E9%80%891%22},{%22oid%22:%22%22,%22option%22:%22%E5%8D%95%E9%80%892%22}]}]&tstate2=[{%22id%22:%22%22,%22name%22:%22%E5%A4%9A%E9%80%89%E5%90%8D%E7%A7%B0%22,%22isitem%22:%221%22,%22qnrmin%22:%221%22,%22qnrmax%22:%228%22,%22options%22:[{%22oid%22:%22%22,%22option%22:%22%E5%A4%9A%E9%80%891%22},{%22oid%22:%22%22,%22option%22:%22%E5%A4%9A%E9%80%892%22}]}]&tstate3=[{%22id%22:%22%22,%22name%22:%22%E5%A1%AB%E7%A9%BA%22,%22isitem%22:%221%22}]
http://192.168.2.220:8080/conf/qnrTitle_web/addTitleInfoPc.do?confsid=180129085908jxC9ESSS&token=180626152859266ONI4PFG82GSGkOhkb&rls=1&qnrid=180116151522SsiOtQNE&tstate1=[{"id":"","name":"单选名称","isitem":"1","options":[{"oid":"","option":"单选1"},{"oid":"","option":"单选2"}]}]&tstate2=[{"id":"","name":"多选名称","isitem":"1","qnrmin":"1","qnrmax":"8","options":[{"oid":"","option":"多选1"},{"oid":"","option":"多选2"}]}]&tstate3=[{"id":"","name":"填空","isitem":"1"}]
     *
     */
    @ResponseBody
    @RequestMapping(value = "/addTitleInfoPc")
    public Map<String, Object> addTitleInfoPc(@RequestParam(value = "confsid", required = false) String confsid,
            @RequestParam(value = "token", required = false) String token,
            @RequestParam(value = "qnrid", required = false) String qnrid,
            @RequestParam(value = "rls", required = false) String rls,
            @RequestParam(value = "fname", required = false) String fname,
            @RequestParam(value = "qbrief", required = false) String qbrief,
    		@RequestParam(value = "tstate1", required = false) String tstate1,
    		@RequestParam(value = "tstate2", required = false) String tstate2,
    		@RequestParam(value = "tstate3", required = false) String tstate3) {
    	 Map<String, Object> map = new HashMap<>();
    	 try {
			map= qnrTitleService.addTitleInfoPc(confsid, token, tstate1, tstate2, tstate3, qnrid,rls,fname,qbrief);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return map;
    }
    
	/**
	 * 添加问题与问题选项
	 * @author xilongfei
	 * @creation 2017年12月16日
	 * @param token		用户识别标识	
	 * @param name		问题名称
	 * @param tstate	问题类型  1单选 2多选  3填空
	 * @param qnrid		问卷id
	 * @param confid	会议id
	 * @param qnrmin	最少选项(多选使用)
	 * @param qnrmax	最多选项(多选使用)
	 * @param isitem	是否必答 1必答, 2选答
	 * @param options	问题选项信息,多个已","相隔
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/addTitleInfo")
	public Map<String, Object> addTitleInfo(@RequestParam(value = "token", required = false) String token,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "tstate", required = false) Integer tstate,
			@RequestParam(value = "qnrid", required = false) String qnrid,
			@RequestParam(value = "confid", required = false) String confid,
			@RequestParam(value = "qnrmin", defaultValue="0") Integer qnrmin, 
			@RequestParam(value = "qnrmax", defaultValue="0") Integer qnrmax, 
			@RequestParam(value = "isitem", defaultValue="2") Integer isitem,
			@RequestParam(value = "options", required = false) String options) {
		DataMap dataMap = new DataMap();
		try {
			dataMap = qnrTitleService.addTitleInfo(token, name, tstate, qnrid, confid, qnrmin, qnrmax, isitem, options);
		} catch (EhCacheSessiconException e){
			e.printStackTrace();
			dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
	        return dataMap.data;
		} catch (Exception e) {
			e.printStackTrace();
			dataMap.addMsg_diy_list(null, 6, "创建问题失败,请重试");
	        return dataMap.data;
		}
		return dataMap.data;
	}
	
	/**
	 * 查询问题与问题选项信息
	 * @author xilongfei
	 * @creation 2017年12月19日
	 * @param titleid	问题id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getTitleInfo")
	public Map<String, Object> addTitleInfo(@RequestParam(value = "titleid", required = false) String titleid) {
		DataMap dataMap = qnrTitleService.getTitleInfo(titleid);
		return dataMap.data;
	}
	
	/**
	 * 修改问题与问题选项信息
	 * @author xilongfei
	 * @creation 2017年12月22日
	 * @param titleid	问题ID
	 * @param name		问题名称
	 * @param tstate	问题类型 1单选, 2多选, 3填空
	 * @param qnrmin	最少选项(多选使用)
	 * @param qnrmax	最多选项(多选使用)
	 * @param isitem	是否必答 1必答, 2选答
	 * @param options	问题选项信息,多个已","相隔
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/alterTitleInfo")
	public Map<String, Object> alterTitleInfo(@RequestParam(value = "titleid", required = false) String titleid,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "tstate", required = false) Integer tstate,
			@RequestParam(value = "qnrmin", defaultValue="0") Integer qnrmin, 
			@RequestParam(value = "qnrmax", defaultValue="0") Integer qnrmax, 
			@RequestParam(value = "isitem", defaultValue="2") Integer isitem,
			@RequestParam(value = "options", required = false) String options) {
		DataMap dataMap = new DataMap();
		try {
			dataMap = qnrTitleService.updateTitleInfo(titleid, name, tstate, qnrmin, qnrmax, isitem, options);
		} catch (Exception e) {
			e.printStackTrace();
			dataMap.addMsg_diy_obj(null, 6, "修改失败,请重试");
            return dataMap.data;
		}
		return dataMap.data;
	}
	
	/**
	 * 删除问题信息
	 * @author xilongfei
	 * @creation 2017年12月22日
	 * @param titleid	问题ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deleteTitleDetails")
	public Map<String, Object> deleteTitleDetails(@RequestParam(value = "titleid", required = false) String titleid) {
		DataMap dataMap = qnrTitleService.deleteTitleDetails(titleid);
		return dataMap.data;
	}
}
