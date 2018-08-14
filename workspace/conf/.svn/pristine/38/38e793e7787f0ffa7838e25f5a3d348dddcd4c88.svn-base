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
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.dao.UsersMapper;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.intfc.ToolseSrvIntfc;

@Service
public class AdminUsersService extends SqlToolseService implements ToolseSrvIntfc<DataMap, Users, Integer> {

	@Autowired
	private UsersMapper um;
	@Autowired
	private SqlToolsMapper exps;
	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * bootstrap_table 分页查询、排序 方法
	 * 
	 * @param pageInfo分页类
	 * @param limit
	 *            总页数
	 * @param offset
	 *            当前页
	 * @param search
	 *            Bootstrap Table 传递参数
	 * @param sort
	 *            排序列名
	 * @param sortOrder
	 *            排序规则
	 * @param agodate
	 *            开始日期
	 * @param backdate
	 *            结束日期
	 * @return map
	 */
	public Map<String, Object> bootstrap_table(Integer page, Integer display, String select, String sort,
			String sortOrder, String agodate, String backdate, String opt, Integer organizid, Users sessiconAdmin) {

		String code = this.get_code(sessiconAdmin.getId()).get("code").toString();
		String tableName = "users as u LEFT JOIN (SELECT organiz.id as oid,organiz.* from organiz where isdelete=1) as o on u.organizid=o.id"; // 表名
		String find = " * "; // 显示字段
		find += " ,(select powername from powers where id=u.powerid and isdelete=1) as power";
		String where = " 1=1 and u.isdelete=1 and u.id<>" + sessiconAdmin.getId() + "  and  o.code like \'" + code
				+ "%\'  and  o.code<> \'" + code + "\'"; // 条件

		if (sessiconAdmin.getPowerid() == 1) {
			// 如果是 超级管理员 就显示被删除的信息
			where = " 1=1 and   u.id<>" + sessiconAdmin.getId() + "  and  o.code like \'" + code
					+ "%\' and  o.code<> \'" + code + "\'"; // 条件
		}

		String order = null; // 排序

		if (opt != null && !opt.equals("n")) {

			where = where + " and  state=" + opt;
		}

		if (select != null && select.trim() != "") {
			where = where + " and  realname like '%" + select + "%' ";
		}

		if (organizid != null && organizid > 0) {
			where = where + " and  organizid =" + organizid + "%' ";
		}

		if ((agodate != null && agodate.trim() != "") && (backdate == null || backdate.trim() == "")) {
			where = where + " and  DATE_FORMAT(u.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}

		if ((backdate != null && backdate.trim() != "") && (agodate == null || agodate.trim() == "")) {
			where = where + " and  DATE_FORMAT(u.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}

		if (agodate != null && agodate.trim() != "") {

			if (backdate != null && backdate.trim() != "") {

				where = where + " and DATE_FORMAT(u.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}
		// sort 排序 字段 sortOrder 排序规则 asc desc
		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by u.id desc";
		}

		return this.pageList(tableName, find, where, order, page, display).data;
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
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin,
			String opt,Integer organizid) {
		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
		pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
		pageInfo.setPageSize(Integer.parseInt(limit));
		if (pageInfo.getPage() < 2 || pageInfo.getPage() >= pageInfo.getTotalPage()) {
			pageInfo.setCount(0);
		}
		
		
		
		String tableKey = "u.id"; // 表主键
		String code = this.get_code(sessiconAdmin.getId()).get("code").toString();
		String tableName = "users as u LEFT JOIN (SELECT organiz.id as oid,organiz.* from organiz where isdelete=1) as o on u.organizid=o.id"; // 表名
		String find = " * "; // 显示字段
		find += " ,(select powername from powers where id=u.powerid and isdelete=1) as power";
		String where = " 1=1 and u.isdelete=1 and u.id<>" + sessiconAdmin.getId() + "  and  o.code like \'" + code
				+ "%\'  and  o.code<> \'" + code + "\'"; // 条件

		/*if (sessiconAdmin.getPowerid() == 1) {
			// 如果是 超级管理员 就显示被删除的信息
			where = " 1=1 and   u.id<>" + sessiconAdmin.getId() + "  and  o.code like \'" + code
					+ "%\' and  o.code<> \'" + code + "\'"; // 条件
		}*/

		String order = null; // 排序

		if (opt != null && !opt.equals("n")) {

			where = where + " and  state=" + opt;
		}

		if (select != null && select.trim() != "") {
			where = where + " and  realname like '%" + select + "%' ";
		}

		if (organizid != null && organizid > 0) {
			where = where + " and  organizid =" + organizid + "%' ";
		}
		if ((agodate != null && agodate.trim() != "") && (backdate == null || backdate.trim() == "")) {
			where = where + " and  DATE_FORMAT(u.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}
		if ((backdate != null && backdate.trim() != "") && (agodate == null || agodate.trim() == "")) {
			where = where + " and  DATE_FORMAT(u.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}
		if (agodate != null && agodate.trim() != "") {
			if (backdate != null && backdate.trim() != "") {
				where = where + " and DATE_FORMAT(u.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}
		// sort 排序 字段 sortOrder 排序规则 asc desc
		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by u.id desc";
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
	 * 根据id返回 map实体对象
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @return
	 * @throws SelectAdmException
	 */
	@Override
	public Map<String, Object> get_info(Integer id) throws SelectAdmException {
		String tableName = "users as u LEFT JOIN organiz as o on u.organizid=o.id "; // 表名
		String find = " u.*,o.id as oid ,o.* "; // 显示字段
		find += " ,(select powername from powers where id=u.powerid and isdelete=1) as power";
		String where = "u.isdelete=1    and u.id=" + id;
		Map<String, Object> mapinfo = this.selectMap(tableName, find, where);
		if (mapinfo != null && mapinfo.size() > 1) {
			return mapinfo;
		}
		throw new SelectAdmException("【查询数据异常】 输入值为 " + id + " 返回值为 " + mapinfo.toString() + " ,信息位置"
				+ this.getClass().getName() + " " + Thread.currentThread().getStackTrace()[1].getMethodName());
	}

	/**
	 * 修改用户状态
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @param state
	 * @return
	 */
	public int update_state(Integer id, Integer state) {
		return um.update_state(id, state);
	}

	/**
	 * 修改用户实体
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @param record
	 * @return
	 * @throws UpdateAdmException
	 */
	@Override
	public DataMap update_obj(Users record) throws UpdateAdmException {
		Integer ros = um.updateByPrimaryKeySelective(record);
		if (ros > 0) {
			return new DataMap(record.getId(), 0);
		}
		throw new UpdateAdmException("【修改数据异常】 输入值为 " + record + " 返回值为 " + ros + " ,信息位置" + this.getClass().getName()
				+ " " + Thread.currentThread().getStackTrace()[1].getMethodName());
	}

	/**
	 * 添加用户实体
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param record
	 * @return
	 * @throws AppendAdmException
	 */
	public DataMap add_obj(Users record) throws AppendAdmException {
		Integer ros = um.insertSelective(record);
		if (ros > 0) {
			return new DataMap(record.getId(), 0);
		}
		throw new AppendAdmException("【添加数据异常】 输入值为 " + record + " 返回值为 " + ros + " ,信息位置" + this.getClass().getName()
				+ " " + Thread.currentThread().getStackTrace()[1].getMethodName());
	}

	/**
	 * 逻辑删除
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @param state
	 * @return
	 * @throws DeleteAdmException
	 */
	@Override
	public DataMap isDelete(Integer id) throws DeleteAdmException {
		Integer ros = um.isDelete(id);
		if (ros > 0) {
			return new DataMap(id, 0);
		}
		throw new DeleteAdmException("【逻辑删除数据异常】 输入值为 " + id + " 返回值为 " + ros + " ,信息位置" + this.getClass().getName()
				+ " " + Thread.currentThread().getStackTrace()[1].getMethodName());
	}

	/**
	 * 返回 子级最后一个code值
	 * 
	 * @author baikun
	 * @creation 2017年2月23日
	 * @param codes
	 * @return
	 */
	public Map<String, Object> get_code_map(String codes) {
		String tableName = " users "; // 表名
		String find = " realname , phone ,codes "; // 显示字段
		find += " , (SUBSTR(SUBSTR(codes,1,(LENGTH(\'" + codes + "\')+4)),LENGTH(\'" + codes + "\')+1,4) ) as code";
		String where = "codes LIKE \'" + codes + "%\'  ORDER BY codes desc  limit 1";
		return this.selectMap(tableName, find, where);
	}

	/**
	 * 返回指定 查询条件下 的数据数量
	 * 
	 * @author baikun
	 * @creation 2017年2月23日
	 * @param fildname
	 * @param fildvalue
	 * @return
	 */
	public Integer count_nub(String fildname, String fildvalue) {
		String tableName = "users "; // 表名
		String find = " count(*) as  iscount "; // 显示字段
		String where = fildname + "=\'" + fildvalue + "\' and isdelete=1 ";
		Map<String, Object> countMap = this.selectMap(tableName, find, where);
		return countMap != null ? Integer.parseInt(countMap.get("iscount").toString()) : 0;
	}

	/**
	 * 返回指定 查询条件下 的数据数量
	 * 
	 * @author baikun
	 * @creation 2017年2月23日
	 * @param fildname
	 * @param fildvalue
	 * @return
	 */
	public Integer count_loginname(String fildvalue) {
		String tableName = "users "; // 表名
		String find = " count(*) as  iscount "; // 显示字段
		String where = "loginname=\'" + fildvalue + "\' and isdelete=1 ";
		Map<String, Object> countMap = this.selectMap(tableName, find, where);
		return countMap != null ? Integer.parseInt(countMap.get("iscount").toString()) : 0;
	}

	/**
	 * 返回组织机构列表
	 * 
	 * @author baikun
	 * @creation 2017年3月7日
	 * @param userid
	 * @return
	 */
	public List<Map<String, Object>> organiz_list(Integer userid) {

		String code = this.get_code(userid).get("code").toString();
		String tableName = "  organiz as o "; // 表名
		String find = " * "; // 显示字段
		String where = "o.code LIKE \'" + code + "%\'  and o.isdelete=1  and  o.code<>\'" + code + "\'";
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		return list;
	}

	/**
	 * 返回组织机构列表
	 * 
	 * @author baikun
	 * @creation 2017年3月7日
	 * @param userid
	 * @return
	 */
	public List<Map<String, Object>> organiz_list_name(Integer userid, String name) {
		String code = this.get_code(userid).get("code").toString();
		String tableName = "  organiz as o "; // 表名
		String find = " * "; // 显示字段
		String where = " name like \'%" + name + "%\' and  o.code LIKE \'" + code
				+ "%\'  and o.isdelete=1  and  o.code<>\'" + code + "\'";
		if (name == null) {
			return null;
		}
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		return list;
	}

	/**
	 * 返回好友列表
	 * 
	 * @author baikun
	 * @creation 2017年3月7日
	 * @param userid
	 * @return
	 */
	public List<Map<String, Object>> im_list(String names) {
		String tableName = "  users as s "; // 表名
		String find = " s.* "; // 显示字段
		find += ",(select name from organiz where organizid=id) as oname";
		String where = "phone in(" + names + ")";
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		return list;
	}

	/**
	 * 根据当前用户返回擅长标签
	 * 
	 * @author baikun
	 * @creation 2017年3月11日
	 * @param userid
	 * @return
	 */
	public List<Map<String, Object>> skilled_list(Integer userid) {

		Map<String, Object> user_info = null;
		List<Map<String, Object>> skilled_list = this.selectAll("skilled", null, "isdelete=1", null);
		if (userid != null) {
			user_info = idByInfo(userid, "users");
			// 当前用户 擅长标签 字符串 (1,2,3)
			String skilled_id_str = user_info.get("skilled").toString();
			// 转换成数组 ({[1],[2]})
			String[] skilled_ids = skilled_id_str.split(",");
			if (skilled_ids != null && !skilled_ids[0].trim().equals("") && skilled_ids.length > 0) {
				for (int x = 0; x < skilled_ids.length; x++) {
					for (int y = 0; y < skilled_list.size(); y++) {
						Map<String, Object> skilled_info = skilled_list.get(y);

						if (Integer.parseInt(skilled_ids[x]) == Integer.parseInt(skilled_info.get("id").toString())) {
							skilled_info.put("checked", true);
							skilled_list.remove(y);
							skilled_list.add(y, skilled_info);

						}

					}

				}

			}

		}
		System.out.println(skilled_list.toString());
		return skilled_list;
	}

	/**
	 * 根据id查询实体
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param id
	 * @param tableName
	 *            表名
	 * @return
	 */
	public Map<String, Object> idByInfo(Integer id, String tableName) {
		String find = null; // 显示字段
		String where = "id=" + id;
		List count_list = this.selectAll(tableName, find, where, null);
		return (Map<String, Object>) ((count_list != null) && (count_list.size() > 0) ? count_list.get(0) : null);
	}

	public List<Map<String, Object>> getUsersList() {
		return this.selectAll("users", null, "isdelete=1 and powerid=3", null);
	}

	/**
	 * 返回权限列表
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @return
	 */
	public List<Map<String, Object>> getPowerList() {
		return this.selectAll("powers", null, "isdelete=1", null);
	}

	@Override
	public DataMap del_obj(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataMap provinginfo(Users record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataMap getInfo(Integer ID) throws SelectAdmException {
		// TODO Auto-generated method stub
		return null;
	}

}
