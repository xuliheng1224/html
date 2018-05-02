<template>
    <div>
        <h4>这是子组建</h4>
        <h3>{{info}}</h3>
        <input type="button" value='像父组件传参' @click='send'>
    </div>
</template>

<script>
    export default {
        props:['parentmsg'],
        data(){
            return{
                info:this.parentmsg
            }
        },
        methods:{
            send(){
                this.$emit('toParent','这是从子组件传过来的')
            }
        }
    }
</script>

<style scoped>

</style>