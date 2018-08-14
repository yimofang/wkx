package net.emof.building.web.service;

import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.ConfsSubuserMapper;
import net.emof.building.model.ConfsSubuser;

import net.emof.building.util.DataMap;
import net.emof.building.util.PinYinTool;
import net.emof.building.util.ToolsUtil;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司 FileName: ConfsSubuser_web_Service Author:
 * anshiyuan Date: 2017/12/16 上午9:59 Description: History:
 */
@Service
public class ConfsSubuser_web_Service extends SqlToolseService {

	@Autowired
	private ConfsSubuserMapper confsSubuserMapper;

	// log4j日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 签到列表
	 *
	 * @param confsid
	 *            会议ID
	 * @param state
	 *            0 全部 1 签到 2上传名单
	 * @param select
	 *            模糊查询 手机号 名字
	 * @param page
	 *            页数
	 * @param display
	 *            显示几条
	 * @return
	 */
	public Map<String, Object> getSginList(String confsid, Integer state, String select, Integer page, Integer display) {
		String table_name = " confs_subuser "; //表明
		String find = "id, arrive, realname, phone, confsid, realname, createtime "; //查询字段
		StringBuffer where = new StringBuffer(" isdelete=1 AND confsid='"+confsid+"'"); //条件
		if (state != null && state == 1) {
			where.append(" AND arrive=" + state);
		} else if (state != null && state == 2) {
			where.append(" AND issign=" + state);
		}
		if (select != null && !select.trim().equals("")) {
			where.append(" AND (confs_subuser.phone LIKE '%" + select + "%' OR "
					    + "confs_subuser.realname LIKE '%" + select+ "%')");
		}
		String order = " csletter desc ";
		Map<String, Object> map = this.getListAllPage(table_name, find, where.toString(), 
				order, page, display);
		map.put("error", 0);
		map.put("msg", "操作成功");
		return map;
	}

	
	
	/**
	 * 签到列表导出
	 *
	 * @param confsid
	 *            会议ID
	 * @param state
	 *            0 全部 1 签到 2上传名单
	 * @param select
	 *            模糊查询 手机号 名字
	 * @return
	 */
	public List<Map<String,Object>> getSginExcel(String confsid, Integer state, String select) {
		String table_name = " confs_subuser "; //表明
		String find = "id, arrive, realname, phone, confsid, realname, createtime "; //查询字段
		StringBuffer where = new StringBuffer(" isdelete=1 AND confsid='"+confsid+"'"); //条件
		if (state != null && state == 1) {
			where.append(" AND arrive=" + state);
		} else if (state != null && state == 2) {
			where.append(" AND issign=" + state);
		}
		if (select != null && !select.trim().equals("")) {
			where.append(" AND (confs_subuser.phone LIKE '%" + select + "%' OR "
					    + "confs_subuser.realname LIKE '%" + select+ "%')");
		}
		String order = "ORDER BY csletter DESC";//csletter desc
		List<Map<String, Object>> map = this.selectAll(table_name.toString(), find.toString(), where.toString(), order);

		return map;
	}
	
	
	/**
	 * 签到统计
	 * @param confsid  会议ID
	 * @return
	 */
	public DataMap getSignCount(String confsid) {
		DataMap dataMap = new DataMap();

		if (confsid == null || confsid.trim().equals("")) {
			dataMap.addMsg_diy_obj(null, 6, "未找到会议信息");
			return dataMap;
		}

		StringBuffer table_name = new StringBuffer("confs_subuser");
		StringBuffer find = new StringBuffer("count(*) as total");
		find.append("," + "  (SELECT count(*)" + "   FROM confs_subuser" + "   WHERE isdelete = 1 AND confsid = "
				+ confsid + " AND arrive = 1) AS sgin," + "  (SELECT count(*)" + "   FROM confs_subuser"
				+ "   WHERE isdelete = 1 AND confsid = " + confsid + " AND arrive = 2) AS unsgin");
		StringBuffer where = new StringBuffer("isdelete=1 AND confsid=" + confsid);

		Map<String, Object> map = this.selectMap(table_name.toString(), find.toString(), where.toString());

		dataMap.addMsg_map(map, 0);
		return dataMap;
	}

