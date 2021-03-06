package net.emof.building.admin.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import net.emof.building.admin.service.OrganizService;
import net.emof.building.model.Organiz;
import net.emof.building.model.Users;
import net.emof.building.util.DataMap;
import net.emof.building.util.ImportExcelUtil;
import net.emof.building.util.ToolsUtil;

/**
 * 组织机构
 * 
 * @author baikun
 * @creation 2017年3月10日
 */
@Controller
@RequestMapping("organiz")
public class OrganizController {

	@Autowired
	private OrganizService ozservice;

	/**
	 * 
	 * @author baikun
	 * @creation 2017年2月21日
	 * @return
	 */
	@RequestMapping("")
	public String golist(HttpServletRequest request, Model model) {
		Map<String, Object> map_res = new HashMap<String, Object>();
		map_res.put("data", ozservice.getChild(0));
		model.addAttribute("mdata", ozservice.getChild(0));

		Users userinfo = sessicon_get_info(request);
		model = get_conductlist(userinfo.getPowerlist(), model);
		System.out.println(model.toString());

		return "/hframe/organiz/organiz_list";
	}

	/**
	 * 返回当前权限下的操作行为
	 * 
	 * @author baikun
	 * @creation 2017年3月10日
	 * @param powerlist
	 * @param model
	 * @return
	 */
	private Model get_conductlist(List<Map<String, Object>> powerlist, Model model) {

		List<Map<String, Object>> power_list = powerlist;

		// 用当前用户的权限查询当前controller 的操作行为
		System.out.println(this.getClass().getName());

		String classname = this.getClass().getName().substring(this.getClass().getName().lastIndexOf(".") + 1);

		Map<String, Object> info = null;
		for (int i = 0; i < power_list.size(); i++) {
			info = power_list.get(i);
			if (classname.equals(info.get("controller"))) {
				break;
			} else {
				continue;
			}
		}
		if (info != null) {
			List<Map<String, Object>> conductlist = (List<Map<String, Object>>) info.get("conductlist");
			for (int x = 0; x < conductlist.size(); x++) {
				String key = conductlist.get(x).get("symbol").toString();
				model.addAttribute(key, key);
			}

		}

		return model;
	}

	/**
	 * 返回 sessicon 中保存的 当前用户实体
	 * 
	 * @author baikun
	 * @creation 2017年3月13日
	 * @param request
	 * @return
	 */
	private Users sessicon_get_info(HttpServletRequest request) {

		HttpSession session = request.getSession();
		Users aduser = (Users) session.getAttribute("admin");
		if (aduser == null) {
			return null;
		}
		return aduser;
	}

	@ResponseBody
	@RequestMapping("list")
	public List<Map<String, Object>> getTree() {
		// 假设查询顶级，也就是parent为0
		Map<String, Object> map_res = new HashMap<String, Object>();
		map_res.put("data", ozservice.getChild(0));

		return ozservice.getChild(0);
	}

	/**
	 * 添加方法
	 * 
	 * @author baikun
	 * @creation 2017年2月22日
	 * @param request
	 * @param record
	 *            表单对象
	 * @return
	 */
	@ResponseBody
	@RequestMapping("add_info")
	public Map<String, Object> add_info(HttpServletRequest request, Organiz record) {

		Map<String, Object> map = provinginfo(record);
		// 独立验证
		Map<String, Object> map_info = ozservice.idByInfo(record.getId());

		if ((int) map.get("code") != 2) {

			// 查询当前用户子级最后一个识别码
			Map<String, Object> code_map = ozservice.get_code_map(map_info.get("code").toString());
			// 重组识别码code
			record.setPid(Integer.parseInt(map_info.get("id").toString()));

			if (code_map.get("codes") != null && !code_map.get("codes").toString().trim().equals("")) {
				record.setCode(
						map_info.get("code").toString() + (Integer.parseInt(code_map.get("codes").toString()) + 1));
			} else {
				record.setCode(map_info.get("code").toString() + (1000 + 1));
			}
			record.setId(null);
			int judge = ozservice.add_obj(record);
			if (judge > 0) {
				map.put("code", 1);
				map.put("error", "0");
				map.put("row", record);
				map.put("msg", "操作成功");
			} else {
				map.put("code", 2);
				map.put("error", "5");
				map.put("info", record);
				map.put("msg", "操作失败");
				System.out.println("update_info 执行修改失败:");
			}
		}
		return map;
	}

	/**
	 * 修改方法
	 * 
	 * @author baikun
	 * @creation 2017年2月22日
	 * @param request
	 * @param record
	 *            表单对象
	 * @return
	 */
	@ResponseBody
	@RequestMapping("update_info")
	public Map<String, Object> update_info(HttpServletRequest request, Organiz record) {

		Map<String, Object> map = provinginfo(record);

		if ((int) map.get("code") != 2) {

			int judge = ozservice.update_obj(record);
			if (judge > 0) {
				map.put("code", 1);
				map.put("error", "0");
				map.put("row", record);
				map.put("msg", "操作成功");
			} else {
				map.put("error", "5");
				map.put("code", 2);
				map.put("info", record);
				map.put("msg", "操作失败");
				System.out.println("update_info 执行修改失败:");
			}
		}
		return map;
	}

