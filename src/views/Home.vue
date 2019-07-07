<template>
  <div>
      <Navbar />
      <h1>I am HOME</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components:{

    Navbar
  }

};
</script>
