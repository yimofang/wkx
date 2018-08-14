package net.emof.building.admin.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.dao.ConfsSubuserMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;

/**
 * 报名
 * 
 * @author baikun
 * @creation 2017年12月26日
 */
@Service
public class ConfsSubuserService extends SqlToolseService {

	@Autowired
	private ConfsSubuserMapper csm;
	@Autowired
	private SqlToolsMapper exps;

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
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin,
			String confsid, Integer opt){
		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
		pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
		pageInfo.setPageSize(Integer.parseInt(limit));
		if (pageInfo.getPage() < 2 || pageInfo.getPage() >= pageInfo.getTotalPage()) {
			pageInfo.setCount(0);
		}


		String tableKey = "obj.id"; // 表主键
		
		String tableName = " confs_subuser as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = "  1=1 "; // 条件  180115161203mEHik3ul
		where += " and  obj.confsid='" + confsid+"'";
		String order = null; // 排序
		if (select != null && select.trim() != "" && !ToolsUtil.isValid(select.trim())) {

		}

		if (opt != null && opt != 0) {
			// 排序
			if (opt == 1) {// 签到
				where += " and arrive=1 ";
			}
			if (opt == 2) {// 未签到
				where += " and arrive=2 ";
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
		
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myCount", pageInfo.getCount());// 总条数
		map.put("tableName", tableName);// 表名
		System.out.println("tableName=" + tableName);
		map.put("tableKey", tableKey);// 表主键ID，不填写order默认以此排序
		map.put("find", find);// 查询结果显示字段
		System.out.println("find=" + find);
		map.put("pageSize", pageInfo.getPageSize());// 总页数
		map.put("page", pageInfo.getPage());// 当前页
		System.out.println("where=" + where);
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
			String backdate, Integer opt, String confsid) {
		DataMap map = null;

		if (page == null) {
			page = 1;
		}
		if (display == null) {
			display = 5;
		}
		if ((page != null && !ToolsUtil.isValid(page + "")) || (display != null && !ToolsUtil.isValid(display + ""))) {
			return new DataMap(null, 4);
		}

		String tableName = " confs_subuser as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = "  1=1 "; // 条件
		where += " and  obj.confsid=" + confsid;
		String order = null; // 排序
		if (select != null && select.trim() != "" && !ToolsUtil.isValid(select.trim())) {

		}

		if (opt != null && opt != 0) {
			// 排序
			if (opt == 1) {// 签到
				where += " and arrive=1 ";
			}
			if (opt == 2) {// 未签到
				where += " and arrive=2 ";
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

	
	
	
	public List<Map<String, Object>> getlist(String confsid) {
		String tableName = " confs_subuser as obj "; // 表名
		String find = " obj.* "; // 显示字段
		find+=",if(obj.arrive=1,'签到','未签到') as isarrive"; //签到
		find+=",if(obj.qnr=1,'已答','未答') as isqnr";
		String where = "  1=1 "; // 条件
		where += " and  obj.confsid='"+confsid+"'";
		return this.selectAll(tableName, find, where, null);
	}

}
