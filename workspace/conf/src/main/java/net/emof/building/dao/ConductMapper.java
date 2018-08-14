package net.emof.building.dao;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import net.emof.building.model.Conduct;


/**
 * 前端 菜单管理
 * @author baikun
 * @creation 2017年3月27日
 */
public interface ConductMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table conduct
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table conduct
     *
     * @mbggenerated
     */
    int insert(Conduct record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table conduct
     *
     * @mbggenerated
     */
    int insertSelective(Conduct record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table conduct
     *
     * @mbggenerated
     */
    Conduct selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table conduct
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Conduct record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table conduct
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Conduct record);
    
    
	@Update("update conduct  set isdelete=2  where id=#{id}")
    int isDelete(Integer id);
	
	@Select("select * from conduct  where isdelete=1 and name=#{value}")
	Conduct checkName(String value);
	@Select("select * from conduct  where isdelete=1 and symbol=#{value}")
	Conduct checkSymbol(String value);
}