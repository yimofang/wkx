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
 
import net.emof.building.admin.customEXC.UpdateAdmException;
import net.emof.building.dao.BriefMediaMapper;
import net.emof.building.dao.ConfsBriefMapper;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.model.BriefMedia;
import net.emof.building.model.ConfsBrief;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.PageInfo;
import net.emof.building.util.ToolsUtil;
import net.emof.building.util.intfc.ToolseSrvIntfc;

@Service
public class BriefMediaService extends SqlToolseService implements ToolseSrvIntfc<DataMap, BriefMedia, String> {

	@Autowired
	private SqlToolsMapper exps;
	@Autowired
	private BriefMediaMapper bmm;
	@Autowired
	private ConfsBriefMapper cm;

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
		String tableName = " brief_media as bm  "; // 表名
		String tableKey = "bm.id"; // 表主键
		tableName += " LEFT JOIN confs_brief  as cb on cb.id=bm.briefid ";
		String find = " bm.id,bm.bname as name ,bm.bphone ,cb.bname,bm.createtime "; // 显示字段
		find += ",(select group_concat(mname) from media where isdelete=1 and   find_in_set(media.id,bm.mediaid)  ) as mediastr";
		String where = " 1=1  "; // 条件

		String order = null; // 排序

		if (select != null && select.trim() != "" && ToolsUtil.isValid(select.trim())) {
			where = where + " and  cb.bname like '%" + select + "%' ";
		}

