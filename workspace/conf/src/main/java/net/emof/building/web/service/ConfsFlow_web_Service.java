package net.emof.building.web.service;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.admin.service.SqlToolseService;
import net.emof.building.dao.ConfsFlowMapper;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.ConfsFlow;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.ToolsUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 会议流程数据处理
 *
 * @author anshiyuan
 * @create 2017/12/12
 * @since 1.0.0
 */
@Service
public class ConfsFlow_web_Service extends SqlToolseService {

    @Autowired
    private ConfsFlowMapper confsFlowMapper;

    // log4j日志
    private final Logger logger = Logger.getLogger(this.getClass());

    /**
     * 查询会议流程列表
     *
     * @param confsid 会议ID
     * @return datamap
     * @author anshiyuan
     */
    public DataMap getConfsFlowList(String confsid, int type) {
        DataMap dataMap = new DataMap();

        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "未找到会议信息");
            return dataMap;
        }

        StringBuffer table_name = new StringBuffer("confs_flow obj");
        StringBuffer find = new StringBuffer();
        if (type == 2) { //会议详情查询
            find.append("obj.fname,obj.bhstart,obj.bhend");
        } else {
            find.append(" obj.id,obj.fname,obj.createtime,obj.bhstart,obj.bhend,obj.confsid");
        }
        StringBuffer where = new StringBuffer(" obj.isdelete=1 AND obj.confsid='" + confsid + "'");
        StringBuffer order = new StringBuffer(" ORDER BY obj.bhstart ASC");

        List<Map<String, Object>> maps = this.selectAll(table_name.toString(), find.toString(), where.toString(),
                order.toString());

       
        dataMap.addMsg_list(maps, 0);
        return dataMap;
    }
    /**
     * 添加会议流程
     *
     * @return
     * @author anshiyuan
     */
    public DataMap updateConfsFlow(String id,String confsid, String token, String fname, String bhstart, String bhend) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date start = null;
        Date end = null;
        try {
			start = sdf.parse(bhstart);
			end = sdf.parse(bhend);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        DataMap dataMap = new DataMap();
        ConfsFlow confsFlow = new ConfsFlow( id,  fname,  start,  end);
        int result = this.confsFlowMapper.updateByPrimaryKeySelective(confsFlow);
        if (result < 1) {
            logger.error("【会议流程列表 信息异常】执行会议流程添加失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_obj(null, 6, "保存信息失败,请重试");
            return dataMap;
        }
        dataMap.addMsg_diy_obj(confsFlow.getId(), 0, "保存成功");
        return dataMap;
    
    }
    /**
     * 添加会议流程
     *
     * @return
     * @author anshiyuan
     */
    public DataMap addConfsFlow(String confsid, String token, String fname, String bhstart, String bhend) {
        DataMap dataMap = new DataMap();
        Users users;
        if (confsid == null || confsid.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "会议ID为空");
            return dataMap;
        }
        if (token == null || token.trim().equals("") || token.trim().length() < 32) {
            dataMap.addMsg_diy_list(null, 6, "未识别标识");
            return dataMap;
        }
        try {
            users = EhSessicon.getTokenInfo(token);
            if (users == null) {
                dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
                return dataMap;
            }
        } catch (EhCacheSessiconException e) {
            logger.error("【会议流程列表 信息异常】执行会议流程获取用户信息失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_list(null, 5, "登录超时，请重新登录");
            return dataMap;
        }

        if (fname == null || fname.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "请填写会议流程名称");
            return dataMap;
        }
        if (bhstart == null || bhstart.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "请选择流程开始时间");
            return dataMap;
        }
        if (bhend == null || bhend.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "请选择流程结束时间");
            return dataMap;
        }

        StringBuffer table_name = new StringBuffer(" confs_flow obj");
        StringBuffer find = new StringBuffer(" obj.id");
        StringBuffer where = new StringBuffer(" 1=1 AND obj.isdelete=1 AND obj.confsid='" + confsid
                + "' AND  obj.fname='" + fname
                + "' AND DATE_FORMAT(obj.bhstart,'%Y-%m-%d %h:%m') != DATE_FORMAT('" + bhstart + "','%Y-%M-%d %h:%m')"
                + " AND DATE_FORMAT(obj.bhend,'%Y-%m-%d %h:%m') != DATE_FORMAT('" + bhend + "','%Y-%M-%d %h:%m')");

        Map<String, Object> map = this.selectMap(table_name.toString(), find.toString(), where.toString());
        if (map != null) {
            dataMap.addMsg_diy_obj(null, 6, "该流程已存在，请勿重复添加");
            return dataMap;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date createtime = new Date(System.currentTimeMillis());
        String id = ToolsUtil.get_diy_ID(); // 主键
        Date start;
        Date end;
        try {
            start = sdf.parse(bhstart);
        } catch (ParseException e) {
            logger.error("【会议流程列表 信息异常】执行会议流程时间转换失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "转换参数：" + bhstart);
            dataMap.addMsg_diy_list(null, 6, "添加出错，请重试");
            return dataMap;
        }
        try {
            end = sdf.parse(bhend);
        } catch (ParseException e) {
            logger.error("【会议流程列表 信息异常】执行会议流程时间转换失败,信息位置" + this.getClass().getName()
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "转换参数：" + bhend);
            dataMap.addMsg_diy_list(null, 6, "添加出错，请重试");
            return dataMap;
        }

        ConfsFlow confsFlow = new ConfsFlow(id, fname, 1, createtime, start, end, users.getId(), users.getCodes(),
                confsid);

        int result = this.confsFlowMapper.insertSelective(confsFlow);
        if (result < 1) {
            logger.error("【会议流程列表 信息异常】执行会议流程添加失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_obj(null, 6, "保存信息失败,请重试");
            return dataMap;
        }
        dataMap.addMsg_diy_obj(confsFlow.getId(), 0, "保存成功");
        return dataMap;
    }

    /**
     * 修改会议流程
     *
     * @param flowid  会议流程ID
     * @param fname   会议流程名称
     * @param bhstart 会议流程开始时间
     * @param bhend   会议流程开始时间
     * @return
     * @throws ParseException
     * @author anshiyuan
     */
    public DataMap updataConfsFlow(String flowid, String fname, String bhstart, String bhend) {
        DataMap dataMap = new DataMap();

        if (flowid == null || flowid.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "会议流程不存在");
            return dataMap;
        }
        if (fname == null || fname.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "请填写会议流程名称");
            return dataMap;
        }
        if (bhstart == null || bhstart.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "请选择流程开始时间");
            return dataMap;
        }
        if (bhend == null || bhend.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "请选择流程结束时间");
            return dataMap;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        Date start;
        Date end;
        try {
            start = sdf.parse(bhstart);
        } catch (ParseException e) {
            logger.error("【会议流程列表 信息异常】执行会议流程修改时间转换失败,信息位置" + this.getClass().getName() + ""
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "转换参数：" + bhstart);
            dataMap.addMsg_diy_list(null, 6, "添加出错，请重试");
            return dataMap;
        }
        try {
            end = sdf.parse(bhend);
        } catch (ParseException e) {
            logger.error("【会议流程列表 信息异常】执行会议流程修改时间转换失败,信息位置" + this.getClass().getName()
                    + Thread.currentThread().getStackTrace()[1].getMethodName() + "转换参数：" + bhend);
            dataMap.addMsg_diy_list(null, 6, "添加出错，请重试");
            return dataMap;
        }

        ConfsFlow confsFlow = new ConfsFlow(flowid, fname, start, end);
        int result = this.confsFlowMapper.updateByPrimaryKeySelective(confsFlow);
        if (result < 1) {
            logger.error("【会议流程列表 信息异常】执行会议流程修改失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_obj(null, 6, "修改信息失败,请重试");
            return dataMap;
        }
        dataMap.addMsg_diy_obj(flowid, 0, "已修改");
        return dataMap;
    }

    /**
     * 删除会议流程
     *
     * @param flowid 会议流程ID
     * @return
     * @author anshiyuan
     */
    public DataMap deleteConfsFlow(String flowid) {
        DataMap dataMap = new DataMap();

        if (flowid == null || flowid.trim().equals("")) {
            dataMap.addMsg_diy_list(null, 6, "会议流程不存在");
            return dataMap;
        }

        int result = this.confsFlowMapper.deleteByPrimaryKey(flowid);
        if (result < 1) {
            logger.error("【会议流程列表 信息异常】执行会议流程删除失败,信息位置" + this.getClass().getName() + " "
                    + Thread.currentThread().getStackTrace()[1].getMethodName());
            dataMap.addMsg_diy_obj(null, 6, "删除会议流程失败,请重试");
            return dataMap;
        }
        dataMap.addMsg_obj(null, 0);
        return dataMap;
    }
}