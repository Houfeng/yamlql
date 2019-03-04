"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resolver_1 = require("./Resolver");
const { isNull, isArray, isString, formatDate, getByPath, setByPath } = require('ntils');
class BuiltIn extends Resolver_1.Resolver {
    __get(obj, path) {
        return getByPath(obj, path);
    }
    __set(obj, path, value) {
        return setByPath(obj, path, value);
    }
    __slice(list, start, end) {
        if (!list)
            return list;
        if (!isArray(list))
            return [];
        return list.slice(start, end);
    }
    __limit(list, skip, limit) {
        if (!list)
            return list;
        if (!isArray(list))
            return [];
        return list.slice(skip, skip + limit);
    }
    __reverse(list) {
        if (!list)
            return list;
        if (!isArray(list))
            return [];
        return list.reverse();
    }
    __concat(list, ...args) {
        if (!list)
            return list;
        if (!isArray(list))
            return [];
        return list.concat(list, ...args);
    }
    __keys(obj) {
        return Object.keys(obj);
    }
    __values(obj) {
        return Object.values(obj);
    }
    __find(list, name, value) {
        if (!list || !isArray(list))
            return;
        return list.find(item => item === name) ||
            list.find(item => item[name] === value);
    }
    __filter(list, name, value) {
        if (!list || !isArray(list))
            return [];
        return isNull(value) ? list.filter(item => item === name)
            : list.filter(item => item[name] === value);
    }
    __join(list, split) {
        if (!list)
            return '';
        if (!isArray(list))
            return list;
        return list.join(split);
    }
    __split(str, split) {
        if (!str)
            return str;
        if (!isString(str))
            return [str];
        return str.split(split);
    }
    __substr(str, start, length) {
        if (!str)
            return str;
        return str.substr(start, length);
    }
    __substring(str, start, end) {
        if (!str)
            return str;
        return str.substring(start, end);
    }
    __number(str) {
        return Number(str);
    }
    __string(obj) {
        if (!obj)
            return String(obj);
        return obj.toString();
    }
    __boolean(obj) {
        return Boolean(obj);
    }
    __date(date, format) {
        return format ? formatDate(date, format) : date;
    }
    __parse(str) {
        try {
            return JSON.parse(str);
        }
        catch (_a) {
            return;
        }
    }
    __stringify(obj) {
        return JSON.stringify(obj);
    }
    __merge(...args) {
        return Object.assign({}, ...args);
    }
    __object(...args) {
        return Object.assign({}, ...args);
    }
    __array(array) {
        if (!array)
            return array;
        if (!('length' in array))
            array.length = Object.keys(array).length;
        return [].slice.call(array);
    }
    __value(value) {
        return value;
    }
}
exports.default = BuiltIn;
//# sourceMappingURL=builtIn.js.map