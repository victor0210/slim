<template>
    <div id="app">
        <div class="btn" @click="store.dispatch('decrement')">-</div>
        <div id="count">Clicked: {{ store.state.count }} times, count is {{ evenOrOdd }}.</div>
        <div class="btn" @click="store.dispatch('increment')">+</div>
    </div>
</template>

<script>
    export default {
        computed: {
            evenOrOdd() {
                return this.store.state.count % 2 === 0 ? 'Odd' : 'Even'
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
        box-sizing: border-box;
        display: inline-block;
        width: 60%;
        float: left;
        font-size: 25px;
        line-height: 50px;
        text-align: center;
    }
</style>
