"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { isNull, iArray, isString, formatDate } = require('ntils');
class BuiltIn {
    // map 直接返回就行，YamlQL 本身即可能 map
    _map(arg) {
        return arg;
    }
    _slice(list, start, end) {
        if (!list)
            return list;
        if (!iArray(list))
            return [];
        return list.slice(start, end);
    }
    _limit(list, skip, limit) {
        if (!list)
            return list;
        if (!iArray(list))
            return [];
        return list.slice(skip, skip + limit);
    }
    _reverse(list) {
        if (!list)
            return list;
        if (!iArray(list))
            return [];
        return list.reverse();
    }
    _concat(list, ...args) {
        if (!list)
            return list;
        if (!iArray(list))
            return [];
        return list.concat(list, ...args);
    }
    _keys(obj) {
        return Object.keys(obj);
    }
    _values(obj) {
        return Object.values(obj);
    }
    _find(list, name, value) {
        if (!list || !iArray(list))
            return;
        return list.find(item => item === name) ||
            list.find(item => item[name] === value);
    }
    _filter(list, name, value) {
        if (!list || !iArray(list))
            return [];
        return isNull(value) ? list.filter(item => item === name)
            : list.filter(item => item[name] === value);
    }
    _join(list, split) {
        if (!list)
            return '';
        if (!iArray(list))
            return list;
        return list.join(split);
    }
    _split(str, split) {
        if (!str)
            return str;
        if (!isString(str))
            return [str];
        return str.split(split);
    }
    _substr(str, start, length) {
        if (!str)
            return str;
        return str.substr(start, length);
    }
    _substring(str, start, end) {
        if (!str)
            return str;
        return str.substring(start, end);
    }
    _number(str) {
        return Number(str);
    }
    _string(obj) {
        if (!obj)
            return String(obj);
        return obj.toString();
    }
    _boolean(obj) {
        return Boolean(obj);
    }
    _date(obj, format) {
        const date = new Date(obj);
        return format ? formatDate(date, format) : date;
    }
    _parse(str) {
        try {
            return JSON.parse(str);
        }
        catch (_a) {
            return;
        }
    }
    _stringify(obj) {
        return JSON.stringify(obj);
    }
    _merge(...args) {
        return Object.assign({}, ...args);
    }
    _object(...args) {
        return Object.assign({}, ...args);
    }
    _array(array) {
        if (!array)
            return array;
        if (!('length' in array))
            array.length = Object.keys(array).length;
        return [].slice.call(array);
    }
    _value(value) {
        return value;
    }
}
exports.default = BuiltIn;
//# sourceMappingURL=builtIn.js.map