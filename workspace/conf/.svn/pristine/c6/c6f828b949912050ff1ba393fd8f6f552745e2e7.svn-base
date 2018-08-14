package net.emof.building.web.controller;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.web.service.ConfsGuest_web_Service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司
 * FileName: ConfsGuest_web_Controller
 * Author:   anshiyuan
 * Date:     2017/12/13 下午2:37
 * Description:会议嘉宾  获取会议嘉宾列表 添加会议嘉宾 编辑会议嘉宾 删除会议嘉宾
 * History:
 */
@Controller
@RequestMapping("/confsGuest_web")
public class ConfsGuest_web_Controller {

    @Autowired
    private ConfsGuest_web_Service confsGuestService;


    /**
     * 查询会议嘉宾列表
     *
     * @param confsid 会议ID
     * @return
     * @author anshiyuan
     */
    @ResponseBody
    @RequestMapping(value = "/listpage", method = RequestMethod.POST)
    public Map<String, Object> list_page(@RequestParam(value = "confsid", required = true) String confsid) {
        DataMap dataMap = this.confsGuestService.getConfsGuestList(confsid);
        return dataMap.data;
    }

    /**
     * 添加会议嘉宾
     *
     * @param confsid 会议ID
     * @param token   用户token
     * @param gname   会议嘉宾 名称
     * @param gimg    会议嘉宾 头像
     * @param rank    会议嘉宾 头衔
     * @param brief   会议嘉宾 描述
     * @return
     * @author anshiyuan
     */
    @ResponseBody
    @RequestMapping(value = "/add_guest", method = RequestMethod.POST)
    public Map<String, Object> addConfsGuest(@RequestParam(value = "confsid", required = true) String confsid,
                                             @RequestParam(value = "token", required = true) String token,
                                             @RequestParam(value = "gname", required = false) String gname,
                                             @RequestParam(value = "gimg", required = false) String gimg,
                                             @RequestParam(value = "rank", required = false) String rank,
                                             @RequestParam(value = "brief", required = false) String brief) {
        DataMap dataMap = this.confsGuestService.addConfsGuest(confsid, token, gname, gimg, rank, brief);
        return dataMap.data;
    }

    /**
     * 添加会议嘉宾Pc端
     *
     * @param confsid 会议ID
     * @param token   用户token
     * @param gname   会议嘉宾 名称
     * @param gimg    会议嘉宾 头像
     * @param rank    会议嘉宾 头衔
     * @param brief   会议嘉宾 描述
     * @return
     * @author anshiyuan  , method = RequestMethod.POST
     */
    @ResponseBody
    @RequestMapping(value = "/add_guestPc")
    public Map<String, Object> addConfsGuestPc(@RequestParam(value = "confsid", required = true) String confsid,
                                             @RequestParam(value = "token", required = true) String token,
                                             @RequestParam(value = "array", required = false) String array) {
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
   	  
  	 JSONArray arr = new JSONArray(array);
     JSONObject object = null;
     List<Map<String, Object>> list= new ArrayList<Map<String, Object>>();
     for (int i = 0; i < arr.length(); i++) {
         object = arr.getJSONObject(i);
         String id = object.getString("id");
         String gname = object.getString("gname");
         String gimg = object.getString("gimg");
         String rank = object.getString("rank");
         String brief = object.getString("brief");
		  if(null==id||id.equals("")) {
			  DataMap dm =this.confsGuestService.addConfsGuest(confsid, token, gname, gimg, rank, brief);
			  list.add(dm.data);
		  } else {
			  DataMap dm =this.confsGuestService.updateConfsGuest(id,confsid, token, gname, gimg, rank, brief);
			  list.add(dm.data);
		  }
     }
     
    dataMap.addMsg_diy_list(list, 0, "存储成功！");
    return dataMap.data;
    }
    
    
    /**
     * 编辑修改会议嘉宾
     *
     * @param guestid 会议嘉宾 ID
     * @param gname   会议嘉宾 名称
     * @param gimg    会议嘉宾 头像
     * @param rank    会议嘉宾 头衔
     * @param brief   会议嘉宾 描述
     * @return
     * @author anshiyuan
     */
    @ResponseBody
    @RequestMapping(value = "/updata_guest", method = RequestMethod.POST)
    public Map<String, Object> updataConfsGuest(@RequestParam(value = "guestid", required = true) String guestid,
                                                @RequestParam(value = "gname", required = false) String gname,
                                                @RequestParam(value = "gimg", required = false) String gimg,
                                                @RequestParam(value = "rank", required = false) String rank,
                                                @RequestParam(value = "brief", required = false) String brief) {
        DataMap dataMap = this.confsGuestService.updataConfsGuest(guestid, gname, gimg, rank, brief);
        return dataMap.data;
    }

    /**
     * 删除会议嘉宾
     *
     * @param guestid 会议嘉宾ID
     * @return
     * @author anshiyuan
     */
    @ResponseBody
    @RequestMapping(value = "delete_guest", method = RequestMethod.POST)
    public Map<String, Object> deleteConfsGuest(@RequestParam(value = "guestid", required = true) String guestid) {
        DataMap dataMap = this.confsGuestService.deleteConfsGuest(guestid);
        return dataMap.data;
    }

}