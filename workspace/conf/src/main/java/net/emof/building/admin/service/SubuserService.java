package net.emof.building.admin.service;

import java.util.Date;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.dao.SubuserMapper;
import net.emof.building.model.Subuser;

import net.emof.building.util.DataMap;
import net.emof.building.util.Security;
import net.emof.building.util.ToolsUtil;
import net.emof.building.util.intfc.ToolseSrvIntfc;

@Service
public class SubuserService extends SqlToolseService implements ToolseSrvIntfc<DataMap, Subuser, String> {

	@Autowired
	private SubuserMapper sm;

	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 验证规则注入
	 */
	protected DataMap proving = null;

	/**
	 * 添加用户
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param record
	 * @return
	 */
	public DataMap add_obj(Subuser record) {
		DataMap map = proving == null ? provinginfo(record) : proving;
		// 自定义ID
		record.setId(ToolsUtil.get_diy_ID());
		// 创建时间
		record.setCreatetime(new Date());
		// 逻辑删除 1正常 2删除
		record.setIsdelete(1);
		Integer row = null;
		try {
			row = sm.insertSelective(record);
		} catch (Exception e) {
			logger.error("【Subuser添加异常】信息位置" + this.getClass().getName() + " "
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
	 * 修改方法
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param record
	 * @return
	 */
	public DataMap update_obj(Subuser record) {
		DataMap map = proving == null ? provinginfo(record) : proving;
		if (record.getId() == null || record.getId().trim().equals("") || record.getId().trim().length() < 1) {
			map.addMsg_diy_obj(record, 1, "修改失败ID不存在");
			return map;
		}
		Integer row = null;
		try {
			row = sm.updateByPrimaryKey(record);
		} catch (Exception e) {
			logger.error("【Subuser修改异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】"
					+ ToolsUtil.pojo_to_Map(record).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(record, 1, "修改失败,请检查添加信息");
			return map;
		}
		return map;
	}

	/**
	 * 通过手机和密码获取用户信息
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param phone
	 * @param pass
	 * @return
	 */
	public DataMap phone_pass_getinfo(String phone, String pass) {
		DataMap map = new DataMap();
		if (phone == null || phone.trim().equals("") || phone.trim().length() < 11 || !ToolsUtil.isValid(phone)) {
			map.addMsg_diy_obj(null, 4, "手机号格式不正确,至少11位");
			return map;
		}
		if (pass == null || pass.trim().equals("") || pass.trim().length() < 6 || !ToolsUtil.isValid(pass)) {
			map.addMsg_diy_obj(null, 4, "密码格式不正确,至少6位");
			return map;
		}
		Subuser subuser = new Subuser();
		Map<String, Object> mapinfo = null;
		try {
			mapinfo = sm.phone_pass_byinfo(phone, Security.getSHA1(pass));
			if (mapinfo == null || mapinfo.size() < 1 || mapinfo.get("id") == null) {
				map.addMsg_diy_obj(null, 5, "手机或密码不正确");
				return map;
			}
			subuser.mapsetInfo(mapinfo);
		} catch (Exception e) {
			logger.error("【phonepass获取实体异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】"
					+ ToolsUtil.pojo_to_Map(subuser).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "手机或密码不正确");
			return map;
		}
		return map;
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
	public DataMap provinginfo(Subuser record) {
		DataMap map = new DataMap(record, 0);

		return map;
	}

	@Override
	public Map<String, Object> get_info(String ID) throws SelectAdmException {
		// TODO Auto-generated method stub
		return null;
	}

	
	 /**
	  * 逻辑 删除
	  */
	@Override
	public DataMap isDelete(String ID) throws DeleteAdmException {
		try {
			sm.isDelete(ID);
		} catch (Exception e) {
			logger.error("【删除异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());

			return new DataMap(null, 5);
		}
		return new DataMap();
	}

	/**
	 * 物理删除
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param id
	 * @return
	 */
	@Override
	public DataMap del_obj(String ID) throws DeleteAdmException {
		try {
			sm.deleteByPrimaryKey(ID);
		} catch (Exception e) {
			logger.error("【删除异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());

			return new DataMap(null, 5);
		}
		return new DataMap();
	}

	@Override
	public DataMap getInfo(String ID) throws SelectAdmException {
		// TODO Auto-generated method stub
		return null;
	}

}
