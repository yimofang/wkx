package net.emof.building.dao;

import net.emof.building.model.ConfsFlow;

public interface ConfsFlowMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_flow
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_flow
     *
     * @mbggenerated
     */
    int insert(ConfsFlow record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_flow
     *
     * @mbggenerated
     */
    int insertSelective(ConfsFlow record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_flow
     *
     * @mbggenerated
     */
    ConfsFlow selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_flow
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(ConfsFlow record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table confs_flow
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(ConfsFlow record);
}