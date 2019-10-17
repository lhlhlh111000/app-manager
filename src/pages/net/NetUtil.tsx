import { message, Button } from 'antd';
export default class NetUtil {

    static get(url: string, params?: {[key: string]: any}|null, callBacker?: NetCallBack<any>) {
        let queryStr = '';
        if(params) {
            queryStr += '?';
            Object.keys(params).forEach(key => {
                if(!queryStr.endsWith('&') && !queryStr.endsWith('?')) {
                    queryStr += '&';
                }
                queryStr += key + '=' + encodeURIComponent(params[key]);
            })
        }
        fetch(url + queryStr, {method: 'GET'})
            .then<ResultData>(res => res.json())
            .then(data => {
                if(200 != data.code) {
                    NetUtil.callbackFail(data.message||'出错啦', callBacker);
                }else {
                    NetUtil.callbackSuccess(data.data, callBacker);
                }
            })
            .catch(e => {
                NetUtil.callbackFail('出错啦', callBacker);
            })
    }

    static post(url: string, params?: object, callBacker?: NetCallBack<any>) {
        fetch(url, {method: 'POST', headers:{'Content-Type': 'application/json'},body: JSON.stringify(params||{})})
            .then<ResultData>(res => res.json())
            .then(data => {
                if(200 != data.code) {
                    NetUtil.callbackFail(data.message||'出错啦', callBacker);
                }else {
                    NetUtil.callbackSuccess(data.data, callBacker);
                }
            })
            .catch(e => {
                NetUtil.callbackFail('出错啦', callBacker);
            })
    }

    static upload(url: string, file: string|File, callBacker?: NetCallBack<any>) {
        const formdata = new FormData();
        formdata.append('file', file);
        fetch(url, {
            method: 'POST',
            body: formdata,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then<ResultData>(res => res.json())
        .then(data => {
            if(200 != data.code) {
                NetUtil.callbackFail(data.message||'出错啦', callBacker);
            }else {
                NetUtil.callbackSuccess(data.data, callBacker);
            }
        })
        .catch(e => {
            NetUtil.callbackFail('出错啦', callBacker);
        })    
    }

    static callbackSuccess(data: object, callBacker?: NetCallBack<any>) {
        if(!callBacker) {
            return;
        }

        callBacker.success(data);
    }

    static callbackFail(msg: string, callBacker?: NetCallBack<any>) {
        if(!callBacker) {
            return;
        }

        callBacker.fail(msg);
        message.error(msg);
    }
}

interface ResultData {
    code: number;
    message: string;
    data: object
}

export interface NetCallBack<T> {
    success(data: T): void;
    fail(message: string): void;
}