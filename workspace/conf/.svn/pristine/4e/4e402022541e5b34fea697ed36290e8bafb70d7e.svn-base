package net.emof.building.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.emof.building.admin.customEXC.SqlToolsException;
import net.emof.building.dao.SqlToolsMapper;
import net.emof.building.util.DataMap;

/**
 * 通用查询访问 操作
 * 
 * @author baikun
 * @creation 2017年7月31日
 */
@Service
public class SqlToolseService {

	@Autowired
	private SqlToolsMapper exps;

	private String sql_str = "select '无效信息'as msg ";

	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 格式化 sql 语句
	 * 
	 * @author baikun
	 * @creation 2017年7月31日
	 * @param tableName
	 * @param find
	 * @param where
	 * @return
	 * @throws SqlToolsException
	 */
	protected String SqlFormat(String tableName, String find, String where, String order) throws SqlToolsException {
		if (tableName == null || tableName.trim().length() < 1) {
			throw new SqlToolsException("【格式化sql语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + " tableName=" + tableName);
		}

		if (find == null || find.trim().length() < 1) {
			find = " * ";
		}

		if (where == null || where.trim().length() < 1) {
			where = " 1=1 ";
		}
		if (order != null && order.trim().length() < 1) {
			throw new SqlToolsException("【格式化sql语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber());
		}
		if (order == null) {
			order = "";
		}
		sql_str = "select " + find + " from " + tableName + " where " + where + " " + order;
		return sql_str;
	}

	/**
	 * 自定义sql 语句 示例 ( select * from xxxx where 1=1 )
	 * 
	 * @author baikun
	 * @creation 2017年12月7日
	 * @param sqlstr
	 * @return
	 * @throws SqlToolsException
	 */
	@SuppressWarnings("finally")
	protected List<Map<String, Object>> select_sqlstr(String sqlstr) throws SqlToolsException {

		List<Map<String, Object>> list = null;

		if ((sqlstr.indexOf("select") == -1) && (sqlstr.indexOf("Select") == -1) && (sqlstr.indexOf("SELECT") == -1)) {
			throw new SqlToolsException("【select_sqlstr方法异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数信息】" + sqlstr);
		}

		if ((sqlstr.indexOf("from") == -1) && (sqlstr.indexOf("From") == -1) && (sqlstr.indexOf("FROM") == -1)) {
			throw new SqlToolsException("【select_sqlstr方法异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数信息】" + sqlstr);
		}

		if ((sqlstr.indexOf("where") == -1) && (sqlstr.indexOf("Where") == -1) && (sqlstr.indexOf("WHERE") == -1)) {
			throw new SqlToolsException("【select_sqlstr方法异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【参数信息】" + sqlstr);
		}

		try {
			list = exps.executeSql(sqlstr);
		} catch (Exception e) {
			throw new SqlToolsException("【select_sqlstr方法异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常信息】" + e.getMessage());
		} finally {
			if ((list == null || list.size() < 0) || (list != null && list.get(0) == null)) {
				logger.error("【select_sqlstr方法异常】信息位置" + this.getClass().getName() + " "
						+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
						+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】" + list);
			}
			return list;
		}

	}

	/**
	 * 根据表名,显示字段,条件语句 返回数据集
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param tableName
	 *            表名(必填)
	 * @param find
	 *            显示字段(参数为null 默认为 *)
	 * @param where
	 *            条件语句(参数不需要加 'where',可以为null)
	 * @param order
	 *            排序(参数需要加 order by xxx desc 或 asc)
	 * @return
	 */
	public List<Map<String, Object>> selectAll(String tableName, String find, String where, String order) {
		List<Map<String, Object>> list = null;
		try {
			list = exps.executeSql(this.SqlFormat(tableName, find, where, order));
		} catch (SqlToolsException e) {
			logger.error("【selectAll语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
		}
		if (list == null || list.size() < 1) {
			logger.error("【selectAll语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】" + list);
		}
		return list;
	}

	/**
	 * 根据 表名 显示字段 条件 返回 map
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param tableName
	 * @param find
	 * @param where
	 * @return
	 */
	public Map<String, Object> selectMap(String tableName, String find, String where) {
		List<Map<String, Object>> list = null;
		try {
			list = exps.executeSql(this.SqlFormat(tableName, find, where, null));
		} catch (SqlToolsException e) {
			logger.error("【selectMap语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
		}
		if (list == null || list.size() < 1) {
			logger.error("【selectMap语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】" + list);
		}
		return ((list != null) && (list.size() > 0)) ? list.get(0) : null;
	}

	/**
	 * 根据表名,显示字段,条件语句 返回数据集(分页)
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param tableName
	 *            表名(必填)
	 * @param find
	 *            显示字段(参数为null 默认为 *)
	 * @param where
	 *            条件语句(参数不需要加 'where' , 可以为null)
	 * @param order
	 *            order 排序(参数需要加 order by xxx desc 或 asc)
	 * @param page
	 *            页数
	 * @param display
	 *            每页显示数
	 * @return
	 */
	public Map<String, Object> selectAllPage(String tableName, String find, String where, String order, Integer page,
			Integer display) {
		List<Map<String, Object>> list = null;
		Map<String, Object> rowsmap = new HashMap<>();
		try {
			list = exps.executeSql(this.SqlFormat(tableName, find, where, order));
			Page<Object> pg = PageHelper.startPage(page, display); // 核心分页代码
			// 总页数
			int pages = pg.getPages();
			rowsmap.put("row", list); // 数据集
			rowsmap.put("pages", pages);// 总记录数
			rowsmap.put("page", page);// 当前页
		} catch (SqlToolsException e) {
			logger.error("【selectAllPage语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
		}
		if (list == null || list.size() < 1) {
			logger.error("【selectAllPage语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】" + list);
		}
		return rowsmap;
	}

	/**
	 * 根据表名,显示字段,条件语句 返回数据集(分页)
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param tableName
	 *            表名(必填)
	 * @param find
	 *            显示字段(参数为null 默认为 *)
	 * @param where
	 *            条件语句(参数不需要加 'where' , 可以为null)
	 * @param order
	 *            order 排序(参数需要加 order by xxx desc 或 asc)
	 * @param page
	 *            页数
	 * @param display
	 *            每页显示数
	 * @return
	 */
	public DataMap pageList(String tableName, String find, String where, String order, Integer page, Integer display) {
		List<Map<String, Object>> list = null;
		DataMap rowsmap = new DataMap();
		Page<Object> pg = null;
		int pages = 0;
		if (page <= 0) {
			page = 1;
		}
		try {
			pg = PageHelper.startPage(page, display); // 核心分页代码
			if (order != null) {
				PageHelper.orderBy(order.replace("order by",""));
			}
			list = exps.executeSql(this.SqlFormat(tableName, find, where, null));
			
			pages = pg.getPages();
		} catch (SqlToolsException e) {
			logger.error("【pageList语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
		}
		if (list == null || list.size() < 1) {
			logger.error("【pageList语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】" + list);
		}
		rowsmap.addMsg_list(list, 0);// 数据集
		rowsmap.data.put("pages", pages);// 总页数
		rowsmap.data.put("page", page);// 当前页
		rowsmap.data.put("total",pg.getTotal());// 总记录数
		return rowsmap;
	}

	
	 
	/**
	 * 根据表名,显示字段,条件语句 返回数据集(分页)
	 * 
	 * @author baikun
	 * @creation 2017年8月1日
	 * @param tableName
	 *            表名(必填)
	 * @param find
	 *            显示字段(参数为null 默认为 *)
	 * @param where
	 *            条件语句(参数不需要加 'where' , 可以为null)
	 * @param order
	 *            order 排序(参数需要加 order by xxx desc 或 asc)
	 * @param page
	 *            页数
	 * @param display
	 *            每页显示数
	 * @return
	 */
	public List<Map<String, Object>> selectAllPageList(String tableName, String find, String where, String order,
			Integer page, Integer display) {
		List<Map<String, Object>> list = null;
		// Map<String, Object> rowsmap = new HashMap<>();
		try {
			PageHelper.startPage(page, display); // 核心分页代码
			list = exps.executeSql(this.SqlFormat(tableName, find, where, order));
		} catch (SqlToolsException e) {
			logger.error("【selectAllPage语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
		}
		if (list == null || list.size() < 1) {
			logger.error("【selectAllPage语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【返回值】" + list);
		}
		return list;
	}

	/**
	 * 根据表名,显示字段,条件语句 返回数据集(分页)
	 * 
	 * @author xilongfei
	 * @creation 2017年11月1日
	 * @param tableName
	 *            表名(必填)
	 * @param find
	 *            显示字段(参数为null 默认为 *)
	 * @param where
	 *            条件语句(参数不需要加 'where' , 可以为null)
	 * @param order
	 *            排序(参数需要加 xxx desc 或 asc)
	 * @param page
	 *            页数
	 * @param display
	 *            每页显示数
	 * @return
	 */
	public Map<String, Object> getListAllPage(String tableName, String find, String where, String order, Integer page,
			Integer display) {
		List<Map<String, Object>> list = null;
		Map<String, Object> rowsmap = new HashMap<>();
		try {
			PageHelper.startPage(page, display, true, null);// 核心分页代码
			PageHelper.orderBy(order); // 排序
			list = exps.executeSql(this.SqlFormat(tableName, find, where, null));
			PageInfo<Map<String, Object>> info = new PageInfo<>(list);
			rowsmap.put("row", list); // 数据集
			rowsmap.put("page", page);// 当前页
			rowsmap.put("pages", info.getPages());// 总页数
			rowsmap.put("count", info.getTotal());//总条数
		} catch (SqlToolsException e) {
			logger.error("【selectAllPage语句异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "/n" + "【异常信息】" + e.getMessage());
		}
		return rowsmap;
	}

	/**
	 * 返回用户所在组织机构识别code
	 * 
	 * @author baikun
	 * @creation 2017年3月7日
	 * @param userid
	 *            用户id
	 * @return
	 */
	protected Map<String, Object> get_code(Integer userid) {
		String tableName = " users as u LEFT JOIN organiz as o on u.organizid=o.id "; // 表名
		String find = " o.code "; // 显示字段
		String where = "o.isdelete=1 and u.isdelete=1 and  u.id=" + userid;
		return this.selectMap(tableName, find, where);
	}
}
