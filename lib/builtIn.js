"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { isNull } = require('ntils');
class BuiltIn {
    // map 直接返回就行，YamlQL 本身即可能 map
    __map(arg) {
        return arg;
    }
    __slice(list, start, end) {
        if (!list)
            return list;
        return list.slice(start, end);
    }
    __limit(list, skip, limit) {
        if (!list)
            return list;
        return list.slice(skip, skip + limit);
    }
    __reverse(list) {
        if (!list)
            return list;
        return list.reverse();
    }
    __concat(list, ...args) {
        if (!list)
            return list;
        return list.concat(list, ...args);
    }
    __keys(obj) {
        return Object.keys(obj);
    }
    __values(obj) {
        return Object.values(obj);
    }
    __find(list, name, value) {
        if (!list)
            return;
        return list.find(item => item === name) ||
            list.find(item => item[name] === value);
    }
    __filter(list, name, value) {
        if (!list)
            return [];
        return isNull(value) ? list.filter(item => item === name)
            : list.filter(item => item[name] === value);
    }
    __join(list, split) {
        if (!list)
            return '';
        return list.join(split);
    }
    __split(str, split) {
        if (!str)
            return str;
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
}
exports.default = BuiltIn;
//# sourceMappingURL=builtIn.js.map