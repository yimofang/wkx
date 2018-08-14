package net.emof.building.admin.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;
import net.emof.building.util.ToolsUtil;

/**
 * ajaxfileupload上传控件控制类
 * 
 * @author 白琨
 * @see 2016-11-23
 *
 */
@Controller
public class FileUploadController {

	/**
	 * 上传图片
	 * 
	 * @param myfiles
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping("/fileUpload")
	public Map<String, Object> addUser(@RequestParam MultipartFile myfiles, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 可以在上传文件的同时接收其它参数

		// 如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\upload\\文件夹中
		// 这里实现文件上传操作用的是commons.io.FileUtils类,它会自动判断/upload是否存在,不存在会自动创建
		String realPath = request.getSession().getServletContext().getRealPath("/upload");

		Map<String, Object> map_msg = new HashMap<String, Object>();

		// 设置响应给前台内容的数据格式
		response.setContentType("text/plain; charset=UTF-8");
		// 设置响应给前台内容的PrintWriter对象
		PrintWriter out = response.getWriter();

		Date dt = new Date();
		Long time = dt.getTime();
		// 上传文件重命名
		String originalFilename = time.toString().substring(time.toString().length() - 8, time.toString().length());
		// 获取上传文件类型
		String pic_type = myfiles.getContentType();
		originalFilename = originalFilename.concat(".");
		originalFilename = originalFilename.concat(myfiles.getOriginalFilename().toString()
				.substring(myfiles.getOriginalFilename().toString().indexOf(".") + 1));

		// 如果只是上传一个文件,则只需要MultipartFile类型接收文件即可,而且无需显式指定@RequestParam注解
		// 如果想上传多个文件,那么这里就要用MultipartFile[]类型来接收文件,并且要指定@RequestParam注解
		// 上传多个文件时,前台表单中的所有<input
		// type="file"/>的name都应该是myfiles,否则参数里的myfiles无法获取到所有上传的文件

		if (myfiles.getSize() <= 0) {
			System.out.print("1`请选择文件后上传");
			out.flush();

		} else {

			System.out.println("文件原名: " + myfiles.getOriginalFilename());
			/*
			 * System.out.println("文件名称: " + myfiles.getName());
			 * System.out.println("文件长度: " + myfiles.getSize());
			 * System.out.println("文件类型: " + myfiles.getContentType());
			 */
			System.out.println("文件路径: " + realPath);
			System.out.println("========================================");

			map_msg.put("row", realPath + "/" + myfiles.getOriginalFilename());

			try {
				// 这里不必处理IO流关闭的问题,因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉
				FileUtils.copyInputStreamToFile(myfiles.getInputStream(), new File(realPath, originalFilename));

			} catch (IOException e) {
				System.out.println("文件[" + originalFilename + "]上传失败,堆栈轨迹如下");
				e.printStackTrace();
				System.out.print("1`文件上传失败，请重试！！");
				out.flush();

			}
		}

		// 此时在Windows下输出的是[D:\Develop\apache-tomcat-6.0.36\webapps\AjaxFileUpload\\upload\愤怒的小鸟.jpg]
		// System.out.println(realPath + "\\" + originalFilename);
		// 此时在Windows下输出的是[/AjaxFileUpload/upload/愤怒的小鸟.jpg]
		// System.out.println(request.getContextPath() + "/upload/" +
		// originalFilename);
		// 不推荐返回[realPath + "\\" + originalFilename]的值
		// 因为在Windows下<img src="file:///D:/aa.jpg">能被firefox显示,而<img
		// src="D:/aa.jpg">firefox是不认的
		out.print("0`" + request.getContextPath() + "/upload/" + originalFilename);
		out.flush();

		System.out.println(map_msg.toString());

		return map_msg;
	}

	@RequestMapping(value = "/uploadApk")
	@ResponseBody
	public Map<String, Object> uploadApk(@RequestParam(value = "myfiles") MultipartFile myfiles,
			HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("code", 2);
		if (myfiles.getSize() >= 1110475) {
			resMap.put("msg", "文件上传失败");
			System.out.println("文件上传失败");
			return resMap;
		}
		String path = request.getContextPath();
		String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
		Date dt = new Date();
		Long time = dt.getTime();
		if (myfiles != null) {
			// 获取保存的路径，
			String realPath = request.getSession().getServletContext().getRealPath("/upload/");
			if (myfiles.isEmpty()) {
				// 未选择文件
				resMap.put("msg", "未选择文件");
			} else {
				// 文件原名称
				String originFileName = "";
				// 上传文件重命名
				String originalFilename = time.toString().substring(time.toString().length() - 8,
						time.toString().length());
				originalFilename = originalFilename.concat(".");
				originalFilename = originalFilename.concat(myfiles.getOriginalFilename().toString()
						.substring(myfiles.getOriginalFilename().toString().indexOf(".") + 1));

				try {
					// 这里使用Apache的FileUtils方法来进行保存
					FileUtils.copyInputStreamToFile(myfiles.getInputStream(), new File(realPath, originalFilename));

					resMap.put("code", 1);
					resMap.put("msg", "上传成功");
					resMap.put("filename", originalFilename);
					resMap.put("path", basePath + "/upload/");

				} catch (IOException e) {
					System.out.println("文件上传失败");
					resMap.put("msg", "文件上传失败");
					e.printStackTrace();
				}
			}

		}
		System.out.println(resMap.toString());
		return resMap;
	}

	@RequestMapping(value = "/doUploadfile")
	@ResponseBody
	public Map<String, Object> doUploadfile(MultipartFile file) throws IOException {

		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("code", 2);
		if (!file.isEmpty()) {
			FileUtils.copyInputStreamToFile(file.getInputStream(), new File("D:\\xxx\\", file.getOriginalFilename()));
		}

		return resMap;
	}

	/**
	 * 删除指定目录下的文件
	 * 
	 * @author baikun
	 * @creation 2017年8月2日
	 * @param fileName
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("delImg")
	public void delImg(@RequestParam(value = "fileName") String fileName, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\upload\\";
		File file = new File(filePath + fileName);
		// 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
		// 定义不删除的文件
		String[] noFile = { "himg.png", "simg.png" };
		if (file.exists() && file.isFile()) {

			if (!ToolsUtil.useSet(noFile, fileName)) {
				if (file.delete()) {
					System.out.println("删除单个文件" + fileName + "成功！");
				} else {
					System.out.println("删除单个文件" + fileName + "失败！");
				}
			}

		} else {
			System.out.println("删除单个文件失败：" + fileName + "不存在！");
		}

	}

}
