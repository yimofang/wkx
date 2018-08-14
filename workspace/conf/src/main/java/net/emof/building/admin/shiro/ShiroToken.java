package net.emof.building.admin.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

import net.emof.building.model.Users;

/**
 * 自定义 token
 * 
 * @author baikun
 * @creation 2017年5月24日
 */
public class ShiroToken extends UsernamePasswordToken implements java.io.Serializable {

	private static final long serialVersionUID = -6451794657814516274L;

	public ShiroToken(String loginname,String username, String password) {
		super(loginname,username, password);
		userinfo = new Users();
		userinfo.setPhone(username);
		userinfo.setLoginname(loginname);
		userinfo.setAdminpass(password);
		this.setPassword(password.toCharArray());
		
	}

	private Users userinfo;

	public Users getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(Users userinfo) {
		this.userinfo = userinfo;
	}

}
