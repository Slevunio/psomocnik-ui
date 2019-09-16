<template>
    <div class="container-fluid" style="margin-top: 50px">
        <h1 class="display-4 text-center">Strona logowania</h1>
        <div class="container">
            <br>
            <div class="col-5">
                <form @submit.prevent="login()">
                    <input-text type="text" label="Nazwa użytkownika" name="username"
                                placeholder="Wprowadź nazwę użytkownika" v-model="username"></input-text>
                    <input-text type="password" label="Hasło" name="password" placeholder="Wprowadź hasło"
                                v-model="password"></input-text>
                    <div class="col text-center">
                        <button type="button" class="btn-lg btn-psomocnik" @click="login()">Zaloguj</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import InputText from '../customTags/InputText';
    import axios from 'axios'

    import api from '../backend-api';
    import jwt_decode from 'jwt-decode'

    export default {
        name: "Login",
        components: {
            InputText
        },
        data() {
            return {

                username: '',
                password: ''

            }
        },
        methods: {
            login() {
                api.login(this.username, this.password).then(response => {
                    localStorage.setItem("token", response.access_token);
                    localStorage.setItem("role", jwt_decode(response.access_token).authorities[0]);
                }).then(localStorage=>{
                    document.location.replace("/");
                })

            }
        }
    }
</script>

<style scoped>

</style>