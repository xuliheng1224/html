<template>
    <div>
        <h2>这是详情页</h2>
        <h3 :title='titel'>{{titel}}</h3>
        <input type="button" value='点击我' @click='leftClick'/>
    </div>
</template>

<script>
    export default {
        props:{
            titel:{
                type:String,
                default:''
            },
            leftClick:{
                type:Function,
                default:function(){
                    alert('aaa')
                }
            }
        }
    }
</script>

<style scoped>

</style>