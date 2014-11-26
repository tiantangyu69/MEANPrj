/**
 * Created by Admin on 2014/11/26.
 */
function StringUtil() {
}

/**
 * 判断字符串是否与匹配的字符串开始
 * @param str
 * @param prefix
 * @returns {boolean}
 */
StringUtil.startWith = function (str, prefix) {
    var reg = new RegExp( "^" + prefix);
    return reg.test(str);
};

/**
 * 判断字符串是否与匹配的字符串结束
 * @param str
 * @param suffix
 * @returns {boolean}
 */
StringUtil.endWith=function(str, suffix){
    var reg=new RegExp(suffix + "$");
    return reg.test(str);
};

module.exports = StringUtil;
