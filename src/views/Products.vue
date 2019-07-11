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
                                <tr v-for="product in dbproducts" :key="product.id">
                                    <th scope="row"></th>
                                    <td>{{product.name}}</td>
                                    <td>{{product.price}}</td>
                                    <td>
                                        <button @click="editProduct()" class="btn btn-primary">Edit</button>
                                        <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
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
                                        <input type="text" class="form-control" v-model="product.name"  id="name" aria-describedby="name" >
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Product Description</label>
                                        <textarea class="form-control" v-model="product.description" id="description" rows="3"></textarea>
                                    </div>
                               </div>
                               <div class="col-md-5">
                                    <div class="form-group">
                                        <label for="name">Product Price</label>
                                        <input type="text" class="form-control" v-model="product.price"  id="price" aria-describedby="price" >
                                    </div>
                                    <div class="form-group">
                                        <label for="price">Price Tags</label>
                                        <input type="text" v-model="product.tags" class="form-control" id="tags" >
                                    </div>
                                      <div class="form-group">
                                        <label for="product_image">Product Image</label>
                                        <input type="file" class="form-control-file" id="product_image">
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" @click="addProduct()" class="btn btn-primary">Save changes</button>
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
                    
                    products:[],
                    product:{

                            name:null,
                            description:null,
                            price:null,
                            tags:null,
                            image:null
                    },
                    activeItem:null
            }
        },
        created(){

        },
         firestore(){

                return {

                        dbproducts: db.collection('products'),
                }
        },
        methods: {
                    addNew(){

                            $('#ProductModal').modal('show')
                    },
                    addProduct(){

                            // this.$firestore.products.add({
                            //         name: this.products.name,
                            //         description: this.products.description,
                            // })
                            this.$firestore.dbproducts.add(this.product)
                            Toast.fire({
                                type: 'success',
                                title: 'Record added successfully'
                            })
                            $('#ProductModal').modal('hide');


                    },
                    getData(){

                        
                    },
                    deleteProduct(product){

                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                            if (result.value)
                            {

                                this.$firestore.dbproducts.doc(product['.key']).delete()

                                Swal.fire(
                                'Deleted!',
                                'Your record has been deleted.',
                                'success'
                                )
                            }

                        })

                    },
                    editProduct(product){

                             
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

                           
                    }
                  

        }
    }
</script>

<style lang="scss" scoped>
    .product-head{

            text-transform: uppercase;
    }
</style>