	/**
	 * 删除
	 * 
	 * @author 白琨 2016-11-11
	 * @param id
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/delete_info")
	public Map<String, Object> delete_info(Integer id, HttpServletResponse response, HttpServletRequest req) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", ozservice.isDelete(id));
		map.put("msg", "删除成功");
		return map;

	}

	/**
	 * 验证数据是否返回正常
	 * 
	 * @author 白琨
	 * @see 2016-11-22
	 * @return map
	 */
	protected Map<String, Object> provinginfo(Organiz record) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", 1);

		if (record.getName() == null || record.getName().trim().equals("")) {
			map.put("code", 2);
			map.put("msg", "未填写姓名");
			map.put("info", record);
			return map;
		}

		return map;
	}

	/**
	 * 根据 ID返回 实体对象
	 * 
	 * @author baikun
	 * @creation 2017年2月22日
	 * @param id
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("idbyinfo")
	public Map<String, Object> idbyinfo(Integer id, HttpServletRequest request) {
		Map<String, Object> map = ozservice.idByInfo(id);
		return map;
	}

	/**
	 * 描述：通过传统方式form表单提交方式导入excel文件
	 * 
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("excelload")
	public Map<String, Object> uploadExcel(HttpServletRequest request, @RequestParam MultipartFile myfiles,
			@RequestParam(value = "oid", required = false) Integer oid) throws Exception {

		InputStream in = null;
		List<List<Object>> listob = null;
		MultipartFile file = myfiles;
		if (oid == null || oid < 0) {
			return new DataMap(null, 1, "导入失败~！").data;
		}
		try {
			if (file.isEmpty()) {
				throw new Exception("文件不存在！");
			}
			in = file.getInputStream();
			listob = new ImportExcelUtil().getBankListByExcel(in, file.getOriginalFilename());
			in.close();

			// 该处可调用service相应方法进行数据保存到数据库中，现只对数据输出
			for (int i = 0; i < listob.size(); i++) {
				List<Object> lo = listob.get(i);
				/*
				 * InfoVo vo = new InfoVo();
				 * vo.setCode(String.valueOf(lo.get(0)));
				 * vo.setName(String.valueOf(lo.get(1)));
				 * vo.setDate(String.valueOf(lo.get(2)));
				 * vo.setMoney(String.valueOf(lo.get(3)));
				 */
				// System.out.println("打印信息-->机构:"+vo.getCode()+"
				// 名称："+vo.getName()+" 时间："+vo.getDate()+" 资产："+vo.getMoney());
			}
		} catch (Exception e) {
			return new DataMap(null, 1, "导入失败~！").data;
		}
		return new DataMap(null, 0).data;
	}

	/**
	 * 描述：通过 jquery.form.js 插件提供的ajax方式上传文件
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("ajaxexcelload")
	public Map<String, Object> ajaxUploadExcel(HttpServletRequest request, HttpServletResponse response,
			@RequestParam MultipartFile myfiles, @RequestParam(value = "oid", required = false) Integer oid)
			throws Exception {

		InputStream in = null;
		List<List<Object>> listob = null;
		MultipartFile file = myfiles;
		if (file.isEmpty()) {
			return new DataMap(null, 1, "导入失败~！").data;
		}
		if (oid == null || oid < 0) {
			return new DataMap(null, 1, "导入失败~！").data;
		}
		Map<String, Object> map = ozservice.idByInfo(oid);
		in = file.getInputStream();
		listob = new ImportExcelUtil().getBankListByExcel(in, file.getOriginalFilename());
		int id = 0;
		// 该处可调用service相应方法进行数据保存到数据库中，现只对数据输出
		for (int i = 0; i < listob.size(); i++) {
			// 忽略第一行 数据名称
			Organiz organiz;

			List<Object> lo = listob.get(i);
			// 循环添加
			organiz = new Organiz();
			organiz.setPid(oid);
			organiz.setIsdelete(1);
			organiz.setImg("");
			;
			if (lo.get(1) == null || lo.get(1).toString().trim().equals("")) {
				// 第2列 数据保存组织机构名称
				continue;
			}
			organiz.setName(lo.get(1).toString());
			System.out.println("【导入数据】  " + ToolsUtil.pojo_to_Map(organiz));
			Map<String, Object> map_info = null;
			if (id != 0) {
				map_info = ozservice.idByInfo(id);
			} else {
				map_info = ozservice.idByInfo(oid);
			}
			// 查询当前用户子级最后一个识别码
			Map<String, Object> code_map = ozservice.get_code_map(map_info.get("code").toString());
			if (code_map.get("codes") != null && !code_map.get("codes").toString().trim().equals("")) {
				organiz.setCode(
						map_info.get("code").toString() + (Long.parseLong(code_map.get("codes").toString()) + 1));
			} else {
				organiz.setCode(Long.parseLong(map_info.get("code").toString()) + (1000 + 1) + "");
			}

			id = ozservice.add_obj(organiz);
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
		String filename = "excelmodel.xls";
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

}
