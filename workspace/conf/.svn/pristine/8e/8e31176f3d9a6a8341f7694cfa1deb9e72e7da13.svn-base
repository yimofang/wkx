package net.emof.building.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

/**
 * web消息处理工具类
 * 
 * @author baikun
 * @creation 2017年9月26日
 */
public class ToolsMessage {

	// log4j日志
	private final Logger logger = Logger.getLogger(this.getClass());

	private Integer error = 0;

	private boolean iserror = false;
	// 返回 基类参数
	private Object objRow;
	// 返回 map参数
	private Map<String, Object> mapRow;
	// 返回 列表参数
	private List<Map<String, Object>> listRow;
	// 返回字符 参数
	private String strRow;
	// 消息
	private String msg = "操作成功";
	// 保存数据类型
	private String saveType = null;

	/**
	 * 当前消息 保存 数据类型
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public String getSaveType() {
		return saveType;
	}

	/**
	 * 返回 消息返回参数
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public Object getObjRow() {
		return objRow;
	}

	/**
	 * 返回 消息map参数
	 * 
	 * @author baikun
	 * @creation 2017年11月7日
	 * @return
	 */
	public Map<String, Object> getMapRow() {
		return mapRow;
	}

	/**
	 * 返回 消息返回参数
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public List<Map<String, Object>> getListRow() {
		return listRow;
	}

	/**
	 * 返回 消息返回参数
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public String getStrRow() {
		return strRow;
	}

	/**
	 * 返回 消息返回参数
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * 返回 是否有异常 false无 true有
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public boolean isIserror() {
		return iserror;
	}

	/**
	 * 返回 信息反馈 码 0正常
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public Integer getError() {
		return error;
	}

	/**
	 * web消息处理工具类
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 */
	public ToolsMessage() {
	}

	public ToolsMessage(Integer error, String msg) {
		if (error >= 0) {
			this.error = error;
		}
		if (error != 0) {
			this.iserror = true;
		}
		if (msg != null)
			this.msg = msg;
	}

	/**
	 * 添加 无参数消息
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @param error
	 * @param msg
	 */
	public void addMessage(Integer error, String msg) {
		if (error >= 0) {
			this.error = error;
		}
		if (error != 0) {
			this.iserror = true;
		}
		if (error != null) {
			this.msg = msg;
		}
	}

	/**
	 * 添加 返回str 参数 消息
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @param error
	 * @param msg
	 * @param row
	 */
	public void addMessage_str(Integer error, String msg, String row) {
		if (error >= 0) {
			this.error = error;
		}
		if (error != 0) {
			this.iserror = true;
		}
		if (error != null) {
			this.msg = msg;
		}
		this.strRow = row;
		this.mapRow = null;
		this.objRow = null;
		this.listRow = null;
		this.saveType = "String";
	}

	/**
	 * 添加 返回 map 参数消息
	 * 
	 * @author baikun
	 * @creation 2017年11月7日
	 * @param error
	 * @param msg
	 * @param row
	 */
	public void addMessage_map(Integer error, String msg, Map<String, Object> row) {
		if (error >= 0) {
			this.error = error;
		}
		if (error != 0) {
			this.iserror = true;
		}
		if (error != null) {
			this.msg = msg;
		}
		this.mapRow = row;
		this.strRow = null;
		this.objRow = null;
		this.listRow = null;
		this.saveType = "Map";
	}

	/**
	 * 添加 返回 obj 参数 消息
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @param error
	 * @param msg
	 * @param row
	 */
	public void addMessage_obj(Integer error, String msg, Object row) {
		if (error >= 0) {
			this.error = error;
		}
		if (error != 0) {
			this.iserror = true;
		}
		if (error != null) {
			this.msg = msg;
		}
		this.objRow = row;
		this.mapRow = null;
		this.strRow = null;
		this.listRow = null;
		this.saveType = "Object";
	}

	/**
	 * 添加 返回 List<Map<String,Object>> 参数 消息
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @param error
	 * @param msg
	 * @param row
	 */
	public void addMessage_List_map(Integer error, String msg, List<Map<String, Object>> row) {
		if (error >= 0) {
			this.error = error;
		}
		if (error != 0) {
			this.iserror = true;
		}
		if (error != null) {
			this.msg = msg;
		}
		this.listRow = row;
		this.objRow = null;
		this.mapRow = null;
		this.strRow = null;
		this.saveType = "List";
	}

	/**
	 * 返回消息传递参数
	 * 
	 * @author baikun
	 * @creation 2017年9月26日
	 * @return
	 */
	public Object getRow() {

		if (saveType == null) {
			logger.error("【getRow 信息异常】无正常返回值 ,信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName());
			return null;
		}
		if (this.objRow != null) {
			logger.info("【getRow】返回值类型  Object , 返回值  " + ToolsUtil.pojo_to_Map(this.objRow));
			return this.objRow;
		}
		if (this.strRow != null) {
			logger.info("【getRow】返回值类型  String , 返回值  " + this.strRow);
			return this.strRow;
		}
		if (this.mapRow != null && this.mapRow.size() >= 1) {
			logger.info("【getRow】返回值类型  map , 返回值  " + this.mapRow.toString());
			return this.mapRow;
		}
		if (this.listRow != null && this.listRow.get(0) != null && this.listRow.size() >= 1) {
			logger.info("【getRow】返回值类型  list<map> , 返回值  " + this.listRow.toString());
			return this.listRow;
		}
		logger.error("【getRow 信息异常】无正常返回值 ,信息位置" + this.getClass().getName() + " "
				+ Thread.currentThread().getStackTrace()[1].getMethodName());
		return null;
	}

	/**
	 * 返回消息 中ROW 类型
	 * 
	 * @author baikun
	 * @creation 2017年11月7日
	 * @return
	 */
	public Class<?> getRowType() {
		Field[] field = this.getClass().getDeclaredFields();
		try {
			for (int j = 0; j < field.length; j++) { // 遍历�?有属�?
				String name = field[j].getName(); // 获取属�?�的名字
				if (name.equals("logger")) {
					continue;
				}
				if (name.equals("error")) {
					continue;
				}
				if (name.equals("iserror")) {
					continue;
				}
				if (name.equals("msg")) {
					continue;
				}
				if (name.equals("saveType")) {
					continue;
				}
				// 将属性的首字符大写，方便构�?�get，set方法
				String name_subs = name.substring(0, 1).toUpperCase() + name.substring(1);
				if (field[j].get(this) != null) {
					Method m = this.getClass().getMethod("get" + name_subs, null);
					return (Class) field[j].getGenericType();
				}
			}

		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String[] args) {
		ToolsMessage message = new ToolsMessage();
		message.addMessage_str(1, "yyy", "sssssstr");
		System.out.println(ToolsUtil.pojo_to_Map(message.getRow()));
			
	}

	
	
	
 
}
