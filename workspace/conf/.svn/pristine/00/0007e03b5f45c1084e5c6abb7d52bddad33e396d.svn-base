package net.emof.building.util;

/**
 * 异常工具类
 * @author ccc
 * Jul 4, 2016
 */
public class ExceptionUtil {

	/**
	 * 获得异常描述
	 * @return
	 */
	public static String getExceptionDescribe(Exception e){
		StringBuffer sb = new StringBuffer();
		sb.append(e.toString()).append("\n");
		StackTraceElement[] elementArray = e.getStackTrace();
		for(StackTraceElement ele :elementArray){
			sb.append(ele).append("\n");
		}
		return sb.toString();
	}
	
	/**
	 * 获得异常描述
	 * @return
	 */
	public static String getExceptionDescribe(Throwable e){
		StringBuffer sb = new StringBuffer();
		sb.append(e.toString()).append("\n");
		StackTraceElement[] elementArray = e.getStackTrace();
		for(StackTraceElement ele :elementArray){
			sb.append(ele).append("\n");
		}
		return sb.toString();
	}
}
