<template>
  <div>
    <div class="container-fluid" style="margin-top:50px;">
      <div class="container">
        <h1 class="display-4 text-center">Zarządzaj użytkownikami</h1>
        <br />
        <div class="container users">
          <table class="table table-light">
            <thead>
              <th>
                <input type="checkbox" id="checkAll" @change="checkAll()" />
              </th>
              <th>Id</th>
              <th>Nazwa użytkownika</th>
              <th>Email</th>
              <th>Prawa</th>
              <th>Utworzony</th>
              <th>Ostatnio edytowany</th>
            </thead>
            <tbody>
              <tr :id="user.id" v-for="(user, index) in users">
                <td>
                  <input
                    type="checkbox"
                    :id="'delete'+user.username"
                    name="userCheckbox"
                    :value="user.id"
                    v-model="checkedUsers"
                  />
                </td>
                <td>{{index+1}}</td>
                <td>{{user.username}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role.name}}</td>
                <td>{{user.created}}</td>
                <td>{{user.lastChanged}}</td>
                <td>{{user.lastLoggedIn}}</td>
                <div v-if="role==='ADMIN'">
                  <td>
                    <router-link
                      :to="{name: 'editUser', params: {userId: user.id}}"
                      tag="button"
                      class="btn btn-secondary"
                      :id="'edit'+user.username"
                    >Edytuj</router-link>
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-sm-6 text-center">
              <router-link to="/addUser">
                <button class="btn btn-info btn-lg">Dodaj</button>
              </router-link>
            </div>
            <div class="col-sm-6 text-center">
              <button
                class="btn btn-info btn-lg"
                id="deleteButton"
                data-toggle="modal"
                data-target="#deleteModal"
                :disabled="checkedUsers.length === 0"
              >Usuń</button>
            </div>
          </div>
          <div class="modal fade" id="deleteModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body text-center">
                  <h4>Usunąć?</h4>
                </div>
                <div class="modal-footer">
                  <button
                    id="deleteSubmitButton"
                    type="submit"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    v-on:click.capture="deleteUsers()"
                  >Ok</button>
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
import api from "../backend-api";

export default {
  name: "ManageUsers",
  data() {
    return {
      users: [],
      role: "",
      checkedUsers: []
    };
  },
  mounted() {
    this.role = localStorage.getItem("role");
    this.readUsers();
  },
  methods: {
    readUsers() {
      api.readUsers().then(response => {
        this.users = response;
      });
    },

    checkAll() {
      $("input[name='userCheckbox']").prop(
        "checked",
        $("#checkAll").prop("checked")
      );
      let checkboxes = $("input[name='userCheckbox']");
      Array.prototype.forEach.call(checkboxes, item => {
        item.dispatchEvent(new Event("change"));
      });
    },

    deleteUsers() {
      api.deleteUsers(this.checkedUsers).then(response => {
        document.location.replace("/manageUsers");
      });
    }
  }
};
</script>

<style scoped>
</style>