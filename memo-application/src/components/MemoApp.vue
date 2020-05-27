<template>
    <div class="memo-app">
        <memo-form @addMemo="addMemo"/>
        <!-- <memo-form v-on:addMemo="addMemo"/> -->
        <ul class="memo-list">
            <memo v-for="memo in memos"
                  :key="memo.id"
                  :memo="memo"
                  @deleteMemo="deleteMemo"
                  @updateMemo="updateMemo"/>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

import MemoForm from './MemoForm';
import Memo from './Memo';

import { mapActions, mapState } from 'vuex';

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
});

export default {
    name: 'MemoApp',
    components: {
      MemoForm,
      Memo
    },
    methods: {
        // addMemo(payload){
        //     // this.memos.push(payload);
        //     // this.storeMemo();
        //     memoAPICore.post('/', payload)
        //         .then(res => {
        //             this.memos.push(res.data)
        //         });
        // },
        // storeMemo(){
        //     const memosToString = JSON.stringify(this.memos);
        //     localStorage.setItem('memos', memosToString);
        // },
        // deleteMemo(id){
        //     const targetIndex = this.memos.findIndex(v => v.id === id);
        //     memoAPICore.delete(`/${id}`)
        //         .then(() => {
        //             this.memos.splice(targetIndex, 1);
        //         });
        //     // this.storeMemo();
        // },
        updateMemo(payload){
            const {id, content} = payload;
            const targetIndex = this.memos.findIndex(v => v.id === id);
            const targetMemo = this.memos[targetIndex];
            // this.memos.splice(targetIndex, 1, {...targetMemo, content});   

            memoAPICore.put(`/${id}`, {content})
                .then(() => {
                    this.memos.splice(targetIndex, 1, {...targetMemo, content});
                });
            
            // this.storeMemo();
        },
        ...mapActions([
            'fetchMemos',
            'addMemo',
            'deleteMemo'
        ])
    },
    // data () {
    //     return {
    //         memos: [],
    //     };
    // },
    created () {
        // this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
        // memoAPICore.get('/')
        //     .then(res => {
        //         this.memos = res.data;
        //     });
        this.fetchMemos();
    },
    computed: {
        ...mapState([
            'memos'
        ])
    },
}
</script>
<style scoped>
    .memo-list {
        padding: 20px 0;
        margin: 0;
    }
</style>