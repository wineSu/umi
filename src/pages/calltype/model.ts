import { apiUrl, postServer} from '../../services/api';
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'charPie',
    state: fromJS({
        charData: [],
        tableList: []
    }),
    effects:{
        *getCharData({payload}: {payload: Object},{call, put}: {call: Function,put: Function}){
            const data = yield call(postServer, apiUrl.getPieData, payload);
            yield put({
                type:"initData",
                charData: data.char,
                tableList: data.table,
            })
        },
    },
    reducers:{
        initData(state: any,data: Object){
            return state.merge(fromJS(data))
        }
    }
};