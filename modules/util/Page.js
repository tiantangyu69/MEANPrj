/**
 * Created by LIZHITAO on 2014/11/25.
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

Page.prototype.calculateTotalPages = function(pageSize, totalCount){
    return Math.ceil(parseFloat(totalCount) / parseFloat(pageSize));
}

module.exports = Page;
