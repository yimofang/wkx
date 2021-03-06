package net.emof.building.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.admin.service.ConfsBriefService;
import net.emof.building.model.ConfsBrief;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;

/**
 * 简报管理
 * 
 * @author baikun
 * @creation 2017年12月20日
 */
@Service
public class ConfsBrief_web_Service {

	@Autowired
	private ConfsBriefService srv;
	@Autowired
	private Media_web_Service mws;

	/**
	 * 分页列表
	 * 
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param users
	 * @param page
	 * @param display
	 * @return
	 */
	public DataMap pageList(Users users, Integer page, Integer display,String confsid,Integer type) {
		if(users==null){
			return new DataMap(null,5,"登陆超时");
		}
		if(confsid==null||confsid.trim().equals("")||confsid.trim().length()<1){
			return new DataMap(null,4,"所属会议异常");
		}
		return srv.pagelist(page, display, null, null, null, null, null,confsid, users,type);
	}

	/**
	 * 返回实体
	 * 
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param id
	 * @return
	 */
	public DataMap getInfo(String id) {
		return srv.getInfo(id);
	}
	/**
	 * 返回实体
	 * 
	 * @author wkx
	 * @creation 2017年12月20日
	 * @param id
	 * @return
	 */
	public DataMap getInfoPc(String id) {
		DataMap dm=new DataMap();
		dm = srv.getInfo(id);//row
		Map<String, Object> map = new HashMap<>();
		map=(Map<String, Object>) dm.data.get("row");
		//String=map.get("mediaid");
		if(null==map.get("mediaid")||map.get("mediaid").equals("")) {
			dm.data.put("list", "");
		}else {
			String[] mediaid=map.get("mediaid").toString().split(",");
			Map<String, Object> il=mws.getInfoList(mediaid);
			List<Map<String, Object>> listm=(List<Map<String, Object>>) il.get("row");
			dm.data.put("list", listm);
		}
		return dm;
	}

	/**
	 * 添加实体
	 * 
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param bname
	 * @param introd
	 * @param imgs
	 * @param users
	 * @return
	 */
	public DataMap add_info(String bname, String introd, String imgs, String confsid, Users users) {

		ConfsBrief info = new ConfsBrief();
		info.setConfsid(confsid);
		info.setBname(bname);
		info.setIntrod(introd);
		info.setImgs(imgs);
		info.setCodes(users.getCodes());
		info.setUserid(users.getId());
		try {
			
			provinginfo(info);
			
			//srv.setProving(provinginfo(info));
			if (true) {//srv.getProving().errorJudge()
				return srv.add_obj(info);
			}
		} catch (AppendAdmException e) {
			// TODO Auto-generated catch block
			return new DataMap(null, 4, "操作失败，数据异常");
		}
		return srv.getProving();
	}

	/**
	 * 修改实体
	 * 
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param bname
	 * @param introd
	 * @param imgs
	 * @return
	 */
	public DataMap update_info(String id, String bname, String introd, String imgs) {
		ConfsBrief info = new ConfsBrief();
		info.setId(id);
		info.setBname(bname);
		info.setIntrod(introd);
		//info.setImgs(imgs);
		try {
			srv.setProving(null);
			return srv.update_obj(info);
		} catch (UpdateAdmException e) {
			// TODO Auto-generated catch block
			return new DataMap(null, 4, "操作失败，数据异常");
		}
	}

	/**
	 * 物理删除简报
	 * 
	 * @author baikun
	 * @creation 2017年12月22日
	 * @param id
	 * @return
	 * @throws DeleteAdmException
	 */
	public DataMap delete(String id) throws DeleteAdmException {
		return srv.del_obj(id);
	}
	/**
	 * 逻辑删除简报
	 * @author YLS
	 * @creation 2018年5月25日
	 * @param id 简报id
	 * @return
	 */
	public DataMap delete_info(String id) {
		ConfsBrief info = new ConfsBrief();
		info.setId(id);
		info.setIsdelete(2);
		try {
			return srv.update_obj(info);
		} catch (UpdateAdmException e) {
			// TODO Auto-generated catch block
			return new DataMap(null, 5, "删除失败，数据异常");
		}
	}
	
	/**
	 * 验证
	 * 
	 * @author baikun
	 * @creation 2017年12月22日
	 * @param record
	 * @return
	 */
	public DataMap provinginfo(ConfsBrief record) {
		DataMap map = new DataMap(record, 0);
		if (record.getBname() == null || record.getBname().trim().equals("") || record.getBname().trim().length() < 1
				|| !ToolsUtil.isValid(record.getBname().trim())) {
			map.addMsg_diy_obj(record, 4, "标题格式不正确");
			return map;
		}
//		if (record.getIntrod() == null || record.getIntrod().trim().equals("") || record.getIntrod().trim().length() < 1
//				|| !ToolsUtil.isValid(record.getIntrod().trim())) {
//			map.addMsg_diy_obj(record, 4, "简报内容格式不正确");
//			return map;
//		}
		if (record.getConfsid() == null || record.getConfsid().trim().equals("")
				|| record.getConfsid().trim().length() < 1 || !ToolsUtil.isValid(record.getConfsid().trim())) {
			map.addMsg_diy_obj(record, 4, "会议标识格式不正确");
			return map;
		}

		return map;
	}
	
	
	
	/**
	 * 初始化分页列表
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param pageInfo 分页类
	 * @param limit 总页数
	  @param offset 当前页
	 * @param select
	 * @param sort
	 *            排序字段
	 * @param sortOrder
	 * @param agodate
	 *            开始日期
	 * @param backdate
	 *            结束日期
	 * @param sessiconAdmin
	 *            当前用户
	 * @return
	 */
	public DataMap pagelist(PageInfo pageInfo,String limit, String offset, String select, 
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin) {
		DataMap dataMap=srv.pagelistb( pageInfo, limit,  offset,  select,  sort,  sortOrder,  agodate, backdate,  sessiconAdmin);
	    Map<String, Object> ds = new HashMap<String, Object>();
		ds=dataMap.data;
		List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
		//List<Map<String, Object>> list=new 
		list=(List<Map<String, Object>>) ds.get("row");
		System.out.println("si7ze="+list.size());
		System.out.println("si7ze="+ds.get("row"));
		//"bname":"ceshi111","id":"180629102055GrqBHgnw"
//		for(int i=0;i<list.size();i++) {
//			 Map<String, Object> d = new HashMap<String, Object>();
//			 d=list.get(i);
//			 System.out.println("bname="+d.get("bname"));
//			 System.out.println("id="+d.get("id"));
//			 // DataMap map = new DataMap();
//			 DataMap map=srv.getPageList(d.get("id").toString());
//			 System.out.println("==="+map.data.toString());
//			 List<Map<String, Object>> listb= new ArrayList<Map<String, Object>>();
//			 listb=(List<Map<String, Object>>)map.data.get("row");
//			 
//			 System.out.println("size="+listb.size());
//			 
//			 int num=0;
//			 for(int j=0;j<listb.size();j++) {
//				 Map<String, Object> b = new HashMap<String, Object>();
//				 b=listb.get(i);
//				 String mediaid = b.get("mediaid").toString();
//				 String[]med=mediaid.split(",");
//				 num+=med.length;
//				 if(j==0) {
//					 d.put("mediaid", mediaid);
//				 }
//				 
//			 }
//			 d.put("num", num);
//		}
		System.out.println("size="+list.size());
		return dataMap;
	}
	
	

}
