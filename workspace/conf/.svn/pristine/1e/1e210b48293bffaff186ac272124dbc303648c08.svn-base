package net.emof.building.web.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.ConfsSubuserMapper;
import net.emof.building.dao.QnrMapper;
import net.emof.building.dao.QnrOptionMapper;
import net.emof.building.dao.QnrRejoinMapper;
import net.emof.building.dao.QnrTitleMapper;
import net.emof.building.model.ConfsSubuser;
import net.emof.building.model.Qnr;
import net.emof.building.model.QnrOptionDetails;
import net.emof.building.model.QnrRejoin;
import net.emof.building.model.QnrTitle;
import net.emof.building.util.DataMap;
import net.emof.building.util.ToolsUtil;

@Service
public class QnrRejoin_web_Service extends SqlToolseService {
	
	// log4j日志
	private final Logger logger = Logger.getLogger(this.getClass());
	
	@Autowired
	private QnrRejoinMapper rejoinMapper;
	@Autowired
	private ConfsSubuserMapper subuserMapper;
	@Autowired
	private QnrMapper qnrMapper;
	@Autowired
	private QnrTitleMapper qnrTitleMapper;
	@Autowired
	private QnrOptionMapper optionMapper;
	
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
	@Transactional(rollbackFor=Exception.class)
	public DataMap insertQnrRejoin(List<QnrRejoin> rejoins, String confid, String qnrid, String phone)throws Exception{
		DataMap datamap = new DataMap();
		if(rejoins==null || rejoins.size() < 1){
			datamap.addMsg_diy_obj(null, 1, "请回答问题,再提交");
			return datamap;
		}
		if(confid==null || confid.trim().equals("")) {
			datamap.addMsg_diy_obj(null, 6, "未找到会议信息");
			return datamap;
		}
		if(qnrid==null || qnrid.trim().equals("")) {
			datamap.addMsg_diy_obj(null, 6, "未找到问卷信息");
			return datamap;
		}
		if(phone==null || phone.trim().equals("")) {
			datamap.addMsg_diy_obj(null, 6, "请填写您的手机号");
			return datamap;
		}
		ConfsSubuser subuser = subuserMapper.selectConfsUserByphone(phone,confid);
		if(subuser == null) {
			datamap.addMsg_diy_obj(null, 6, "你还未报名,不能进行此操作");
			return datamap;
		}
		Qnr qnr = qnrMapper.getQnrByConfid(confid);
		if(qnr==null) {
			datamap.addMsg_diy_obj(null, 6, "该问卷以不存在");
			return datamap;
		}
		if(subuser.getQnr()==1 && qnr!=null && qnr.getIsphone()==1) {
			datamap.addMsg_diy_obj(null, 6, "此问卷调查您已作答");
			return datamap;
		}
		int num = 0;
		for (int i = 0; i < rejoins.size(); i++) {
			rejoins.get(i).setId(ToolsUtil.get_diy_ID());
			rejoins.get(i).setConfsid(confid);
			rejoins.get(i).setCreatetime(new Date());
			rejoins.get(i).setQnrid(qnrid);
			rejoins.get(i).setCsid(subuser.getId());	
			num = rejoinMapper.insertSelective(rejoins.get(i));
			if(num < 1 ) {
				logger.error("【提交问题信息-添加回答信息】,信息位置" + this.getClass().getName()
						+ Thread.currentThread().getStackTrace()[1].getMethodName());
				new Exception("提交问题信息失败");
				datamap.addMsg_diy_list(null, 6, "提交失败,请重试");
				return datamap;
			}
		}
		subuser.setQnr(1);
		num = subuserMapper.updateByPrimaryKeySelective(subuser);
		if(num < 1 ) {
			logger.error("【提交问题信息-修改报名用户设置 】,信息位置" + this.getClass().getName()
					+ Thread.currentThread().getStackTrace()[1].getMethodName());
			new Exception("提交问题信息失败");
			datamap.addMsg_diy_list(null, 6, "提交失败,请重试");
			return datamap;
		}
		qnrMapper.updateAnswerNum(qnrid, qnr.getAnswernum()+1);
		datamap.addMsg_diy_obj(null, 0, "您的信息已提交,感谢您的参与");		
		return datamap;
	}
	
	/**
	 * 根据会议id查询问卷统计
	 * @author xilongfei
	 * @creation 2018年1月17日
	 * @param confid	会议id
	 * @return
	 */
	public DataMap qnrStatistics(String confid){
		DataMap datamap = new DataMap();
		if(confid==null || confid.trim().equals("")) {
			datamap.addMsg_diy_obj(null, 6, "未找到会议信息");
			return datamap;
		}
		Map<String, Object> map = rejoinMapper.qnrStatistics(confid);
		List<QnrTitle> list = qnrTitleMapper.selectQnrTitlelist(confid);
		map.put("titlelist", list);
		datamap.addMsg_map(map, 0);
		return datamap;
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
	public DataMap getAnswerStatistics(String titleid, Integer state, int page, int display) {
		DataMap datamap = new DataMap();
		if(titleid==null || titleid.trim().equals("")) {
			datamap.addMsg_diy_obj(null, 6, "题目标识未找到");
			return datamap;
		}
		if(state==null ) {
			datamap.addMsg_diy_obj(null, 6, "题目类型未确定");
			return datamap;
		}
		if(state==1 || state==2 ) {
			List<QnrOptionDetails> list = optionMapper.getOptionList(titleid);
			if(list.isEmpty()) {
				datamap.addMsg_diy_obj(null, 6, "该题目没有选项信息");
				return datamap;
			}
			for (int i = 0; i < list.size(); i++) {
				int count = list.get(0).getAnswernum().intValue();
					BigDecimal answernum = rejoinMapper.getAnswerCount(list.get(i).getId(), state.intValue());
					if(count == 0) {
						list.get(i).setProportion("0%");
						continue;
					}
					String proportion = answernum.divide(new BigDecimal(count), 2, BigDecimal.ROUND_HALF_UP).
							multiply(new BigDecimal(100)).intValue()+"%";
					list.get(i).setProportion(proportion);
			}
			datamap.addMsg_obj(list, 0);
		}else if(state == 3) { //填空
			datamap = getRejoinAnswer(titleid, page, display);
		}else {
			datamap.addMsg_diy_obj(null, 6, "题目类型未确定");
		}
		return datamap;
	}
	
	
	public DataMap getRejoinAnswer(String titleid, int page, int display) {
		DataMap dataMap = new DataMap();
		// 表关联
        StringBuffer table_name = new StringBuffer(" qnr_rejoin obj "); 
        table_name.append("LEFT JOIN confs_subuser cs ON obj.csid = cs.id ");
        table_name.append("JOIN qnr_title qt ON qt.id = obj.titleid ");
        // 查询字段
        StringBuffer find = new StringBuffer(" obj.answer, cs.realname, qt.fname ");
        // 条件
        StringBuffer where = new StringBuffer("1=1 AND obj.titleid = '" + titleid + "'");
        //排序
        String order = " obj.createtime DESC";
        Map<String, Object> map = this.getListAllPage(table_name.toString(), find.toString(),
                where.toString(), order, page, display);
        map.put("error", 0);
        map.put("msg", "操作成功");
        dataMap.data = map;
        return dataMap;
	}
	
	
	
	
}
