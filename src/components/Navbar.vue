<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
              <a class="navbar-brand" href="#">CLeverJAmes</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/about" >About</router-link>
                  </li>
                
                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <button type="button" class="btn btn-outline-secondary ml-3" data-toggle="modal" data-target="#LoginModal">
                  Login
              </button>
              </div>
          </div>
      </nav>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

 
};

</script>


<style >

</style>

