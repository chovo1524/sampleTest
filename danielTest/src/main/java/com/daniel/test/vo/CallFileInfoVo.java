package com.daniel.test.vo;

import org.springframework.stereotype.Component;

@Component
public class CallFileInfoVo {
	private int callFileSeq;
	private String sendReceiveDelimiter;
	private String callMetaId;
	private String callFileName;
	private String callFileStoragePath;

	public int getCallFileSeq() {
		return callFileSeq;
	}

	public void setCallFileSeq(int callFileSeq) {
		this.callFileSeq = callFileSeq;
	}

	public String getSendReceiveDelimiter() {
		return sendReceiveDelimiter;
	}

	public void setSendReceiveDelimiter(String sendReceiveDelimiter) {
		this.sendReceiveDelimiter = sendReceiveDelimiter;
	}

	public String getCallMetaId() {
		return callMetaId;
	}

	public void setCallMetaId(String callMetaId) {
		this.callMetaId = callMetaId;
	}

	public String getCallFileName() {
		return callFileName;
	}

	public void setCallFileName(String callFileName) {
		this.callFileName = callFileName;
	}

	public String getCallFileStoragePath() {
		return callFileStoragePath;
	}

	public void setCallFileStoragePath(String callFileStoragePath) {
		this.callFileStoragePath = callFileStoragePath;
	}

}
