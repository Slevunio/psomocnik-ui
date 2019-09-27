<template>
    <div>
        <div class="container-fluid" style="margin-top:50px;" id="user">
            <div class="container">
                <h1 class="display-4 text-center">Edytuj użytkownika</h1>
                <br>
                <table class="table">
                    <thead class="thead-dark">
                    <tr class="text-center">
                        <th>
                            Nazwa użytkownika
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Prawa
                        </th>
                        <th>
                            Data utworzenia
                        </th>
                        <th>
                            Data edycji
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-light">
                    <tr class="text-center">
                        <td id="username">{{user.username}}</td>
                        <td id="email">{{user.email}}</td>
                        <td id="role">{{user.role}}</td>
                        <td id="created">{{user.created}}</td>
                        <td id="lastChanged">{{user.lastChanged}}</td>
                    </tr>
                    <tr class="text-center">
                        <td>
                            <button type="button" class="btn btn-primary" id="editUsername"
                                    @click.capture="setElementId('username')" data-toggle="modal"
                                    data-target="#editModal">
                                Edytuj
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" id="editEmail"
                                    @click.capture="setElementId('email')" data-toggle="modal" data-target="#editModal">
                                Edytuj
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" id="editType"
                                    @click.capture="setElementId('role')" data-toggle="modal" data-target="#editModal">
                                Edytuj
                            </button>
                        </td>
                        <td/>
                        <td/>
                    </tr>
                    </tbody>
                </table>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-primary btn-lg" id="editUserSubmit" data-toggle="modal"
                            data-target="#submitModal">
                        Zatwierdź
                    </button>
                </div>
                <!------------------------------------- editModal------------------------------------------>
                <div class="modal fade" id="editModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Wprowadź zmianę</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="editInput">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="editInputModalSubmit"
                                        data-dismiss="modal"
                                        @click.capture="editValue()">Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------------------------------------submitModal--------------------------------------->
                <div class="modal fade" id="submitModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body text-center">
                                <h4>Zatwierdzić zmiany?</h4>
                            </div>
                            <div class="modal-footer">
                                <div class="col-6 text-center">
                                    <button type="button" class="btn btn-primary" id="editUserModalSubmit"
                                            data-dismiss="modal" @click.capture="editUser()">Ok
                                    </button>
                                </div>
                                <div class="col-6 text-center">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Anuluj</button>
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
    import api from '../backend-api';

    export default {
        name: "EditUser",
        data() {
            return {
                user: '',
                elementId: '',
                updatedUser: {
                    username: '',
                    email: '',
                    role: ''
                },
                role:''
            }
        },
        mounted() {
            this.getUser();
        },
        methods: {
            getUser() {
                api.readUser(this.getUserId()).then(response => {
                    this.user = response;
                });
            },
            getUserId() {
                var splitted = window.location.href.split('/');
                return splitted[splitted.length - 1];
            },
            editUser() {
                api.updateUser(this.getUserId(), this.updatedUser).then(
                    document.location.replace("/manageUsers")
                );
            },
            setElementId(elId) {
                this.elementId = elId;
                this.setDefaultInputValue();
            },
            editValue() {
                var newValue = document.getElementById("editInput").value;
                document.getElementById(this.elementId).innerHTML = newValue;
                this.updatedUser[this.elementId] = newValue;

            },
            setDefaultInputValue() {
                document.getElementById("editInput").value = document.getElementById(this.elementId).innerHTML;
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