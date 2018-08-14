package net.emof.building.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.emof.building.util.DataMap;
import net.emof.building.model.AnswerDetails;
import net.emof.building.web.service.QnrRejoin_web_Service;

/**
 * 会议问卷提交
 * @author xilongfei
 * @creation 2017年12月25日
 */
@Controller
@RequestMapping("/rejoin_web")
public class QnrRejoin_web_Controller {
	
	@Autowired
	private QnrRejoin_web_Service rejoinService;

	
	/**
	 * 提交会议问题信息
	 * @author xilongfei
	 * @creation 2017年12月25日
	 * @param rejoins	问题信息集合
	 * @param confid	会议ID
	 * @param qnrid		问卷ID
	 * @param phone		手机号
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/submitAnswers")
	public Map<String, Object> submitAnswers(@RequestBody AnswerDetails answers ) {
		DataMap datamap = new DataMap();
		try {
			datamap = rejoinService.insertQnrRejoin(answers.getRejoins(), answers.getConfid(), answers.getQnrid(),
					answers.getPhone());
		} catch (Exception e) {
			e.printStackTrace();
			return datamap.data;
		}
		return datamap.data;
	}
	
	/**
	 * 根据会议id查询问卷统计
	 * @author xilongfei
	 * @creation 2018年1月17日
	 * @param confid	会议id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/qnrStatistics")
	public Map<String, Object> qnrStatistics(@RequestParam(value = "confid", required = false) String confid){
		DataMap datamap = rejoinService.qnrStatistics(confid);
		return datamap.data;
	}
	
	/**
	 * 根据题目id查询题目下选项统计信息
	 * @author xilongfei
	 * @creation 2018年1月17日
	 * @param titelid   题目id
	 * @param state 	题目类型( 1单选 2 多选 3 填空 )
	 * @param page		当前页
	 * @param display	每页显示条数
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getAnswerStatistics")
	public Map<String, Object> getAnswerStatistics(@RequestParam(value = "titleid", required = false) String titleid,
			@RequestParam(value = "state", required = false) Integer state,
			@RequestParam(value = "page", defaultValue="1") Integer page,
			@RequestParam(value = "display", defaultValue="10") Integer display){
		DataMap datamap = rejoinService.getAnswerStatistics(titleid, state, page, display);
		return datamap.data;
	}
	

}
