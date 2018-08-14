package net.emof.building.admin.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.emof.building.dao.ConfsMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;


/**
 * 会议管理
 * 
 * @author baikun
 * @creation 2017年12月26日
 */
@Service
public class ConfsService extends SqlToolseService {

	@Autowired
	private SqlToolsMapper exps;

	@Autowired
	private ConfsMapper cm;

	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	
	
	
	/**
	 * bootstrap_table 分页查询、排序 方法
	 * @author duyuwei
	 * @creation 2017.3.17
	 * @param pageInfo 分页类
	 * @param limit 总页数
	 * @param offset 当前页
	 * @param select 模糊查询
	 * @param sort 排序列名
	 * @param sortOrder 排序规则
	   @param agodate 开始日期
	   @param backdate 结束日期
	 * @param sessiconAdmin  当前用户
	 * @return
	 */
	public Map<String, Object> bootstrap_table(PageInfo pageInfo, String limit, String offset, String select,
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin,Integer opt) {

		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
		pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
		pageInfo.setPageSize(Integer.parseInt(limit));
		if (pageInfo.getPage() < 2 || pageInfo.getPage() >= pageInfo.getTotalPage()) {
			pageInfo.setCount(0);
		}

		String tableKey = "obj.id"; // 表主键
		String tableName = " confs as obj "; // 表名
		tableName += " LEFT JOIN users as u on u.id=obj.userid ";
		tableName += " LEFT JOIN organiz as o on u.organizid=o.id ";
		tableName += " join confs_type as t on t.id=obj.type ";
		String find = " obj.* "; // 显示字段
		find += ",t.tname"; // 分类
		find += ",u.realname"; // 真实姓名
		find += ",o.name";// 分组
		String where = "  obj.state=1 "; // 条件
		String order = null; // 排序
		if (opt != null && opt != 0) {
			// 排序
			if (opt == 1) {// 报名中
				where += " and obj.sign=1  and  DATE_FORMAT(obj.shstart, '%Y-%m-%d %h:%i:%s')<DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')"
						+" and  DATE_FORMAT(obj.shend, '%Y-%m-%d %h:%i:%s')>DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')";
			}
			if (opt == 2) {// 进行中
				where += " and  DATE_FORMAT(obj.bhstart, '%Y-%m-%d %h:%i:%s')<DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')"
						+" and  DATE_FORMAT(obj.bhend, '%Y-%m-%d %h:%i:%s')>DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')";
			}
			if (opt == 3) {// 已结束
			where += " and  DATE_FORMAT(obj.bhend, '%Y-%m-%d %h:%i:%s')<DATE_FORMAT('"
					+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')";
			}
		}
		if (select != null && select.trim() != "" && ToolsUtil.isValid(select.trim())) {
			where = where + " and  obj.cname like '%" + select + "%' ";
		}
		if ((agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim()))
				&& (backdate == null || backdate.trim() == "" && ToolsUtil.isValid(backdate.trim()))) {
			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}

