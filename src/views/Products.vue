<template>
    <div class="products">
        <div class="container">
              
               <div class="row">
                    <div class="col-md-7">
                        <h2 class="product-head mb-4 pl-4 d-inline-block">product</h2>
                        <button class="btn btn-primary float-right" @click="addNew()">Add Product</button>
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
                                <tr v-for="(product,index) in productData " :key="product.id" >
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{product.data().name}}</td>
                                    <td>{{product.data().price}}</td>
                                    <td>
                                        <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
                                        <a href="" @click.prevent="deleteProduct(product.id)" class="btn btn-danger">Delete</a>
                                    </td>
                                </tr>               
                            </tbody>
                        </table>
                    </div>
               </div>
        </div>

        <!--  -->
                <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">EDIT PRODUCT</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           <div class="row">
                               <div class="col-md-7">
                                   <div class="form-group">
                                        <label for="name">Product Name</label>
                                        <input type="text" class="form-control" v-model="products.name"  id="name" aria-describedby="name" >
                                    </div>
                                    <div class="form-group">
                                        <label for="price">Product Description</label>
                                        <textarea class="form-control" id="description" rows="3"></textarea>
                                    </div>
                               </div>
                               <div class="col-md-5">
                                    <div class="form-group">
                                        <label for="name">Product Price</label>
                                        <input type="text" class="form-control" v-model="products.name"  id="name" aria-describedby="name" >
                                    </div>
                                    <label class="form-group">
                                        <label for="price">Price</label>
                                        <input type="text" v-model="products.price" class="form-control" id="price" >
                                    </div>
                               </div>
                           </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" @click="updateProduct()" class="btn btn-primary">Save changes</button>
                        </div>
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
                    },
                    activeItem:null
            }
        },
        created(){

                    this.getData()
        },
        methods: {
                    addNew(){

                            $('#ProductModal').modal('show')
                    },
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
                                            // console.log(doc.data().name)
                                            this.productData.push(doc)
                                        })
                            })
                    },
                    deleteProduct(id){

                            if(confirm('Are you sure you want to delete this record?'))
                            {
                                db.collection('products').doc(id).delete()
                                    .then(()=>{
                                
                                    })
                                    .catch()
                            }
                            else
                            {

                            }
                    },
                    editProduct(product){

                                $('#editModal').modal('show')
                                this.products = product.data()
                                this.activeItem = product.id
                    },
                      myWatcher(){

                            db.collection('products').onSnapshot(querySnapshot=>{
                                    this.productData = []
                                    querySnapshot.forEach(doc=>{
                                        this.productData.push(doc)
                                    })
                            })
                    },
                    updateProduct(){

                            db.collection('products').doc(this.activeItem).update(this.products)
                                .then(()=>{

                                    $('#editModal').modal('hide')
                                    this.myWatcher()
                                })
                                .catch()

                    }
                  

        }
    }
</script>

<style lang="scss" scoped>
    .product-head{

            text-transform: uppercase;
    }
</style>