<template>
  <v-app>
    <v-navigation-drawer app style="max-width: 80vw;" v-model="drawer">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="profileImage">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text">The Browns</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items v-if="editUrl">
        <v-btn flat icon :to="editUrl">
          <v-icon>create</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height pa-0>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
import EditForm from './components/EditForm';

export default {
  components: {
    EditForm
  },
  name: 'app',
  created () {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      this.getUser(token);
    }
  },
  data () {
    return {
      drawer: null,
      editUrl: null,
      name: null,
      profileImage: null,
      items: [
        { title: 'Home', icon: 'dashboard', link: '/' },
        { title: 'History', icon: 'history', link: '/history' },
        { title: 'Writings', icon: 'create', link: '/writings' },
        { title: 'Family Tree', icon: 'nature', link: '/familytree' }
      ],
    };
  },
  watch: {
    '$route': 'setEditUrl'
  },
  methods: {
    setEditUrl () {
      const { $route } = this;
      this.editUrl = $route.meta.editUrl ? `/edit${$route.path}` : null;
    },
    getUser (token) {
      const info = JSON.parse(atob(token.split('.')[1]));
      this.name = info.name;
      this.profileImage = info.profile_image;
    },
    logout () {
      window.localStorage.removeItem('accessToken');
      this.$router.push({ path: '/login' });
    }
  }
}
</script>

<style lang="scss">
// * {
//   box-sizing: border-box;
// }
// html, body {
//   width: 100%;
//   height: 100%;
//   margin: 0;
//   padding: 0;
// }
#app {
  // width: 100%;
  // height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // position: relative;
  // display: flex;
  // flex-direction: column;
}
// .header {
//   height: 30px;
//   background-color: red;
//   display: flex;
//   .header-side {
//     flex: 1;
//   }
//   .header-left {
//     justify-content: left;
//   }
// }
// .menu {
//   position: absolute;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   .menu-content {
//     width: 80vw;
//     max-width: 320px;
//     background-color: white;
//   }
//   .menu-mask {
//     flex: 1;
//     background-color: black;
//     opacity: 0.5;
//   }
// }
// .menu-left {
//   right: 100%;
//   &.active {
//     right: 0;
//   }
// }
// .main {
//   flex: 1;
// }
</style>
