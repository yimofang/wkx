package net.emof.building.web.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.QnrMapper;
import net.emof.building.dao.QnrOptionMapper;
import net.emof.building.dao.QnrRejoinMapper;
import net.emof.building.dao.QnrTitleMapper;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Qnr;
import net.emof.building.model.QnrOption;
import net.emof.building.model.QnrTitle;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.ToolsUtil;

@Service
public class QnrTitle_web_Service extends SqlToolseService{

	// log4j日志
	private final Logger logger = Logger.getLogger(this.getClass());

	@Autowired
	private QnrMapper qnrMapper;
	@Autowired
	private QnrTitleMapper qnrTitleMapper;
	@Autowired
	private QnrOptionMapper optionMapper;
	@Autowired
	private QnrRejoinMapper qnrRejoinMapper;

	/**
	 * 添加问题与问题选项
	 * 
	 * @author xilongfei
	 * @creation 2017年12月16日
	 * @param token
	 *            用户识别标识
	 * @param name
	 *            问题名称
	 * @param tstate
	 *            问题类型 1单选 2多选 3填空
	 * @param qnrid
	 *            问卷id
	 * @param confid
	 *            会议id
	 * @param qnrmin
	 *            最少选项(多选使用)
	 * @param qnrmax
	 *            最多选项(多选使用)
	 * @param isitem
	 *            是否必答 1必答, 2选答
	 * @param options
	 *            问题选项信息,多个已","相隔
	 * @return
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Exception.class)
	public DataMap addTitleInfo(String token, String name, Integer tstate, String qnrid, String confid, Integer qnrmin,
			Integer qnrmax, Integer isitem, String options) throws Exception {
		DataMap dataMap = new DataMap();
		if (token == null || token.trim().equals("")) {
			dataMap.addMsg_diy_obj(null, 6, "未使用标识");
			return dataMap;
		}
		Users users = EhSessicon.getTokenInfo(token);
		if (users == null) {
			dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
			return dataMap;
		}
		if (qnrid == null || qnrid.trim().equals("")) {
			dataMap.addMsg_diy_obj(null, 6, "未获取到对应的会议");
			return dataMap;
		}
		String msg = this.estimateParams(name, tstate, qnrmin, qnrmax, isitem, options);
		if (!msg.equals("")) {
			dataMap.addMsg_diy_obj(null, 6, msg);
			return dataMap;
		}
		int num = 0;
		num = qnrTitleMapper.getTitleByFname(name, qnrid, confid);
		if (num != 0) {
			dataMap.addMsg_diy_obj(null, 6, "该问题已添加");
			return dataMap;
		}
		QnrTitle title = new QnrTitle(ToolsUtil.get_diy_ID(), name, users.getId(), users.getCodes(), confid, qnrid,
				tstate, qnrmin, qnrmax, isitem);
		num = qnrTitleMapper.insertSelective(title);
		if (num < 1) {
			logger.error("【创建问题信息-创建问题 】,信息位置" + this.getClass().getName()
					+ Thread.currentThread().getStackTrace()[1].getMethodName());
			new Exception("添加问卷问题信息失败");
			dataMap.addMsg_diy_list(null, 6, "创建问题失败,请重试");
			return dataMap;
		}
		if (tstate != 3) { // 添加选项
			num = this.saveQnrOption(options, users.getId(), users.getCodes(), title.getId());
			if (num == 0) {
				dataMap.addMsg_diy_list(null, 6, "创建问题失败,请重试");
				return dataMap;
			}
		}

		dataMap.addMsg_diy_list(null, 0, "添加成功");
		return dataMap;
	}

	   public Map<String, Object> addTitleInfoPc(String confsid, String token, String tstate1,String tstate2, String tstate3,String qnrid,String rls,String fname,String qbrief) throws Exception{
	    	//@param tstate	问题类型  1单选 2多选  3填空
	    //	qnrTitleService.addTitleInfo(token, name, tstate, qnrid, confid, qnrmin, qnrmax, isitem, options)                            
	        System.out.println("confsid="+confsid+"=token="+token);
	    	Users users;
	    	DataMap dataMap = new DataMap();
	    	  try {
	              users = EhSessicon.getTokenInfo(token);
	              if (users == null) {
	                  dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
	                  return dataMap.data;
	              }
	          } catch (EhCacheSessiconException e) {
	              dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
	              return dataMap.data;
	          }
	    	  
	    		if(null==confsid||confsid.equals("")) {
	    		   	 dataMap.addMsg_diy_list(null, 6, "confsid不能为空");
	    		        return dataMap.data;
	    		}
	    		
	    		
	    		Qnr record=new Qnr();
	    		record.setFname(fname);
	    		record.setQbrief(qbrief);
	    		
	    		int rlsq=0;
	    		if(rls!=null&&!"".equals(rls)) {
	    			rlsq=Integer.parseInt(rls);
	    		}
	    		record.setRls(rlsq);
	    		if(null==qnrid||qnrid.equals("")) {
	    			record.setId(ToolsUtil.get_diy_ID());
	    			users.getCodes();
	    			record.setCodes(users.getCodes());
	    			record.setUserid(users.getId());
	    			record.setConfsid(confsid);
	    			record.setCreatetime(new Date());
	    			qnrMapper.insertSelective(record);
	    		} else {
	    			record.setId(qnrid);
	    			qnrMapper.updateByPrimaryKeySelective(record);
	    		}
	    		
	    		
//http://192.168.2.220:8080/conf/qnrTitle_web/addTitleInfoPc.do?confsid=180129085908jxC9ESSS&token=180626152859266ONI4PFG82GSGkOhkb&rls=1&qnrid=&tstate1=[{"id":"","name":"单选名称","isitem":"1","options":[{"oid":"","option":"单选1"},{"oid":"","option":"单选2"}]}]&tstate2=[{"id":"","name":"多选名称","isitem":"1","qnrmin":"1","qnrmax":"8","options":[{"oid":"","option":"多选1"},{"oid":"","option":"多选2"}]}]&tstate3=[{"id":"","name":"填空","isitem":"1"}]	    		
	    		
	    		
	    		if(null != qnrid && !qnrid.equals("")) {
	    			optionMapper.deleteByQnrOption(qnrid);
		    		qnrTitleMapper.deleteByQnrTitle(qnrid);
	    		}
	    	 qnrid=record.getId();
	    	 JSONArray arr = new JSONArray(tstate1);//1单选
	         JSONObject object = null;
	         List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
	         for (int i = 0; i < arr.length(); i++) {
	             object = arr.getJSONObject(i);
	             String id = object.getString("id");//不为null时，为修改
	             String name = object.getString("name");//问题名称
	             //String qnrid = object.getString("qnrid");//问卷id
	             String isitems=object.getString("isitem").toString();
	             Integer isitem = Integer.parseInt(isitems);//是否必答 1必答, 2选答
	             //tstate   1单选
	             //confid   会议id
	        	 //qnrmin	最少选项(多选使用)   0
	        	 //qnrmax	最多选项(多选使用)   0
	   QnrTitle title = new QnrTitle(ToolsUtil.get_diy_ID(), name, users.getId(), users.getCodes(), confsid, qnrid, 1, 0, 0, isitem);           
	   if(null==id||id.equals("")) {
			  int qnrt = qnrTitleMapper.insertSelective(title);
		  } else {
			  title.setId(id);
			  int qnrt = qnrTitleMapper.updateByPrimaryKeySelective(title);
		  }
	   JSONObject objecto = null;
	   JSONArray optionsarr=object.getJSONArray("options");
//	   String options = object.getString("options");//问题选项信息,多个已","相隔
//       JSONArray optionsarr = new JSONArray(options);
       for (int j = 0; j < optionsarr.length(); j++) {
    	   objecto = optionsarr.getJSONObject(j);
           String oid = objecto.getString("oid");//不为null时，为修改
           String option = objecto.getString("option");
           if(null==oid||oid.equals("")) {
        	  QnrOption qnrOption = new QnrOption(ToolsUtil.get_diy_ID(), option, users.getId(), users.getCodes(), title.getId(), j + 1,qnrid.toString());
        	 // qnrOption.setQnrid("1111");
        	  System.out.println("1=="+qnrOption.getQnrid());
        	  int num = optionMapper.insertSelective(qnrOption);
        	  System.out.println(num+"=id=="+qnrOption.getId());
        	  System.out.println("2=="+qnrOption.getQnrid());
 		   } else {
 			  QnrOption qnrOption = new QnrOption(oid, option, users.getId(), users.getCodes(), title.getId(), j + 1,qnrid);
 			  qnrOption.setQnrid(qnrid);
 			  int qnrt = optionMapper.updateByPrimaryKeySelective(qnrOption);
 		   }
       }
				 
	 }
	////多选///////////////////////// 	         
	    	 JSONArray arr2 = new JSONArray(tstate2);//2多选
	         JSONObject object2 = null;
	         for (int i = 0; i < arr2.length(); i++) {
	             object2 = arr2.getJSONObject(i);
	             String id = object2.getString("id");//不为null时，为修改
	             String name = object2.getString("name");//问题名称
	             System.out.println("name="+name);
	             //String qnrid = object.getString("qnrid");//问卷id
	             String isitems=object2.getString("isitem").toString();
	             Integer isitem = Integer.parseInt(isitems);//是否必答 1必答, 2选答
	             String qnrmins=object2.getString("qnrmin").toString();
	             System.out.println("qnrmins="+qnrmins);
	             Integer qnrmin = Integer.parseInt(qnrmins);//最少选项(多选使用) 
	             String qnrmaxs=object2.getString("qnrmax").toString();
	             Integer qnrmax = Integer.parseInt(qnrmaxs);//最多选项(多选使用)   
	             //tstate  2多选
	             //confid  会议id
	   QnrTitle title = new QnrTitle(ToolsUtil.get_diy_ID(), name, users.getId(), users.getCodes(), confsid, qnrid, 2, qnrmin, qnrmax, isitem);           
	   if(null==id || id.equals("")) {
		  int qnrt = qnrTitleMapper.insertSelective(title);
	   } else {
		  title.setId(id);
		  int qnrt = qnrTitleMapper.updateByPrimaryKeySelective(title);
	   }
	   JSONObject objecto = null;
	   JSONArray optionsarr = object2.getJSONArray("options");//问题选项信息,多个已","相隔
      // JSONArray optionsarr = new JSONArray(options);
       for (int j = 0; j < optionsarr.length(); j++) {
    	   objecto = optionsarr.getJSONObject(j);
           String oid = objecto.getString("oid");//不为null时，为修改
           String option = objecto.getString("option");
           if(null==oid||oid.equals("")) {
        	  QnrOption qnrOption = new QnrOption(ToolsUtil.get_diy_ID(), option, users.getId(), users.getCodes(), title.getId(), j + 1,qnrid);
        	  //qnrOption.setQnrid(qnrid);
        	  int num = optionMapper.insertSelective(qnrOption);
 		   } else {
 			  QnrOption qnrOption = new QnrOption(oid, option, users.getId(), users.getCodes(), title.getId(), j + 1,qnrid);
 			  //qnrOption.setQnrid(qnrid);
 			  int qnrt = optionMapper.updateByPrimaryKeySelective(qnrOption);
 		   }
       }
		 
	 } 
	     ////填空///////////////////////// 	      
	         
	    	 JSONArray arr3 = new JSONArray(tstate3);//3填空
	         JSONObject object3 = null;
	         for (int i = 0; i < arr3.length(); i++) {
	             object3 = arr3.getJSONObject(i);
	             String id = object3.getString("id");//不为null时，为修改
	             String name = object3.getString("name");//问题名称
	             //String qnrid = object.getString("qnrid");//问卷id
	             String isitems=object3.getString("isitem").toString();
	             Integer isitem = Integer.parseInt(isitems);//是否必答 1必答, 2选答
	             //tstate   3填空
	             //confid   会议id
	        	 //qnrmin	最少选项(多选使用)   0
	        	 //qnrmax	最多选项(多选使用)   0
	   QnrTitle title = new QnrTitle(ToolsUtil.get_diy_ID(), name, users.getId(), users.getCodes(), confsid, qnrid, 3, 0, 0, isitem);           
	   if(null==id||id.equals("")) {
			  int qnrt = qnrTitleMapper.insertSelective(title);
		  } else {
			  title.setId(id);
			  int qnrt = qnrTitleMapper.updateByPrimaryKeySelective(title);
		  }
				 
	 }
	         
	        dataMap.addMsg_diy_list(list, 0, "存储成功！");
	        return dataMap.data;
	    }
	
	/**
	 * 添加问题选项
	 * 
	 * @author xilonfei
	 * @creation 2017年12月21日
	 * @param options
	 *            问题选项
	 * @return
	 * @throws Exception
	 */
	private int saveQnrOption(String options, Integer userid, String codes, String titleid) throws Exception {
		int num = 0;
		String[] option = options.split(",");
		for (int i = 0; i < option.length; i++) {
			QnrOption qnrOption = new QnrOption(ToolsUtil.get_diy_ID(), option[i], userid, codes, titleid, i + 1);
			num = optionMapper.insertSelective(qnrOption);
			if (num < 1) {
				logger.error("【添加问题选项信息】,信息位置" + this.getClass().getName()
						+ Thread.currentThread().getStackTrace()[1].getMethodName());
				new Exception("添加问题选项信息失败");
				num = 0;
				break;
			}
		}
		return num;
	}
	/**
	 * 添加问题选项
	 * 
	 * @author wkx
	 * @creation 2017年12月21日
	 * @param options
	 *            问题选项
	 * @return
	 * @throws Exception
	 */
	private int saveQnrOptionPc(String options, Integer userid, String codes, String titleid) throws Exception {
		int num = 0;
		String[] option = options.split(",");
		for (int i = 0; i < option.length; i++) {
			QnrOption qnrOption = new QnrOption(option[i], userid, codes, titleid, i + 1);
			num = optionMapper.updateQnrOption(titleid,option[i]);
			if (num < 1) {
				logger.error("【添加问题选项信息】,信息位置" + this.getClass().getName()
						+ Thread.currentThread().getStackTrace()[1].getMethodName());
				new Exception("添加问题选项信息失败");
				num = 0;
				break;
			}
		}
		return num;
	}

