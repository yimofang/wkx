package net.emof.building.admin.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.customEXC.DeleteAdmException;
import net.emof.building.admin.customEXC.SelectAdmException;
import net.emof.building.admin.customEXC.SqlToolsException;
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.dao.MediaMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.Media;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;
import net.emof.building.util.intfc.ToolseSrvIntfc;

@Service
public class MediaService extends SqlToolseService implements ToolseSrvIntfc<DataMap, Media, Integer> {

	@Autowired
	private SqlToolsMapper exps;
	@Autowired
	private MediaMapper media;
	
	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 验证规则注入
	 */
	private DataMap proving = null;

	/**
	 * 验证规则注入
	 */
	public DataMap getProving() {
		return proving;
	}

	/**
	 * 验证规则注入
	 */
	public void setProving(DataMap proving) {
		this.proving = proving;
	}
	

	/**
	 * 初始化分页列表
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param pageInfo 分页类
	 * @param limit 总页数
	 * @param offset 当前页
	 * @param select  mname按照名子查找  可为null
	 * @param sort 排序字段  可为null
	 * @param sortOrder  排序字段  可为null
	 * @param agodate 开始日期 可为null
	 * @param backdate  结束日期 可为null
	 * @param sessiconAdmin  当前用户
	 * @return
	 */
	public Map<String, Object> pagelist(PageInfo pageInfo,String limit, String offset, String select, 
			String sort, String sortOrder, String agodate,String backdate, Users sessiconAdmin) {
		if (pageInfo == null) {
			pageInfo = new PageInfo();
		}
		pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
		pageInfo.setPageSize(Integer.parseInt(limit));
		if (pageInfo.getPage() < 2 || pageInfo.getPage() >= pageInfo.getTotalPage()) {
			pageInfo.setCount(0);
		}
		String code = this.get_code(sessiconAdmin.getId()).get("code").toString();
		String tableName = " media as obj "; // 表名
		String tableKey = "obj.id"; // 表主键
		String find = " obj.* "; // 显示字段
		String where = " 1=1 and obj.isdelete=1 and userid=" + sessiconAdmin.getId(); // 条件

		if (sessiconAdmin.getPowerid() == 1) {
			// 如果是 管理员 显示 层级
			where = " 1=1 and obj.isdelete=1 "; // 条件
		}

		String order = null; // 排序

		if (select != null && select.trim() != "" && ToolsUtil.isValid(select.trim())) {
			where = where + " and  obj.mname like '%" + select + "%' ";
		}

		if ((agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim()))
				&& (backdate == null || backdate.trim() == "" && ToolsUtil.isValid(backdate.trim()))) {
			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}

