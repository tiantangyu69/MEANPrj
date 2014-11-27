var page = require('../util/Page');

/**
 * 所有Dao的父类
 * Author: LIZHITAO
 * Date: 14-11-24
 * Time: 下午4.55
 */

function CommonDao(Model) {
    /*if(typeof Model === 'undefined' || Model == null)
     throw new Error('Model can not be null.');
     */
    this.model = Model;
}

/**
 * 保存数据
 * @param doc mongodb的document
 * @param callback 回调函数返回保存的对象
 */
CommonDao.prototype.save = function(doc, callback){
  new this.model(doc).save(function(error, data){
      if (error) return callback(null);

      return callback(data);
  })
};

/**
 *create
 *主要用于批量添加
 */
CommonDao.prototype.create = function (doc, callback) {
    this.model.create(doc, function (error) {
        if (error) return callback(error);

        return callback(null);
    });
};

/**
 * 根据id查询单个对象
 * @param id 对象id
 * @param callback
 */
CommonDao.prototype.fetch = function (id, callback) {
    this.model.findOne({_id: id}, function (error, model) {
        if (error) return callback(null);

        return callback(model);
    });
};

/**
 * 按条件查询单个对象
 * @param query 查询条件json语句
 * @param callback 回调函数，返回查询的结果
 */
CommonDao.prototype.findOne = function(query, callback){
    query = query || {};
    this.model.findOne(query, function(err, model){
        if(err) return callback(null);

        return callback(model);
    });
}

/**
 * 去除重复对象进行查询
 * @param field 查询的字段
 * @param query 查询的条件json
 * @param callback 回调函数，返回查询数据
 */
CommonDao.prototype.distinct = function(field, query, callback){
    this.model.distinct(field, query, function(err, models){
        if(err) return callback(null);

        return callback(models);
    });
}

/**
 * 按条件查询数据
 * @param query 查询条件json
 * @param callback 回调函数，返回查询的对象
 */
CommonDao.prototype.query = function (query, callback) {
    this.queryAndSort(query, null, function(list){
        return callback(list);
    })
};

/**
 * 按条件查询数据并排序
 * @param query 查询条件json
 * @param sort 排序json
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.queryAndSort = function (query, sort, callback) {
    sort = sort || {};
    var queryOpt = this.model.find(query);
    queryOpt.sort(sort);
    queryOpt.exec(function (error, model) {
        if (error) return callback(null);

        return callback(model);
    });
};

/**
 * 查询所有数据
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.findAll = function(callback){
    this.findAllAndSort(null, function(list){
        return callback(list);
    })
}

/**
 * 查询所有数据并排序
 * @param sort 排序json
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.findAllAndSort = function (sort, callback) {
    sort = sort || {};
    var query = this.model.find({});
    query.sort(sort);
    query.exec(function (error, model) {
        if (error) return callback(null);

        return callback(model);
    });
};

/**
 * 查询所有数据并分页
 * @param currentPage 当前页码
 * @param pageSize 每页显示的条数
 * @param callback 回调函数返回查询的结果
 */
CommonDao.prototype.page = function(currentPage, pageSize, callback){
    this.queryPageAndSort(currentPage, pageSize, null, null, function(page){
        return callback(page);
    });
};

/**
 * 按条件查询数据并分页
 * @param currentPage 当前页码
 * @param pageSize 每页显示的条数
 * @param query 查询条件json字符串
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.queryPage = function(currentPage, pageSize, query,callback){
    this.queryPageAndSort(currentPage, pageSize, query, null, function(page){
        return callback(page);
    })
}

/**
 * 查询分页数据
 * @param currentPage 当前页面
 * @param pageSize 每页显示的条数
 * @param query 查询条件json字符串
 * @param sort 排序json
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.queryPageAndSort = function(currentPage, pageSize, query, sort,callback){
    var $this = this;
    query = query || {};
    pageSize = pageSize || 15;
    currentPage = currentPage || 1;
    sort = sort || {};

    var queryOpt = $this.model.find(query);
    queryOpt.sort(sort).limit(pageSize);
    queryOpt.skip((currentPage - 1) * pageSize);
    queryOpt.exec(function (err, data) {
        if(err) return callback(new page(currentPage, pageSize, 0, []));

        $this.model.count(query, function (error, count) {
            if (error) return callback(null);

            return callback(new page(currentPage, pageSize, count, data));
        });
    });
};

/**
 * 查询记录数
 * @param callback 回调函数，返回查询到数目
 */
CommonDao.prototype.count = function(callback){
    this.countByQuery(null, function(count){
        return callback(count);
    });
}

/**
 * 根据条件查询记录数
 * @param query 查询条件json
 * @param callback 回调函数，返回查询到的数目
 */
CommonDao.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function (error, model) {
        if (error) return callback(null);

        return callback(model);
    });
};

/**
 * 根据id删除单个对象
 * @param id 对象id
 * @param callback
 */
CommonDao.prototype.deleteById = function (id, callback) {
    this.deleteByQuery({_id: id}, function(error){
        callback(error);
    });
};

/**
 * 根据查询条件删除对象
 * @param query 查询条件
 * @param callback
 */
CommonDao.prototype.deleteByQuery = function(query, callback){
    this.model.remove(query, function (error) {
        if (error) return callback(error);

        return callback(null);
    });
}

/**
 * 根据对象的id修改对象
 * @param id
 * @param update
 * @param callback
 */
CommonDao.prototype.updateById = function(id, update, callback){
    this.update({_id: id}, update, function(err){
        callback(err);
    })
};

/**
 * 按条件更新数据
 * @param query 查询条件
 * @param update 更新数据
 * @param callback 回调函数
 */
CommonDao.prototype.update = function (query, update, callback) {
    if(update.id){
        delete update.id;
    }
    this.model.update(query, {$set: update}, null, function (error) {
        if (error) return callback(error);

        return callback(null);
    });
};

module.exports = CommonDao;