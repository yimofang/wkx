package net.emof.building.model;

public class Wechat {

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column wechat.id
	 * @mbggenerated
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column wechat.appid
	 * @mbggenerated
	 */
	private String appid;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column wechat.app_secret
	 * @mbggenerated
	 */
	private String appSecret;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column wechat.paykey
	 * @mbggenerated
	 */
	private String paykey;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column wechat.accesstoken
	 * @mbggenerated
	 */
	private String accesstoken;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column wechat.ticket
	 * @mbggenerated
	 */
	private String ticket;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column wechat.id
	 * @return  the value of wechat.id
	 * @mbggenerated
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column wechat.id
	 * @param id  the value for wechat.id
	 * @mbggenerated
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column wechat.appid
	 * @return  the value of wechat.appid
	 * @mbggenerated
	 */
	public String getAppid() {
		return appid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column wechat.appid
	 * @param appid  the value for wechat.appid
	 * @mbggenerated
	 */
	public void setAppid(String appid) {
		this.appid = appid == null ? null : appid.trim();
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column wechat.app_secret
	 * @return  the value of wechat.app_secret
	 * @mbggenerated
	 */
	public String getAppSecret() {
		return appSecret;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column wechat.app_secret
	 * @param appSecret  the value for wechat.app_secret
	 * @mbggenerated
	 */
	public void setAppSecret(String appSecret) {
		this.appSecret = appSecret == null ? null : appSecret.trim();
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column wechat.paykey
	 * @return  the value of wechat.paykey
	 * @mbggenerated
	 */
	public String getPaykey() {
		return paykey;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column wechat.paykey
	 * @param paykey  the value for wechat.paykey
	 * @mbggenerated
	 */
	public void setPaykey(String paykey) {
		this.paykey = paykey == null ? null : paykey.trim();
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column wechat.accesstoken
	 * @return  the value of wechat.accesstoken
	 * @mbggenerated
	 */
	public String getAccesstoken() {
		return accesstoken;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column wechat.accesstoken
	 * @param accesstoken  the value for wechat.accesstoken
	 * @mbggenerated
	 */
	public void setAccesstoken(String accesstoken) {
		this.accesstoken = accesstoken == null ? null : accesstoken.trim();
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column wechat.ticket
	 * @return  the value of wechat.ticket
	 * @mbggenerated
	 */
	public String getTicket() {
		return ticket;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column wechat.ticket
	 * @param ticket  the value for wechat.ticket
	 * @mbggenerated
	 */
	public void setTicket(String ticket) {
		this.ticket = ticket == null ? null : ticket.trim();
	}
}