		if ((agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim()))
				&& (backdate == null || backdate.trim() == "" && ToolsUtil.isValid(backdate.trim()))) {
			where = where + " and  DATE_FORMAT(bm.createtime, '%Y-%m-%d')=DATE_FORMAT('" + agodate + "', '%Y-%m-%d')";
		}

		if ((backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim()))
				&& (agodate == null || agodate.trim() == "" && ToolsUtil.isValid(agodate.trim()))) {
			where = where + " and  DATE_FORMAT(bm.createtime, '%Y-%m-%d')=DATE_FORMAT('" + backdate + "', '%Y-%m-%d')";
		}

		if (agodate != null && agodate.trim() != "" && ToolsUtil.isValid(agodate.trim())) {

			if (backdate != null && backdate.trim() != "" && ToolsUtil.isValid(backdate.trim())) {

				where = where + " and DATE_FORMAT(bm.createtime, '%Y-%m-%d')  BETWEEN DATE_FORMAT('" + agodate
						+ "', '%Y-%m-%d') AND DATE_FORMAT('" + backdate + "', '%Y-%m-%d')  ";
			}
		}

		if (sort != null && sortOrder != null) {
			order = " order by " + sort + " " + sortOrder;
		} else {
			order = " order by bm.id desc";
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("myCount", 0);// 总条数
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
	public DataMap update_obj(BriefMedia record) throws UpdateAdmException {
		DataMap map = proving == null ? provinginfo(record) : proving;

		if (record.getId() == null || record.getId().trim().length() < 1) {
			map.addMsg_diy_obj(record, 1, "修改失败ID不存在");
			return map;
		}
		Integer row = null;
		try {
			if (map.errorJudge()) {
				row = bmm.updateByPrimaryKeySelective(record);
				map=getInfo(record.getId());
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
	public DataMap add_obj(BriefMedia record) throws AppendAdmException {
		DataMap map = proving == null ? provinginfo(record) : proving;
		// 创建时间
		record.setCreatetime(new Date());
		// 逻辑删除 1正常 2删除
		record.setId(ToolsUtil.get_diy_ID());
		
		int row =0;
		try {
			System.out.println("record.map.errorJudge()()=" + map.errorJudge());
			if (true) {
				row = bmm.insertSelective(record);
				ConfsBrief cb = cm.selectByPrimaryKey(record.getBriefid());
				int count = 0;
				if(null==cb.getPush()||cb.getPush().equals("")) {}else {
					count = cb.getPush();
				}

				String[] med=record.getMediaid().split(",");
				count = (count+med.length);
				cb.setPush(count);
				String mediaids="";
				if(null==cb.getMediaid()||cb.getMediaid().equals("")) {
					cb.setMediaid(record.getMediaid());
				}else {
					 mediaids=cb.getMediaid();
					String[] mediaid=cb.getMediaid().split(",");
					boolean ifx=true;
					for(int j=0;j<med.length;j++) {
						for(int i=0;i<mediaid.length;i++) {
							if(mediaid[i].equals(med[j])) {
								ifx=false;
							}
						}
						if(ifx) {
							mediaids+=","+med[j];
						}
						ifx = true;
					}
					cb.setMediaid(mediaids);
				}
				cm.updateByPrimaryKeySelective(cb);
			}
		} catch (Exception e) {
			logger.error("【Media添加异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】"
					+ ToolsUtil.pojo_to_Map(record).toString() + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(record, 1, "添加失败,请检查添加信息");
			return map;
		}
		if (row >0 ) {
			return getInfo(record.getId());
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
	public DataMap getInfo(String ID) {
		DataMap map = new DataMap();
		if (ID == null || !ToolsUtil.isValid(ID + "")) {
			logger.error("【get_info异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID);
			map.addMsg_obj(null, 4);
			return map;
		}
		String tableName = " brief_media as bm  "; // 表名
		tableName += " LEFT JOIN confs_brief  as cb on cb.id=bm.briefid ";
		String find = " bm.id,bm.bname as name ,bm.bphone ,cb.bname "; // 显示字段
		find += ",(select group_concat(mname) from media where isdelete=1 and   find_in_set(media.id,bm.mediaid)  ) as mediastr";
		String where = "  bm.id='" + ID+"'"; // 条件
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
	public DataMap isDelete(String ID) throws DeleteAdmException {

		return new DataMap();
	}

	/**
	 * 物理删除
	 */
	@Override
	public DataMap del_obj(String ID) throws DeleteAdmException {
		try {
			bmm.deleteByPrimaryKey(ID);
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
	public DataMap provinginfo(BriefMedia record) {
		DataMap map = new DataMap(record, 0);
		if (record.getBname() == null || record.getBname().trim().equals("") || record.getBname().trim().length() < 1
				|| !ToolsUtil.isValid(record.getBname().trim())) {
			map.addMsg_diy_obj(record, 4, "姓名格式不正确");
			return map;
		}
		if (record.getBphone() == null || record.getBphone().trim().equals("") || record.getBphone().trim().length() < 1
				|| !ToolsUtil.isValid(record.getBphone().trim())) {
			map.addMsg_diy_obj(record, 4, "联系方式格式不正确");
			return map;
		}
		if (record.getMediaid() == null || record.getMediaid().trim().equals("") || record.getMediaid().trim().length() < 1
				|| !ToolsUtil.isValid(record.getBphone().trim())) {
			map.addMsg_diy_obj(record, 4, "请选择推广媒体");
			return map;
		}

		return map;
	}

	/**
	 * (用于修改form查询)根据id获取实体
	 * 
	 * @author baikun
	 * @creation 2017年12月18日
	 * @param ID
	 * @return
	 * @throws SelectAdmException
	 */
	@Override
	public Map<String, Object> get_info(String ID) throws SelectAdmException {
		DataMap map = new DataMap();
		if (ID == null || !ToolsUtil.isValid(ID + "")) {
			logger.error("【get_info异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID);
			map.addMsg_obj(null, 4);
			return map.data;
		}
		String tableName = " brief_media as bm  "; // 表名
		//tableName += " LEFT JOIN confs_brief  as cb on cb.id=bm.briefid ";
		String find = " bm.* "; // 显示字段
		String where = "  bm.id='" + ID+"'"; // 条件
		Map<String, Object> mapinfo;
		try {
			mapinfo = this.selectMap(tableName, find, where);
		} catch (Exception e) {
			logger.error("【get_info添加异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数】" + ID + "【异常】" + e.getMessage());
			map.addMsg_diy_obj(null, 5, "无查询信息");
			return map.data;
		}
		map.addMsg_obj(mapinfo, 0);
		return map.data;
	}

	/**
	 * 查询简报名称信息
	 * @author YLS
	 * @creation 2018年4月17日
	 * @return
	 */
	public List<Map<String, Object>> brief_list() {
		String tableName = "  confs_brief as c "; // 表名
		String find = " c.id,c.bname as name "; // 显示字段
		String where = " 1=1 and c.isdelete=1 ";
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		return list;
	}

	/**
	 * 查询媒体名称信息
	 * @author YLS
	 * @creation 2018年4月17日
	 * @return
	 */
	public List<Map<String, Object>> getmedia() {
		String tableName = "  media as m "; // 表名
		String find = " m.id,m.mname as name "; // 显示字段
		String where = " 1=1 and m.isdelete=1 ";
		List<Map<String, Object>> list = this.selectAll(tableName, find, where, null);
		return list;
	}

}
