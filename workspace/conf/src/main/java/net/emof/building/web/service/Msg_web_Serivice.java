package net.emof.building.web.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.emof.building.admin.service.MsgUserService;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;

/**
 * 消息 
 * @author baikun
 * @creation 2017年12月25日
 */
@Service
public class Msg_web_Serivice {

	@Autowired
	private MsgUserService srv;
	/**
	 * 分页列表
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param users
	 * @param page
	 * @param display
	 * @return
	 */
	public DataMap pageList(Users users, Integer page, Integer display) {
		return srv.pagelist(page, display, null, null, null, null, null, users);
	}

	/**
	 * 修改阅读状态 
	 * @author baikun
	 * @creation 2017年12月25日
	 * @param id
	 * @return
	 */
	public DataMap update_islook(String id){
		return srv.update_islook(id);
	}
	
	/**
	 * 删除
	 * @author baikun
	 * @param id
	 * @return
	 */
	public int delete_MsgUser(String ids,String id){
		return srv.delete_Msg(ids,id);
	}

	/**
	 * 删除
	 * @author baikun
	 * @param id
	 * @return
	 */
	public int delete_Msg(String ids,String id){
		return srv.delete_Msg(ids,id);
	}
	public DataMap get_info(String ID) {
		return srv.get_info(ID);
	}
}
