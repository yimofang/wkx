package net.emof.building.dao;

import net.emof.building.model.AdminLog;


/**
 * 操作日志
 * @author baikun
 * @creation 2017�?3�?13�?
 */
public interface AdminLogMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	int deleteByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	int insert(AdminLog record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	int insertSelective(AdminLog record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	AdminLog selectByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	int updateByPrimaryKeySelective(AdminLog record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	int updateByPrimaryKeyWithBLOBs(AdminLog record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table adminlog
	 * @mbggenerated
	 */
	int updateByPrimaryKey(AdminLog record);
}