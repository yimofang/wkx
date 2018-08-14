package net.emof.building.model;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * 权限
 * @author baikun
 * @creation 2017年3月10日
 */
public class Powers {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column powers.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column powers.powername
     *
     * @mbggenerated
     */
    private String powername;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column powers.isdelete
     *
     * @mbggenerated
     */
    private Integer isdelete;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column powers.powerlevel
     *
     * @mbggenerated
     */
    private Integer powerlevel;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column powers.powerrmk
     *
     * @mbggenerated
     */
    private String powerrmk;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column powers.id
     *
     * @return the value of powers.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column powers.id
     *
     * @param id the value for powers.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column powers.powername
     *
     * @return the value of powers.powername
     *
     * @mbggenerated
     */
    public String getPowername() {
        return powername;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column powers.powername
     *
     * @param powername the value for powers.powername
     *
     * @mbggenerated
     */
    public void setPowername(String powername) {
        this.powername = powername == null ? null : powername.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column powers.isdelete
     *
     * @return the value of powers.isdelete
     *
     * @mbggenerated
     */
    public Integer getIsdelete() {
        return isdelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column powers.isdelete
     *
     * @param isdelete the value for powers.isdelete
     *
     * @mbggenerated
     */
    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column powers.powerlevel
     *
     * @return the value of powers.powerlevel
     *
     * @mbggenerated
     */
    public Integer getPowerlevel() {
        return powerlevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column powers.powerlevel
     *
     * @param powerlevel the value for powers.powerlevel
     *
     * @mbggenerated
     */
    public void setPowerlevel(Integer powerlevel) {
        this.powerlevel = powerlevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column powers.powerrmk
     *
     * @return the value of powers.powerrmk
     *
     * @mbggenerated
     */
    public String getPowerrmk() {
        return powerrmk;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column powers.powerrmk
     *
     * @param powerrmk the value for powers.powerrmk
     *
     * @mbggenerated
     */
    public void setPowerrmk(String powerrmk) {
        this.powerrmk = powerrmk == null ? null : powerrmk.trim();
    }
    
    /**
	 * map 转 实体
	 * 
	 * @author baikun
	 * @creation 2016年1月23日
	 * @param map
	 */
	public void mapsetInfo(Map<String, Object> map) {

		// 获取实体类的所有属性，返回Field数组
		Field[] field = this.getClass().getDeclaredFields();
		try {
			for (int j = 0; j < field.length; j++) { // 遍历所有属性
				String name = field[j].getName(); // 获取属性的名字
				// 将属性的首字符大写，方便构造get，set方法
				String name_subs = name.substring(0, 1).toUpperCase() + name.substring(1);

				Class type = (Class) field[j].getGenericType(); // 获取属性的类型

				for (Map.Entry<String, Object> entry : map.entrySet()) {

					if (name.equals(entry.getKey().toString())) {

						Method m = this.getClass().getMethod("set" + name_subs, (Class)

						field[j].getGenericType());

						m.invoke(this, entry.getValue());

					}

				}

			}

		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}