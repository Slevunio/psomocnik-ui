<template>
  <div class="container" style="margin-top:50px;" id="registration">
    <h1 class="display-5 text-center text-dark">Rejestracja</h1>
    <br />
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
        v-model="emailBuffer"
        :valid="validation.email.valid"
        :error="validation.email.error"
      ></input-text>
      <input-text
        type="password"
        name="password"
        label="Hasło"
        placeholder="Wprowadź hasło"
        @input="debouncePassword"
        v-model="passwordBuffer"
        :valid="validation.password.valid"
        :error="validation.password.error"
      ></input-text>
      <input-text
        type="password"
        name="confirmPassword"
        label="Potwierdź hasło"
        placeholder="Wprowadź ponownie hasło"
        v-model="confirmPasswordBuffer"
        @input="debounceConfirmPassword"
        :valid="validation.confirmPassword.valid"
        :error="validation.confirmPassword.error"
      ></input-text>
    </div>
    <div class="col text-center">
      <button
        type="submit"
        id="submitRegisterUser"
        class="btn btn-lg btn-primary"
        :disabled="isSubmitButtonDisabled"
        @click="register()"
      >Dodaj</button>
    </div>
  </div>
</template>

<script>
import api from "../backend-api";
import InputText from "../customTags/InputText";

export default {
  name: "Register",
  components: {
    InputText
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
        password: {
          valid: "",
          error: ""
        },
        confirmPassword: {
          valid: "",
          error: ""
        }
      },
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      usernameBuffer: "", //for debounce purposes
      emailBuffer: "", //for debounce purposes
      passwordBuffer: "",
      confirmPasswordBuffer: "", //for debounce purposes
      isSubmitButtonDisabled: true,
      validationFunctions:[
        this.validateUsername,
        this.validateEmail,
        this.validatePassword,
        this.validateConfirmPassword
      ]
    };
  },
  mounted() {
    this.readRole();
  },
  methods: {
    readRole() {
      api.readRole("USER").then(response => {
        this.user.role = response;
      });
    },
    register() {
      this.$delete(this.user, "confirmPassword");
      api.registerUser(this.user).then(response => {
        document.location.replace("/login");
      });
    },
    setUsername() {
      this.user.username = this.usernameBuffer;
    },
    setEmail() {
      this.user.email = this.emailBuffer;
    },
    setRole(val) {
      for (let index in this.roles.roles) {
        if (this.roles.roles[index].name === val) {
          this.user.role = this.roles.roles[index];
        }
      }
    },
    setPassword() {
      this.user.password = this.passwordBuffer;
    },
    setConfirmPassword() {
      this.user.confirmPassword = this.confirmPasswordBuffer;
    },
    debounceUsername: _.debounce(function() {
      this.setUsername();
    }, 500),
    debounceEmail: _.debounce(function() {
      this.setEmail();
    }, 500),
    debouncePassword: _.debounce(function() {
      this.setPassword();
    }, 500),
    debounceConfirmPassword: _.debounce(function() {
      this.setConfirmPassword();
    }, 500),

    validateForm(user) {
      for(let i = 0; i < this.validationFunctions.length; i++){
        this.validationFunctions[i](user);
      }
      for(let field in this.validation){
        if(this.validation[field].valid === 'is-invalid' || this.validation[field].valid === ''){          
          this.isSubmitButtonDisabled = true;
          return;
        }
      }
      this.isSubmitButtonDisabled = false;     
    },

    validateUsername(user) {
      if (user.username.length !== 0) {
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
    },

    validatePassword(user) {
      if (user.password.length !== 0) {
        if (user.password.length < 8) {
          this.validation.password.valid = "is-invalid";
          this.validation.password.error =
            "Hasło musi się składać z conajmniej 8 znaków!";
          return false;
        } else {
          this.validation.password.valid = "is-valid";
          return true;
        }
      } else {
        this.validation.password.valid = "";
        return false;
      }
    },

    validateConfirmPassword(user) {
      if (user.confirmPassword.length !== 0) {
        if (user.confirmPassword !== this.user.password) {
          this.validation.confirmPassword.valid = "is-invalid";
          this.validation.confirmPassword.error = "Hasła muszą być takie same!";
          return false;
        } else {
          this.validation.confirmPassword.valid = "is-valid";
          return true;
        }
      } else {
        this.validation.confirmPassword.valid = "";
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