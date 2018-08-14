package net.emof.building.ehcache;

import java.io.Serializable;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.sf.ehcache.CacheException;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * EhCache缓存操作类
 * @author baikun
 * @data 2017-08-16
 */
public class EhCacheManager {

	private static Log log = LogFactory.getLog(EhCacheManager.class);
	private static final String CACHE_KEY = "sessiconeh";
	public static final int CACHE_LIVE_SECONDS = 180;
	private static EhCacheManager instance = new EhCacheManager();
	private static CacheManager cacheManager;
	private static Ehcache fileCache;

	private EhCacheManager() {
		log.info("Init file cache ----------------------------------------"+this.getClass().getClassLoader().getResource("").getPath());
		cacheManager = CacheManager.create(this.getClass().getClassLoader().getResource("").getPath()+"/ehcache.xml"); 
		fileCache = cacheManager.getCache(CACHE_KEY);
		log.info("Init file cache success....");
	}

	public static synchronized EhCacheManager getInstance() {
		if (instance == null) {
			instance = new EhCacheManager();
		}
		return instance;
	}

	public static byte[] loadFile(String key) {
		Element e = fileCache.get(key);
		if (e != null) {
			Serializable s = e.getValue();
			if (s != null) {
				return (byte[]) s;
			}
		}
		return null;
	}

	public static void cacheFile(String key, byte[] data) {
		fileCache.put(new Element(key, data));
	}

	/**
	 * 将数据存入缓存，缓存无时间限制
	 * 
	 * @param key
	 * @param value
	 */
	public static <T> void put(String key, T value) {
		fileCache.put(new Element(key, value));
	}

	/**
	 * 带过期时间的缓存，存入
	 * 
	 * @param key
	 *            键
	 * @param value
	 *            值
	 * @param timeToLiveSeconds 
	 *            缓存过期时间 (秒)
	 * @throws EhCacheSessiconException 
	 */
	public static <T> void put(String key, T value, int timeToLiveSeconds) throws EhCacheSessiconException {
		log.info("【执行创建临时缓存】key="+key+" 有效时间为:"+timeToLiveSeconds+"秒");
		try {
			fileCache.put(new Element(key, value, null, 0, timeToLiveSeconds));
		} catch (IllegalArgumentException e) {		   
		     log.error("【EhCacheManager异常】"+e.getMessage());
			throw new EhCacheSessiconException();
		} catch (IllegalStateException e) {
			   log.error("【EhCacheManager异常】"+e.getMessage());
			throw new EhCacheSessiconException();
		} catch (CacheException e) {
			   log.error("【EhCacheManager异常】"+e.getMessage());
			throw new EhCacheSessiconException();
		}
		
	}

	/**
	 * 通过key值获取存入缓存中的数据
	 * 
	 * @param key
	 *            数据存入缓存时的key
	 * @throws EhCacheSessiconException 
	 */
	@SuppressWarnings("unchecked")
	public static <T> T get(String key) throws EhCacheSessiconException {
		
		T t;
		try {
			Element el = fileCache.get(key);
			if (el == null) {
				if (log.isDebugEnabled())
					log.debug("not found key: " + key);
				return null;
			}

			t = (T) el.getObjectValue();
		} catch (IllegalStateException e) {
			   log.error("【EhCacheManager异常】"+e.getMessage());
				throw new EhCacheSessiconException();
		} catch (CacheException e) {
			   log.error("【EhCacheManager异常】"+e.getMessage());
				throw new EhCacheSessiconException();
		}
		
		return t;
	}

	/**
	 * 根据key删除缓存
	 */
	public static boolean remove(String key) {
		log.info("remove key:" + key);
		return fileCache.remove(key);
	}

	/**
	 * 关闭cacheManager 对象
	 */
	public static void shutdown() {
		cacheManager.shutdown();
	}
 
	
}
