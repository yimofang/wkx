package net.emof.building.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.dao.MenusMapper;
import net.emof.building.dao.UsersMapper;
import net.emof.building.model.Users;
import net.emof.building.util.Security;

/**
 * 后台登陆、修改密码逻辑操作
 * 
 * @author baikun
 * @creation 2017年2月21日
 */
@Service
public class LoginUsersService extends SqlToolseService {

	@Autowired
	private UsersMapper um;

	@Autowired
	private MenusMapper mm;

	/**
	 * 登陆操作
	 * 
	 * @param name
	 * @param pass
	 * @return
	 */
	public Object login(String username, String userpass) {
		System.out.println("------class:HframeServer-----method:login");

		Users adminUser = null;
		// 构建条件
		String tableName = "users";
		String find = null;
		String where = String.format(" phone=%s and adminpass='%s'", username, Security.getSHA1(userpass));
		where += " and isdelete=1";
		// 执行查询
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);

		// 判断是否有数据
		if (list.size() > 0 && list.size() <= 1) {

			Map<String, Object> mapRes = (Map<String, Object>) list.get(0);
			adminUser = new Users();
			// map 转换为实体格式
			adminUser.mapsetInfo(mapRes);
		}

		if (adminUser == null) {
			System.out.println("-----adminUser:null-------");
		}

		return adminUser;

	}

	/**
	 * 修改密码
	 * 
	 * @author baikun
	 * @creation 2017年2月20日
	 * @param id
	 * @param pass
	 * @return
	 */
	public int updatepass(Integer id, String pass) {
		return um.updatepass(id, pass);
	}

	/**
	 * 返回当前用户权限对应菜单
	 * 
	 * @author baikun
	 * @creation 2017年3月9日
	 * @param user
	 *            当前用户对象
	 * @return map 包括 id,powerid,menuid,type,menuname,controller,grade
	 */
	public List<Map<String, Object>> login_power(Users user) {
		// 权限id
		Integer powerid = user.getPowerid();

		String tableName = " power_menu as pm LEFT JOIN menus as m ON pm.menuid =m.id  ";
		String find = "pm.id, pm.powerid  ,pm.menuid  ,pm.type as type , m.name as menuname , m.controller , m.grade ";
		String where = " m.isdelete=1  and  pm.type=1 and m.grade<>0  and  pm.powerid=" + user.getPowerid()
				+ "  GROUP BY m.name";
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		list = login_power_conduct(list);

		return list;
	}

	/**
	 * 根据权限ID返回对应菜单集合
	 * 
	 * @author baikun
	 * @creation 2017年3月9日
	 * @param id
	 *            当前用户对象
	 * @return map 包括 id,powerid,menuid,type,menuname,controller,grade
	 */
	public List<Map<String, Object>> power_menu(Integer powerid) {
		String tableName = " power_menu as pm LEFT JOIN menus as m ON pm.menuid =m.id  ";
		String find = "pm.id, pm.powerid  ,pm.menuid  ,pm.type as type , m.name as menuname , m.controller , m.grade ";
		String where = " m.isdelete=1  and  pm.type=1 and m.grade<>0  and  pm.powerid=" + powerid + "  GROUP BY m.name";
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		list = login_power_conduct(list);
		return list;
	}

	/**
	 * 返回菜单对应的行为
	 * 
	 * @author baikun
	 * @creation 2017年3月15日
	 * @param login_power_list
	 * @return
	 */
	private List<Map<String, Object>> login_power_conduct(List<Map<String, Object>> login_power_list) {

		if (login_power_list == null && login_power_list.size() < 1) {
			return null;
		}
		for (int i = 0; i < login_power_list.size(); i++) {
			Map<String, Object> info = login_power_list.get(i);

			String tableName = " power_menu as pm LEFT JOIN conduct as c on pm.conduct=c.id  ";
			String find = "c.name , c.symbol";
			String where = " pm.type=2 and c.isdelete=1 and pm.powerid=" + info.get("powerid") + " and pm.menuid="
					+ info.get("menuid");
			List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
			info.put("conductlist", list);
			login_power_list.remove(i);
			login_power_list.add(i, info);
		}

		return login_power_list;
	}

	/**
	 * 根据权限返回菜单集合
	 * 
	 * @author baikun
	 * @creation 2017年6月2日
	 * @param powerid
	 * @return
	 */
	public List<Map<String, Object>> index_menu(Integer powerid) {
		// 查询主菜单
		List<Map<String, Object>> MainMenuList = mm.getMainMenu(powerid);

		for (int x = 0; x < MainMenuList.size(); x++) {
			Map<String, Object> MainMenuInfo = MainMenuList.get(x);
			// 查询主菜单对应的子菜单
			List<Map<String, Object>> SubMenuList = mm.getSubMenu(powerid,
					Integer.parseInt(MainMenuInfo.get("id").toString()));
			// 将子菜单加入到 主菜单 集合下
			if (SubMenuList != null && SubMenuList.size() >= 1) {
				MainMenuInfo.put("submenu", SubMenuList);
			} else {
				MainMenuInfo.put("submenu", null);
			}
			MainMenuList.remove(x);
			MainMenuList.add(x, MainMenuInfo);

		}

		return MainMenuList;
	}

	
	/**
	 * 登陆验证
	 * @author baikun
	 * @creation 2017年11月11日
	 * @param powerid
	 * @return
	 */
	public  Users loginValidate(String loginname,String adminpass) {
		Users usres=null;
		String tableName = " users ";
		String find = " * ";
		String where = " isdelete=1 and  loginname='"+loginname+"' and adminpass='"+adminpass+"'";
		Map<String, Object> loginmap = this.selectMap(tableName, find, where);
		if(loginmap!=null&&loginmap.size()>=1&&loginmap.get("id")!=null){
			usres=new Users();
			usres.mapsetInfo(loginmap);
		}
		return usres;
	}
}
