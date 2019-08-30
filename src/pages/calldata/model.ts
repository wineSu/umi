import { apiUrl, postServer} from '../../services/api';
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'calldata',
    state: fromJS({
        tableList: []
    }),
    effects:{
        *getData({payload}: {payload: any},{call, put}: {call: Function,put: Function}): IterableIterator<any>{
            if(!payload || !payload.page){
                payload = {
                    page: 1,
                    limit: 20,
                    phone: '',
                    status: 2,
                }
            }
            const res = yield call(postServer, apiUrl.getCallingData, payload)
            yield put({
                type:"initData",
                total: (res && res.count) || 0,
                data: (res && res.data) || [],
                pageState: payload
            })
        },
        *selData({payload}: {payload: any},{call, put}: {call: Function,put: Function}): IterableIterator<any>{
            const selState = yield call(postServer, apiUrl.listSelData)
            yield put({
                type:"initData",
                selState
            })
        },
        *exportInfor({payload}: {payload: any}): IterableIterator<any>{
            window.location.href = 'https://yihoo.qingguo.com/'+apiUrl.exportInfor + '?ids=' + payload.ids;
        }
    },
    reducers:{
        initData(state: any,data: Object){
            return state.merge(fromJS(data))
        }
    }
};