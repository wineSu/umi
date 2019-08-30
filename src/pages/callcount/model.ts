import { CharData, apiUrl, postServer} from '../../services/api';
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'char',
    state: fromJS({
        charData: []
    }),
    effects:{
        *getCharData({payload}: {payload: Object},{call, put, all}: {call: Function,put: Function, all: any}){
            const [charData, tableList] = yield all([
                call(CharData, payload),
                call(postServer, apiUrl.getCharData)
            ])
            yield put({
                type:"initData",
                charData,
                tableList,
                callSelIndex: (payload as any).id
            })
        },
    },
    reducers:{
        initData(state: any,data: Object){
            return state.merge(fromJS(data))
        }
    }
};