		if ((backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim()))
				&& (agodate == null || agodate.trim() == "" && ToolsUtil.isValid(agodate.trim()))) {
			where = where + " and  DATE_FORMAT(obj.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}

		if (agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim())) {

			if (backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim())) {

				where = where + " and DATE_FORMAT(obj.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}

		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by obj.id desc";
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myCount", pageInfo.getCount());// 总条数
		map.put("tableName", tableName);// 表名
		map.put("tableKey", tableKey);// 表主键ID，不填写order默认以此排序
		map.put("find", find);// 查询结果显示字段
		map.put("pageSize", pageInfo.getPageSize());// 总页数
		map.put("page", pageInfo.getPage());// 当前页
		map.put("where", where);// 条件语句（查询不需要写where）
		map.put("order", order);//排序
		List<Map<String, Object>> list = exps.getPage_json(map);
		// 请求存留 过程 中返回的总条数
		pageInfo.setCount(Integer.parseInt(map.get("myCount").toString()));

		Map<String, Object> map_res = new HashMap<String, Object>();
		// 定义dataTable 基础信息 键名不可更改 控制有约束
		System.out.println("size="+list.size());
		for(int i=0;i<list.size();i++) {
			Map<String, Object> maps=list.get(i);
			//id   mname    brief     createtime
			System.out.println(maps.get("mname")+"=maps="+maps.get("id"));
		}
		map_res.put("rows", list);
		map_res.put("total", pageInfo.getCount());
		return map_res;
	}

	/**
	 * 返回列表
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @return
	 */
	public DataMap getList() {
		DataMap map = new DataMap();
		List<Map<String, Object>> list = null;
		String tableName = " media as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = " 1=1 and obj.isdelete=1 "; // 条件
		String order = null; // 条件
		try {
			list = this.select_sqlstr(this.SqlFormat(tableName, find, where, order));
		} catch (SqlToolsException e) {
			logger.error("【getList异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "无查询信息");
			return map;
		}

		map.addMsg_list(list, 0);
		return map;
	}

	/**
	 * 返回列表
	 * 
	 * @author wkx
	 * @creation 2018年7月3日
	 * @return
	 */
	public DataMap getInfoList(String[] mediaid) {
		DataMap map = new DataMap();
		List<Map<String, Object>> list = null;
		String tableName = " media as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = " 1=1 and obj.isdelete=1 "; // 条件
		String wh=" and id IN(";
		for(int i=0;i<mediaid.length;i++) {
			 wh+=mediaid[i]+",";
		}
		int a=(wh.length()-2);
		wh=wh.substring(0, (wh.length()-1));
		wh+=") ";
		where+=wh;
		String order = null; // 条件
		try {
			list = this.select_sqlstr(this.SqlFormat(tableName, find, where, order));
		} catch (SqlToolsException e) {
			logger.error("【getList异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "无查询信息");
			return map;
		}

		map.addMsg_list(list, 0);
		return map;
	}
	
	/**
	 * 修改实体
	 * 
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param record
	 * @return
	 */
	@Override
	public DataMap update_obj(Media record) throws UpdateAdmException {
		DataMap map = proving == null ? provinginfo(record) : proving;

		if (record.getId() == null || record.getId() < 1) {
			map.addMsg_diy_obj(record, 1, "修改失败ID不存在");
			return map;
		}
		Integer row = null;
		try {
			if (map.errorJudge()) {
				row = media.updateByPrimaryKeySelective(record);
				map.addMsg_diy_obj(record.getId(), 0,"修改成功");
			}
		} catch (Exception e) {
			logger.error("【Media修改异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】"
					+ ToolsUtil.pojo_to_Map(record).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(record, 1, "修改失败,请检查添加信息");
			return map;
		}
		return map;
	}

	/**
	 * 添加实体
	 * 
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param record
	 * @return
	 */
	@Override
	public DataMap add_obj(Media record) throws AppendAdmException {
		DataMap map = proving == null ? provinginfo(record) : proving;
		// 创建时间
		record.setCreatetime(new Date());
		// 逻辑删除 1正常 2删除
		record.setIsdelete(1);
		Integer row = null;
		try {
			if (map.errorJudge()) {
				row = media.insertSelective(record);
			}
		} catch (Exception e) {
			logger.error("【Media添加异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】"
					+ ToolsUtil.pojo_to_Map(record).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(record, 1, "添加失败,请检查添加信息");
			return map;
		}
		if (row > 0) {
			map.addMsg_diy_obj(record.getId(), 0, "添加成功，");
			return map;
		}
		return map;
	}

	/**
	 * 根据ID返回实体信息
	 * 
	 * @author baikun
	 * @creation 2017年8月18日
	 * @param ID
	 * @return
	 */
	@Override
	public DataMap getInfo(Integer ID) {
		DataMap map = new DataMap();
		if (ID == null || ID < 0 || !ToolsUtil.isValid(ID + "")) {
			logger.error("【get_info异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID);
			map.addMsg_obj(null, 4);
			return map;
		}
		List<Map<String, Object>> list = null;
		String tableName = " media as obj "; // 表名
		String find = " obj.* "; // 显示字段
		String where = " 1=1 and obj.isdelete=1 and obj.id=" + ID; // 条件

		Map<String, Object> mapinfo;
		try {
			mapinfo = this.selectMap(tableName, find, where);
		} catch (Exception e) {
			logger.error("【get_info添加异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "无查询信息");
			return map;
		}

		map.addMsg_obj(mapinfo, 0);
		return map;
	}

	/**
	 * 逻辑删除
	 */
	@Override
	public DataMap isDelete(Integer ID) throws DeleteAdmException {
		try {
			media.isDelete(ID);
		} catch (Exception e) {
			logger.error("【删除异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());
			return new DataMap(null, 5);
		}
		return new DataMap();
	}

	/**
	 * 物理删除
	 */
	@Override
	public DataMap del_obj(Integer ID) throws DeleteAdmException {
		try {
			media.deleteByPrimaryKey(ID);
		} catch (Exception e) {
			logger.error("【删除异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());

			return new DataMap(null, 5);
		}
		return new DataMap();
	}

	/**
	 * 通用验证
	 * 
	 * @author baikun
	 * @creation 2017年12月15日
	 * @param record
	 * @return
	 * @throws Exception
	 */
	@Override
	public DataMap provinginfo(Media record) {
		DataMap map = new DataMap(record, 0);
		if (record.getMname() == null || record.getMname().trim().equals("") || record.getMname().trim().length() < 1
				|| !ToolsUtil.isValid(record.getMname().trim())) {
			map.addMsg_diy_obj(record, 4, "名称格式不正确");
			return map;
		}

		return map;
	}

	/**
	 * 未使用
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param ID
	 * @return
	 * @throws SelectAdmException
	 */
	public Map<String, Object> get_info(Integer ID) throws SelectAdmException {
		// TODO Auto-generated method stub
		return null;
	}

}
