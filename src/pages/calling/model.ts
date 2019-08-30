import { apiUrl, postServer} from '../../services/api';
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'calling',
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
                    status: 0,
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
        *handle({payload}: {payload: any},{call, put}: {call: Function,put: Function}): IterableIterator<any>{
            try{
                yield call(postServer, (apiUrl as any)[payload.type], payload)
            }catch(e){
                yield put({type:"getData"})
            }
        }
    },
    reducers:{
        initData(state: any,data: Object){
            return state.merge(fromJS(data))
        }
    }
};