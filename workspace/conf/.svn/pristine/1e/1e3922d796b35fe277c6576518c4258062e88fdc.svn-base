package net.emof.building.web.service;
 
import org.springframework.stereotype.Service;
import net.emof.building.admin.service.SubuserService;
import net.emof.building.model.Subuser;
import net.emof.building.util.DataMap;
import net.emof.building.util.Security;
import net.emof.building.util.ToolsUtil;

/**
 * 用户信息操作类
 * 
 * @author baikun
 * @creation 2017年12月15日
 */
@Service
public class Subuser_web_Service extends SubuserService {

	/**
	 * 添加用户
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param realname
	 * @param phone
	 * @return
	 */
	public DataMap add_info(String realname, String phone, String pass) {
		Subuser record = new Subuser();
		record.setId(ToolsUtil.get_diy_ID());
		this.proving = provinginfo(realname, phone, pass);
		// 如果有异常返回异常
		if (!proving.errorJudge()) {
			return proving;
		}
		record.setRealname(realname);
		record.setPhone(phone);
		record.setPass(Security.getSHA1(pass));
		return super.add_obj(record);
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
	protected DataMap provinginfo(String realname, String phone, String pass) {
		DataMap map = new DataMap();
		if (realname == null || realname.trim().equals("") || realname.trim().length() < 1
				|| !ToolsUtil.isValid(realname)) {
			map.addMsg_diy_obj(null, 4, "真实姓名格式不正确");
			return map;
		}
		if (phone == null || phone.trim().equals("") || phone.trim().length() < 1 || !ToolsUtil.isValid(phone)) {
			map.addMsg_diy_obj(null, 4, "手机格式不正确");
			return map;
		}
		if (pass == null || pass.trim().equals("") || pass.trim().length() < 1 || !ToolsUtil.isValid(pass)) {
			map.addMsg_diy_obj(null, 4, "密码格式不正确");
			return map;
		}

		return map;
	}

}
