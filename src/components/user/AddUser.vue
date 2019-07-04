<template>
    <div class="container-fluid" style="margin-top:50px;">
        <div class="col-12 text-center">
            <h1 class="display-3">Dodaj użytkownika</h1>
        </div>
        <div class="container">
            <form id="user" @submit.prevent="createUser()">
                <div class="col-5">
                    <div class="form-group">
                        <label for="userName">Nazwa użytkownika</label>
                        <input type="text" v-model="user.username" class="form-control" id="username"
                               placeholder="Wprowadź nazwę użytkownika">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" v-model="user.email" class="form-control" id="email"
                               placeholder="Wprowadź email">
                    </div>
                    <div class="form-group">
                        <label for="role">Typ użytkownika</label>
                        <input type="text" v-model="user.role" class="form-control" id="role"
                               placeholder="Wprowadź typ użytkownika">
                    </div>
                    <!-- <div class="form-group">
                         <label for="password">Hasło</label>
                         <input type="password" v-model="password" class="form-control" id="password" placeholder="Wprowadź hasło">
                     </div>-->
                </div>
                <div class="col text-center">
                    <button type="submit" id="submitCreateUser" class="btn btn-lg btn-psomocnik">Dodaj</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'
    export default {
        name: "AddUser",
        data(){
            return{
                user: {
                    username: '',
                    email: '',
                    role: ''
                }
            }
        },

        methods:{
            createUser(){
                api.createUser(this.user).then(
                    document.location.replace("/manageUsers")
                );
            }
        }
    }
</script>

<style scoped>

</style>