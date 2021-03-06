package net.emof.building.dao;

import org.apache.ibatis.annotations.Update;

import net.emof.building.model.ConfsType;

public interface ConfsTypeMapper {
	
	
	 @Update("update Confs_type  set isdelete=2  where id=#{id}")
	    int isDelete(Integer id);
	
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_type
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_type
     *
     * @mbggenerated
     */
    int insert(ConfsType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_type
     *
     * @mbggenerated
     */
    int insertSelective(ConfsType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_type
     *
     * @mbggenerated
     */
    ConfsType selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_type
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(ConfsType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_type
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(ConfsType record);
}