	/**
	 * 验证参数
	 * 
	 * @author xilongfei
	 * @creation 2017年12月21日
	 * @param name
	 *            问题名称
	 * @param tstate
	 *            问题类型 1单选 2多选 3填空
	 * @param qnrmin
	 *            最少选项(多选使用)
	 * @param qnrmax
	 *            最多选项(多选使用)
	 * @param isitem
	 *            是否必答 1必答, 2选答
	 * @param options
	 *            问题选项信息,多个已","相隔
	 * @return
	 */
	private String estimateParams(String name, Integer tstate, Integer qnrmin, Integer qnrmax, Integer isitem,
			String options) {
		if (name == null || name.trim().equals("")) {
			return "请填写问题标题";
		}
		if (tstate == null || tstate == 0) {
			return "未获取到问题类别";
		}
		if ((options == null || options.trim().equals("")) && tstate != 3) {
			return "请添加选项";
		}
		String[] option = options.split(","); // 选项数组
		if (option.length < 2) {
			return "至少添加两个选项";
		}
		if (tstate.intValue() == 2) { // 多选
			if (qnrmin.intValue() > qnrmax.intValue()) {
				return "最少选项不能大于最大选项";
			}
			if (qnrmin.intValue() > option.length) {
				return "最少选项不能大于添加选项";
			}
			if (qnrmax.intValue() > option.length) {
				return "最大选项不能大于添加选项";
			}
		}

		return "";
	}

