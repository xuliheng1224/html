<template>
    <div>
            我的个人信息{{info}}
    </div>
</template>

<script>
    export default {
        data(){
            return{
                info:''
            }
        },
        mounted(){
            this.info = this.$route.params.id
        }
    }
</script>

<style scoped>

</style>