/**
 * Created by LIZHITAO on 2014/11/25.
 * @action 分页工具类
 */

function Page(currentPage, pageSize, totalCount, dataList){
    currentPage = currentPage || 1;
    pageSize = pageSize || 15;

    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.dataList = dataList;
    this.totalCount = totalCount;
    this.totalPage = this.calculateTotalPages(this.pageSize, this.totalCount);
}

/**
 * 计算总页数
 * @param pageSize 每页显示的条数
 * @param totalCount 总条数
 * @returns {number} 总页数
 */
Page.prototype.calculateTotalPages = function(pageSize, totalCount){
    return Math.ceil(parseFloat(totalCount) / parseFloat(pageSize));
}

module.exports = Page;
