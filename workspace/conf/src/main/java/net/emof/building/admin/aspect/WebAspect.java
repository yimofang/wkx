package net.emof.building.admin.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.ServletRequestAttributes;

import net.emof.building.ehcache.EhSessicon;
import net.emof.building.util.DataMap;

import org.springframework.web.context.request.RequestContextHolder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Aspect
public class WebAspect {

	// 日志
	private final Logger logger = Logger.getLogger(this.getClass());

	@Pointcut(value = "execution(* net.emof.building.web.controller.*.*(..))")
	public void webaop() {
	}

	/**
	 * 
	 * 环绕通知，围绕着方法进行执行 判断token是否通过验证
	 * 
	 * @author 白琨
	 * @see 2017-1-7
	 * @param pjp
	 *            当前操作的类
	 * @return
	 * @throws Throwable
	 */
	@Around("webaop()")
	public Object around(ProceedingJoinPoint pjp) throws Throwable {
 
		Object result = null;
		
		//正式运行需删除↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		return pjp.proceed();
		//正式运行需删除↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
		
		//正式运行 解放以下代码 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		/*
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getResponse();
		for (Object param : pjp.getArgs()) {
			if (param instanceof HttpServletResponse) {
				response = (HttpServletResponse) param;
			}
		}
		String tokenId = request.getParameter("token");
		String reqUrl = request.getRequestURI();

		if (reqUrl.trim().indexOf("login_web") == -1
				&& (tokenId == null || tokenId.trim().equals("") || tokenId.trim().length() < 32)) {
			DataMap dataMap = new DataMap();
			dataMap.addMsg_diy_obj(null, 5, "请先登录再进行此操作");
			result = dataMap.data;
		}
		try {
			if (EhSessicon.getTokenInfo(tokenId) == null && reqUrl.trim().indexOf("login_web") == -1) {// 未登录
				DataMap dataMap = new DataMap();
				dataMap.addMsg_diy_obj(null, 5, "请先登录再进行此操作");
				result = dataMap.data;
			} else {// 已登录
				result = pjp.proceed();
			}
		} catch (Exception e) {
			DataMap dataMap = new DataMap();
			dataMap.addMsg_diy_obj(null, 5, "请先登录再进行此操作");
			result = dataMap.data;
		} catch (Throwable e) {
			DataMap dataMap = new DataMap();
			dataMap.addMsg_diy_obj(null, 5, "访问地址错误请查检地址：" + reqUrl);
			result = dataMap.data;
		}

		return result;
		*/
		//正式运行 解放代码↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	}

}