	/**
	 * 根据问题id查询问题信息与问题下的选项信息
	 * 
	 * @author xilongfei
	 * @creation 2017年12月18日
	 * @param titleid
	 *            问题id
	 * @return
	 */
	public DataMap getTitleInfo(String titleid) {
		DataMap dataMap = new DataMap();
		if (titleid == null || titleid.trim().equals("")) {
			dataMap.addMsg_diy_obj(null, 6, "未找到该问题信息");
			return dataMap;
		}
		dataMap.addMsg_obj(qnrTitleMapper.getTitleInfo(titleid), 0);
		return dataMap;
	}

	/**
	 * 修改问题与问题选项信息
	 * 
	 * @author xilongfei
	 * @creation 2017年12月21日
	 * @param titleid
	 *            问题ID
	 * @param name
	 *            问题名称
	 * @param tstate
	 *            问题类型 1单选 2多选 3填空
	 * @param qnrmin
	 *            最少选项(多选使用)
	 * @param qnrmax
	 *            最多选项(多选使用)
	 * @param isitem
	 *            是否必答 1必答, 2选答
	 * @param options
	 *            问题选项信息,多个已","相隔
	 * @return
	 */
	@Transactional(rollbackFor = Exception.class)
	public DataMap updateTitleInfo(String titleid, String name, Integer tstate, Integer qnrmin, Integer qnrmax,
			Integer isitem, String options) throws Exception {
		DataMap dataMap = new DataMap();
		if (titleid == null || titleid.trim().equals("")) {
			dataMap.addMsg_diy_obj(null, 6, "未找到该问题信息");
			return dataMap;
		}
		String msg = this.estimateParams(name, tstate, qnrmin, qnrmax, isitem, options);
		if (!msg.equals("")) { // 验证信息
			dataMap.addMsg_diy_obj(null, 6, msg);
			return dataMap;
		}
		QnrTitle qnrTitle = qnrTitleMapper.selectByPrimaryKey(titleid);
		if (qnrTitle == null) {
			dataMap.addMsg_diy_obj(null, 6, "该问题信息不存在");
			return dataMap;
		}
		qnrTitle.setFname(name);
		qnrTitle.setQnrmax(qnrmax);
		qnrTitle.setQnrmin(qnrmin);
		qnrTitle.setIsitem(isitem);
		int num = 0;
		num = qnrTitleMapper.updateByPrimaryKeySelective(qnrTitle);
		if (num < 1) {
			logger.error("【修改问题信息-修改问题 】,信息位置" + this.getClass().getName()
					+ Thread.currentThread().getStackTrace()[1].getMethodName());
			new Exception("修改问题信息失败");
			dataMap.addMsg_diy_obj(null, 6, "修改问题信息失败");
			return dataMap;
		}
		
		if (tstate != 3) { // 添加问题选项
			List<QnrOption> qnrOptions = optionMapper.selectOptionByTitleid(titleid);
			
			if (!qnrOptions.isEmpty()) {
				num = optionMapper.deleteOptionByTitleid(titleid);
				if (num < 1) {
					logger.error("【修改问题信息-删除已有选项 】,信息位置" + this.getClass().getName()
							+ Thread.currentThread().getStackTrace()[1].getMethodName());
					new Exception("删除问题选项信息失败");
					dataMap.addMsg_diy_obj(null, 6, "修改问题信息失败");
					return dataMap;
				}
			}
			num = this.saveQnrOption(options, qnrTitle.getUserid(), qnrTitle.getCodes(), qnrTitle.getId());
			if (num == 0) {
				dataMap.addMsg_diy_list(null, 6, "修改问题信息失败,请重试");
				return dataMap;
			}
		}
		dataMap.addMsg_diy_obj(null, 0, "已修改");
		return dataMap;
	}
	
	
   /**
    * 删除问题与问题下的选项信息
    * @author xilongfei
    * @creation 2017年12月22日
    * @param qnrid	问卷ID
    * @return
    */
   public DataMap deleteTitleDetails(String titleid) {
	  DataMap dataMap = new DataMap();
	  if(titleid==null || titleid.trim().equals("")) {
		  dataMap.addMsg_diy_obj(null, 6, "未找到该问题信息");
		  return dataMap;
	  }
	/*  //查询该问题是否有用户回答过
	  QnrRejoin qnrRejoin =  new QnrRejoin();
	  qnrRejoin.setTitleid(titleid);
	  List<QnrRejoin> list = qnrRejoinMapper.selectQnrRejoinInfo(qnrRejoin);
	  if(!list.isEmpty()) {
		  dataMap.addMsg_diy_obj(null, 6, "该问题已有回答信息,不能删除");
		  return dataMap;
	  }*/
	  Integer rls = this.selectRls(titleid);
	  if(rls == null ) {
		  dataMap.addMsg_diy_obj(null, 6, "该问卷已已不存在");
		  return dataMap;
	  }
	  if(rls.intValue() == 1) {
		  dataMap.addMsg_diy_obj(null, 6, "该问卷已经发布,不能删除此问题");
		  return dataMap;
	  }
	  int num = qnrTitleMapper.deleteByPrimaryKey(titleid);
	  if(num < 1) {
		  dataMap.addMsg_diy_obj(null, 6, "删除失败,请重试");
	  }else {
		  dataMap.addMsg_obj(null, 0); 
	  }
	  return dataMap;
   }

   /**
    * 通过问题ID查询问卷状态
    * @author xilongfei
    * @creation 2017年12月26日
    * @param titleid  问题ID
    * @return
    */
   private Integer selectRls(String titleid) {
       String table_name = " qnr_title obj left join  qnr q on q.id = obj.qnrid ";  //表名,关联表
       String find = " q.rls";   //出参
       StringBuilder where = new StringBuilder("obj.id = '"+titleid+"'");  //条件
       Map<String, Object> map = this.selectMap(table_name, find, where.toString());
       Integer rls = null;
       if(map != null) {
    	   rls = (Integer)map.get("rls");
       }
       return rls;
	}
}
