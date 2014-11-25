var page = require('../util/Page');
var async = require('async');

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
 * @param condition 查询条件json语句
 * @param callback 回调函数，返回查询的结果
 */
CommonDao.prototype.findOne = function(condition, callback){
    condition = condition || {};
    this.model.findOne(condition, function(err, model){
        if(err) return callback(null);

        return callback(model);
    });
}

/**
 * 去除重复对象进行查询
 * @param field 查询的字段
 * @param conditions 查询的条件json
 * @param callback 回调函数，返回查询数据
 */
CommonDao.prototype.distinct = function(field, conditions, callback){
    this.model.distinct(field, conditions, function(err, models){
        if(err) return callback(null);

        return callback(models);
    });
}

/**
 * 按条件查询数据
 * @param query 查询条件json
 * @param fileds 查询哪些字段
 * @param opt 选项
 * @param callback 回调函数，返回查询的对象
 */
CommonDao.prototype.findByQuery = function (query, fileds, opt, callback) {
    this.model.find(query, fileds, opt, function (error, model) {
        if (error) return callback(null);

        return callback(model);
    });
};

/**
 * 查询所有数据
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.findAll = function (callback) {
    this.model.find({}, function (error, model) {
        if (error) return callback(null);

        return callback(model);
    });
};

/**
 * 查询分页数据
 * @param currentPage 当前页面
 * @param pageSize 每页显示的条数
 * @param conditions 查询条件json字符串
 * @param sort 排序json
 * @param callback 回调函数，返回查询的数据
 */
CommonDao.prototype.queryPage = function(currentPage, pageSize, conditions, sort,callback){
    var $this = this;
    conditions = conditions || {};
    pageSize = pageSize || 15;
    currentPage = currentPage || 1;
    sort = sort || {};

    var query = $this.model.find(conditions);
    query.sort(sort).limit(pageSize);
    query.skip((currentPage - 1) * pageSize);
    query.exec(function (err, data) {
        if(err) return callback(null);

        $this.model.count(conditions, function (error, count) {
            if (error) return callback(null);

            return callback(new page(currentPage, pageSize, count, data));
        });
    });
};

/**
 * 根据条件查询记录数
 * @param query 查询条件json
 * @param callback 回调函数，返回查询到的对象
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
    this.model.remove({_id: id}, function (error) {
        console.log(id);
        if (error) return callback(error);

        return callback(null);
    });
};

/**
 * 按条件更新数据
 * @param conditions 查询条件
 * @param update 更新数据
 * @param options 选项
 * @param callback 回调函数
 */
CommonDao.prototype.update = function (conditions, update, options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if (error) return callback(error);

        return callback(null);
    });
};

module.exports = CommonDao;