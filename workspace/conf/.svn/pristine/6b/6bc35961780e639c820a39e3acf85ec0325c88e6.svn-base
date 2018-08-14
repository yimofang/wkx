package net.emof.building.phone.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.ehcache.EhCacheManager;

@Service
public class TestService extends SqlToolseService{

 
	public List<Map<String, Object>>  getlist(){
		return this.selectAll("users", null, null, null);
	}
	
	
	public void testeh() throws EhCacheSessiconException{
		EhCacheManager.put("xxx", "测试下");
		EhCacheManager.put("yy", "--过期没有--", 10);
	}
	
	
	public void testeh2() throws EhCacheSessiconException{
	  Object object=	EhCacheManager.get("xxx");
			
		System.out.println(object!=null?object.toString():"失败是为空");
		
		System.out.println(EhCacheManager.get("yy")+"------还没有过期");
	}
	
	
	
}
