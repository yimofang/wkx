package net.emof.building.web.service;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.ConfsGuestMapper;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.ConfsGuest;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PinYinTool;
import net.emof.building.util.ToolsUtil;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司
 * FileName: ConfsGuest_web_Service
 * Author:   anshiyuan
 * Date:     2017/12/13 下午2:40
 * Description: 会议嘉宾 数据处理
 * History:
 */
@Service
public class ConfsGuest_web_Service extends SqlToolseService {

    @Autowired
    private ConfsGuestMapper confsGuestMapper;

    // log4j日志
    private final Logger logger = Logger.getLogger(this.getClass());

    /**
     * 查询会议嘉宾列表
     *
     * @param confsid 会议ID
     * @return
     * @author anshiyuan
     */
    public DataMap getConfsGuestList(String confsid) {
        DataMap dataMap = new DataMap();

        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "未找到会议信息");
            return dataMap;
        }

        StringBuffer table_name = new StringBuffer(" confs_guest obj");
        StringBuffer find = new StringBuffer(" obj.id,obj.gname,obj.gimg,obj.rank,obj.brief,obj.jletter");
        StringBuffer where = new StringBuffer(" obj.isdelete=1 AND obj.confsid='" + confsid + "'");
        StringBuffer order = new StringBuffer(" ORDER BY obj.jletter ASC");
        List<Map<String, Object>> maps = this.selectAll(table_name.toString(), find.toString(), where.toString(), order.toString());
        if (maps == null || maps.size() <= 0) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾查询失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_list(null, 6, "没有数据");
        }
        dataMap.addMsg_obj(maps, 0);
        return dataMap;
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
    public DataMap addConfsGuest(String confsid, String token, String gname, String gimg, String rank, String brief) {
        DataMap dataMap = new DataMap();
        Users users;
        if (token == null || token.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未识别标识");
            return dataMap;
        }
        try {
            users = EhSessicon.getTokenInfo(token);
            if (users == null) {
                dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
                return dataMap;
            }
        } catch (EhCacheSessiconException e) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾获取用户信息失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
            return dataMap;
        }
        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议信息");
            return dataMap;
        }
        if (gname == null || gname.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请输入嘉宾名称");
            return dataMap;
        }
        if (gimg == null || gimg.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请选择嘉宾头像");
            return dataMap;
        }
        if (rank == null || rank.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请输入嘉宾头衔");
            return dataMap;
        }
        StringBuffer table_name = new StringBuffer(" confs_guest obj");
        StringBuffer find = new StringBuffer(" obj.id");
