package net.emof.building.model;

/**
 * 组织机构
 * @author baikun
 * @creation 2017年3月10日
 */
public class Organiz {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column organiz.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column organiz.name
     *
     * @mbggenerated
     */
    private String name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column organiz.isdelete
     *
     * @mbggenerated
     */
    private Integer isdelete;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column organiz.pid
     *
     * @mbggenerated
     */
    private Integer pid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column organiz.code
     *
     * @mbggenerated
     */
    private String code;
    
    
    public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	private String img;
    

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column organiz.id
     *
     * @return the value of organiz.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column organiz.id
     *
     * @param id the value for organiz.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column organiz.name
     *
     * @return the value of organiz.name
     *
     * @mbggenerated
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column organiz.name
     *
     * @param name the value for organiz.name
     *
     * @mbggenerated
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column organiz.isdelete
     *
     * @return the value of organiz.isdelete
     *
     * @mbggenerated
     */
    public Integer getIsdelete() {
        return isdelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column organiz.isdelete
     *
     * @param isdelete the value for organiz.isdelete
     *
     * @mbggenerated
     */
    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column organiz.pid
     *
     * @return the value of organiz.pid
     *
     * @mbggenerated
     */
    public Integer getPid() {
        return pid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column organiz.pid
     *
     * @param pid the value for organiz.pid
     *
     * @mbggenerated
     */
    public void setPid(Integer pid) {
        this.pid = pid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column organiz.code
     *
     * @return the value of organiz.code
     *
     * @mbggenerated
     */
    public String getCode() {
        return code;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column organiz.code
     *
     * @param code the value for organiz.code
     *
     * @mbggenerated
     */
    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }
}