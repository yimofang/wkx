package net.emof.building.model;

public class Status {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column status.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column status.title
     *
     * @mbggenerated
     */
    private String title;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column status.rmk
     *
     * @mbggenerated
     */
    private String rmk;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column status.isdelete
     *
     * @mbggenerated
     */
    private Integer isdelete;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column status.img
     *
     * @mbggenerated
     */
    private String img;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column status.id
     *
     * @return the value of status.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column status.id
     *
     * @param id the value for status.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column status.title
     *
     * @return the value of status.title
     *
     * @mbggenerated
     */
    public String getTitle() {
        return title;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column status.title
     *
     * @param title the value for status.title
     *
     * @mbggenerated
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column status.rmk
     *
     * @return the value of status.rmk
     *
     * @mbggenerated
     */
    public String getRmk() {
        return rmk;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column status.rmk
     *
     * @param rmk the value for status.rmk
     *
     * @mbggenerated
     */
    public void setRmk(String rmk) {
        this.rmk = rmk == null ? null : rmk.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column status.isdelete
     *
     * @return the value of status.isdelete
     *
     * @mbggenerated
     */
    public Integer getIsdelete() {
        return isdelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column status.isdelete
     *
     * @param isdelete the value for status.isdelete
     *
     * @mbggenerated
     */
    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column status.img
     *
     * @return the value of status.img
     *
     * @mbggenerated
     */
    public String getImg() {
        return img;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column status.img
     *
     * @param img the value for status.img
     *
     * @mbggenerated
     */
    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }
}