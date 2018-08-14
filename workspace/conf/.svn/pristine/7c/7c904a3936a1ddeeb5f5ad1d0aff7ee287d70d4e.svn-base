package net.emof.building.web.controller;

import net.emof.building.util.DataMap;
import net.emof.building.web.service.ConfsDatum_web_Service;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ch.qos.logback.core.net.SyslogOutputStream;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Copyright (C), 2015-2017, 易魔方有限公司
 * FileName: ConfsDatum_web_Controller
 * Author:   anshiyuan
 * Date:     2017/12/14 下午3:23
 * Description:会议资料管理 会议资料列表  添加会议资料 删除会议资料
 * History:
 */
@Controller
@RequestMapping("/confsDatum_web")
public class ConfsDatum_web_Controller {

    @Autowired
    private ConfsDatum_web_Service confsDatumService;

    /**
     * 获取会议资料列表
     *
     * @param confsid 会议ID
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/listpage", method = RequestMethod.POST)
    public Map<String, Object> listpage(@RequestParam(value = "confsid", required = true) String confsid) {
        DataMap dataMap = this.confsDatumService.listpage(confsid,1);
        return dataMap.data;
    }

    /**
     * 会议资料详情
     *
     * @param dtaumid
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/detail_datum")
    public Map<String, Object> detailConfsDatum(@RequestParam(value = "datumid", required = true) String dtaumid) {
        DataMap dataMap = this.confsDatumService.detailConfsDatum(dtaumid);
        return dataMap.data;
    }

    /**
     * 添加会议资料
     *
     * @param token   用户ID
     * @param confsid 会议ID
     * @param dname   资料名称
     * @param brief   资料描述
     * @param path    文件地址
     * @param file    文件名称
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/add_datum", method = RequestMethod.POST)
    public Map<String, Object> addConfsDatum(@RequestParam(value = "token", required = true) String token,
                                             @RequestParam(value = "confsid", required = true) String confsid,
                                             @RequestParam(value = "dname", required = false) String dname,
                                             @RequestParam(value = "brief", required = false) String brief,
                                             @RequestParam(value = "path", required = false) String path,
                                             @RequestParam(value = "file", required = false) String file) {
        DataMap dataMap = this.confsDatumService.addConfsDatum(token, confsid, dname, brief, path, file);
        return dataMap.data;
    }

    
    
	/**
	 * 上传文件wkx
	 * 
	 * @param myfiles  流
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping("/fileUploadPc")
	public Map<String, Object> fileUploadPc(@RequestParam MultipartFile myfiles, HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "token", required = true) String token,
            @RequestParam(value = "confsid", required = true) String confsid
			)  {
		// 可以在上传文件的同时接收其它参数
       String path;//路径
         String file;//文件名
		// 如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\upload\\文件夹中
		// 这里实现文件上传操作用的是commons.io.FileUtils类,它会自动判断/upload是否存在,不存在会自动创建
		String realPath = request.getSession().getServletContext().getRealPath("/upload");

		Map<String, Object> map_msg = new HashMap<String, Object>();
		// 设置响应给前台内容的数据格式
		response.setContentType("text/plain; charset=UTF-8");
		// 设置响应给前台内容的PrintWriter对象

		Date dt = new Date();
		Long time = dt.getTime();
		// 上传文件重命名
		String originalFilename = time.toString().substring(time.toString().length() - 8, time.toString().length());
		// 获取上传文件类型
		String pic_type = myfiles.getContentType();
		originalFilename = originalFilename.concat(".");
		originalFilename = originalFilename.concat(myfiles.getOriginalFilename().toString()
				.substring(myfiles.getOriginalFilename().toString().indexOf(".") + 1));
		DataMap dataMap=null;
		// 如果只是上传一个文件,则只需要MultipartFile类型接收文件即可,而且无需显式指定@RequestParam注解
		// 如果想上传多个文件,那么这里就要用MultipartFile[]类型来接收文件,并且要指定@RequestParam注解
		// 上传多个文件时,前台表单中的所有<input
		// type="file"/>的name都应该是myfiles,否则参数里的myfiles无法获取到所有上传的文件

		if (myfiles.getSize() <= 0) {
			System.out.print("1`请选择文件后上传");
		} else {
			map_msg.put("row", realPath + "/" + myfiles.getOriginalFilename());
			
			try {
				String[]  dname=myfiles.getOriginalFilename().split("\\.");
				//String[] dnames=dname.split(".");
				// 这里不必处理IO流关闭的问题,因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉
				FileUtils.copyInputStreamToFile(myfiles.getInputStream(), new File(realPath, originalFilename));
				dataMap = this.confsDatumService.addConfsDatumPc(token, confsid, dname[0], null, "/upload", originalFilename);

			} catch (IOException e) {
				System.out.println("文件[" + originalFilename + "]上传失败,堆栈轨迹如下");
				e.printStackTrace();
				System.out.print("1`文件上传失败，请重试！！");
				//out.flush();

			}
		}

		Map<String, Object>data = new HashMap<String, Object>();
		data=dataMap.data;
		return data;
	}
	 /**
     * 删除会议资料PC
     *
     * @param datumid 会议资料ID
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/delete_datumPc")//, method = RequestMethod.GET
    public Map<String, Object> deleteConfsDatumPc(@RequestParam(value = "datumid", required = true) String datumid,
    		@RequestParam(value = "file", required = true) String file) {
       	DataMap dataMap = this.confsDatumService.deleteConfsDatum(datumid);
       	deleteFile("C:\\tomcat89\\webapps\\conf\\upload\\"+file);
        return dataMap.data;
    }
    
    
    
    public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件 && file.isFile()，则直接删除
        System.out.println("file.exists()="+file.exists());
        if (!file.exists()) {
            if (file.delete()) {
                System.out.println("删除单个文件" + fileName + "成功！");
                return true;
            } else {
                System.out.println("删除单个文件" + fileName + "失败！");
                return false;
            }
        } else {
            System.out.println("删除单个文件失败：" + fileName + "不存在！");
            return false;
        }
    }
    
    

    /**
     * 删除会议资料
     *
     * @param datumid 会议资料ID
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/delete_datum", method = RequestMethod.POST)
    public Map<String, Object> deleteConfsDatum(@RequestParam(value = "datumid", required = true) String datumid) {
        DataMap dataMap = this.confsDatumService.deleteConfsDatum(datumid);
        return dataMap.data;
    }
    
    
    
    
    
}