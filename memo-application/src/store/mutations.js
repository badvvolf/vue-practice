import { 
    FETCH_MEMOS,
    ADD_MEMO 
} from './mutations-types';

export default {
    [FETCH_MEMOS] (state, payload){
        state.memos = payload;
    },
    [ADD_MEMO] (state, payload){
        state.memos.push(payload);
    },
};
