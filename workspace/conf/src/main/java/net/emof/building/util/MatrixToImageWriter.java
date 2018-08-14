package net.emof.building.util;

import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Hashtable;
import javax.imageio.ImageIO;
import org.springframework.core.io.ClassPathResource;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;

/**
 * 生成二维码工具类
 * @author baikun
 * @creation 2017年12月14日
 */
public class MatrixToImageWriter {

	private static final int BLACK = 0xFF000000;
	private static final int WHITE = 0xFFFFFFFF;
	private static final int MARGIN = 1; // 边框
	// 宽度
	private static final int WIDTH = 300;
	// 高度
	private static final int HEIGHT = 300;
	private static final String FORMAT = "png";

	private MatrixToImageWriter() {
	}
//生成二维码
	public static void createRqCode(String textOrUrl, OutputStream toStream) throws WriterException, IOException {
		Hashtable<EncodeHintType, Object> hints = new Hashtable<EncodeHintType, Object>();
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8"); // 内容所使用字符集编码
		hints.put(EncodeHintType.MARGIN, new Integer(MARGIN));//QR_CODE
		BitMatrix bitMatrix = new MultiFormatWriter().encode(textOrUrl, BarcodeFormat.QR_CODE, WIDTH, HEIGHT, hints);
		BufferedImage image = toBufferedImage(bitMatrix);
		 //applyLogo(image);// 应用LOGO
		writeToStream(image, FORMAT, toStream);
	}

	private static void applyLogo(BufferedImage image) throws IOException {
		Graphics2D gs = image.createGraphics();
		ClassPathResource resource = new ClassPathResource("logo.png");// logo图片
		// 载入logo
		Image img = ImageIO.read(resource.getFile());
		int left = image.getWidth() / 2 - img.getWidth(null) / 2;
		int top = image.getHeight() / 2 - img.getHeight(null) / 2;
		gs.drawImage(img, left, top, null);
		gs.dispose();
		img.flush();
	}

	private static BufferedImage toBufferedImage(BitMatrix matrix) {
		int width = matrix.getWidth();
		int height = matrix.getHeight();
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
//		int s[]= {0xff00ff00,0x00ff00,0x000000ff,0x00000000};
//		int ss=0;
//		int pixels[] = new int[90000];
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
//				i++;
//				System.out.println("i="+i);
//				if(i<45000) {
//					ss=s[1];
//				}else {
//					ss=s[2];
//				}
//				if (x < width / 2 && y < height / 2) {  
//					pixels[y * width + x] = 0xFF0094FF;// 蓝色  
//					Integer.toHexString(new Random().nextInt());  
//					} else if (x < width / 2 && y > height / 2) {  
//					pixels[y * width + x] = 0xFFff0000;// 黄色  0xFFFED545
//					} else if (x > width / 2 && y > height / 2) {  
//					pixels[y * width + x] = 0xFF5ACF00;// 绿色  
//					} else {  
//					pixels[y * width + x] = 0xFF000000;// 黑色  
//					}  
				//pixels[y * width + x]
				image.setRGB(x, y, matrix.get(x, y) ? BLACK : WHITE);
			}
		}
