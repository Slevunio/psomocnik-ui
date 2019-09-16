<template>
    <div id="app">
        <div id="nav">
            <b-navbar>
                <b-navbar-brand to="/">LOGO</b-navbar-brand>

                <b-navbar-nav>
                    <b-nav-item to="/">Strona główna</b-nav-item>
                    <b-nav-item to="/ourPets">Nasze zwierzaki</b-nav-item>
                    <b-nav-item to="/findPet">Znajdź tego jedynego</b-nav-item>
                    <b-nav-item to="/contact">Kontakt</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <div v-if="role===null || role==='undefined'">
                        <b-nav-item to="/login">Zaloguj</b-nav-item>
                    </div>
                    <div v-else>
                        <b-nav-item @click="logout()">Wyloguj</b-nav-item>
                    </div>
                    <b-nav-item to="/register">Zarejestruj</b-nav-item>
                    <span v-if="role==='ADMIN'">
                    <b-nav-item-dropdown text="Zarządzaj" right no-caret>
                        <b-dropdown-item to="/managePets">Zwierzęta</b-dropdown-item>
                        <b-dropdown-item to="/manageUsers">Użytkownicy</b-dropdown-item>
                    </b-nav-item-dropdown></span>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                role: ''
            }
        },
        mounted() {
            this.checkRole();
        },
        methods: {
            checkRole() {
                this.role = localStorage.getItem('role');
            },
            logout() {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                document.location.replace("/");
            }
        }
    }
</script>
<style scoped>

</style>