	/**
	 * 添加报名
	 * 
	 * @author baikun
	 * @creation 2017年12月23日
	 * @param confsid
	 *            会议ID
	 * @param realname
	 *            真实姓名
	 * @param phone
	 *            手机
	 * @param email
	 *            邮箱
	 * @param units
	 *            单位
	 * @param job
	 *            职位
	 * @param issign
	 * @param arrive
	 * @param qnr
	 * @return
	 */
	public DataMap add_info(String id,String confsid, String realname, String phone, String email, String units, String job,
			Integer arrive,Integer issign,  Integer qnr) {
		DataMap dataMap = new DataMap();
		ConfsSubuser confsSubuser = new ConfsSubuser();

		if (confsid == null || confsid.trim().equals("") || confsid.trim().length() < 1
				|| !ToolsUtil.isValid(confsid.trim())) {
			dataMap.addMsg_diy_obj(null, 4, "会议标识不存在");
			return dataMap;
		} else {
			confsSubuser.setConfsid(confsid);
		}

		if (realname == null || realname.trim().equals("") || realname.trim().length() < 1
				|| !ToolsUtil.isValid(realname.trim())) {
			dataMap.addMsg_diy_obj(null, 4, "真实姓名格式不正确");
			return dataMap;
		} else {
			confsSubuser.setRealname(realname);
			PinYinTool pinYinTool = new PinYinTool();
			try {
				char[] b = pinYinTool.toPinYin(realname).toCharArray();
				confsSubuser.setCsletter(b[0] + "");
			} catch (BadHanyuPinyinOutputFormatCombination e) {
				logger.error("【汉字转英文异常】信息位置" + this.getClass().getName() + " "
						+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
						+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
				confsSubuser.setCsletter("");
			}
		}

		if (phone == null || phone.trim().equals("") || phone.trim().length() < 11
				|| !ToolsUtil.isValid(phone.trim())) {
			dataMap.addMsg_diy_obj(null, 4, "手机号格式不正确");
			return dataMap;
		} else {
			confsSubuser.setPhone(phone);
		}

		confsSubuser.setEmail(email);
		confsSubuser.setUnits(units);
		confsSubuser.setJob(job);
		if (arrive == null) {
			// 1签到 2未签到
			arrive = 2;
		}
		if (qnr == null) {
			// 1已答 2未答
			qnr = 2;
		}
		if (issign == null) {
			// 1是报名 2不是
			issign = 1;
		}
		confsSubuser.setArrive(arrive);//qiandao
		confsSubuser.setQnr(qnr);
		confsSubuser.setIssign(issign);//baoming
		confsSubuser.setId(ToolsUtil.get_diy_ID());
		// 报名列表
		Map<String, Object> confssubuserinfo = this.selectMap("confs_subuser", "*",
				" confsid=\'" + confsid + "\'  and phone=" + phone);
		if (confssubuserinfo != null) {
			if (confssubuserinfo.get("phone").toString().equals(phone)) {
				dataMap.addMsg_diy_obj(null, 1, "已经报名请勿重复报名");
				return dataMap;
			}
		}
		// 当前会议
		Map<String, Object> confsinfo = this.selectMap("confs",
				"*,unix_timestamp(shstart) as startstr ,unix_timestamp(shend) as endstr", " id= \'" + confsid+" \'");
		Integer row = 0;
		/*if (Integer.parseInt(confsinfo.get("sign").toString()) == 2) {
			dataMap.addMsg_diy_obj(null, 1, "报名已经结束");
			return dataMap;
		}*/
		try {
			Date date = new Date();	
//			if (date.after(new Date(Long.parseLong(confsinfo.get("startstr").toString() + "000")))
//					&& date.before(new Date(Long.parseLong(confsinfo.get("endstr").toString() + "000")))) {
				// 添加报名
				confsSubuser.setCreatetime(new Date());
				if(null==id||id.equals("")) {
					row = confsSubuserMapper.insertSelective(confsSubuser);
				}else {
					confsSubuser.setId(id);
					row = confsSubuserMapper.updateByPrimaryKeySelective(confsSubuser);
				}
				
				if (row <= 0) {
					dataMap.addMsg_diy_obj(null, 1, "报名失败，请查检报名时间");
					return dataMap;
				}else {
					dataMap.addMsg_diy_obj(confsSubuser.getId(), 0, "操作成功!!");
					return dataMap;
				}
			//}
		} catch (Exception e) {
			logger.error("【报名异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
			dataMap.addMsg_diy_obj(null, 1, "操作失败，数据异常");
			return dataMap;
		}

		

		//return dataMap;
	}
	
	
	
	/**
	 * 获取信息
	 * 
	 * @author wkx
	 * @creation 2017年12月25日
	 * @param id
	 * @return confs_subuser表 
	 */
	public DataMap getConfsSubuserInfo(String id) {
		DataMap dataMap = new DataMap();
		ConfsSubuser cs = confsSubuserMapper.selectByPrimaryKey(id);
		dataMap.addMsg_diy_obj(cs, 0, "获取信息成功！");
		return dataMap;
	}
	
	/**
	 * 删除信息
	 * 
	 * @author wkx
	 * @creation 2018年6月21日
	 * @param id
	 * @return confs_subuser表 
	 */
	public DataMap deleteConfsSubuserInfo(String id) {
		DataMap dataMap = new DataMap();
		int cs = confsSubuserMapper.isDelete(id);
		if(cs>0) {
			dataMap.addMsg_diy_obj(id, 0, "删除信息成功！");
		}else {
			dataMap.addMsg_diy_obj(id, 6, "删除信息未成功！");
		}
		
		return dataMap;
	}
	/**
	 * 签到
	 * 
	 * @author baikun
	 * @creation 2017年12月25日
	 * @param confsid
	 *            会议ID
	 * @param realname
	 *            真实姓名
	 * @param phone
	 *            手机
	 * @return
	 */
	public DataMap signsubuser(String confsid, String realname, String phone) {
		DataMap dataMap = new DataMap();
		Map<String, Object> info = null;
		ConfsSubuser confsSubuser = new ConfsSubuser();
		if (phone == null || phone.trim().equals("") || phone.trim().length() < 11
				|| !ToolsUtil.isValid(phone.trim())) {
			dataMap.addMsg_diy_obj(null, 1, "手机格式不正确");
			return dataMap;
		}
		if (confsid == null || confsid.trim().equals("") || confsid.trim().length() < 1
				|| !ToolsUtil.isValid(confsid.trim())) {
			dataMap.addMsg_diy_obj(null, 1, "数据异常，会议不存在");
			return dataMap;
		}
		try {
//			if (realname != null) {
//				info = this.selectMap("confs_subuser", "*",
//						" confsid= \'" + confsid + "\' and  realname=\'" + realname + "\'  and phone=" + phone);
//			} else {
				info = this.selectMap("confs_subuser", "*", " confsid=  \'" + confsid + "\' and  phone=" + phone);
//			}
		if(null==info||info.equals("")) {
			dataMap.addMsg_diy_obj(info, 1, "没有找到本人信息！");
			return dataMap;
		}
		
			confsSubuser.mapsetInfo(info);
			if (confsSubuser.getArrive() == 1) {
				dataMap.addMsg_diy_obj(info, 1, "认证签到成功");
				return dataMap;
			}
		} catch (Exception e) {
			logger.error("【签到异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
			dataMap.addMsg_diy_obj(null, 1, "签到失败,请检查签到信息");
			return dataMap;
		}
		Integer row = 0;
		// 1 签到 2未签到
		confsSubuser.setArrive(1);
		try {
			row = confsSubuserMapper.updateByPrimaryKeySelective(confsSubuser);
			if (row != 1) {
				dataMap.addMsg_diy_obj(null, 1, "操作失败，数据异常");
			}
		} catch (Exception e) {
			logger.error("【签到异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
			dataMap.addMsg_diy_obj(null, 1, "操作失败，数据异常");
			return dataMap;
		}
		return dataMap;
	}
	
	/**
	 * 手动报名(发布者-添加名单)
	 * @author xilongfei
	 * @creation 2017年12月23日
	 * @param confsid		会议ID
	 * @param realname		报名姓名
	 * @param phone			手机号
	 * @param units			所在单位
	 * @param email			邮箱
	 * @param job			职位
	 * @param arrive		是否签到  1是  2否
	 * @return
	 * @throws BadHanyuPinyinOutputFormatCombination 
	 */
	public DataMap add_info(String confsid, String realname, String phone, String email, String units, String job,
			 Integer arrive,Integer issign) throws BadHanyuPinyinOutputFormatCombination {
		DataMap dataMap = new DataMap();
		if (confsid == null || confsid.trim().equals("") || confsid.trim().length() < 1
				|| !ToolsUtil.isValid(confsid.trim())) {
			dataMap.addMsg_diy_obj(null, 6, "会议标识不存在");
			return dataMap;
		}
		if (realname == null || realname.trim().equals("") || realname.trim().length() < 1
				|| !ToolsUtil.isValid(realname.trim())) {
			dataMap.addMsg_diy_obj(null, 6, "");
			return dataMap;
		} 
		if (phone == null || phone.trim().equals("") || phone.trim().length() < 11
				|| !ToolsUtil.isValid(phone.trim())) {
			dataMap.addMsg_diy_obj(null, 6, "手机号格式不正确");
			return dataMap;
		}
		Map<String, Object> subuser = this.selectMap("confs_subuser", "*",
				" confsid='" + confsid + "' and phone= '"+ phone+"'");
		if(subuser != null) {
			dataMap.addMsg_diy_obj(null, 6, "该报名信息已经存在,请勿重复提交");
			return dataMap;
		}
		String csletter = new PinYinTool().toPinYin(realname).substring(0, 1);//姓名首字母
		ConfsSubuser confsSubuser = new ConfsSubuser(ToolsUtil.get_diy_ID(), confsid, arrive, 2,
				realname, phone, csletter, issign);
		confsSubuser.setJob(job);
		confsSubuser.setUnits(units);
		confsSubuser.setEmail(email);
		int row = confsSubuserMapper.insertSelective(confsSubuser);
		if (row < 1) {
			dataMap.addMsg_diy_obj(null, 6, "添加失败,请重试");
		}else {
			dataMap.addMsg_diy_obj(null, 0, "已添加");
		}
		return dataMap;
	}
}