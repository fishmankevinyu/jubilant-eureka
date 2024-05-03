<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Tone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.tone}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from 'axios';
import Chance from 'chance';
export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers: async function () {
      try {
        var res = await axios.get('http://localhost:3000/user');
        var users = res.data.rows;
        users = await Promise.all(users.map(async (user) => {
          var res = await axios.get('http://localhost:3000/tone');
          user.tone = res.data;
          return user;
        }));
        this.users = users;
      } catch (e) {
        console.log(e);
      }
    },
    generateUser: async function () {
      var chance =  new Chance();
      var name = chance.name();
      var email = chance.email();
      try {
        var res = await axios.post('http://localhost:3000/user', {name: name, email: email} );
      } catch (e) {
        console.log(e);
        setTimeout(async () => {
          try {
            await axios.post('http://localhost:3000/user', {
              name: name,
              email: email
            });
          } catch (e) {
            console.log(e);
          }
        }, 500);
      }
    }
  },
  mounted: function() {
    console.log("Hi!");
    this.getUsers();
    this.generateUser();
  }
}
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
