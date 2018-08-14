package net.emof.building.util.intfc;

import java.util.Map;

import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.admin.customEXC.UpdateAdmException;
 

 
/**
 * 后台通用操作方法
 * @author baikun
 * @creation 2017年8月22日
 * @param <T> 实体类
 * @param <INT> Id 类型
 */
public interface ToolseSrvIntfc<RETURN,OBJ_PARAM,INT> {
	
 
	
	/**
	 * 修改实体
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param record
	 * @return
	 */
	public RETURN update_obj(OBJ_PARAM record)throws UpdateAdmException;
	
	 
	
	/**
	 * 添加实体
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param record
	 * @return
	 */
	public RETURN add_obj( OBJ_PARAM record)throws AppendAdmException;
	
	
	//public int add_param(Object...obj);
	
	
	/**
	 * 根据ID返回实体信息
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param ID
	 * @return
	 */
	public Map<String, Object> get_info(INT ID) throws SelectAdmException;
	
	
	/**
	 * 根据ID返回实体信息
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param ID
	 * @return
	 */
	public RETURN getInfo(INT ID) throws SelectAdmException;

 
	/**
	 * 逻辑删除
	 * @author baikun
	 * @creation 2017年8月22日
	 * @param id
	 * @return
	 */
	public RETURN isDelete(INT ID) throws DeleteAdmException;
	
	
	/**
	 * 物理删除
	 * @author baikun
	 * @creation 2017年8月22日
	 * @return
	 */
	public RETURN del_obj(INT ID) throws DeleteAdmException;
	
	
	
	/**
	 * 通用验证
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param record
	 * @return
	 */
	public RETURN provinginfo(OBJ_PARAM record);

}
