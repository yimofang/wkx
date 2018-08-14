package net.emof.building.util;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.servlet.view.AbstractView;

/**
 * Excel视图
 *(AbstractView实现了render方法，主要做的操作是将model中的参数和request中的参数全部都放到Request中，然后就转发Request就可以了。)
 * @author baikun
 * @version 1.0
 * @date 2017/7/6 16:35
 * @since 1.0
 */
public class ExcelView extends AbstractView {

    public static final String APPLICATION_PROPERTIES_PATH = "/application.properties";

	/** "强制下载"内容类型 */
	private static final String FORCE_DOWNLOAD_CONTENT_TYPE;

	/** 模板路径 */
	private static final String TEMPLATE_LOADER_PATH;

	/** 模板路径 */
	private String templatePath;

	/** 文件名称 */
	private String filename;

	static {
		Properties properties = null;
		try {
			properties = PropertiesLoaderUtils.loadProperties(new ClassPathResource(APPLICATION_PROPERTIES_PATH));
		} catch (IOException e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		FORCE_DOWNLOAD_CONTENT_TYPE = properties.getProperty("FORCE_DOWNLOAD_CONTENT_TYPE");
		TEMPLATE_LOADER_PATH = properties.getProperty("TEMPLATE.LOADER_PATH");
	}

	/**
	 * 构造方法
	 * 
	 * @param templatePath
	 *            模板路径
	 * @param filename
	 *            文件名称
	 */
	public ExcelView(String templatePath, String filename) {
		this.templatePath = templatePath;
		this.filename = filename;
		setContentType(FORCE_DOWNLOAD_CONTENT_TYPE);
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
	//renderMergedOutputModel是在子类中实现的，我们介绍一下我们经常使用的普通jsp源码使用的InternalResourceView
		if (StringUtils.isEmpty(response.getContentType())) {
			response.setContentType(getContentType());
		}
		if (!response.containsHeader("Content-disposition")) {
			//设置 转发页面头部
			if (StringUtils.isNotEmpty(filename)) {
				response.setHeader("Content-disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
			} else {
				response.setHeader("Content-disposition", "attachment");
			}
		}
		InputStream inputStream = null;
		try {
			//获取 request 上下文
			ServletContext servletContext = request.getSession().getServletContext();
			//生成输入流
			inputStream = new BufferedInputStream(new FileInputStream(servletContext.getRealPath(TEMPLATE_LOADER_PATH + templatePath)));
			//生成输出流
			OutputStream outputStream = response.getOutputStream();
			//Jxls默认支持Apache JEXL表达式语言
			//将srping mvc model保存的数据 交由 org.jxls.common.Context 处理
			//processTemplate 输入中只能由 Context 传递参数
			/*例（ Context context = new Context();
	        context.putVar("report_year", 2015);
	        context.putVar("report_month", 8);*/
			Context context = new Context(model);
            JxlsHelper.getInstance().processTemplate(inputStream, response.getOutputStream(), context);
            outputStream.flush();
		} catch (Exception e) {
            e.printStackTrace();
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			IOUtils.closeQuietly(inputStream);
		}
	}

}