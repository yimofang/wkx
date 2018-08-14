package net.emof.building.web.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.QnrMapper;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Qnr;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.ToolsUtil;

@Service
public class Qnr_web_Service extends SqlToolseService{
	
	@Autowired
	private QnrMapper qnrMapper;
	
	
	/**
	 * 添加问卷信息
	 * @author xilongfei
	 * @creation 2017年12月15日
	 * @param confid	会议id
	 * @param userid	用户id
	 * @param codes		用户身份
	 * @param qbrief 
	 * @param fname 
	 * @return
	 */
	public DataMap addQurInfo(String confid, Integer userid, String codes, String fname, String qbrief) {
		DataMap dataMap = new DataMap();
		Map<String, Object> map = new HashMap<>();
		Qnr qnrs = qnrMapper.getQnrByConfid(confid);
		int num;
		if(qnrs == null) {
//			dataMap.addMsg_diy_obj(null, 6, "创建失败");
//			return dataMap;
			 Qnr qnr = new Qnr(ToolsUtil.get_diy_ID(), userid, codes, confid, 2);
			 qnr.setFname(fname);
			 qnr.setQbrief(qbrief);
		     num = qnrMapper.insertSelective(qnr);
		     map.put("id", qnr.getId());
		     map.put("fname", qnr.getFname());
		     map.put("createtime", qnr.getCreatetime());
		     map.put("codes", qnr.getCodes());
		     map.put("rls", qnr.getRls());
		     map.put("qbrief", qnr.getQbrief());
		     map.put("confsid", qnr.getConfsid());
		 } else {
			 qnrs.setFname(fname);
			 qnrs.setQbrief(qbrief);
		     num = qnrMapper.updateByPrimaryKeySelective(qnrs);
		     map.put("id", qnrs.getId());
		     map.put("fname", qnrs.getFname());
		     map.put("createtime", qnrs.getCreatetime());
		     map.put("codes", qnrs.getCodes());
		     map.put("rls", qnrs.getRls());
		     map.put("qbrief", qnrs.getQbrief());
		     map.put("confsid", qnrs.getConfsid());
		 }
		
		
        if(num < 1){
        	dataMap.addMsg_diy_obj(null, 6, "创建失败");
        }else{
        	//map.put("id", qnr.getId());
        	dataMap.addMsg_map(map, 0);
        }
		
		
		return dataMap;
	}

	/**
	 * 查询问卷说明与标题
	 * @author xilongfei
	 * @creation 2017年12月15日
	 * @param id		问卷id
	 * @param type		类型  1查询 2判断
	 * @param name		问卷名称
	 * @param qbrief    说明
	 * @param confid	会议id
	 * @return
	 */
	public DataMap selectQurInfo(String id, int type, String name, String qbrief, String confid) {
		DataMap dataMap = new DataMap();
        if((id==null || id.trim().equals("")) && type==1){
        	dataMap.addMsg_diy_obj(null, 6, "未找到该会议");
        	return dataMap;
        }
        String table_name = " qnr as obj left join  confs c on c.id = obj.confsid ";  //表名,关联表
        String find = " obj.id, obj.fname, obj.qbrief, c.state";   //出参
        StringBuilder where = new StringBuilder(" 1=1 ");  //条件
        if(type == 3){ //查询会议是否已有问卷
        	where.append(" and obj.confsid='"+confid+"'");
        }else{
        	where.append(" and obj.id='"+id+"' and obj.isdelete=1");
        };
        Map<String, Object> map = this.selectMap(table_name, find, where.toString());
        if(map==null){
        	dataMap.addMsg_diy_obj(null, 6, "问卷不存在");
        }else{
        	dataMap.addMsg_map(map, 0);
        }
        return dataMap;
	}
	
	/**
	 * 
	 * @author xilongfei
	 * @creation 2017年12月16日
	 * @param id		问卷id	
	 * @param name		标题
	 * @param qbrief	说明
	 * @return
	 */
	public DataMap updateQnrInfo(String id, String name, String qbrief) {
		DataMap dataMap = new DataMap();
        if(id==null || id.trim().equals("")){
        	dataMap.addMsg_diy_obj(null, 6, "未找到该会议");
        	return dataMap;
        }
        if(name == null || name.trim().equals("")){
        	dataMap.addMsg_diy_obj(null, 6, "请填写问卷标题");
            return dataMap;
        }
        if(qbrief == null || qbrief.trim().equals("")){
        	dataMap.addMsg_diy_obj(null, 6, "请填写问卷说明");
            return dataMap;
        }
        Qnr qnr = new Qnr();
        qnr.setId(id);
        qnr.setFname(name);
        qnr.setQbrief(qbrief);
        int num = qnrMapper.updateByPrimaryKeySelective(qnr);
        if(num < 1){
        	dataMap.addMsg_diy_obj(null, 6, "修改失败,请重试");
        }else{
        	dataMap.addMsg_diy_obj(null, 0, "已修改");
        }
        return dataMap;
	}
	
	
	 /**
     * 根据会议id 查询问卷下的所有问题与问题选项 
     * @author xilongfei
     * @creation 2017年12月19日
     * @param confid	会议id
     * @param token		登录识别标识
     * @param type      查询状态  1会议详情   2问卷详情
     * @return
	 * @throws EhCacheSessiconException 
     */
   public DataMap getQnrDetails(String confid, String token, Integer type) throws EhCacheSessiconException{
	   DataMap dataMap = new DataMap();
	   if(confid==null || confid.trim().equals("")){
       	dataMap.addMsg_diy_obj(null, 6, "未找到会议问卷信息");
       	return dataMap;
       }
	   Users  users = new Users();
	   if(type==2) {   //confid, token, 2
		   if ((token == null || token.trim().equals("")) && type==2) {
			   dataMap.addMsg_diy_obj(null, 6, "未使用标识");
			   return dataMap;
		   }
		   users = EhSessicon.getTokenInfo(token);
		   if (users == null) {
			   dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
			   return dataMap;
		   }
	   }
	   Qnr qnr = qnrMapper.getQnrDetails(confid,type);
	   Qnr qnrBy = qnrMapper.getQnrByConfid(confid);
	  // qnr.get
	   if(qnr != null) {
		   qnr.setId(qnrBy.getId());
		   qnr.setFname(qnrBy.getFname());
		   qnr.setUserid(qnrBy.getUserid());
		   qnr.setCodes(qnrBy.getCodes());
		   qnr.setConfsid(qnrBy.getConfsid());
		   qnr.setQbrief(qnrBy.getQbrief());
		   qnr.setCreatetime(qnrBy.getCreatetime());
		   
		   dataMap.addMsg_obj(qnr, 0);
	   }
//	   else if(type==2){
//		 //  dataMap = this.addQurInfo(confid, users.getId(), users.getCodes());
//	   }
	   else {
		   dataMap.addMsg_obj(qnrBy, 0);
	   }
	   return dataMap;
   }
   
   

