<template>
    <div v-if="role !== 'ADMIN' && role !== 'MODERATOR'"></div>
    <div v-else>
        <div class="container-fluid" style="margin-top:50px;">
            <div class="container">
                <h1 class="display-4 text-center">Zarządzaj użytkownikami</h1>
                <br>
                <div class="container users">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nazwa użytkownika</th>
                            <th>Email</th>
                            <th>Prawa</th>
                            <th>Data stworzenia</th>
                            <th>Data ostatniej edycji</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :id="user.id" v-for="user in users">
                            <td>{{user.id}}</td>
                            <td>{{user.username}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.role.name}}</td>
                            <td>{{user.created}}</td>
                            <td>{{user.lastChanged}}</td>
                            <div v-if="role==='ADMIN'">
                                <td>
                                    <router-link :to="{name: 'editUser', params: {userId: user.id}}" tag="button"
                                                 class="btn btn-psomocnik" :id="'edit'+user.id">Edytuj
                                    </router-link>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-psomocnik" :id="'delete'+user.id"
                                            v-on:click.capture="setId(user.id)" data-toggle="modal"
                                            data-target="#deleteModal">
                                        Usuń
                                    </button>
                                </td>
                            </div>
                        </tr>
                        </tbody>
                    </table>
                    <a class="btn btn-psomocnik btn-lg" href="addUser" id="add">Dodaj</a>

                    <div class="modal fade" id="deleteModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body text-center">
                                    <h4>Usunąć?</h4>
                                </div>
                                <div class="modal-footer">
                                    <div class="col-6 text-center">
                                        <button type="submit" class="btn btn-psomocnik" data-dismiss="modal"
                                                v-on:click.capture="deleteUser()">Ok
                                        </button>
                                    </div>
                                    <div class="col-6 text-center">
                                        <button type="button" class="btn btn-psomocnik" data-dismiss="modal">Anuluj
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "../backend-api";

    export default {
        name: "ManageUsers",
        data() {
            return {
                users: [],
                id: '',
                role: ''
            }
        },
        mounted() {
            this.checkRole();
            this.readUsers();
        },
        methods: {
            checkRole() {
                this.role = localStorage.getItem('role');
                if (this.role !== 'ADMIN' && this.role !=='MODERATOR') {
                    document.location.replace("/");
                }
            },
            readUsers() {
                api.readUsers().then(response => {
                    this.users = response;
                });
            },
            setId(id) {
                this.id = id;
            },
            deleteUser() {
                api.deleteUser(this.id).then(response=> {
                    document.location.replace("/manageUsers")
                    }
                );
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-family: "Trebuchet MS";
        font-weight: bold;
    }
</style>