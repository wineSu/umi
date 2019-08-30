import queryString from 'query-string'
import NProgress from 'nprogress'
import { message } from 'antd'

const BASEURL = process.env.NODE_ENV == 'development' ? 'api/' : 'https://yihoo.qingguo.com/'
//将json对象拼接成 key=val&key=val 的字符串形式
function obj2params(obj:Object) {
	var result = '';
	var item;
	for(item in obj){
		result += '&' + item + '=' +encodeURIComponent((obj as any)[item]);
	}

	if(result) {
		result = result.slice(1);
	}
	return result;
}

function checkStatus(response:Object): Object {
    NProgress.done()
    if ((response as any).status >= 200 && (response as any).status < 300) {
        return response
    } else {
        let error: any = new Error((response as any).statusText)
        error.response = response
        throw error
    }
}
function parseJSON(response: any) {
    return response.json()
}
function get(url: String, params:any) {
    if (params) {
        url += `?${queryString.stringify(params)}`
    }
    try {
        let headers = new Headers();
        let Access_Token = 'test';
        if (Access_Token) {
            // headers.append('Access_Token', Access_Token);
        }
        NProgress.start()
        return fetch(BASEURL+url, {
            headers: headers,
            credentials: "include"
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(res=>{
                NProgress.done()
                if(res.code === 10000){
                    return (res.count ? res : res.data || true)
                }else{
                    message.error(res.desc || '操作失败')
                    throw new Error(res.desc || '操作失败')
                }
            })
    } catch (e) {
        throw new Error('get error')
    }

}

function post(url:String, body: any) {
    let fetchOptions:Object = {
        method: 'POST',
        credentials : 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(body)
    }
    //loading
    NProgress.start()
    
    return fetch(BASEURL+url, fetchOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(res=>{
            
            if(res.code === 10000){
                return (res.count ? res : res.data || true)
            }else{
                message.error(res.desc || '操作失败')
                throw new Error(res.desc || '操作失败')
            }
        })
}

export {
    get,
    post
}