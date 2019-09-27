<template>
    <div>
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
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span
                                    v-if="user.role===''">Typ użytkownika</span>
                                <span v-else>{{user.role.name}}</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li v-for="role in roles" @click="setRole(role)"><a class="dropdown-item" href="javascript:void(0)">{{role.name}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="form-group">
                            <label for="password">Hasło</label>
                            <input type="password" v-model="user.password" class="form-control" id="password"
                                   placeholder="Wprowadź hasło">
                        </div>
                    </div>
                    <div class="col text-center">
                        <button type="submit" id="submitCreateUser" class="btn btn-lg btn-primary">Dodaj</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'

    export default {
        name: "AddUser",
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    role: '',
                    password: ''
                },
                roles: []
            }
        },

        mounted() {
            this.readRoles();
        },

        methods: {
            readRoles() {
                api.readRoles().then(response => {
                    this.roles = response;
                });
            },

            setRole(role) {
                this.user.role = role;
            },

            createUser() {
                api.createUser(this.user).then(response=> {
                    document.location.replace("/manageUsers")
                    }
                );
            }
        }
    }
</script>

<style scoped>

</style>