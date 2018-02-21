package com.daniel.test.Controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import javax.servlet.http.HttpServletRequest; //huey
/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	@Autowired
	private ServletContext servletContext;

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 * 
	 * @throws IOException
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) {
		logger.info("Welcome home!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}
	
	// huey 
	@RequestMapping(value = "/audioTest", method = RequestMethod.GET)
	public String audioTest(Model model) {
		logger.info("Welcome audioTest!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "audioTest";
	}
	@RequestMapping(value = "/playerLoad", method = RequestMethod.GET)
	public String playerLoad(Model model, HttpServletRequest req) {
		logger.info("Welcome playerLoad!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate);
		
		int type = Integer.parseInt(req.getParameter("type"));
		model.addAttribute("type", type);
		return "playerLoad";
	}
	@RequestMapping(value = "/audio/api/1", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> audio_api_1(Map<String, Object> map) {
		logger.info("Welcome api audio_api_1!");

		map.put("type", "1");
		map.put("url", "audio1");
		
		return map;
	}
	@RequestMapping(value = "/audio/api/2", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> audio_api_2(Map<String, Object> map) {
		logger.info("Welcome api audio_api_2!");

		map.put("type", "2");
		map.put("url", "audio2");
		
		return map;
	}
	@RequestMapping(value = "/audio/api/3", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> audio_api_3(Map<String, Object> map) {
		logger.info("Welcome api audio_api_3!");

		map.put("type", "3");
		map.put("url", "audio3");
		
		return map;
	}
	@RequestMapping(value = "/audio/api/4", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> audio_api_4(Map<String, Object> map) {
		logger.info("Welcome api audio_api_4!");

		map.put("type", "4");
		map.put("url", "audio4");
		
		return map;
	}
	@RequestMapping(value = "/audio1", method = RequestMethod.GET)
	public String audio1(Model model) {
		logger.info("Welcome audio1!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);
		
		model.addAttribute("type", "1");
		model.addAttribute("agentName", "홍길동");
		model.addAttribute("callDurationToStr", "00:05:21");
		model.addAttribute("wavImgPath", "/test/resources/players/image/wav.png");
		model.addAttribute("audioPath", "/test/resources/players/media/testWav.wav");
		
		return "Audio";
	}
	@RequestMapping(value = "/audio2", method = RequestMethod.GET)
	public String audio2(Model model) {
		logger.info("Welcome audio2!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);
		
		model.addAttribute("type", "2");
		return "Audio";
	}
	@RequestMapping(value = "/audio3", method = RequestMethod.GET)
	public String audio3(Model model) {
		logger.info("Welcome audio3!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);
		
		model.addAttribute("type", "3");
		model.addAttribute("agentName", "홍길동");
		model.addAttribute("callDurationToStr", "00:05:21");
		model.addAttribute("callSilenceDurationToStr", "00:06:00");
		model.addAttribute("callLappingDurationToStr", "00:04:00");
		model.addAttribute("rx_wavImgPath", "/test/resources/players/image/rx_wav.png");
		model.addAttribute("tx_wavImgPath", "/test/resources/players/image/tx_wav.png");
		model.addAttribute("audioPath", "/test/resources/players/media/testWav.wav");
		return "Audio";
	}
	@RequestMapping(value = "/audio4", method = RequestMethod.GET)
	public String audio4(Model model) {
		logger.info("Welcome audio4!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		model.addAttribute("type", "4");
		model.addAttribute("agentName", "홍길동");
		model.addAttribute("callDurationToStr", "00:05:21");
		model.addAttribute("callSilenceDurationToStr", "00:06:00");
		model.addAttribute("callLappingDurationToStr", "00:04:00");
		model.addAttribute("wavImgPath", "/test/resources/players/image/wav.png");
		model.addAttribute("audioPath", "/test/resources/players/media/testWav.wav");
		return "Audio";
	}
	/* audio page */
	/*
	@RequestMapping(value = "/audio", method = RequestMethod.GET)
	public String audio(Model model) {
		logger.info("Welcome audio!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "Audio";
	}*/

	/* script Play */
	@RequestMapping(value = "/play", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> play(Map<String, Object> map) {
		logger.info("Welcome Play!");

		String filePath = "/resources/file/testWav.wav"; // �뙆�씪寃쎈줈

		map.put("type", "play");
		map.put("filePath", filePath);

		return map;
	}

	/* java Play */
	@RequestMapping(value = "/javaPlay", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> javaPlay(Map<String, Object> map) {
		logger.info("Welcome javaPlay!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\"; // �뙆�씪寃쎈줈

		System.out.println(realFilePath);

		try {
			File file = new File(realFilePath + "testWav.wav");
			System.out.println(file.exists()); // true
			AudioInputStream stream = AudioSystem.getAudioInputStream(file);
			Clip clip = AudioSystem.getClip();
			clip.open(stream);
			clip.start();

			Thread.sleep(5000);
			clip.close();
		} catch (Exception e) {
			System.out.println("Error with File javaPlay!");
		}

		map.put("type", "javaPlay");

		return map;
	}
	
	/* file read & write */
	@RequestMapping(value = "/readWrite", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> readWrite(Map<String, Object> map) {
		logger.info("Welcome readWrite!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\"; // �뙆�씪寃쎈줈
		System.out.println(realFilePath);

		int i = 0;
		try {
			FileInputStream fis = new FileInputStream(realFilePath + "testWav.wav");
			FileOutputStream fos = new FileOutputStream(realFilePath + "dong.wav");
			AudioInputStream ais = AudioSystem.getAudioInputStream(new File(realFilePath + "testWav.wav"));
			String getFormat = ais.getFormat().toString();
			System.out.println(getFormat);
			
			/*while ((i = fis.read()) != -1) {
				fos.write(i);
				System.out.print((char) i);
			}*/
			
			// �뙆�씪 �궡�슜�쓣 �떞�쓣 踰꾪띁(?) �꽑�뼵
			byte[] readBuffer = new byte[1024];
			while ((i = fis.read(readBuffer, 0, readBuffer.length)) != -1) {
				fos.write(readBuffer);
				// System.out.println(i);
			}
			System.out.println(new String(readBuffer));

			ais.close();
			fis.close();
			fos.close();
		} catch (Exception e) {
			System.out.println("Error with File Stream Read");
		}

		map.put("type", "read");

		return map;
	}
	
	/* file write */
	@RequestMapping(value = "/write", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> write(Map<String, Object> map) throws Exception {
		logger.info("Welcome write!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		
		try {
			bis = new BufferedInputStream(new FileInputStream(realFilePath + "testWav.wav"));
			bos = new BufferedOutputStream(new FileOutputStream(realFilePath + "copytestWav.wav"));
			
			byte[] buf = new byte[1024];
			
			int readByte = 0;
			
			while((readByte = bis.read(buf, 0, buf.length)) != -1) {
				Thread.sleep(3);
				bos.write(buf, 0, readByte);
			}
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(bis != null)	bis.close();
			if(bos != null)	bos.close();
		}
		
		map.put("type", "write");

		return map;
	}

	/* file read */
	@RequestMapping(value = "/read", method = RequestMethod.GET)
	public @ResponseBody int read(HttpServletResponse resp) throws Exception {
		logger.info("Welcome read!");

		int playTime = 0;

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		FileInputStream fis = null;
		
		ServletOutputStream sos = null;
		
		resp.setContentType("audio/x-wav");
		resp.setHeader("Content-Disposition", "dong.wav");
		
		try {
			/*
			 * �뵆�젅�씠 �떆媛� �븣�븘�궡湲� �냼�뒪
			 */
			/*AudioFileFormat aff = AudioSystem.getAudioFileFormat(new File(realFilePath + "copytestWav.wav"));
			AudioFormat af = aff.getFormat();
			System.out.println(aff.toString());
			System.out.println(af.toString());
			
			int size = fis.available();
			int channels = af.getChannels();
			int frameRate = (int) af.getFrameRate();
			int bits = af.getSampleSizeInBits();
			playTime = size / ((channels * frameRate * bits) / 8);
			System.out.println("playTime : " + playTime);*/
			
			/*
			 * �뙆�씪 header �꽕�젙 諛� �깮�꽦
			 */
			/*double sampleRate = 44100.0;
		    double frequency = 440;
		    double frequency2 = 90;
		    double amplitude = 1.0;
		    double seconds = 2.0;
		    double twoPiF = 2 * Math.PI * frequency;
		    double piF = Math.PI * frequency2;
		    float[] buffer = new float[(int) (seconds * sampleRate)];
		    for (int sample = 0; sample < buffer.length; sample++) 
		    {
		        double time = sample / sampleRate;
		        buffer[sample] = (float) (amplitude * Math.cos((double)piF *time)* Math.sin(twoPiF * time));
		    }
		    final byte[] byteBuffer = new byte[buffer.length * 2];
		    int bufferIndex = 0;
		    for (int i = 0; i < byteBuffer.length; i++) {
		    final int x = (int) (buffer[bufferIndex++] * 32767.0);
		    byteBuffer[i] = (byte) x;
		    i++;
		    byteBuffer[i] = (byte) (x >>> 8);
		    }
		    File out = new File("out10.wav");
		    boolean bigEndian = false;
		    boolean signed = true;
		    int bits = 16;
		    int channels = 1;
		    AudioFormat format;
		    format = new AudioFormat((float)sampleRate, bits, channels, signed, bigEndian);
		    ByteArrayInputStream bais = new ByteArrayInputStream(byteBuffer);
		    AudioInputStream audioInputStream;
		    audioInputStream = new AudioInputStream(bais, format,buffer.length);
		    AudioSystem.write(audioInputStream, AudioFileFormat.Type.WAVE, out);
		    audioInputStream.close();*/
			
			fis = new FileInputStream(realFilePath + "copytestWav.wav");
			sos = resp.getOutputStream(); // 釉뚮씪�슦���뿉 蹂대궪 Stream
			
			// header �뙆�씪 �꽕�젙 �븯湲�
			boolean bigEndian = false;
		    boolean signed = true;
			int bits = 16;
		    int channels = 2;
			double sampleRate = 44100.0;
			double seconds = 1000.0;
			float[] buffer = new float[(int) (seconds * sampleRate)];
			AudioFormat format;
		    format = new AudioFormat((float)sampleRate, bits, channels, signed, bigEndian);
			AudioInputStream audioInputStream;
			audioInputStream = new AudioInputStream(fis, format,buffer.length);
		    
			byte[] buf = new byte[1024];
			int readByte = 0;
			while((readByte = audioInputStream.read(buf, 0, buf.length)) != -1) {
				sos.write(buf, 0, readByte);
			}
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(fis != null)	fis.close();
			if(sos != null)	sos.close();
		}
		return playTime;
	}
	
	/* file test */
	@RequestMapping(value = "/stream", method = RequestMethod.GET)
	public void stream(Model model, HttpServletResponse resp, byte[] bFile) throws Exception {
		logger.info("Welcome stream!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		ServletOutputStream sos = null;
		
		BufferedInputStream cbis = null;
		
		resp.setContentType("audio/x-wav");
		resp.setHeader("Content-Disposition", "dong.wav");
		
		
		/*
		 * �썝蹂� wav �뙆�씪�쓣 蹂듭궗瑜� �븯怨� 蹂듭궗以묒씤 �뙆�씪�쓣 媛��졇�� 異쒕젰 諛� �옱�깮 諛⑹떇
		 */
		try {
			bis = new BufferedInputStream(new FileInputStream(realFilePath + "testWav.wav")); // 泥섏쓬 遺덈윭�삱 �셿�꽦�맂 �뙆�씪
			bos = new BufferedOutputStream(new FileOutputStream(realFilePath + "copytestWav.wav")); // ���옣以묒씤 �뙆�씪
			sos = resp.getOutputStream(); // 釉뚮씪�슦���뿉 蹂대궪 Stream
			cbis = new BufferedInputStream(new FileInputStream(realFilePath + "copytestWav.wav")); // 遺덈윭�삱 ���옣以묒씤 �뙆�씪
			
			byte[] buf = new byte[1024];
			byte[] sBuf = new byte[1024];
			
			int readByte = 0;
			long start = new Date().getTime();
			
			// �뙆�씪 �뮮 遺�遺꾨��꽣 遺덈윭�삤湲� �쐞�븿
			File testFile = new File(realFilePath + "copytestWav.wav");
			int k =0;
			
			while((readByte = bis.read(buf, 0, buf.length)) != -1) {
				//sos.write(buf, 0, readByte);
				bos.write(buf, 0, readByte); // ���옣以묒씤 �뙆�씪
				
				//
				System.out.println("==>"+testFile.length());
				k ++;
				
				//
				if(k >200) {
					cbis.skip(testFile.length()-1024);
					
					while((cbis.read(sBuf, 0, sBuf.length)) != -1) { // ���옣以묒씤 �뙆�씪�쓣 �씫�뼱�삤湲� 
						sos.write(sBuf, 0, readByte); // ���옣以묒씤 �뙆�씪�쓣 �씫�뼱�� 釉뚮씪�슦���뿉 Stream 蹂대궡湲�
					}
				}
			}
			long end = new Date().getTime();
			SimpleDateFormat sdf = new SimpleDateFormat("MM:ss");
			String time = sdf.format(end-start);
			System.out.println("蹂듭궗�떆媛� : " + time);
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(bis != null)	bis.close();
			if(bos != null)	bos.close();
			if(sos != null)	sos.close();
		}
		
		
		/*
		 * �뙆�씪 �룷留� �젙蹂� 蹂닿린
		 */
		/*AudioFileFormat aff = AudioSystem.getAudioFileFormat(new File(realFilePath + "testWav.wav"));
		AudioFormat af = aff.getFormat();
		System.out.println(aff.toString());
		System.out.println(af.toString());
		System.out.println("Playback Time : " + aff.getFrameLength() / af.getFrameRate());*/
		
		
		/*
		 * �삤�뵒�삤 �뜲�씠�꽣媛� �룷�븿 �맂 InputStream 二쇱뼱吏�硫� �엯�젰 �뜲�씠�꽣�쓽 WAV 蹂��솚�쓣 �룷�븿�븯�뒗 byte 諛곗뿴 �깮�꽦 諛⑹떇
		 */
		/*String uploadedFileLocation = realFilePath;
		String fileName = "test";
		
	    AudioInputStream source;
	    AudioInputStream pcm;
	    InputStream b_in = new ByteArrayInputStream(bFile);
	    source = AudioSystem.getAudioInputStream(new BufferedInputStream(b_in));
	    pcm = AudioSystem.getAudioInputStream(AudioFormat.Encoding.PCM_SIGNED, source);
	    File newFile = new File(uploadedFileLocation + fileName);
	    AudioSystem.write(pcm, Type.WAVE, newFile);

	    source.close();
	    pcm.close();*/
	}

}
