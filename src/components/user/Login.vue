<template>
    <div class="container-fluid" style="margin-top: 50px">
        <h1 class="display-4 text-center">Strona logowania</h1>
        <div class="container">
            <br>
            <div class="col-5">
                <form @submit.prevent="login()">
                    <input-text type="text" label="Nazwa użytkownika" name="username"
                                placeholder="Wprowadź nazwę użytkownika" v-model="user.username"></input-text>
                    <input-text type="password" label="Hasło" name="password" placeholder="Wprowadź hasło"
                                v-model="user.password"></input-text>
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
    import api from '../backend-api';

    export default {
        name: "Login",
        components: {
            InputText
        },
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                var self = this;
                api.loginUser(this.user).then(response => {
                    /*self.$session.set('token', response.data.token);
                    self.$session.set('role', response.data.role.toString().substr(1, response.data.role.toString().length - 2));*/
                    // localStorage.setItem("token", response.data.token);
                    localStorage.token = response.data.token;
                    localStorage.setItem("role", response.data.role.toString().substr(1, response.data.role.toString().length - 2));
                })//.then(document.location.replace("/"));

            }
        }
    }
</script>

<style scoped>

</style>