<template>
        <div class="container" style="margin-top:50px;" id="registration">
            <h1 class="display-5 text-center text-dark">Rejestracja</h1>
            <br>
            <div class="col-5">
                <form @submit.prevent="register()">
                    <input-text type="text" label="Nazwa użytkownika" name="registerUsername"
                                placeholder="Wprowadź nazwę użytkownika" v-model="user.username"></input-text>
                    <input-text type="email" label="Adres email" name="registerEmail" placeholder="Wprowadź adres email"
                                v-model="user.email"></input-text>
                    <input-text type="password" label="Hasło" name="registerPassword" placeholder="Wprowadź hasło"
                                v-model="user.password"></input-text>
                    <input-text type="password" label="Potwierdź hasło" name="registerPasswordConfirm"
                                placeholder="Potwierdź hasło" v-model="user.passwordConfirm"></input-text>
                    <div class="col text-center">
                        <button type="button" class="btn-lg btn-primary" @click="register()">Rejestruj</button>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>
    import api from '../backend-api'
    import InputText from '../customTags/InputText'

    export default {
        name: "Register",
        components: {
            InputText
        },
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    role: '',
                    password: '',
                    passwordConfirm: ''
                }
            }
        },
        mounted() {
            this.readRole();
        },
        methods: {
            readRole() {
                api.readRole('USER').then(response => {
                    this.user.role = response;
                })
            },
            register() {
                if (this.password !== this.passwordConfirm) {
                    alert("Passwords do not match");
                    return;
                }
                api.registerUser(this.user).then(response => {
                        document.location.replace("/")
                    }
                );
            }
        }
    }
</script>

<style scoped>
    /*h1 {
        font-family: "Trebuchet MS";
        font-weight: bold;
    }*/
</style>