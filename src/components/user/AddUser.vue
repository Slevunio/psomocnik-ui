<template>
  <div>
    <div class="container-fluid" style="margin-top:50px;">
      <div class="col-12 text-center">
        <h1 class="display-3">Dodaj użytkownika</h1>
      </div>
      <div class="container">
        <form id="user" @submit.prevent="createUser()">
          <div class="col-5">
            <input-text
              type="text"
              name="username"
              label="Nazwa użytkownika"
              placeholder="Wprowadź nazwę użytkownika"
              :valid="validation.username.valid"
              :error="validation.username.error"
              @input="debounceUsername"              
              v-model="usernameBuffer"
            ></input-text>
            <input-text
              type="email"
              name="email"
              label="Email"
              placeholder="Wprowadź adres email"
              @input="debounceEmail"
              v-model="user.email"
              :valid="validation.email.valid"
              :error="validation.email.error"
            ></input-text>
            <input-dropdown
              label="Rola użytkownika"
              :values="roles"
              v-model="user.role"
              :valid="validation.role"
            ></input-dropdown>
            <input-text
              type="password"
              name="password"
              label="Hasło"
              placeholder="Wprowadź hasło"
              v-model="user.password"
              :valid="validation.password"
            ></input-text>
            <input-text
              type="password"
              name="confirmPassword"
              label="Potwierdź hasło"
              placeholder="Wprowadź ponownie hasło"
              v-model="user.confirmPassword"
              :valid="validation.confirmPassword"
            ></input-text>
          </div>
          <div class="col text-center">
            <button
              type="submit"
              id="submitCreateUser"
              class="btn btn-lg btn-primary"
              :disabled="isSubmitButtonDisabled"
            >Dodaj</button>
          </div>
        </form>
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
  name: "AddUser",
  components: {
    InputText,
    InputDropdown
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
      },
      validation: {
        username: {
            valid: "",
            error: ""
        },
        email: {
            valid: "",
            error: ""
        },
        role: "",
        password: "",
        confirmPassword: ""
      },
      usernameBuffer: "", //for debounce purposes
      emailBuffer: "", //for debounce purposes
      roles: [],
      isSubmitButtonDisabled: true
    };
  },

  mounted() {
    this.readRoles();
  },

  methods: {
    readRoles() {
      api.readRoles().then(response => {
        for (let index in response) {
          this.roles.push(response[index].name);
        }
      });
    },
    createUser() {
      api.createUser(this.user).then(response => {
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
      this.validateUsername(user.username);
      this.validateEmail(user.email);
    },

    validateUsername(username) {
      if (username.length !== 0) {
        if (username.length >= 3) {
          api.checkUsernameExists(username).then(response => {
            if (response) {
              this.validation.username.valid = "is-invalid";
              this.validation.username.error = "Username already exists!";
            } else {
              this.validation.username.valid = "is-valid";
            }
          });
        }
        else{
            this.validation.username.valid = "is-invalid";
            this.validation.username.error = "Username has to be atleast 3 characters long!";
        }
      } else {
        this.validation.username.valid = "";
      }
    },

    validateEmail(email) {
      if (email.length !== 0) {
        if (isEmailFormatValid()) {
          //validateFormat
        } else {
          //format invalid
        }
        //validate
      } else {
        this.validation.email.valid = "";
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
</style>
