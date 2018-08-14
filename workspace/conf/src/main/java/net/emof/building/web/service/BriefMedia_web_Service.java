package net.emof.building.web.service;

import java.util.Date;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.emof.building.admin.customEXC.AppendAdmException;
import net.emof.building.admin.service.BriefMediaService;
import net.emof.building.model.BriefMedia;
import net.emof.building.util.DataMap;

/**
 * 推广
 * 
 * @author baikun
 * @creation 2017年12月20日
 */
@Service
public class BriefMedia_web_Service {

	@Autowired
	private BriefMediaService srv;

	// log4j日志
	private final Logger logger = Logger.getLogger(this.getClass());

	/**
	 * 添加推广信息
	 * 
	 * @author baikun
	 * @creation 2017年12月20日
	 * @param briefs
	 * @param medias
	 * @param name
	 * @param phone
	 * @return
	 */
	public Map<String, Object> add_info(String briefs, String medias,  String phone) {

		DataMap dataMap = new DataMap();
		if ((briefs == null || briefs.trim().equals("")) || (medias == null || medias.trim().equals(""))) {
			dataMap.addMsg_diy_obj(null, 4, "数据提交不完整");
			return dataMap.data;
		}

		if (briefs.trim().length() == 1 && !briefs.trim().equals("")) {
			// 单数据提交
			BriefMedia record = new BriefMedia();
			record.setBriefid(briefs);
			//record.setBname(name);
			record.setBphone(phone);
			record.setMediaid(medias);
			record.setCreatetime(new Date());
			try {
				return srv.add_obj(record).data;
			} catch (AppendAdmException e) {
				logger.error("【add_info异常】信息位置" + this.getClass().getName() + " "
						+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
						+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
				dataMap.addMsg_diy_obj(null, 4, "数据异常，提交失败");
				return dataMap.data;
			}
		}

		String[] briefid;
		try {
			briefid = briefs.split(",");
		} catch (Exception e1) {
			logger.error("【add_info异常】信息位置" + this.getClass().getName() + " "
					+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
					+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e1.getMessage());
			dataMap.addMsg_diy_obj(null, 4, "数据异常，提交失败");
			return dataMap.data;
		}

		for (int i = 0; i < briefid.length; i++) {
			// 批量处理
			BriefMedia record = new BriefMedia();
			record.setBriefid(briefid[i]);
			//record.setBname(name);
			record.setBphone(phone);
			record.setMediaid(medias);
			record.setCreatetime(new Date());
			try {
				 srv.add_obj(record);
			} catch (AppendAdmException e) {
				logger.error("【add_info异常】信息位置" + this.getClass().getName() + " "
						+ Thread.currentThread().getStackTrace()[1].getMethodName() + " nubmer:"
						+ new Throwable().getStackTrace()[0].getLineNumber() + "【异常】" + e.getMessage());
				dataMap.addMsg_diy_obj(null, 4, "数据异常，提交失败");
				return dataMap.data;
			}
		}
		return new DataMap().data;
	}

}