//        StringBuffer where = new StringBuffer(" 1=1 AND obj.isdelete=1 AND obj.confsid='" + confsid
//                + "' AND  obj.gname='" + gname + "' AND obj.rank='" + rank + "' OR obj.gimg='" + gimg + "'");
        StringBuffer where = new StringBuffer(" 1=1 AND obj.isdelete=1 AND obj.confsid='" + confsid
                + "' AND  obj.gname='" + gname + "' AND obj.rank='" + rank + "' ");
        Map<String, Object> map = this.selectMap(table_name.toString(), find.toString(), where.toString());
        if (map != null) {
            dataMap.addMsg_diy_obj(null, 6, "该嘉宾已存在，请勿重复添加");
            return dataMap;
        }


        Date createtime = new Date(System.currentTimeMillis());
        String id = ToolsUtil.get_diy_ID(); //主键
        Integer usersid = users.getId();
        String codes = users.getCodes();
        String jletter;
        try {
            PinYinTool pinYinTool = new PinYinTool();
            String pinYin = pinYinTool.toPinYin(gname);
            jletter = pinYin.substring(0, 1);
        } catch (BadHanyuPinyinOutputFormatCombination badHanyuPinyinOutputFormatCombination) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾拼音转换失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "转换参数：" + gname);
            dataMap.addMsg_diy_list(null, 6, "添加出错，请重试");
            return dataMap;
        }

        ConfsGuest confsGuest = new ConfsGuest(id, gname, gimg, rank, brief, 1, createtime,
                usersid, codes, confsid, jletter);

        int result = this.confsGuestMapper.insertSelective(confsGuest);
        if (result < 1) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾添加失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_list(null, 6, "添加会议嘉宾失败，请重试");
        }
        dataMap.addMsg_diy_obj(confsGuest.getId(), 0, "会议嘉宾添加成功");
        return dataMap;
    }
    /**
     * 修改会议嘉宾
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
    public DataMap updateConfsGuest(String id,String confsid, String token, String gname, String gimg, String rank, String brief) {
    	 DataMap dataMap = new DataMap();
    	 String jletter;
    	 PinYinTool pinYinTool = new PinYinTool();
         String pinYin = null;
		 try {
			pinYin = pinYinTool.toPinYin(gname);
		 } catch (BadHanyuPinyinOutputFormatCombination e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		 }
         jletter = pinYin.substring(0, 1);
    	 ConfsGuest confsGuest = new ConfsGuest( id,  gname,  gimg,  rank,  jletter);
    	 int result = this.confsGuestMapper.updateByPrimaryKeySelective(confsGuest);
         if (result < 1) {
             logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾添加失败,信息位置" + this.getClass().getName() + " "
                     + Thread.currentThread().getStackTrace()[1].getMethodName());
             dataMap.addMsg_diy_list(null, 6, "添加会议嘉宾失败，请重试");
         }
         dataMap.addMsg_diy_obj(confsGuest.getId(), 0, "会议嘉宾添加成功");
         return dataMap;
    }
    /**
     * 编辑修改会议嘉宾信息
     *
     * @param guestid 会议嘉宾 ID
     * @param gname   会议嘉宾 名称
     * @param gimg    会议嘉宾 头像
     * @param rank    会议嘉宾 头衔
     * @param brief   会议嘉宾 描述
     * @return
     * @author anshiyuan
     */
    public DataMap updataConfsGuest(String guestid, String gname, String gimg, String rank, String brief) {
        DataMap dataMap = new DataMap();
        if (guestid == null || guestid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议嘉宾");
            return dataMap;
        }
        if (gname == null || gname.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请输入会议嘉宾名称");
            return dataMap;
        }
        if (gimg == null || gimg.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请选择会议嘉宾头像");
            return dataMap;
        }
        if (rank == null || rank.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "请输入会议嘉宾头衔");
            return dataMap;
        }
        String jletter;
        try {
            PinYinTool pinYinTool = new PinYinTool();
            String pinYin = pinYinTool.toPinYin(gname);
            jletter = pinYin.substring(0, 1);
        } catch (BadHanyuPinyinOutputFormatCombination badHanyuPinyinOutputFormatCombination) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾拼音转换失败,信息位置" + this.getClass().getName()
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "转换参数：" + gname);
            dataMap.addMsg_diy_list(null, 6, "添加出错，请重试");
            return dataMap;
        }
        ConfsGuest confsGuest = new ConfsGuest(guestid, gname, gimg, rank, jletter);
        if (brief != null && !brief.trim().equals("")) {
            confsGuest.setBrief(brief);
        }

        int result = this.confsGuestMapper.updateByPrimaryKeySelective(confsGuest);

        if (result < 1) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾修改失败,信息位置" + this.getClass().getName()
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "嘉宾ID参数：" + guestid);
            dataMap.addMsg_diy_list(null, 6, "修改会议嘉宾出错，请重试");
            return dataMap;
        }

        dataMap.addMsg_diy_obj(guestid, 0, "已修改");

        return dataMap;
    }

    /**
     * 删除会议嘉宾
     *
     * @param guestid 会议嘉宾ID
     * @return
     * @author anshiyuan
     */
    public DataMap deleteConfsGuest(String guestid) {
        DataMap dataMap = new DataMap();
        if (guestid == null || guestid.trim().equals("")) {
            dataMap.addMsg_diy_obj(null, 6, "未找到会议嘉宾");
            return dataMap;
        }
        int result = this.confsGuestMapper.deleteByPrimaryKey(guestid);

        if (result < 1) {
            logger.error("【会议嘉宾列表 信息异常】执行会议嘉宾删除失败,信息位置" + this.getClass().getName()
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "嘉宾ID参数：" + guestid);
            dataMap.addMsg_diy_list(null, 6, "删除失败，请重试");
            return dataMap;
        }

        dataMap.addMsg_obj(guestid, 0);

        return dataMap;
    }
}