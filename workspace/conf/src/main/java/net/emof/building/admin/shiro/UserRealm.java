package net.emof.building.admin.shiro;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;

import org.apache.shiro.authc.SimpleAuthenticationInfo;

import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.HostUnauthorizedException;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;

import org.springframework.beans.factory.annotation.Autowired;

import net.emof.building.admin.service.LoginUsersService;
import net.emof.building.dao.PowersMapper;
import net.emof.building.dao.UsersMapper;
import net.emof.building.model.Users;

public class UserRealm extends AuthorizingRealm {

	@Autowired
	private LoginUsersService lus;

	@Autowired
	private UsersMapper um;
	@Autowired
	private PowersMapper pm;

	public UserRealm() {
		super();
	}

	/**
	 * 用户登录密码校验方法
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken)
			throws AuthenticationException {

		ShiroToken token = (ShiroToken) authcToken;
		String loginname=token.getUserinfo().getLoginname();
		Users userinfo =lus.loginValidate(loginname,token.getUserinfo().getAdminpass());
		if (userinfo == null || userinfo.getId()==null) {
			throw new AccountException("帐号或密码不正确！");
		} else {

			if (userinfo.getState() == 2) {
				// 账户被锁定
				throw new DisabledAccountException("帐号已经禁止登录！");
			}
			// 查询权限集
			List<Map<String, Object>> powerlist = lus.login_power(userinfo);

			if (powerlist == null || powerlist.size() < 1) {
				throw new AccountException("用户角色权限异常 ");
			}
			// 加载当前可操作菜单 （只有子菜单 ）
			userinfo.setPowerlist(powerlist);
			token.setUserinfo(userinfo);
			this.setSession("admin", userinfo);

		}
		System.out.println("--------------------我执行了-----------------------");
		//参数说明    1身份  2密码凭证
		return new SimpleAuthenticationInfo(userinfo, userinfo.getAdminpass(), getName());

	}

	/**
	 * 登录成功后给用户授予系统中特定权限
	 */
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// 获取当前登陆用户信息
		Users token = (Users) SecurityUtils.getSubject().getPrincipal();
		SimpleAuthorizationInfo simpleAuthorInfo = null;
		if (token.getPowerid() == null || token.getPowerid() <= 0) {
			// 判断是否有权限
			throw new HostUnauthorizedException("没有访问权限!");
		}
		// 获取当前权限下的所有可操作菜单
		List<Map<String, Object>> permission_list = lus.power_menu(token.getPowerid());
		// 可访问controller集合
		List<String> controller_array = new ArrayList<>();

		for (int i = 0; i < permission_list.size(); i++) {
			Map<String, Object> info = permission_list.get(i);
			controller_array.add(info.get("controller").toString());
		}

		// 获取当前用户权限名称
		String roles_power = pm.idByPowerName(token.getPowerid());
		simpleAuthorInfo = new SimpleAuthorizationInfo();
		// 将可访问controller 集合装入 shiro的角色控制器
		simpleAuthorInfo.addRoles(controller_array);

		return simpleAuthorInfo;
	}

	/**
	 * 将一些数据放到ShiroSession中,以便于其它地方使用
	 * 
	 * @see 比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
	 */
	private void setSession(Object key, Object value) {
		Subject currentUser = SecurityUtils.getSubject();
		if (null != currentUser) {
			Session session = currentUser.getSession();
			System.out.println("Session默认超时时间为[" + session.getTimeout() + "]毫秒");
			if (null != session) {
				session.setAttribute(key, value);
			}
		}
	}
	
	 /** 
     * 更新用户授权信息缓存. 
     */  
    public void clearCachedAuthorizationInfo(String principal) {  
        SimplePrincipalCollection principals = new SimplePrincipalCollection(  
                principal, getName());  
        clearCachedAuthorizationInfo(principals);  
    }  
  
    /** 
     * 清除所有用户授权信息缓存. 
     */  
    public void clearAllCachedAuthorizationInfo() {  
        Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();  
        if (cache != null) {  
            for (Object key : cache.keys()) {  
                cache.remove(key);  
            }  
        }  
    }  

}
