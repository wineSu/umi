import { getMenu } from '../services/api'
import {clearLoginToken} from '../utils/utils';
import { routerRedux } from 'dva';

export default {
    namespace: 'app',
    state: {},
    effects:{
        *doGetMenu(payload: Object,{call,put}: {call: Function, put: Function}){
            const menuData = yield call(getMenu)
            yield put({
                type:"setMenuData",
                menuData
            })
        },
        *doLogout(payload: Object,{put}: {put: Function}){
            clearLoginToken();
            yield put(routerRedux.push("/login"));
        },
    },
    reducers:{
        //设置菜单状态
        setMenuData(state: Object,{menuData}:{menuData: any}){
            return {
                ...state,
                menuData:menuData
            };
        }
    }

};