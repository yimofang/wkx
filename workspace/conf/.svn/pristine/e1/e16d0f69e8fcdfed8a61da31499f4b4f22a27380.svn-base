package net.emof.building.web.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.UsersMapper;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.Security;

@Service
public class Login_web_Service extends SqlToolseService {

	@Autowired
	private UsersMapper usersMapper;

	/**
	 * 验证登录身份
	 * 
	 * @author baikun
	 * @creation 2017年11月10日
	 * @param name
	 * @param pass
	 * @return 用户信息
	 * @throws EhCacheSessiconException 
	 */
	public DataMap verifyID(String name, String pass) throws EhCacheSessiconException {
		DataMap dataMap = new DataMap();
		pass = Security.getSHA1(pass);
		// 表明与关联表
		StringBuffer table_name = new StringBuffer(" users obj ");
		table_name.append("LEFT JOIN organiz o ON obj.organizid = o.id ");
		table_name.append("LEFT JOIN STATUS s ON obj.status = s.id ");
		table_name.append("LEFT JOIN province p ON obj.sheng = p.id ");
		table_name.append("LEFT JOIN city c ON obj.shi = c.id ");
		table_name.append("LEFT JOIN district d ON obj.qu = d.id ");
		// 显示字段
		StringBuffer find = new StringBuffer(" obj.* ");
		find.append(" ,o.name as organizstr , s.title as statusstr , p.name as shengstr , c.name as shistr , d.name as qustr");
		// 条件
		StringBuffer where = new StringBuffer(" 1=1 and obj.loginname='" + name + "' AND obj.adminpass='" + pass + "'");

		Map<String, Object> map = this.selectMap(table_name.toString(), find.toString(), where.toString());
		if ((map == null) || (map.size() < 1)) {
			dataMap.addMsg_diy_obj(null, 6, "账号密码错！");
			return dataMap;
		}
		if ((int) map.get("state") == 2) {
			dataMap.addMsg_diy_obj(null, 6, "账号已停用,请联系管理员");
			return dataMap;
		}
		Users users = new Users();
		users.mapsetInfo(map);
		Map<String,Object> datum=new HashMap<>();
		datum.put("organizstr", map.get("organizstr"));
		datum.put("statusstr", map.get("statusstr"));
		datum.put("shengstr", map.get("shengstr"));
		datum.put("shistr", map.get("shistr"));
		datum.put("qustr", map.get("qustr"));
		users.setDatum(datum);
		dataMap.data.put("token", EhSessicon.CreateToken(users));
		//dataMap.addMsg_obj(map, 0); // 存入数据
		return dataMap;
	}
	
	/**
	 * 修改密码
	 * @author xilongfei
	 * @creation 2018年1月15日
	 * @param token		识别标识
	 * @param pass		旧密码
	 * @param newpass   新密码
	 * @return
	 * @throws EhCacheSessiconException 
	 */
	public DataMap updatePass(String token, String pass, String newpass ) throws EhCacheSessiconException  {
		DataMap dataMap = new DataMap();
		if (token == null || token.trim().equals("") ) {
			dataMap.addMsg_diy_obj(null, 6, "身份识别标识不存在");
			return dataMap;
		}
	   	Users users = EhSessicon.getTokenInfo(token);
	    if (users == null) {
		   dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
		   return dataMap;
	    }
		if (pass == null || pass.trim().equals("") ) {
			dataMap.addMsg_diy_obj(null, 6, "请填写旧密码");
			return dataMap;
		} 
		if(!users.getAdminpass().equals(Security.getSHA1(pass))) {
			dataMap.addMsg_diy_obj(null, 6, "旧密码不正确");
			return dataMap;
		}
		if (newpass == null || newpass.trim().equals("")) {
			dataMap.addMsg_diy_obj(null, 6, "请填写新密码");
			return dataMap;
		}
		String password = Security.getSHA1(newpass);
		if(users.getAdminpass().equals(password)) {
			dataMap.addMsg_diy_obj(null, 6, "新密码和旧密码不能相同");
			return dataMap;
		}
		int num = usersMapper.updateUserPass(users.getId(),password);
		if(num < 1) {
			dataMap.addMsg_diy_obj(null, 6, "修改失败,请重试");
		}else {
			users.setAdminpass(password);
			EhSessicon.deleteToken(token);
			dataMap.data.put("token", EhSessicon.CreateToken(users));
			dataMap.addMsg_diy_obj(null, 6, "已修改");
		}
		return dataMap;
	}
}
