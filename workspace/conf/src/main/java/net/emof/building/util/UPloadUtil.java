package net.emof.building.util;



import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * 上传图片
 * 2016年6月4日
 * 
 * childPath 文件的子目录，例如：goodsimg、headimg、materialfile、uploadfile
 */
public class UPloadUtil {
	public String uploadFile(MultipartFile file,HttpServletRequest  request, String childPath)
	{
		 System.out.println("文件长度: " + file.getSize()); 
		 System.out.println("文件类型: " + file.getContentType()); 
		 System.out.println("文件名称: " + file.getName());    
		 System.out.println("文件原名: " + file.getOriginalFilename()); 
		 System.out.println("开始"); 
		 String str = file.getOriginalFilename();
		 String[] aa=str.split("\\.");
		 String bb=aa[aa.length-1];
		 long sj = System.currentTimeMillis()+(int)(Math.random()*10000);
		 String path = "D:/jupload/"+childPath;  
		 File localFile = new File(path+"/"+sj+"."+bb);
		 try {
			file.transferTo(localFile);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		return sj+"."+bb;	
	}
	
	public String upload(HttpServletRequest request, String childPath) {
 		List<String> filenames = new ArrayList<String>();
		 //创建一个通用的多部分解析器  
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());  
        //判断 request 是否有文件上传,即多部分请求  
        if(multipartResolver.isMultipart(request)){  
            //转换成多部分request    
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;  
            //取得request中的所有文件名  
            Iterator<String> iter = multiRequest.getFileNames();  
            while(iter.hasNext()){  
            	
                //取得上传文件  
                MultipartFile file = multiRequest.getFile(iter.next()); 
                List<MultipartFile> fileList =  multiRequest.getFiles(file.getName());
                if(file != null){  
                    //取得当前上传文件的文件名称  
                    String myFileName = file.getOriginalFilename();  
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在  
                    if(myFileName.trim() !=""){  
                        System.out.println(myFileName);  
                        //重命名上传后的文件名  
                        String fileName = System.currentTimeMillis()+(int)(Math.random()*10000)+myFileName.substring(myFileName.lastIndexOf("."));  
                        //定义上传路径  
                        String path = "D:/jupload/"+childPath+"/"+fileName ;  
                        File localFile = new File(path);  
                        if(!localFile.exists()){
                        	localFile.mkdirs();
                        }
                        try {
							file.transferTo(localFile);
							filenames.add(fileName);
						} catch (IllegalStateException e) {
							e.printStackTrace();
						} catch (IOException e) {
							e.printStackTrace();
						}  
                    }  
                }  
                
               
            }  
        }
        StringBuffer sb = new StringBuffer();
			for(String it:filenames){
				sb.append(it+",");
			}
			if(sb.length()>0){
				return sb.substring(0, sb.length()-1);
			}
			return null;
	
	}
	
	
	/*    spring-core  版本过低 不支持 StringUtils.isEmpty（）方法 。
	public Map<String, Object> uploadimg(HttpServletRequest request, String childPath) {
		Map<String, Object> map = new HashMap<String, Object>();
 		List<String> filenames = new ArrayList<String>();
		 //创建一个通用的多部分解析器  
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());  
        //判断 request 是否有文件上传,即多部分请求  
        if(multipartResolver.isMultipart(request)){  
            //转换成多部分request   
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;  
            //取得request中的所有文件名  
            Iterator<String> iter = multiRequest.getFileNames();  
            while(iter.hasNext()){  
            	String name = iter.next();
                //取得上传文件  
                MultipartFile file = multiRequest.getFile(name); 
                List<MultipartFile> fileList =  multiRequest.getFiles(file.getName());
	            for (MultipartFile multipartFile : fileList) {
	                if(multipartFile != null){  
	                    //取得当前上传文件的文件名称  
	                    String myFileName = multipartFile.getOriginalFilename();  
	                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在  
	                    if(myFileName.trim() !=""){  
	                        System.out.println(myFileName);  
	                        //重命名上传后的文件名  
	                        String fileName = System.currentTimeMillis()+(int)(Math.random()*10000)+myFileName.substring(myFileName.lastIndexOf("."));  
	                        //定义上传路径  
	                        String path = "";
	                        if(StringUtils.isEmpty(childPath)){
	                        	path = "D:/jupload/"+fileName ;
	                        }else{
	                        	
	                        	path = "D:/jupload/"+childPath+"/"+fileName ;  
	                        }
	                        File localFile = new File(path);  
	                        if(!localFile.exists()){
	                        	localFile.mkdirs();
	                        }
	                        try {
	                        	multipartFile.transferTo(localFile);
								filenames.add(fileName);
							} catch (IllegalStateException e) {
								e.printStackTrace();
							} catch (IOException e) {
								e.printStackTrace();
							}  
	                    }  
	                }  
	                
	               
	            }  
	            StringBuffer sb = new StringBuffer();
	            for(String it:filenames){
	            	sb.append(it+",");
	            }
	            if(sb.length()>0){
	            	map.put(name, sb.substring(0, sb.length()-1));
	            	filenames.clear();
	            	sb.setLength(0);
	            }
            }
        }
        return map;
	}
	
	*/
	
	public String upload1(MultipartFile[] file1,HttpServletRequest request, String childPath) {
		List<String> filenames = new ArrayList<String>();
		
        if(file1.length>0){ 
        	for(MultipartFile file:file1){
            //取得当前上传文件的文件名称  
            String myFileName = file.getOriginalFilename();  
            //如果名称不为“”,说明该文件存在，否则说明该文件不存在  
            if(myFileName.trim() !=""){  
                System.out.println(myFileName);  
                //重命名上传后的文件名  
                String fileName = System.currentTimeMillis()+(int)(Math.random()*10000)+myFileName.substring(myFileName.lastIndexOf("."));  
                //定义上传路径  
                String path = "D:/jupload/"+childPath+"/"+fileName;  
                File localFile = new File(path);  
                try {
					file.transferTo(localFile);
					filenames.add(fileName);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}  
            }  
        }  
        
       
    }  
        
        StringBuffer sb = new StringBuffer();
			for(String it:filenames){
				sb.append(it+",");
			}
			
			if(sb.length()>0){
				return sb.toString();
			}
			return null;	
	}
	/**
	 * base64编码文件上传
	 * @param imgBase64//base64编码文件
	 * @param fileType//文件类型
	 * @param extension//扩展名
	 * @return
	 */
	public String imgBase64(String imgBase64,String extension, HttpServletRequest request, String childPath){
		//保存路径
		/*String uploadPath = "D:/jupload/"+childPath+"/";
		// 生成jpeg图片
        String fileName = System.currentTimeMillis()+(int)(Math.random()*10000)+"."+extension;  
		try {

			 File localFile = new File(uploadPath+"/"+fileName);  
            
				if (!localFile.getParentFile().exists()) {
					localFile.getParentFile().mkdirs();
				}
				
				//Base64 主要不是加密，它主要的用途是把一些二进制数转成普通字符用于网络传输。
				
				BASE64Decoder decoder = new BASE64Decoder();
		        try {
		            // Base64解码
		            byte[] bytes = decoder.decodeBuffer(imgBase64);
		            for (int i = 0; i < bytes.length; ++i) {
		                if (bytes[i] < 0) {// 调整异常数据
		                    bytes[i] += 256;
		                }
		            }
		          
		            OutputStream out = new FileOutputStream(localFile);
		            out.write(bytes);
		            out.flush();
		            out.close();
		        } catch (Exception e) {
		        }
				
				return fileName;
				
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		return null;
	}
}
