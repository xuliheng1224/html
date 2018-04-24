
/**
 * Created by moersing on 20/05/2017.
 * @desc 初始化本地localStorage,如果被阻止,使用cookie存储
 */
import  cookie from './cookie';
let
    localStorage = (function () {
        let
            storage = window.localStorage;
        try {
            storage.getItem(key)
            storage.setItem(key,val);
            storage.removeItem(key);
            storage.clear()
            return storage;
        }
        catch (error) {
            storage.setItem = function (key, value) {
                cookie.set(key, value);
            };
            storage.getItem = function (key) {
                return cookie.get(key);
            };
            storage.removeItem = function (key) {
                cookie.remove(key);
            };
            storage.clear = function () {
                cookie.remove();
            };
            return storage;
        }
    }());

export  default localStorage;