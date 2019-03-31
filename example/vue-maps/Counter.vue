<template>
    <div id="app">
        <div class="btn decrement" @click="decrement">-</div>
        <div id="count">Clicked: <span class="tag">{{ count }}</span> times, count is <span class="tag">{{ evenOrOdd }}</span>.</div>
        <div class="btn increment" @click="increment">+</div>
    </div>
</template>

<script>
  import {mapCommits, mapGetters, mapState} from '../../src/vslim'

    export default {
        methods: {
          ...mapCommits([
            'increment',
            'decrement'
          ])
        },
        computed: {
          ...mapState([
            'count'
          ]),
          ...mapGetters([
            'evenOrOdd'
          ])
        },
        watch: {
            'store.state.count': {
                handler(val) {
                    console.log('new count: ' + val)
                }
            },
            'store.state.arr': {
                handler(val) {
                    console.log('new arr: ' + val)      // would not be triggered
                }
            },
            'store.state.obj': {
                handler(val) {
                    console.log('new obj: ' + val)      // would not be triggered
                }
            }
        }
    }
</script>

<style scoped>
    .btn {
        width: 20%;
        height: 50px;
        text-align: center;
        box-sizing: border-box;
        display: inline-block;
        line-height: 48px;
        user-select: none;
        border: 1px solid #000;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bolder;
        cursor: pointer;
        float: left;
    }

    .btn:hover {
        background: #f0f0f0;
    }

    .btn:active {
        background: #e0e0e0;
    }

    #count {
        display: inline-block;
        padding: 0 10px;
        border-radius: 5px;
        box-sizing: border-box;
        width: 60%;
        float: left;
        font-size: 25px;
        line-height: 50px;
        text-align: center;
    }

    .tag {
        width: 100px;
        display: inline-block;
        line-height: 50px;
        padding: 0 10px;
        border-radius: 5px;
        background-color: #3c3c3c;
        color: #fff;
    }
</style>
