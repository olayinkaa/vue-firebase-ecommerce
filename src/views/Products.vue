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
                    <div class="col-md-7 mt-4">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product,index) in productData " :key="index" >
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{product.name}}</td>
                                    <td>{{product.price}}</td>
                                    <td>
                                        <a href="" class="btn btn-primary">Edit</a>
                                        <a href="" class="btn btn-danger">Delete</a>
                                    </td>
                                </tr>               
                            </tbody>
                        </table>
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
                    
                    productData:[],
                    products:{

                            name:null,
                            price:null
                    }
            }
        },
        created(){

                    this.getData()
        },
        methods: {
                    saveData(){

                            db.collection('products').add(this.products)
                                .then((docRef)=>{

                                    // console.log(docRef)
                                    this.getData()
                                    this.reset()
                                })
                                .catch(err=>{

                                    console.log(err)
                                })
                    },
                    reset(){

                        Object.assign(this.$data,this.$options.data.apply(this))
                    },
                    getData(){

                            db.collection('products').get().then((querySnapshot)=>{

                                        querySnapshot.forEach((doc)=>{
                                            console.log(doc.data().name)
                                            this.productData.push(doc.data())
                                        })
                            })
                    }

        }
    }
</script>

<style lang="scss" scoped>
    .product-head{

            text-transform: uppercase;
    }
</style>