<template>
  <v-layout column justify-center class="login">
    <v-flex>
      <v-img src="/assets/michael_and_carol.jpg" height="100%" class="login-image">
        <v-container fill-height fluid>
          <v-layout
            fill-height
            row
            wrap
            justify-center
            align-center
            align-content-center
          >
            <v-flex xs12 sm8 md6 lg4>
              <v-form v-model="valid" ref="form" class="login-form">
                <v-messages :value="formErrors" color="error" />
                <v-text-field
                  ref="usernameField"
                  v-model="username"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  type="text"
                  :rules="usernameRules"
                  @keyup.enter="login"
                  required
                />
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  @keyup.enter="login"
                  required
                />
                <v-btn :disabled="!valid" @click="login">Login</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data () {
    return {
      formErrors: [],
      password: null,
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      username: null,
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      valid: false
    };
  },
  methods: {
    async login () {
      const { formErrors, password, username, valid } = this;
      const { form, usernameField } = this.$refs;
      if (valid) {
        try {
          const { data: { token } } = await axios.post('/api/token', { password, username });
          window.localStorage.setItem('accessToken', token);
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`
          };
          this.$parent.$parent.$parent.getUser(token);
          this.$router.push({ path: '/' });
        } catch (err) {
          let message;
          if (err.response && err.response.data.code === 'InvalidLogin') {
            message = 'Incorrect username or password';
          } else {
            message = 'Invalid request';
          }
          formErrors.push(message);
          form.reset();
          usernameField.$refs.input.focus();
        }
      } else {
        form.validate();
      }
    }
  }
}
</script>

<style>
.login {
  background-color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
}
.login-image .v-image__image {
  filter: opacity(30%);
}
.login-form {
  display: flex;
  flex-direction: column;
}
</style>