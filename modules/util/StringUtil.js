/**
 * Created by Admin on 2014/11/26.
 */
function StringUtil() {

}
StringUtil.startWith = function (str,prefix) {
    var reg = new RegExp( "^" + prefix);
    return reg.test(str);
};

module.exports = StringUtil;
