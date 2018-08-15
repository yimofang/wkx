package net.emof.building.web.controller;

import net.emof.building.admin.customEXC.EhCacheSessiconException;
import net.emof.building.ehcache.EhSessicon;
import net.emof.building.model.Organiz;
import net.emof.building.util.DataMap;
import net.emof.building.util.ExcelView;
import net.emof.building.util.ImportExcelUtil;
import net.emof.building.util.ToolsUtil;
import net.emof.building.web.service.ConfsSubuser_web_Service;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司 FileName: ConfsSubuser_web_Controller
 * Author: anshiyuan Date: 2017/12/16 上午9:58 Description: 签到管理 列表 查询 报名 签到 统计
 * History:
 */
@Controller
@RequestMapping("/confsSubuser_web")
public class ConfsSubuser_web_Controller {

	@Autowired
	private ConfsSubuser_web_Service csws;

	/**
	 * 签到列表
	 *
	 * @param confsid
	 *            会议ID
	 * @param state
	 *            0 全部 1 签到 2
	 * @param select
	 *            模糊查询 手机号 名字
	 * @param page
	 *            页数
	 * @param display
	 *            显示几条
	 * @return
	 * @author anshiyuan
	 */
	@ResponseBody
	@RequestMapping(value = "/listpage", method = RequestMethod.POST)
	public Map<String, Object> listpage(@RequestParam(value = "confsid", required = true) String confsid,
			@RequestParam(value = "state", required = false, defaultValue = "0") Integer state,
			@RequestParam(value = "select", required = false) String select,
			@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
			@RequestParam(value = "display", required = false, defaultValue = "10") Integer display) {
		return csws.getSginList(confsid, state, select, page, display);
	}

