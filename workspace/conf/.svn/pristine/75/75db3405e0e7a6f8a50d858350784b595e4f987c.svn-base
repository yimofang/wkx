package net.emof.building.admin.service;

import java.util.Date;
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
import net.emof.building.dao.ConfsTypeMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.ConfsType;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;
import net.emof.building.util.intfc.ToolseSrvIntfc;

/**
 * 会议管理
 * 
 * @author baikun
 * @creation 2017年12月26日
 */
@Service
public class ConfsTypeService extends SqlToolseService implements ToolseSrvIntfc<DataMap, ConfsType, Integer> {

	@Autowired
	private ConfsTypeMapper ctm;
	@Autowired
	private SqlToolsMapper exps;
	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 验证规则注入
	 */
	private DataMap proving = null;

	/**
	 * 验证规则注入
	 */
	public DataMap getProving() {
		return proving;
	}

	/**
	 * 验证规则注入
	 */
	public void setProving(DataMap proving) {
		this.proving = proving;
	}

	
	
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
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin) {

		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
		pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
		pageInfo.setPageSize(Integer.parseInt(limit));
		if (pageInfo.getPage() < 2 || pageInfo.getPage() >= pageInfo.getTotalPage()) {
			pageInfo.setCount(0);
		}

		String tableKey = "obj.id"; // 表主键
		String tableName = " confs_type as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = "  obj.isdelete=1 "; // 条件
		String order = null; // 排序
		if (select != null && select.trim() != "" && !ToolsUtil.isValid(select.trim())) {
			where = where + " and  tname like '%" + select + "%' ";
		}
		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by obj.id desc";
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
	public DataMap pagelist(Integer page, Integer display, String select, String sort, String sortOrder) {
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

		String tableName = " confs_type as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = "  obj.isdelete=1 "; // 条件

		String order = null; // 排序

		if (select != null && select.trim() != "" && !ToolsUtil.isValid(select.trim())) {
			where = where + " and  tname like '%" + select + "%' ";
		}

		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by obj.id desc";
		}

		map = this.pageList(tableName, find, where, order, page, display);

		return map;
	}

	/**
	 * 返回列表
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @return
	 */
	public DataMap getList() {
		DataMap map = new DataMap();
		List<Map<String, Object>> list = null;
		String tableName = " confs_type as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = " isdelete=1 "; // 条件
		String order = null; // 条件
		try {
			list = this.select_sqlstr(this.SqlFormat(tableName, find, where, order));
		} catch (SqlToolsException e) {
			logger.error("【getList异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "无查询信息");
			return map;
		}

		map.addMsg_list(list, 0);
		return map;
	}

	/**
	 * 修改实体
	 * 
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param record
	 * @return
	 */
	@Override
	public DataMap update_obj(ConfsType record) throws UpdateAdmException {
		DataMap map = proving == null ? provinginfo(record) : proving;

		if (record.getId() == null || record.getId() < 1) {
			map.addMsg_diy_obj(record, 1, "修改失败ID不存在");
			return map;
		}
		Integer row = null;
		try {
			if (map.errorJudge()) {
				row = ctm.updateByPrimaryKeySelective(record);
				map.addMsg_obj(record.getId(), 0);
			}
		} catch (Exception e) {
			logger.error("【confs_type修改异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】"
					+ ToolsUtil.pojo_to_Map(record).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(record, 1, "修改失败,请检查添加信息");
			return map;
		}
		return map;
	}

	/**
	 * 添加实体
	 * 
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param record
	 * @return
	 */
	@Override
	public DataMap add_obj(ConfsType record) throws AppendAdmException {
		DataMap map = proving == null ? provinginfo(record) : proving;

		Integer row = null;
		try {
			if (map.errorJudge()) {
				row = ctm.insertSelective(record);
			}
		} catch (Exception e) {
			logger.error("【confs_type添加异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】"
					+ ToolsUtil.pojo_to_Map(record).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(record, 1, "添加失败,请检查添加信息");
			return map;
		}
		if (row > 0) {
			map.addMsg_diy_obj(record.getId(), 0, "添加成功，");
			return map;
		}
		return map;
	}

	/**
	 * 根据ID返回实体信息
	 * 
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param ID
	 * @return
	 */
	@Override
	public DataMap getInfo(Integer ID) {
		DataMap map = new DataMap();
		if (ID == null || !ToolsUtil.isValid(ID + "")) {
			logger.error("【get_info异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID);
			map.addMsg_obj(null, 4);
			return map;
		}
		String tableName = " confs_type as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = " obj.id=" + ID; // 条件

		Map<String, Object> mapinfo;
		try {
			mapinfo = this.selectMap(tableName, find, where);
		} catch (Exception e) {
			logger.error("【getInfo添加异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "无查询信息");
			return map;
		}

		map.addMsg_obj(mapinfo, 0);
		return map;
	}

	/**
	 * 逻辑删除
	 */
//	@Override
//	public DataMap isDelete(Integer ID) throws DeleteAdmException {
//
//		return new DataMap();
//	}
	/**
	 * 逻辑删除
	 * 
	 * @author wkx
	 * @creation 
	 * @param id
	 * @param state
	 * @return
	 * @throws DeleteAdmException
	 */
	@Override
	public DataMap isDelete(Integer id) throws DeleteAdmException {
		Integer ros = ctm.isDelete(id);
		if (ros > 0) {
			return new DataMap(id, 0);
		}
		throw new DeleteAdmException("【逻辑删除数据异常】 输入值为 " + id + " 返回值为 " + ros + " ,信息位置" + this.getClass().getName()
				+ " " + Thread.currentThread().getStackTrace()[1].getMethodName());
	}
	

	/**
	 * 物理删除
	 */
	@Override
	public DataMap del_obj(Integer ID) throws DeleteAdmException {
		try {
			ctm.deleteByPrimaryKey(ID);
		} catch (Exception e) {
			logger.error("【删除异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());

			return new DataMap(null, 5);
		}
		return new DataMap();
	}

	/**
	 * 通用验证
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param record
	 * @return
	 * @throws Exception
	 */
	@Override
	public DataMap provinginfo(ConfsType record) {
		DataMap map = new DataMap(record, 0);
		if (record.getTname() == null || record.getTname().trim().equals("") || record.getTname().trim().length() < 1
				|| !ToolsUtil.isValid(record.getTname().trim()) || record.getTname().length() > 255) {
			map.addMsg_diy_obj(record, 4, "名称格式不正确");
			return map;
		}

		return map;
	}

	/**
	 * 未使用
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param ID
	 * @return
	 * @throws SelectAdmException
	 */
	@Override
	public Map<String, Object> get_info(Integer ID) throws SelectAdmException {
		// TODO Auto-generated method stub
		return null;
	}

}
