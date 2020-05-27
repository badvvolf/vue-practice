import axios from 'axios';
import {
    FETCH_MEMOS,
    ADD_MEMO,
} from './mutations-types';

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
});

export function fetchMemos ({ commit }){
    memoAPICore.get('/')
        .then(res => {
            commit(FETCH_MEMOS, res.data);
        });
}

export function addMemo ({ commit }, payload){
    memoAPICore.post('/', payload)
        .then(res => {
            commit(ADD_MEMO, res.data);
        });
}

export default {
    fetchMemos,
    addMemo
}