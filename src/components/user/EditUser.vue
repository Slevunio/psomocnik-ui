<template>
  <div>
    <div class="container-fluid" style="margin-top:50px;" id="user">
      <div class="container">
        <h1 class="display-4 text-center">Edytuj użytkownika</h1>
        <br />
        <table class="table table-secondary">
          <thead>
            <tr>
              <th>Nazwa użytkownika</th>
              <td>
                <input-text
                  v-model="usernameBuffer"
                  id="username"
                  :defaultVal="user.username"
                  :valid="validation.username.valid"
                  :error="validation.username.error"
                  @input="debounceUsername"
                ></input-text>
              </td>
            </tr>
            <tr>
              <th>Adres email</th>
              <td>
                <input-text
                  type="email"
                  id="email"
                  :defaultVal="user.email"
                  @input="debounceEmail"
                  v-model="emailBuffer"
                  :valid="validation.email.valid"
                  :error="validation.email.error"
                ></input-text>
              </td>
            </tr>
            <tr>
              <th>Rola</th>
              <td>
                <input-dropdown
                  name="role"
                  id="roles"
                  placeholder="Rola"
                  :values="rolesNames"
                  v-model="userRoleName"
                  :defaultVal="userRoleName"
                ></input-dropdown>
              </td>
            </tr>
          </thead>
        </table>

        <div class="col-12 text-center">
          <button
            type="button"
            class="btn btn-primary btn-lg"
            id="editUserSubmit"
            data-toggle="modal"
            data-target="#submitModal"
            :disabled="isSubmitButtonDisabled"
          >Zatwierdź</button>
        </div>

        <!-------------------------------------submitModal--------------------------------------->
        <div class="modal fade" id="submitModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body text-center">
                <h4>Zatwierdzić zmiany?</h4>
              </div>
              <div class="modal-footer">                
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="editUserModalSubmit"
                    data-dismiss="modal"
                    @click.capture="editUser()"
                  >Ok</button>                               
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Anuluj</button>                
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
import InputText from "../customTags/InputText";
import InputDropdown from "../customTags/InputDropdown";
import _ from "lodash";
export default {
  name: "EditUser",
  components: {
    InputText,
    InputDropdown
  },
  data() {
    return {
      user: {
        id: "",
        username: "",
        email: "",
        role: ""
      },
      oldUser: "",
      roles: [],
      rolesNames: [],
      userRoleName: "",
      validation: {
        username: {
          valid: "",
          error: ""
        },
        email: {
          valid: "",
          error: ""
        }
      },
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      usernameBuffer: "", //for debounce purposes
      emailBuffer: "", //for debounce purposes
      isSubmitButtonDisabled: true,
      validationFunctions: [this.validateUsername, this.validateEmail]
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      api.readUser(this.getUserId()).then(response => {
        this.oldUser = response;
        for (let field in this.user) {
          this.user[field] = this.oldUser[field];
        }
        this.getRoles();
      });
    },
    getUserId() {
      var splitted = window.location.href.split("/");
      return splitted[splitted.length - 1];
    },
    getRoles() {
      api.readRoles().then(response => {
        this.roles = response;
        this.roles.forEach(role => {
          this.rolesNames.push(role.name);
        });
        this.userRoleName = this.oldUser.role.name;
      });
    },
    editUser() {
      this.user.role = this.roles.filter(role => {
        return role.name === this.userRoleName;
      })[0];
      api.updateUser(this.getUserId(), this.user).then(response => {
        document.location.replace("/manageUsers");
      });
    },
    setUsername() {
      this.user.username = this.usernameBuffer;
    },
    setEmail() {
      this.user.email = this.emailBuffer;
    },
    debounceUsername: _.debounce(function() {
      this.setUsername();
    }, 500),
    debounceEmail: _.debounce(function() {
      this.setEmail();
    }, 500),
    validateForm(user) {
      for (let i = 0; i < this.validationFunctions.length; i++) {
        this.validationFunctions[i](user);
      }
      for (let field in this.validation) {
        if (
          this.validation[field].valid === "is-invalid" ||
          this.validation[field].valid === ""
        ) {
          this.isSubmitButtonDisabled = true;
          return;
        }
      }
      this.isSubmitButtonDisabled = false;
    },
    validateUsername(user) {
      if (user.username.length !== 0) {
        if (user.username === this.oldUser.username) {
          this.validation.username.valid = "is-valid";
          return true;
        }
        if (user.username.length >= 3) {
          api.checkUsernameExists(user.username).then(response => {
            if (response) {
              this.validation.username.valid = "is-invalid";
              this.validation.username.error =
                "Użytkownik o podanej nazwie już istnieje!";
              return false;
            } else {
              this.validation.username.valid = "is-valid";
              return true;
            }
          });
        } else {
          this.validation.username.valid = "is-invalid";
          this.validation.username.error =
            "Nazwa użytkownika musi się składać z conajmniej 3 znaków!";
          return false;
        }
      } else {
        this.validation.username.valid = "";
        return false;
      }
    },
    validateEmail(user) {
      if (user.email.length !== 0) {
        if (user.email === this.oldUser.email) {
          this.validation.email.valid = "is-valid";
          return true;
        }
        if (this.emailRegex.test(user.email)) {
          api.checkEmailExists(user.email).then(response => {
            if (response) {
              this.validation.email.valid = "is-invalid";
              this.validation.email.error = "Podany email już istnieje!";
              return false;
            } else {
              this.validation.email.valid = "is-valid";
              return true;
            }
          });
        } else {
          this.validation.email.valid = "is-invalid";
          this.validation.email.error = "Nieprawidłowy format adresu email!";
          return false;
        }
      } else {
        this.validation.email.valid = "";
        return false;
      }
    }
  },
  watch: {
    user: {
      handler(user) {
        this.validateForm(user);
      },
      deep: true
    }
  }
};
</script>
<style scoped>
thead th {
  font-size: 18px;
  vertical-align: middle;
}
thead td {
  vertical-align: middle;
}
</style>