package net.emof.building.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.admin.customEXC.SqlToolsException;
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.dao.AdminLogMapper;
import net.emof.building.dao.ConductMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.AdminLog;
import net.emof.building.model.Conduct;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;
import net.emof.building.util.intfc.ToolseSrvIntfc;

/**
 * 操作日志
 * @author YLS
 * @creation 2018年4月10日
 */
@Service
public class AdminLogService extends SqlToolseService {

	@Autowired
	private SqlToolsMapper exps;
	
	/**
	 * 初始化分页列表
	 * 
	 * @author YLS
	 * @creation 2017年12月18日
	 * @param pageInfo 分页类
	 * @param limit 总页数
	  @param offset 当前页
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
	public Map<String, Object> pagelist(PageInfo pageInfo,String limit, String offset, String select, 
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin) {
		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
		pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
		pageInfo.setPageSize(Integer.parseInt(limit));
		if (pageInfo.getPage() < 2 || pageInfo.getPage() >= pageInfo.getTotalPage()) {
			pageInfo.setCount(0);
		}
		String code = this.get_code(sessiconAdmin.getId()).get("code").toString();
		String tableName = " adminlog as bm  "; // 表名
		String tableKey = "bm.id"; // 表主键
		String find = " bm.id,bm.title,bm.content,bm.name ,bm.createtime "; // 显示字段
		String where = " 1=1  "; // 条件

		String order = null; // 排序

		if (select != null && select.trim() != "" && ToolsUtil.isValid(select.trim())) {
			where = where + " and  bm.title like '%" + select + "%' ";
		}

		if ((agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim()))
				&& (backdate == null || backdate.trim() == "" && ToolsUtil.isValid(backdate.trim()))) {
			where = where + " and  DATE_FORMAT(bm.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}

		if ((backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim()))
				&& (agodate == null || agodate.trim() == "" && ToolsUtil.isValid(agodate.trim()))) {
			where = where + " and  DATE_FORMAT(bm.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}

		if (agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim())) {

			if (backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim())) {

				where = where + " and DATE_FORMAT(bm.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}

		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by bm.id desc";
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myCount", 0);// 总条数
		map.put("tableName", tableName);// 表名
		map.put("tableKey", tableKey);// 表主键ID，不填写order默认以此排序
		map.put("find", find);// 查询结果显示字段
		map.put("pageSize", pageInfo.getPageSize());// 总页数
		map.put("page", pageInfo.getPage());// 当前页
		map.put("where", where);// 条件语句（查询不需要写where）
		map.put("order", order);//排序
		List<Map<String, Object>> list = exps.getPage_json(map);
		// 请求存留 过程 中返回的总条数
		pageInfo.setCount(Integer.parseInt(map.get("myCount").toString()));

		Map<String, Object> map_res = new HashMap<String, Object>();
		// 定义dataTable 基础信息 键名不可更改 控制有约束
		map_res.put("rows", list);
		map_res.put("total", pageInfo.getCount());
		return map_res;
	}

}
