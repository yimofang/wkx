package net.emof.building.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

/**
 * 通用接口消息类
 * 
 * @author baikun
 * @creation 2017年3月29日
 */
public class DataMap {

	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	// error说明 ：0数据正常 1数据不完整 2长度不正确 3类型不正确 4格式不正确 5数据异常 
	private String[][] error_msg = { { "0", "操作成功" }, { "1", "数据不完整" }, { "2", "长度不正确" }, { "3", "类型不正确" },
			{ "4", "格式不正确" }, { "5", "数据异常" }, { "6", "数据不存在" } };

	public Map<String, Object> data = null;

	private Object obj_row = null;

	public Object getObj_row() {
		return obj_row;
	}

	private boolean error = true;

	public DataMap() {
		data = new HashMap<String, Object>();
		data.put("row", null);
		data.put("error", error_msg[0][0]);
		data.put("msg", error_msg[0][1]);
	}

	/**
	 * 通用接口消息类
	 * 
	 * @author baikun
	 * @creation 2017年7月6日
	 * @param row
	 *            Obj返回值
	 * @param msgKey
	 *            信息标识 0数据正常 1数据不完整 2长度不正确 3类型不正确 4格式不正确 5数据异常
	 */
	public DataMap(Object row, Integer msgKey) {
		data = new HashMap<String, Object>();
		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", error_msg[msgKey][1]);
	}

 

	/**
	 * 通用接口消息类
	 * 
	 * @author baikun
	 * @creation 2017年7月6日
	 * @param row
	 *            Obj返回值
	 * @param msgKey
	 *            信息标识 0数据正常 1数据不完整 2长度不正确 3类型不正确 4格式不正确 5数据异常
	 * @param message
	 *            自定义返回信息
	 */
	public DataMap(Object row, Integer msgKey, String message) {
		data = new HashMap<String, Object>();
		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}
		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", message);
	}

	/**
	 * 返回可操作判断
	 * 
	 * @author baikun
	 * @creation 2017年6月8日
	 * @return 通过验证true 不通过false
	 */
	public boolean errorJudge() {
		return error;
	}

	/**
	 * 返回接口消息
	 * 
	 * @author baikun
	 * @creation 2017年3月29日
	 * @param row
	 *            list 数据集合
	 * @param msgKey
	 *            信息标识(0.数据正常 ,1.数据不完整 ,2.长度不正确, 3.类型不正确 ,4.格式不正确 ,5.数据异常)
	 */
	public Map<String, Object> addMsg_list(List<Map<String, Object>> row, Integer msgKey) {

		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", error_msg[msgKey][1]);

		return data;
	}

	/**
	 * 返回接口消息
	 * 
	 * @author baikun
	 * @creation 2017年3月29日
	 * @param row
	 *            map 数据
	 * @param msgKey
	 *            信息标识(0.数据正常 ,1.数据不完整 ,2.长度不正确, 3.类型不正确 ,4.格式不正确 ,5.数据异常)
	 */
	public Map<String, Object> addMsg_map(Map<String, Object> row, Integer msgKey) {

		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", error_msg[msgKey][1]);

		return data;
	}

	/**
	 * 返回接口消息
	 * 
	 * @author baikun
	 * @creation 2017年3月29日
	 * @param row
	 *            list 数据集合
	 * @param msgKey
	 *            信息标识(0.数据正常 ,1.数据不完整 ,2.长度不正确, 3.类型不正确 ,4.格式不正确 ,5.数据异常)
	 */
	public Map<String, Object> addMsg_obj(Object row, Integer msgKey) {

		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}

		data.put("error", error_msg[msgKey][0]);
		data.put("msg", error_msg[msgKey][1]);

		return data;
	}

	/**
	 * 
	 * @author baikun
	 * @creation 2017年3月29日
	 * @param row
	 * @param msgKey
	 *            信息标识(0.数据正常 ,1.数据不完整 ,2.长度不正确, 3.类型不正确 ,4.格式不正确 ,5.数据异常)
	 * @param message
	 *            自定义提示信息内容
	 * @return
	 */
	public Map<String, Object> addMsg_diy_obj(Object row, Integer msgKey, String message) {

		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", message);

		return data;
	}

	/**
	 * 
	 * @author baikun
	 * @creation 2017年3月29日
	 * @param row
	 * @param msgKey
	 *            信息标识(0.数据正常 ,1.数据不完整 ,2.长度不正确, 3.类型不正确 ,4.格式不正确 ,5.数据异常)
	 * @param message
	 *            自定义提示信息内容
	 * @return
	 */
	public Map<String, Object> addMsg_diy_map(Map<String, Object> row, Integer msgKey, String message) {

		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", message);

		return data;
	}

	/**
	 * 
	 * @author baikun
	 * @creation 2017年3月29日
	 * @param row
	 * @param msgKey
	 *            信息标识(0.数据正常 ,1.数据不完整 ,2.长度不正确, 3.类型不正确 ,4.格式不正确 ,5.数据异常)
	 * @param message
	 *            自定义提示信息内容
	 * @return
	 */
	public Map<String, Object> addMsg_diy_list(List<Map<String, Object>> row, Integer msgKey, String message) {

		if (msgKey != 0) {
			this.error = false;
		}
		if (msgKey > error_msg.length) {
			msgKey = 5;
			logger.info("-------------------信息标识设置异常 msgKey 最大界限" + error_msg.length);
		}

		if (row == null) {
			data.put("row", null);
		} else {
			obj_row = row;
			data.put("row", row);
		}
		data.put("error", error_msg[msgKey][0]);
		data.put("msg", message);

		return data;
	}

}
