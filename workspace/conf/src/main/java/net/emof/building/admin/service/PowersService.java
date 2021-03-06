package net.emof.building.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.dao.PowerMenuMapper;
import net.emof.building.dao.PowersMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.PowerMenu;
import net.emof.building.model.Powers;

import net.emof.building.model.Users;
import net.emof.building.util.PageInfo;
 

/**
 * 权限管理
 * 
 * @author baikun
 * @creation 2017年2月24日
 */
@Service
public class PowersService extends SqlToolseService {

	@Autowired
	private SqlToolsMapper exps;
	
	@Autowired
	private PowersMapper pm;

	@Autowired
	private PowerMenuMapper pmm;

	/**
	 * 逻辑删除
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @param state
	 * @return
	 */
	public int isDelete(Integer id) {
		return pm.isDelete(id);
	}

	/**
	 * 修改权限名称
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param id
	 * @param record
	 * @return
	 */
	public int update_obj(Powers record) {
		return pm.updateByPrimaryKeySelective(record);
	}

	/**
	 * 添加权限名称
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @param record
	 * @return
	 */
	public int add_obj(Powers record) {
		return pm.insertSelective(record);
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
		String tableName = "powers"; // 表名
		String find = " count(*) as  iscount "; // 显示字段
		String where = fildname + "=\'" + fildvalue + "\' and isdelete=1 ";
		Map<String, Object> countMap = this.selectMap(tableName, find, where);
		return countMap != null ? Integer.parseInt(countMap.get("iscount").toString()) : 0;
	}

 

