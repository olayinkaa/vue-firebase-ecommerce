<template>
    <div class="products">
        <div class="container">
                <h2 class="product-head mb-4 pl-4">product</h2>
               <div class="row pl-4">
                   <div class="col-md-6">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="products.name"  id="name" aria-describedby="name" >
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input type="text" v-model="products.price" class="form-control" id="price" >
                        </div>
                        <button type="submit" @click.prevent="saveData" class="btn btn-primary">Submit</button>
                    </div>
               </div>
        </div>
    </div>
</template>

<script>
    import {fb,db} from '../firebase.js'
    export default {
        name: 'products',
        data(){
            return{
                
                    products:{

                            name:null,
                            price:null
                    }
            }
        },
        methods: {
                    saveData(){

                            db.collection('products').add(this.products)
                                .then((docRef)=>{

                                    console.log(docRef)
                                    this.reset()
                                })
                                .catch(err=>{

                                    console.log(err)
                                })
                    },
                    reset(){

                        Object.assign(this.$data,this.$options.data.apply(this))
                    }

        }
    }
</script>

<style lang="scss" scoped>
    .product-head{

            text-transform: uppercase;
    }
</style>