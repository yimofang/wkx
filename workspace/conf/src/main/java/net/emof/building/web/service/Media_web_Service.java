package net.emof.building.web.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.admin.service.MediaService;

@Service
public class Media_web_Service  {

	@Autowired
	private MediaService srv;
	
	/**
	 * 返回列表
	 * @author baikun
	 * @creation 2017年12月19日
	 * @return
	 */
	public Map<String, Object> getlist(){
		return srv.getList().data;
	}
	/**
	 * 返回推广列表
	 * @author wkx
	 * @creation 2018年7月3日
	 * @return
	 */
	public Map<String, Object> getInfoList(String[] mediaid){
		return srv.getInfoList(mediaid).data;
	}
	
}