		if ((backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim()))
				&& (agodate == null || agodate.trim() == "" && ToolsUtil.isValid(agodate.trim()))) {
			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}

		if (agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim())) {

			if (backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim())) {

				where = where + " and DATE_FORMAT(obj.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}
		
//		if (agodate != null && backdate != null && ToolsUtil.isValid(agodate.trim()) && ToolsUtil.isValid(backdate.trim())) {
//			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')>=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')"
//					+" and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')<DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
//		}else {
//			if (agodate != null && ToolsUtil.isValid(agodate.trim())) {
//				where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')>=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
//			}
//			if (backdate != null && ToolsUtil.isValid(backdate.trim())) {
//				where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')<=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
//			}
//		}

		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by obj.createtime desc";
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myCount", pageInfo.getCount());// 总条数
		map.put("tableName", tableName);// 表名
		map.put("tableKey", tableKey);// 表主键ID，不填写order默认以此排序
		map.put("find", find);// 查询结果显示字段
		map.put("pageSize", pageInfo.getPageSize());// 总页数
		map.put("page", pageInfo.getPage());// 当前页
		map.put("where", where);// 条件语句（查询不需要写where）
		map.put("order", order);//排序
		List<Map<String, Object>> list = this.getPage_json(map);
		// 请求存留 过程 中返回的总条数
		pageInfo.setCount(Integer.parseInt(map.get("myCount").toString()));

		Map<String, Object> map_res = new HashMap<String, Object>();
		// 定义dataTable 基础信息 键名不可更改 控制有约束
		map_res.put("rows", list);
		map_res.put("total", pageInfo.getCount());
		return map_res;
	}
	
	
	/**
	 * 分页查询  
	 * @author wkx
	 * @see 2018-4-9
	 * @param map
	 * @return map
	 */
	public List<Map<String, Object>> getPage_json(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return exps.getPage_json(map);
	}	
	
	/**
	 * 初始化分页列表
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param page
	 * @param display
	 * @param select
	 * @param sort
	 *            排序字段
	 * @param sortOrder
	 * @param agodate
	 *            开始日期
	 * @param backdate
	 *            结束日期
	 * @param sessiconAdmin
	 *            当前用户
	 * @return
	 */
	public DataMap pagelist(Integer page, Integer display, String select, String sort, String sortOrder, String agodate,
			String backdate, Integer opt, Users sessiconAdmin) {
		DataMap map = null;
		if (page == null) {
			page = 1;
		}
		if (display == null) {
			display = 10;
		}
		if ((page != null && !ToolsUtil.isValid(page + "")) || (display != null && !ToolsUtil.isValid(display + ""))) {
			return new DataMap(null, 4);
		}

		String code = this.get_code(sessiconAdmin.getId()).get("code").toString();
		String tableName = " confs as obj "; // 表名
		tableName += " LEFT JOIN users as u on u.id=obj.userid ";
		tableName += " LEFT JOIN organiz as o on u.organizid=o.id ";
		tableName += " join confs_type as t on t.id=obj.type ";
		String find = " obj.* "; // 显示字段
		find += ",t.tname"; // 分类
		find += ",u.realname"; // 真实姓名
		find += ",o.name";// 分组
		String where = "  obj.state=1 "; // 条件
		String order = null; // 排序
		if (select != null && select.trim() != "" && !ToolsUtil.isValid(select.trim())) {
			where = where + " and  obj.cname like '%" + select + "%' ";
		}

		
		if (opt != null && opt != 0) {
			// 排序
			if (opt == 1) {// 报名中
				where += " and  DATE_FORMAT(obj.shstart, '%Y-%m-%d %h:%i:%s')=DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')";
			}
			if (opt == 2) {// 进行中
				where += " and  DATE_FORMAT(obj.bhstart, '%Y-%m-%d %h:%i:%s')=DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')";
			}
			if (opt == 3) {// 已结束
				where += " and  DATE_FORMAT(obj.bhend, '%Y-%m-%d %h:%i:%s')=DATE_FORMAT('"
						+ ToolsUtil.date_convert_str(new Date(), 2) + "', '%Y-%m-%d %h:%i:%s')";
			}
		}
		if ((agodate != null && agodate.trim() != "") && (backdate == null || backdate.trim() == "")) {
			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}

		if ((backdate != null && backdate.trim() != "") && (agodate == null || agodate.trim() == "")) {
			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}

		if (agodate != null && agodate.trim() != "" && !ToolsUtil.isValid(agodate.trim())) {

			if (backdate != null && backdate.trim() != "" && !ToolsUtil.isValid(backdate.trim())) {

				where = where + " and DATE_FORMAT(obj.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}
		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by obj.createtime desc";
		}
		map = this.pageList(tableName, find, where, order, page, display);
		return map;
	}

	/**
	 * 返回 报名 签到 未签到 数据
	 * 
	 * @author baikun
	 * @creation 2017年12月28日
	 * @param confsid
	 * @return
	 */
	public DataMap getsj(String confsid) {
		DataMap dataMap = new DataMap();
		String find = " "; // 显示字段
		find += " ( select  count(*) from confs_subuser where confsid='"+confsid+"' ) as bm ";
		find += " ,( select  count(*) from confs_subuser where confsid='"+confsid+"' and arrive=1 ) as qd ";
		find += " ,( select  count(*) from confs_subuser where confsid='"+confsid+"' and arrive=2 ) as wqd ";
		Map<String, Object> map = null;
		try {
			map = exps.executeSql(" select " + find).get(0);
		} catch (Exception e) {
			logger.error("【getsj异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
			dataMap.addMsg_diy_obj(null, 5, "无查询信息");
			return dataMap;
		}
		dataMap.addMsg_map(map, 0);
		return dataMap;
	}

	
	/**
	 * 返回签到图片
	 * @author baikun
	 * @creation 2017年12月28日
	 * @param confsid
	 * @return
	 */
	public DataMap qdimg(String confsid) {
		DataMap dataMap = new DataMap();
		Map<String, Object> map = null;
		try {
			map = exps.executeSql(" select  imgs from  confs_back  where confsid=\'" + confsid + "\'").get(0);
		} catch (Exception e) {
			logger.error("【getsj异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
			dataMap.addMsg_diy_obj(null, 5, "无查询信息");
			return dataMap;
		}
		dataMap.addMsg_map(map, 0);
		return dataMap;
	}

}
