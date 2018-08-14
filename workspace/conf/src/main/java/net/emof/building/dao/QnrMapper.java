package net.emof.building.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import net.emof.building.model.Qnr;

public interface QnrMapper {
    /**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qnr
	 * @mbggenerated
	 */
	int deleteByPrimaryKey(String id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qnr
	 * @mbggenerated
	 */
	int insert(Qnr record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qnr
	 * @mbggenerated
	 */
	int insertSelective(Qnr record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qnr
	 * @mbggenerated
	 */
	Qnr selectByPrimaryKey(String id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qnr
	 * @mbggenerated
	 */
	int updateByPrimaryKeySelective(Qnr record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qnr
	 * @mbggenerated
	 */
	int updateByPrimaryKey(Qnr record);

	/**
     * 根据会议id 查询问卷下的�???有问题与问题选项 
     * @author xilongfei
     * @creation 2017�???12�???19�???
     * @param confid	会议id
	 * @param rls 		查询状�??  1会议详情   2问卷详情
     * @return
     */
    Qnr getQnrDetails(@Param("confid")String confid, @Param("rls")int rls);
    
    /**
     * 根据会议id查询问卷信息
     * @author xilongfei
     * @creation 2018�?1�?16�?
     * @param confid  会议id
     * @return
     */
    @Select("select * from qnr where confsid = #{confid} and isdelete=1 ")
    Qnr getQnrByConfid(String confid);
    
    /**
     * 修改问卷浏览数量
     * @author xilongfei
     * @creation 2018�?1�?16�?
     * @param id	
     * @param browse 浏览数量
     * @return
     */
    @Update("update qnr set browsenum=#{browse} where id=#{id}")
    int updateBrowseNum(@Param("id")String id, @Param("browse")int browse);
    
    /**
     * 修改问卷提交数量
     * @author xilongfei
     * @creation 2018�?1�?16�?
     * @param id	
     * @param answernum 提交数量
     * @return
     */
    @Update("update qnr set answernum=#{answernum} where id=#{id}")
    int updateAnswerNum(@Param("id")String id, @Param("answernum")int answernum);
    
    /**
     * 修改标题和简介
     * @author YLS
     * @creation 2018年5月25日
     * @param fname 标题
     * @param qbrief 简介
     * @param confid 会议id
     * @return
     */
    @Update("update qnr set fname=#{fname},qbrief=#{qbrief} where confid=#{confid}")
    int updateTitleAndBrief(@Param("name")String fname, @Param("qbrief")String qbrief,@Param("confid")String confid);

}