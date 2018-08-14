package net.emof.building.web.service;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.ConfsBackMapper;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.ConfsBack;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.ToolsUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司
 * FileName: ConfsBack_web_Service
 * Author:   anshiyuan
 * Date:     2017/12/18 下午3:24
 * Description:
 * History:
 */
@Service
public class ConfsBack_web_Service extends SqlToolseService {

    @Autowired
    private ConfsBackMapper confsBackMapper;

    // log4j日志
    private final Logger logger = Logger.getLogger(this.getClass());

    
    /**
     *  展示会议上传签到表图片信息
     * @author anshiyuan
     * @creation 2018年1月2日
     * @param confsid	会议ID
     * @return
     */
    public DataMap listpage(String confsid) {
        DataMap dataMap = new DataMap();
        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议信息");
            return dataMap;
        }
        String table_name = " confs_back obj";
        String find = "obj.id, obj.imgs";
        String where = " 1=1 AND obj.isdelete=1 AND obj.confsid='" + confsid + "'"
        		+ " order by obj.createtime ";
        Map<String, Object> map = this.selectMap(table_name, find, where);
        dataMap.addMsg_obj(map, 0);
        return dataMap;
    }

    /**
     * 上传签到图片
     *
     * @param token   用户识别标识
     * @param confsid 会议ID
     * @param imgs	    上传图片名称,多个以","隔开
     * @return
     * @throws EhCacheSessiconException 
     */
    public DataMap addConfsBackPc(String token, String confsid, String imgs) throws EhCacheSessiconException {
        DataMap dataMap = new DataMap();
        Users users;
        if (token == null || token.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到识别标识");
            return dataMap;
        }
        users = EhSessicon.getTokenInfo(token);
        if (users == null) {
            dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
            return dataMap;
        }
        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议信息");
            return dataMap;
        }
        if (imgs == null || imgs.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请选择要上传的图片");
            return dataMap;
        }
        int num = 0;
        Map<String, Object> row = (Map<String, Object>) listpage(confsid).data.get("row");
        ConfsBack confsBack;
        if(row != null ) {
        	
        	String img=row.get("imgs").toString();
        	if(img==null||img.equals("")) {
        		img=imgs;
        	}else {
        		img=img+","+imgs;
        	}
        	  confsBack = new ConfsBack();
        	  confsBack.setId(row.get("id").toString());
        	  confsBack.setUserid(users.getId());
        	  confsBack.setCodes(users.getCodes());
        	  confsBack.setCreatetime(new Date());
        	  confsBack.setConfsid(confsid);
        	  confsBack.setImgs(img);
        	  num = confsBackMapper.updateByPrimaryKeySelective(confsBack);
  	        if (num < 1) {
  	            dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
  	            return dataMap;
  	        }
//        	num = confsBackMapper.deleteByPrimaryKey(row.get("id").toString());
//        	if (num < 1) {
//                dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
//                return dataMap;
//            }
        }else {
	        confsBack = new ConfsBack(ToolsUtil.get_diy_ID(), users.getId(), users.getCodes(), confsid, imgs);
	        num = confsBackMapper.insertSelective(confsBack);
	        if (num < 1) {
	            dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
	            return dataMap;
	        }
        }
        dataMap.addMsg_obj(confsBack.getId(), 0);
        return dataMap;
    }

    
    
    /**
     * 删除签到图片
     *
     * @param token   用户识别标识
     * @param confsid 会议ID
     * @param imgs	    上传图片名称,多个以","隔开
     * @return
     * @throws EhCacheSessiconException 
     */
    public DataMap deleteConfsBackPc(String token, String confsid, String imgs) throws EhCacheSessiconException {
        DataMap dataMap = new DataMap();
        Users users;
        if (token == null || token.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到识别标识");
            return dataMap;
        }
        users = EhSessicon.getTokenInfo(token);
        if (users == null) {
            dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
            return dataMap;
        }
        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议信息");
            return dataMap;
        }
        if (imgs == null || imgs.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请选择要上传的图片");
            return dataMap;
        }
        int num = 0;
        Map<String, Object> row = (Map<String, Object>) listpage(confsid).data.get("row");
        ConfsBack confsBack;
        if(row == null ) {
        	 dataMap.addMsg_diy_obj(null, 6, "删除错误！");
             return dataMap;
        }
        String img;
        if(null==row.get("imgs")||"".equals(row.get("imgs"))) {
        	 dataMap.addMsg_diy_obj(null, 6, "图片不存在！");
             return dataMap;
        }else {
        	 img=row.get("imgs").toString();
        }
        	
        String imgx = "";
        System.out.println("img="+img);
        String[] im = img.split(",");
        for(int i = 0;i < im.length; i++) {
        	if(im[i].equals(imgs)) {
        	}else {
        		imgx+=","+im[i];
        	}
        }
        if(imgx.equals("")) {}else {
        	imgx = imgx.substring(1, imgx.length());
        }
        	  confsBack = new ConfsBack();
        	  confsBack.setId(row.get("id").toString());
        	  confsBack.setUserid(users.getId());
        	  confsBack.setCodes(users.getCodes());
        	  confsBack.setCreatetime(new Date());
        	  confsBack.setConfsid(confsid);
        	  confsBack.setImgs(imgx);
        	  num = confsBackMapper.updateByPrimaryKeySelective(confsBack);
  	        if (num < 1) {
  	            dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
  	            return dataMap;
  	        }
//        	num = confsBackMapper.deleteByPrimaryKey(row.get("id").toString());
//        	if (num < 1) {
//                dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
//                return dataMap;
//            }
        
        dataMap.addMsg_obj(confsBack.getId(), 0);
        return dataMap;
    }
    
    /**
     * 上传签到图片
     *
     * @param token   用户识别标识
     * @param confsid 会议ID
     * @param imgs	    上传图片名称,多个以","隔开
     * @return
     * @throws EhCacheSessiconException 
     */
    public DataMap addConfsBack(String token, String confsid, String imgs) throws EhCacheSessiconException {
        DataMap dataMap = new DataMap();
        Users users;
        if (token == null || token.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到识别标识");
            return dataMap;
        }
        users = EhSessicon.getTokenInfo(token);
        if (users == null) {
            dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
            return dataMap;
        }
        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议信息");
            return dataMap;
        }
        if (imgs == null || imgs.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请选择要上传的图片");
            return dataMap;
        }
        int num = 0;
        Map<String, Object> row = (Map<String, Object>) listpage(confsid).data.get("row");
        if(row != null ) {
        	num = confsBackMapper.deleteByPrimaryKey(row.get("id").toString());
        	if (num < 1) {
                dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
                return dataMap;
            }
        }
        ConfsBack confsBack = new ConfsBack(ToolsUtil.get_diy_ID(), users.getId(), users.getCodes(), confsid, imgs);
        num = confsBackMapper.insertSelective(confsBack);
        if (num < 1) {
            dataMap.addMsg_diy_obj(null, 6, "保存失败，请重新提交");
            return dataMap;
        }
        dataMap.addMsg_obj(confsBack.getId(), 0);
        return dataMap;
    }


}