   /**
    * 删除问卷信息
    * @author xilongfei
    * @creation 2017年12月22日
    * @param qnrid	问卷ID
    * @return
    */
   @SuppressWarnings("unchecked")
   public DataMap deleteQnrDetails(String qnrid) {
	  DataMap dataMap = new DataMap();
	  if(qnrid==null || qnrid.trim().equals("")) {
		  dataMap.addMsg_diy_obj(null, 6, "未找到问卷信息");
		  return dataMap;
	  }
	  dataMap = selectQurInfo(qnrid, 1, null, null, null);
	  Map<String, Object> map = (Map<String, Object>) dataMap.data.get("row");
	  if(map == null) {
		  dataMap.addMsg_diy_obj(null, 6, "该问卷信息不存在");
		  return dataMap;
	  }
	  if((int)map.get("state") == 1) {
		  dataMap.addMsg_diy_obj(null, 6, "会议已发布,不能删除问卷");
		  return dataMap;
	  } 
	  int num = qnrMapper.deleteByPrimaryKey(qnrid);
	  if(num < 1) {
		  dataMap.addMsg_diy_obj(null, 6, "删除失败,请重试");
	  }else {
		  dataMap.addMsg_obj(null, 0); 
	  }
	  return dataMap;
   }
   
   /**
    * 问卷发布
    * @author xilongfei
    * @creation 2017年12月25日
    * @param qnrid	  问卷ID
    * @param isphone 问卷设置: 只能作答一次 1是, 2否
    * @return
    */
   public DataMap updateQnrRls(String qnrid, Integer isphone ) {
	   DataMap dataMap = new DataMap();
	   if(qnrid==null || qnrid.trim().equals("")){
       	dataMap.addMsg_diy_obj(null, 6, "未找到会议问卷调查信息");
       	return dataMap;
       }
	   Qnr qnr = qnrMapper.selectByPrimaryKey(qnrid);
	   if(qnr == null) {
		   dataMap.addMsg_diy_obj(null, 6, "未找到会议问卷调查信息");
	       	return dataMap;
	   }
	   qnr.setRls(1);
	   qnr.setIsphone(isphone);
	   int num = qnrMapper.updateByPrimaryKeySelective(qnr);
       if(num < 1){
       		dataMap.addMsg_diy_obj(null, 6, "问卷发布失败,请重试");
       }else{
       		dataMap.addMsg_diy_obj(null, 0, "已发布");
       }
	   return dataMap;
   }
   
   /**
    * 添加问卷浏览数量
    * @author xilongfei
    * @creation 2018年1月16日
    * @param confid		会议id
    */
   public void updateBrowseNum(String confid) throws Exception{
	   Qnr qnr = qnrMapper.getQnrByConfid(confid);
	   if(qnr == null) {
		   return;
	   }
	  int num = qnrMapper.updateBrowseNum(qnr.getId(), (qnr.getBrowsenum().intValue()+1));
	  if(num < 1) {
		new Exception("修改问卷浏览数量");  
	  }
   }
   
   /**
    * 添加标题和简介
    * @author YLS
    * @creation 2018年5月25日
    * @param token
    * @param name
    * @param qbrief
    * @param confid
    * @return
    * @throws EhCacheSessiconException
    */
   /*public DataMap addQurTitleAndBrief(String token, String name, String qbrief, String confid)
		   throws EhCacheSessiconException{
	   DataMap  dataMap=new DataMap();
	   Qnr qnr = qnrMapper.getQnrByConfid(confid);
	   if(qnr == null) {
			Users users=null;
			try {
				users = EhSessicon.getTokenInfo(token);
			} catch (EhCacheSessiconException e) {
				e.printStackTrace();
			}
		   if (users == null) {
			   dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
			   return dataMap;
		   }
		   addQurInfo(confid, users.getId(), users.getCodes());		   
	   }
	  int num= qnrMapper.updateTitleAndBrief(name,qbrief,confid);
	  if(num>0) {
		  dataMap.addMsg_diy_obj(null, 0, "添加标题与简介成功！"); 
	  }else {
		  dataMap.addMsg_diy_obj(null, 5, "添加标题与简介失败！");  
	  }
	  return dataMap;
	}*/
	
   
}
