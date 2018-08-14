package net.emof.building.util;



public class PageInfo implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3954548622427149671L;
	private Integer count = 0;// 所有信息数量
	private Integer pageSize = 10;// 信息列表分页大小
	private Integer page = 1;// 当前页
	private Integer totalPage = 0;// 总页数
	private int previous;// 上翻
	private int next;// 下翻
	private int titleLength = 0;// 标题长度
	private int pages[];// 页码
	private int numSize = 10;// 显示页码的个数

	private int beginPage;
	private int endPage;
	// 最多显示分页页数
	private static final int liststep = 5;

	public int getBeginPage() {
		return beginPage;
	}
    
	public void setBeginPage(int p) {
		this.beginPage = (p - (int) Math.floor((double) liststep / 2));
		if (beginPage < 1) {
			beginPage = 1;
		}
	}

	public int getEndPage() {
		return this.endPage;
	}

	public void setEndPage(int p) {
		this.endPage = p + (int) Math.floor((double) liststep / 2); // 分页信息显示到第几页

		if (this.endPage > this.getNumSize()) {
			this.endPage = this.getNumSize();
		}
	}

	public int getNumSize() {
		return numSize;
	}

	public void setNumSize(int numSize) {
		this.numSize = numSize;
	}

	public int[] getPages() {
		if (this.totalPage <= this.numSize) {
			pages = new int[this.totalPage];
			for (int i = 0; i < this.totalPage; i++)
				pages[i] = i + 1;
		} else {
			pages = new int[this.numSize];
			int div = this.page - (this.numSize - 1) / 2 - 1;
			if (div < 0)
				div = 0;
			if ((this.numSize + div) > this.totalPage) {
				div = this.totalPage - this.numSize;
			}
			for (int i = 0; i < pages.length; i++) {
				pages[i] = i + 1 + div;
			}
		}
		return pages;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public int getNext() {
		this.next = (this.page + 1) > this.totalPage ? this.totalPage : (this.page + 1);
		return next;
	}

	public void setNext(int next) {
		this.next = next;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public int getPrevious() {
		this.previous = (this.page - 1) < 0 ? 1 : (this.page - 1);
		return previous;
	}

	public void setPrevious(int previous) {
		this.previous = previous;
	}

	public Integer getTotalPage() {
		this.totalPage = count / this.pageSize + (count % this.pageSize == 0 ? 0 : 1);
		return this.totalPage;
	}

	public Integer getPage() {
		if (this.page == null || this.page <= 0)
			this.page = 1;
		// if(this.page>this.getTotalPage())
		// this.page=this.getTotalPage();
		return this.page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public int getTitleLength() {
		return titleLength;
	}

	public void setTitleLength(int titleLength) {
		this.titleLength = titleLength;
	}

	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
		
}
