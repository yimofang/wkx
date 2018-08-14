package net.emof.building.model;



import java.util.List;

import net.emof.building.model.QnrRejoin;


/**
 * 问卷提交信息
 * @author xilongfei
 * @creation 2017年12月25日
 */
public class AnswerDetails {
	
	/**
	 * 问题信息
	 */
	private List<QnrRejoin> rejoins;
	/**
	 * 会议ID
	 */
	private String confid;
	/**
	 * 问卷ID
	 */
	private String qnrid;
	/**
	 * 手机号
	 */
	private String phone;
	
	
	public List<QnrRejoin> getRejoins() {
		return rejoins;
	}
	public void setRejoins(List<QnrRejoin> rejoins) {
		this.rejoins = rejoins;
	}
	public String getConfid() {
		return confid;
	}
	public void setConfid(String confid) {
		this.confid = confid;
	}
	public String getQnrid() {
		return qnrid;
	}
	public void setQnrid(String qnrid) {
		this.qnrid = qnrid;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

}
