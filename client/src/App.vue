<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item :style="`height: ${$vuetify.application.top}px;`">
        <v-list-item-avatar>
          <img :src="profileImage">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>The Browns</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text icon v-for="tool of tools" :key="tool.icon" @click="onToolClick(tool)">
        <v-icon>{{ tool.icon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid :style="{ 'max-height': maxHeight }" :pa-0="fullscreen" :class="fullscreen ? 'fill-height' : ''">
        <router-view ref="currentComponent"></router-view>
      </v-container>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'app',
  computed: {
    maxHeight () {
      return this.fullscreen ? `calc(100vh - ${this.$vuetify.application.top}px)` : null;
    }
  },
  created () {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      this.getUser(token);
    }
  },
  data () {
    return {
      drawer: null,
      fullscreen: false,
      name: null,
      profileImage: null,
      items: [
        { title: 'Home', icon: 'dashboard', link: '/' },
        { title: 'History', icon: 'history', link: '/history' },
        { title: 'Writings', icon: 'create', link: '/writings' },
        { title: 'Family Tree', icon: 'nature', link: '/familytree' }
      ],
      tools: []
    };
  },
  watch: {
    '$route': {
      handler: 'setMeta',
      immediate: true
    }
  },
  methods: {
    onToolClick (tool) {
      this.$refs.currentComponent[tool.fn](tool);
    },
    setMeta () {
      const { $route } = this;
      this.fullscreen = !!$route.meta.fullscreen;
      this.tools = $route.meta.tools || [];
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
