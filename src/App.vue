<template>
    <div id="app">
        <div id="nav">
            <nav class="navbar navbar-dark navbar-expand-sm bg-primary">
                <a class="navbar-brand" href="/"><img src="@/assets/images/logo.jpg" alt=""></a>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/findPet">Znajdź tego jedynego</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/ourPets">Nasze zwierzaki</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">Kontakt</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <div v-if="role===null || role==='undefined'">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Zaloguj</router-link>
                        </li>
                    </div>
                    <div v-else>
                        <li class="nav-item">
                            <span class="nav-link" @click="logout()">
                                Wyloguj
                            </span>
                        </li>
                    </div>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">Zarejestruj</router-link>
                    </li>
                    <div v-if="role==='ADMIN'">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Zarządzaj</a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <router-link class="dropdown-item" to="/managePets">Zwierzęta</router-link>
                                <router-link class="dropdown-item" to="/manageUsers">Użytkownicy</router-link>
                            </div>
                        </li>
                    </div>
                </ul>
            </nav>
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
    .nav-link {
        font-size: 18px;
    }

    .nav-link:hover {
        cursor: pointer;
    }
    img{
        height:50px;
        width:50px;
    }
</style>