	/**
	 * bootstrap_table 分页查询、排序 方法
	 * 
	 * @author baikun
	 * @creation 2017年2月24日
	 * @param pageInfo
	 *            分页类
	 * @param limit
	 *            总页数
	 * @param offset
	 *            当前页
	 * @param select
	 *            模糊查询
	 * @param sort
	 *            排序列名
	 * @param sortOrder
	 *            排序规则 当前用户
	 * @return
	 */
	public Map<String, Object> bootstrap_table(PageInfo pageInfo,String limit, String offset, String select,
			String sort,String sortOrder) {
		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
	
		String tableName = "powers as p "; // 表名
		String find = " p.* "; // 显示字段
		String tableKey=" p.id ";
		String where = " 1=1 and isdelete=1 "; // 条件
		String order = null; // 排序

		if (select != null && select.trim() != "") {
			where = where + " and  powername like '%" + select + "%' ";
		}
		// sort 排序 字段 sortOrder 排序规则 asc desc
		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by id desc";
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myCount", pageInfo.getCount());// 总条数
		map.put("tableName", tableName);// 表名
		map.put("tableKey", tableKey);// 表主键ID，不填写order默认以此排序
		map.put("find", find);// 查询结果显示字段
		map.put("pageSize", pageInfo.getPageSize());// 每页条数
		map.put("page", pageInfo.getPage());// 总页数
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

 

	/**
	 * 返回所有菜单
	 * 
	 * @author baikun
	 * @creation 2017年3月3日
	 * @return
	 */
	public List<Map<String, Object>> getmenu(Integer id) {
		// 只包括父级的 list

		List<Map<String, Object>> f_menu_list = this.selectAll("menus", null, " grade=0 and isdelete=1", null);
		// 当前权限 已经选中的list
		List<Map<String, Object>> opt_menu_list = get_power_list(id);
		System.out.println(f_menu_list.toString());
		// 遍历父菜单 是否有被选中的
		for (int i = 0; i < f_menu_list.size(); i++) {
			// 父菜单 实体
			Map<String, Object> f_menu_info = f_menu_list.get(i);
			// 子菜单 实体

			for (int y = 0; y < opt_menu_list.size(); y++) {
				Map<String, Object> opt_menu_info_y = opt_menu_list.get(y);
				// 判断 父菜单是否被选中，如果选中标识
				if (f_menu_info.get("id").toString().equals(opt_menu_info_y.get("menuid").toString())) {
					f_menu_info.put("checked", true);

				}

			}

			// 子级菜单list
			List<Map<String, Object>> z_menu_list = this.selectAll("menus", null,
					"grade=" + f_menu_info.get("id") + " and isdelete=1 and  LENGTH(link)>2", null);

			// 循环子菜单
			for (int j = 0; j < z_menu_list.size(); j++) {
				Map<String, Object> z_menu_info = z_menu_list.get(j);
				// 遍历 子菜单是否有被选中的
				for (int x = 0; x < opt_menu_list.size(); x++) {
					Map<String, Object> opt_menu_info_x = opt_menu_list.get(x);
					// 判断 子菜单是否被选中，如果选中标识
					if (z_menu_info.get("id").toString().equals(opt_menu_info_x.get("menuid").toString())) {
						z_menu_info.put("checked", true);
						z_menu_list.remove(j);
						z_menu_list.add(j, z_menu_info);
					}

				}

			}

			f_menu_info.put("zmenu", z_menu_list);
			f_menu_list.remove(i);
			f_menu_list.add(i, f_menu_info);

			System.out.println(f_menu_list.toString());

		}

		return f_menu_list;
	}

	/**
	 * 根据id查询实体
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param id
	 * @return
	 */
	public Map<String, Object> idByInfo(Integer id) {
		String tableName = " powers "; // 表名
		String find = null; // 显示字段
		String where = " obj.id=" + id;
		List count_list = this.selectAll(tableName, find, where, null);
		return (Map<String, Object>) ((count_list != null) && (count_list.size() > 0) ? count_list.get(0) : null);
	}

	
	
	
	/**
	 * 返回当前权限已经存在的list
	 * 
	 * @author baikun
	 * @creation 2017年3月3日
	 * @param id
	 * @return
	 */
	private List<Map<String, Object>> get_power_list(Integer id) {
		String tableName = " power_menu as pm  LEFT JOIN menus as m on pm.menuid=m.id "; // 表名
		String find = "  pm.*"; // 显示字段
		find += " ,m.name,m.grade ";
		String where = "type=1 and   pm.powerid=" + id;// 条件
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		return list;
	}

	/**
	 * 为指定权限添加菜单
	 * 
	 * @author baikun
	 * @creation 2017年3月4日
	 * @param powerid
	 *            当前权限ID
	 * @param ids
	 *            复选框选中的菜单集合
	 * @return
	 */
	public Map<String, Object> add_power_menu(Integer powerid, Integer[] ids) {

		Map<String, Object> map = new HashMap<String, Object>();
		// 当前权限包括的菜单list
		List<Map<String, Object>> opt_list = this.get_power_list(powerid);
		// 当前需要添加的菜单 集合
		List<Integer> ids_list_add = new ArrayList<Integer>();

		List<Integer> ids_list_del = new ArrayList<Integer>();

		for (Integer t : ids) {
			ids_list_add.add(t);
			ids_list_del.add(t);
		}
		// 处理删除循环

		for (int x = 0; x < opt_list.size(); x++) {
			// 当前权限的实体
			Map<String, Object> opt_list_info = opt_list.get(x);
			for (int y = 0; y < ids_list_add.size(); y++) {
				// 移除当前权限已经存在的菜单
				if (Integer.parseInt(opt_list_info.get("menuid").toString()) == ids_list_add.get(y)) {
					ids_list_add.remove(y);
				}
			}

		}
		// 循环添加
		System.out.println(ids_list_add.toString());
		for (int p = 0; p < ids_list_add.size(); p++) {
			PowerMenu pminfo = new PowerMenu();
			pminfo.setPowerid(powerid);
			pminfo.setType(1);// 1.菜单 2.方法
			pminfo.setMenuid(ids_list_add.get(p));
			pmm.insertSelective(pminfo);
		}

		for (int i = 0; i < ids_list_del.size(); i++) {
			// 移除 被选中的 菜单 ，剩余的就是删除的
			for (int o = 0; o < opt_list.size(); o++) {
				Map<String, Object> opt_list_info = opt_list.get(o);

				if (Integer.parseInt(opt_list_info.get("menuid").toString()) == ids_list_del.get(i)) {
					opt_list.remove(o);
				}

			}
		}

		// 循环删除
		System.out.println(opt_list.toString());
		for (int u = 0; u < opt_list.size(); u++) {
			Map<String, Object> opt_list_info = opt_list.get(u);
			pmm.deleteByPrimaryKey(Integer.parseInt(opt_list_info.get("id").toString()));
		}

		return map;

	}

}
