<template>
    <div class="home">
        Home Stuff
        {{role}}
    </div>
</template>

<script>
    export default {
        name: 'home',
        data(){
            return{
                role:localStorage.getItem('role')
            }
        }
    }
</script>

<style scoped>

</style>