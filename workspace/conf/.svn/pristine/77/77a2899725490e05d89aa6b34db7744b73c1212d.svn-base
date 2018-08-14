package net.emof.building.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mongodb.util.JSON;

/**
 * JSON格式化工具类
 * @author MaChao 2017.10.17 create
 *
 */
public class JsonUtil {
	
	private JSONObject jsonObj = new JSONObject();
	public JsonUtil(String json) {
		super();
		try {
			this.jsonObj = new JSONObject(json);
		} catch (JSONException e) {
		}
	}
	
	
	
	
	public JSONObject getJsonObj() {
		return jsonObj;
	}


	private static ObjectMapper objectMapper = null;
	//获取格式化类
	private static ObjectMapper getObjectMapper(){
		if(objectMapper == null){
			objectMapper = new ObjectMapper();  
			//去掉默认的时间戳格式  
			objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);  
			//设置为中国上海时区  
			objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));  
			objectMapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);  
			//空值不序列化  
			//objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);  
			//反序列化时，属性不存在的兼容处理  
			objectMapper.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);  
			//序列化时，日期的统一格式  
			//objectMapper.setDateFormat(new SimpleDateFormat(DatePatternEnum.TimePattern.pattern));  
			objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);  
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);  
			//单引号处理  
			objectMapper.configure(com.fasterxml.jackson.core.JsonParser.Feature.ALLOW_SINGLE_QUOTES, true); 
		}
		return objectMapper;
	}
	
	/**
	 * JSON字符串转MAP对象
	 * @param jsonStr
	 * @return
	 */
	public static Map<String,Object> jsonStrToMap(String jsonStr){
		try {
			
			return getObjectMapper().readValue(jsonStr,new TypeReference<Map<String,Object>>(){ });
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * map 转jsonString
	 * @param map
	 * @return
	 */
	public static String mapToJsonStr(Map<?, ?> map){
		try {
			return getObjectMapper().writeValueAsString(map);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * list转jsonString
	 * @param list
	 * @return
	 */
	public static String listToJsonStr(List<?> list){
		try {
			return getObjectMapper().writeValueAsString(list);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * jsonString转bean
	 * @param <T>
	 * @param list
	 * @return
	 */
	public static <T> T jsonStrToBean(String json,Class<T> classs){
		try {
			return getObjectMapper().readValue(json, classs);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * jsonString转list
	 * @param <T>
	 * @param list
	 * @return
	 */
	public static <T> List<T> jsonStrToList(String json,Class<T> classs){ 
		
		JavaType javaType = getCollectionType(ArrayList.class, classs);
		try {
			return getObjectMapper().readValue(json, javaType);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
//	  public static Map<String, Object> jsonStrToMaps(String jsonString) {
//	        Object parseObj = JSON.parse(jsonString); // 反序列化 把json 转化为对象
//	        Map<String, Object> map = (HashMap<String, Object>) parseObj; // 把对象转化为map
//	        return map;
//	    }

	
	/**   
	* 获取泛型的Collection Type  
	* @param collectionClass 泛型的Collection   
	* @param elementClasses 元素类   
	* @return JavaType Java类型   
	*/   
	public static JavaType getCollectionType(Class<?> collectionClass, Class<?>... elementClasses) {   
		return getObjectMapper().getTypeFactory().constructParametricType(collectionClass, elementClasses);   
	}   
}