	/**
	 * 删除名单 wkx
	 * @param ID
	 * @return  confs_subuser
	 */
	@ResponseBody
	@RequestMapping(value = "/deleteConfsSubuser")
	public Map<String, Object> deleteConfsSubuser(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "token") String token) {
		DataMap dataMap = new DataMap();
		try {
			if (EhSessicon.getTokenInfo(token) == null) {
				dataMap.addMsg_diy_obj(null, 5, "登陆超时，请重新登陆");
				return dataMap.data;
			}
		} catch (EhCacheSessiconException e1) {
			dataMap.addMsg_diy_obj(null, 5, "登陆超时，请重新登陆");
			return dataMap.data;
		}
		
		 dataMap = csws.deleteConfsSubuserInfo(id);
		
		return dataMap.data;
	}
	
	/**
	 * 得到名单详情 wkx
	 * @param 会议ID
	 * @return  confs_subuser
	 */
	@ResponseBody
	@RequestMapping(value = "/getConfsSubuserInfo")
	public Map<String, Object> getConfsSubuserInfo(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "token") String token) {
		DataMap dataMap = new DataMap();
		try {
			if (EhSessicon.getTokenInfo(token) == null) {
				dataMap.addMsg_diy_obj(null, 5, "登陆超时，请重新登陆");
				return dataMap.data;
			}
		} catch (EhCacheSessiconException e1) {
			dataMap.addMsg_diy_obj(null, 5, "登陆超时，请重新登陆");
			return dataMap.data;
		}
		
		 dataMap = csws.getConfsSubuserInfo(id);
		
		return dataMap.data;
	}
	
	/**
	 * 会议签到统计
	 *
	 * @param confsid
	 *            会议ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/sign_count", method = RequestMethod.POST)
	public Map<String, Object> sign_count(@RequestParam(value = "confsid", required = true) String confsid) {
		DataMap dataMap = csws.getSignCount(confsid);
		return dataMap.data;
	}

	/**
	 * 报名
	 * 
	 * @author baikun
	 * @creation 2017年12月23日
	 * @param confsid
	 * @param realname
	 * @param phone
	 * @param units
	 * @param email
	 * @param job
	 * @return
	 */
	@ResponseBody
	@RequestMapping("addinfo")
	public Map<String, Object> add_info(@RequestParam(value = "confsid", required = true) String confsid,
			@RequestParam(value = "realname", required = false) String realname,
			@RequestParam(value = "phone", required = false) String phone,
			@RequestParam(value = "units", required = false) String units,
			@RequestParam(value = "email", required = false) String email,
			@RequestParam(value = "job", required = false) String job) {

		return csws.add_info("",confsid, realname, phone, email, units, job, null, null, null).data;
	}

	/**
	 * 签到
	 * 
	 * @author baikun
	 * @creation 2017年12月25日
	 * @param confsid
	 * @param realname
	 * @param phone
	 * @return
	 */
	@ResponseBody
	@RequestMapping("signsubuser")
	public Map<String, Object> signsubuser(@RequestParam(value = "confsid", required = true) String confsid,
			@RequestParam(value = "realname", required = false) String realname,
			@RequestParam(value = "phone", required = false) String phone) {

		return csws.signsubuser(confsid, realname, phone).data;
	}

	/**
	 * 手动报名(发布者-添加名单)
	 * 
	 * @author xilongfei
	 * @creation 2017年12月23日
	 * @param confsid
	 *            会议ID
	 * @param realname
	 *            报名姓名
	 * @param phone
	 *            手机号
	 * @param units
	 *            所在单位
	 * @param email
	 *            邮箱
	 * @param job
	 *            职位
	 * @param isarrive
	 *            是否签到 1是 2否
	 * @param issign
	 *            是否报名 2是 3否
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/manualApply")
	public Map<String, Object> manualApply(@RequestParam(value = "id", required = false) String id,
			@RequestParam(value = "confsid", required = false) String confsid,
			@RequestParam(value = "realname", required = false) String realname,
			@RequestParam(value = "phone", required = false) String phone,
			@RequestParam(value = "units", required = false) String units,
			@RequestParam(value = "email", required = false) String email,
			@RequestParam(value = "job", required = false) String job,
			@RequestParam(value = "isarrive", defaultValue = "2") Integer isarrive,
			@RequestParam(value = "issign", defaultValue = "3") Integer issign) throws BadHanyuPinyinOutputFormatCombination {
		DataMap dataMap = new DataMap();
		dataMap = csws.add_info(id,confsid, realname, phone, email, units, job, isarrive,issign, issign);
		return dataMap.data;
	}

	/*
	 * 描述：通过 jquery.form.js 插件提供的ajax方式上传文件
	 * 
	 * @param request
	 * 
	 * @param response
	 * 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("ajaxexcelload")
	public Map<String, Object> ajaxUploadExcel(HttpServletRequest request, HttpServletResponse response,
			@RequestParam MultipartFile myfiles, @RequestParam(value = "confsid", required = false) String confsid)
			throws Exception {
		InputStream in = null;
		List<List<Object>> listob = null;
		MultipartFile file = myfiles;
		if (file.isEmpty()) {
			return new DataMap(null, 1, "导入失败~！").data;
		}
		if (confsid == null || confsid.trim().equals("")) {
			return new DataMap(null, 1, "导入失败~！").data;
		}
		in = file.getInputStream();
		listob = new ImportExcelUtil().getBankListByExcel(in, file.getOriginalFilename());
		int id = 0;
		// 该处可调用service相应方法进行数据保存到数据库中，现只对数据输出
		for (int i = 0; i < listob.size(); i++) {
			// 忽略第一行 数据名称
			Organiz organiz;
			List<Object> lo = listob.get(i);
			// 循环添加
			if (lo.get(0) == null || lo.get(0).toString().trim().equals("")) {
				// 第1列 数据保存 姓名
				continue;
			}
			if (lo.get(1) == null || lo.get(1).toString().trim().equals("")) {
				// 第2列 数据保存 手机号
				continue;
			}
			System.out.println(""+lo.get(2));
			String lo2;if(null==lo.get(2)||lo.get(2).equals("")) lo2="";else lo2=lo.get(2).toString();
			String lo3;if(null==lo.get(3)||lo.get(3).equals("")) lo3="";else lo3=lo.get(3).toString();
			String lo4;if(null==lo.get(4)||lo.get(4).equals("")) lo4="";else lo4=lo.get(4).toString();
			String lo5;if(null==lo.get(5)||lo.get(5).equals("")) lo5="";else lo5=lo.get(5).toString();
			System.out.println("confsid="+confsid+"=="+lo.get(1).toString()+"=="+ lo3+"=="+ lo2+"=="+ lo4+"=="+ lo.get(0).toString());
			System.out.println( lo5+"==");
			Integer arrive = 2;
			if(lo5.trim().equals("是")) {
				arrive = 1;
			}
			//是否签到  1是  2否
			csws.add_info(confsid, lo.get(0).toString(), lo.get(1).toString(), lo3, lo2, lo4, arrive, 1);
			Thread.sleep(1000);
		}
		return new DataMap(null, 0).data;
	}

	/**
	 * 下载excel模版
	 * 
	 * @author baikun
	 * @creation 2018年1月15日
	 * @param request
	 * @param filename
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/exceldownload")
	public void download(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		// 下载文件路径
		String filename = "excelmodel2.xls";
		request.setCharacterEncoding("UTF-8");
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		// 获取项目根目录
		String ctxPath = request.getSession().getServletContext().getRealPath("");
		// 获取下载文件露肩
		String downLoadPath = ctxPath + "/upload/" + filename;
		// 获取文件的长度
		long fileLength = new File(downLoadPath).length();
		// 设置文件输出类型
		response.setContentType("application/octet-stream");
		response.setHeader("Content-disposition", "attachment; filename=" + filename);
		// 设置输出长度
		response.setHeader("Content-Length", String.valueOf(fileLength));
		// 获取输入流
		bis = new BufferedInputStream(new FileInputStream(downLoadPath));
		// 输出流
		bos = new BufferedOutputStream(response.getOutputStream());
		byte[] buff = new byte[2048];
		int bytesRead;
		while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
			bos.write(buff, 0, bytesRead);
		}
		// 关闭流
		bis.close();
		bos.close();

	}

	/**
	 * 导出excel
	/**
	 * 签到列表
	 *
	 * @param confsid
	 *            会议ID
	 * @param state
	 *            0 全部 1 签到 2
	 * @param select
	 *            模糊查询 手机号 名字
	 * @param page
	 *            页数
	 * @param display
	 *            显示几条
	 * @return
	 * @author anshiyuan
	 */
	 
	@RequestMapping(value="/exportExcel")
	public ModelAndView exportExcel(ModelMap modelMap,
			@RequestParam(value = "confsid", required = true) String confsid,
			@RequestParam(value = "state", required = false, defaultValue = "0") Integer state,
			@RequestParam(value = "select", required = false) String select){
		
		List<Map<String,Object>> datalist=csws.getSginExcel(confsid, state, select);
 		//List<Map<String,Object>> datalist = null;//srv.getlist(confsid);
		
		System.out.println("size="+datalist.size());
		//for() {}
 		if(datalist==null||datalist.size()<=0){
 			return null;
 		}
 		if(datalist!=null&&datalist.get(0)==null){
 			return null;
 		}
 		
 		String filename = "参会名单.xls";
 		if(state==1) {
 			filename = "已签到参会名单.xls";
 		}
 		modelMap.addAttribute("list", datalist);
 		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");  
 		modelMap.addAttribute("dateFormat", dateFormat);  
		return new ModelAndView(new ExcelView("/excelDemo.xls", filename),modelMap); 
	}
	
	
	
}