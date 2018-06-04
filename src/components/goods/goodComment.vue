<template>
    <div>
        <comment :cid="id"></comment>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                id:""
            }
        },
    created(){
        this.id=this.$route.query.idn;
    }
    }
</script>

<style type="stylesheet/stylus" scoped>

</style>