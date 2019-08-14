<template>
    <div class="container-fluid" style="margin-top:50px;" id="registration">
        <div class="container" style="margin-top:25px;">
                <h1 class="display-4 text-center">Rejestracja</h1>
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
                        <button type="button" class="btn-lg btn-psomocnik" @click="register()">Rejestruj</button>
                    </div>
                </form>
            </div>
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
                    role: 'user',
                    password: '',
                    passwordConfirm: ''
                }
            }
        },
        methods: {
            register() {
                if (this.password !== this.passwordConfirm) {
                    alert("Passwords do not match");
                    return;
                }
                api.registerUser(this.user).then(
                    document.location.replace("/manageUsers"));
            }
        }
    }
</script>

<style scoped>
h1{
    font-family: "Trebuchet MS";
    font-weight: bold;
}
</style>