//		try {
//			LogoMatrix(image);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		return image;
	}

	public static void writeToFile(BufferedImage image, String format, File file) throws IOException {
		if (!ImageIO.write(image, format, file)) {
			throw new IOException("Could not write an image of format " + format + " to " + file);
		}
	}

	public static void writeToStream(BufferedImage image, String format, OutputStream stream) throws IOException {
		if (!ImageIO.write(image, format, stream)) {
			throw new IOException("Could not write an image of format " + format);
		}
	}


	 /** 
     * 设置 logo  
     * @param matrixImage 源二维码图片 
     * @return 返回带有logo的二维码图片 
     * @throws IOException 
     * @author Administrator sangwenhao 
     */  
     public static BufferedImage LogoMatrix(BufferedImage matrixImage) throws IOException{  
         /** 
          * 读取二维码图片，并构建绘图对象 
          */  
         Graphics2D g2 = matrixImage.createGraphics();  
         int matrixWidth = matrixImage.getWidth();  
         int matrixHeigh = matrixImage.getHeight();  
         /** 
          * 读取Logo图片 
          */  
         BufferedImage logo = ImageIO.read(new File("E:\\man1.jpg"));  
         //开始绘制图片  
         g2.drawImage(logo,matrixWidth/5*2,matrixHeigh/5*2, matrixWidth/5, matrixHeigh/5, null);//绘制       
         BasicStroke stroke = new BasicStroke(5,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND);   
         g2.setStroke(stroke);// 设置笔画对象  
         //指定弧度的圆角矩形  
         RoundRectangle2D.Float round = new RoundRectangle2D.Float(matrixWidth/5*2, matrixHeigh/5*2, matrixWidth/5, matrixHeigh/5,20,20);  
         g2.setColor(Color.white);  
         g2.draw(round);// 绘制圆弧矩形  
         //设置logo 有一道灰色边框  
         BasicStroke stroke2 = new BasicStroke(1,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND);   
         g2.setStroke(stroke2);// 设置笔画对象  
         RoundRectangle2D.Float round2 = new RoundRectangle2D.Float(matrixWidth/5*2+2, matrixHeigh/5*2+2, matrixWidth/5-4, matrixHeigh/5-4,20,20);  
         g2.setColor(new Color(128,128,128));  
         g2.draw(round2);// 绘制圆弧矩形  
         g2.dispose();  
         matrixImage.flush() ;  
         return matrixImage ;  
     }  
	
     /**
      * 生成圆角图片
      *
      * @param image        原始图片
      * @param cornerRadius 圆角的弧度大小（根据实测效果，一般建议为图片宽度的1/4）, 0表示直角
      * @return 返回圆角图
      */
     public static BufferedImage makeRoundedCorner(BufferedImage image,int cornerRadius) {
         int w = image.getWidth();
         int h = image.getHeight();
         BufferedImage output = new BufferedImage(w, h,BufferedImage.TYPE_INT_ARGB);
         Graphics2D g2 = output.createGraphics();
         g2.setComposite(AlphaComposite.Src);
         g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
         g2.setColor(Color.WHITE);
         g2.fill(new RoundRectangle2D.Float(0, 0, w, h, cornerRadius,cornerRadius));
         g2.setComposite(AlphaComposite.SrcAtop);
         g2.drawImage(image, 0, 0, null);
         g2.dispose();

         return output;
     }
	
     /**
      * 绘制背景图
      *
      * @param source       二维码图
      * @param bgImgOptions 背景图信息
      * @return
      */
     public static BufferedImage drawBackground(BufferedImage source, BufferedImage bgImgOptions) {
         int sW = source.getWidth();
         int sH = source.getHeight();

         // 背景的图宽高不应该小于原图
         int bgW = bgImgOptions.getWidth() < sW ? sW : bgImgOptions.getWidth();
         int bgH = bgImgOptions.getHeight() < sH ? sH : bgImgOptions.getHeight();


         // 背景图缩放
         BufferedImage bg = bgImgOptions;
         if (bg.getWidth() != bgW || bg.getHeight() != bgH) {
             BufferedImage temp = new BufferedImage(bgW, bgH, BufferedImage.TYPE_INT_ARGB);
             temp.getGraphics().drawImage(bg.getScaledInstance(bgW, bgH, Image.SCALE_SMOOTH)
                     , 0, 0, null);
             bg = temp;
         }

         Graphics2D g2d = bg.createGraphics();
         if (true) {
             // 选择一块区域进行填充
             g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, 1.0f));
             g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
             g2d.drawImage(source, 0, 0, sW, sH, null);
         } else {
             // 覆盖方式
             int x = (bgW - sW) >> 1;
             int y = (bgH - sH) >> 1;
             g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, 1.0f)); // 透明度， 避免看不到背景
             g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
             g2d.drawImage(source, x, y, sW, sH, null);
             g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, 0.5f));
         }
         g2d.dispose();
         bg.flush();
         return bg;
     }
	
}
