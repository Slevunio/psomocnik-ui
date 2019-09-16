<template>
    <div class="home">
        Home Stuff
        {{role}} {{token}}
    </div>
</template>

<script>
    export default {
        name: 'home',
        data(){
            return{
                role:localStorage.getItem('role'),
                token:localStorage.getItem('token')
            }
        }
    }
</script>

<style scoped>

</style>