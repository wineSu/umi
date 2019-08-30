import { routerRedux } from 'dva';
import {postServer, apiUrl} from '../../services/api';
import {setLoginToken} from '../../utils/utils';

export default {
    namespace: 'login',
    state: {},
    effects:{
        *doLogin({payload}: {payload: Object},{call,put}: {call: Function,put: Function}){
            const loginResult = yield call(postServer, apiUrl.loginsave, payload);
            //登录成功设置存储记录
            setLoginToken(loginResult.userinfo.username);
            yield put(routerRedux.push("/"));
        },
    },
    reducers: {
       
    }
};