<template>
    <div>
        我的{{msg}}

        <input type="button" value="点击个人信息" @click='information'>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                msg:''
            }
        },
        methods:{
            information(){
                this.$router.push({
                    name:'/mine/information',
                    params:{
                        id:'information'
                        }
                })
            }
        },
        mounted(){
            var b = new Base64()
            this.msg=b.decode(this.$route.query.id)
        }
    }
</script>

<style scoped>

</style>