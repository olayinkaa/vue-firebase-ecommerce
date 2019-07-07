<template>
  <div>
      <Navbar />
      <h1>I am HOME</h1>
      <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components:{

    Navbar,
    Login
  }

};
</script>
