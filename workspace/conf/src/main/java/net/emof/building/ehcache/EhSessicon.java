package net.emof.building.ehcache;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.model.Users;
import net.emof.building.util.ToolsUtil;

/**
 * 用户缓存数据
 * 
 * @author baikun
 * @creation 2017年12月13日
 */
public class EhSessicon {

	private static Log log = LogFactory.getLog(EhCacheManager.class);

	/**
	 * 根据用户实体信息创建 临时访问密钥
	 * 
	 * @author baikun
	 * @creation 2017年12月13日
	 * @param info
	 * @return String
	 * @throws EhCacheSessiconException
	 */
	public static String CreateToken(Users info) throws EhCacheSessiconException {
		if (info == null) {
			log.equals("【EhSessicon异常】token创建失败， 参数值为null");
			return null;
		}
		String tokenstr = ToolsUtil.get_diy_token();
		// 用户数据存储7200秒
		//System.out.println(ToolsUtil.pojo_to_Map(info).toString());
		//System.out.println("||||||||||||||||||||||||||||||||||【token】"+tokenstr+"|||||||||||||||||||||||||||||||||");
		EhCacheManager.put(tokenstr, info, 7200);
		return tokenstr;
	}
	/**
	 * 根据用户实体信息经济问题修改访问密钥
	 * 
	 * @author wkx
	 * @creation 2018年5月7日
	 * @param info
	 * @return String
	 * @throws EhCacheSessiconException
	 */
	public static String updateToken(String tokenstr,Users info) throws EhCacheSessiconException {
		if (info == null) {
			log.equals("【EhSessicon异常】token创建失败， 参数值为null");
			return null;
		}
			EhCacheManager.put(tokenstr, info, 7200);
		return tokenstr;
	}
	/**
	 * 通用创建 临时访问密钥
	 * 
	 * @author baikun
	 * @creation 2017年12月13日
	 * @param info
	 *            (Object)
	 * @return String
	 * @throws EhCacheSessiconException
	 */
	public static String CreateTokenObj(Object info) throws EhCacheSessiconException {
		if (info == null) {
			log.equals("【EhSessicon异常】token创建失败， 参数值为null");
			return null;
		}
		String tokenstr = ToolsUtil.get_diy_token();
		// 用户数据存储7200秒
		EhCacheManager.put(tokenstr, info, 7200);
		return tokenstr;
	}

	/**
	 * 根据Token 返回对应信息
	 * 
	 * @author baikun
	 * @creation 2017年12月13日
	 * @param Token
	 * @return Users
	 * @throws EhCacheSessiconException
	 */
	public static Users getTokenInfo(String Token) throws EhCacheSessiconException {
		if (Token == null) {
			log.equals("【EhSessicon异常】token为null 无法查询");
			return null;
		}
		Users users = EhCacheManager.get(Token);
		return users;
	}

	/**
	 * 通用 根据Token 返回对应信息
	 * 
	 * @author baikun
	 * @creation 2017年12月13日
	 * @param Token
	 * @return Object
	 * @throws EhCacheSessiconException
	 */
	public static Object getTokenInfoObject(String Token) throws EhCacheSessiconException {
		if (Token == null) {
			log.equals("【EhSessicon异常】token为null 无法查询");
			return null;
		}
		return EhCacheManager.get(Token);
	}

	/**
	 * 删除对应Token 信息
	 * 
	 * @author baikun
	 * @creation 2017年12月13日
	 * @param Token
	 */
	public static void deleteToken(String Token) {
		if (Token == null) {
			log.equals("【EhSessicon异常】token为null");
		}
		EhCacheManager.remove(Token);
	}

	
 
	
}
