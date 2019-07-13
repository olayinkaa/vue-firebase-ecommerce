<template>
    <div class="products">
        <div class="container">
              
               <div class="row">
                    <div class="col-md-7">
                        <h2 class="product-head mb-4 pl-4 d-inline-block">product</h2>
                        <button class="btn btn-primary float-right" @click="addNew()"
                      
                        >Add Product</button>
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
                                        <button @click="editProduct(product)" class="btn btn-primary mr-2">Edit</button>
                                        <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>               
                            </tbody>
                        </table>
                    </div>
               </div>
        </div>

        <!--  -->
                <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog"
                  data-backdrop="static" data-keyboard="false"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl" role="document">
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
                                        <vue-editor v-model="product.description"></vue-editor>
                                        <!-- <textarea class="form-control" v-model="product.description" id="description" rows="3"></textarea> -->
                                    </div>
                               </div>
                               <div class="col-md-5">
                                    <div class="form-group">
                                        <label for="name">Product Price</label>
                                        <input type="text" class="form-control" v-model="product.price"  id="price" aria-describedby="price" >
                                    </div>
                                    <div class="form-group">
                                        <label for="price">Price Tags</label>
                                        <input type="text" @keyup.188="addTag" v-model="tag" class="form-control" id="tags" >
                                         <div  class="d-flex">
                                        <p v-for="(tag,index) in product.tags" :key="index">
                                            <span class="p-1">{{tag}}</span>
                                        </p>

                                         </div>
                                    </div>
                                      <div class="form-group">
                                        <label for="product_image">Product Image</label>
                                        <input type="file" @change="uploadImage" class="form-control-file" id="product_image">
                                    </div>


                                    <div class="progress" >
                                       <div class="progress-bar bg-sucess" role="progressbar" v-bind:aria-valuenow="this.progress" 
                                         aria-valuemin="0" aria-valuemax="100" :style="{width: this.progress+'%'}">
                                            {{this.progress}}
                                         </div>
                                    </div>
                                    
                                    <div class="form-group d-flex flex-row bd-highlight">
                                        <div class="p-1" v-for="(image, index) in product.images" :key="index" >
                                            <div class="img-wrapp">
                                                <img :src="image" alt="" width="100px">
                                                <span class="delete-img" @click="deleteImage(image,index)">X</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" @click="addProduct()" class="btn btn-primary" v-if="modal =='add' ">Save changes</button>
                            <button type="button" @click="updateProduct()" class="btn btn-primary" v-if="modal=='edit'">Apply changes</button>
                        </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import {fb,db} from '../firebase.js'
    export default {
        name: 'products',
        components:{

                 VueEditor
        },
        data(){
            return{
                    
                    products:[],
                    product:{

                            name:null,
                            description:null,
                            price:null,
                            tags:[],
                            images:[]
                    },
                    activeItem:null,
                    modal:null,
                    tag:null,
                    progress:0,
                    progressShow: false
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
                    addTag(){


                            this.product.tags.push(this.tag)
                            this.tag =""

                    },
                    reset(){

                             this.product = {

                                    name:null,
                                    description:null,
                                    price:null,
                                    tags:[],
                                    images:[]
                            }

                    },
                    addNew(){

                            this.modal = 'add'
                            this.reset()
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
                    uploadImage(e){

                            // console.log(e.target.files[0])
                             if(e.target.files[0]){
                            
                            let file = e.target.files[0];
                        
                            var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
                        
                            let uploadTask  = storageRef.put(file);
                        
                            uploadTask.on('state_changed', (snapshot) => {

                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                this.progress = progress
                                
                            }, (error) => {
                                // Handle unsuccessful uploads
                            }, () => {
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                        this.product.images.push(downloadURL);

                                });

                            });

                        }

                    },
                     deleteImage(img,index){

                        let image = fb.storage().refFromURL(img);

                        this.product.images.splice(index,1);

                        image.delete().then(function() {
                            console.log('image deleted');
                        }).catch(function(error) {
                            // Uh-oh, an error occurred!
                            console.log('an error occurred');
                        });

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

                                this.$firestore.dbproducts.doc(product.id).delete()

                                Swal.fire(
                                'Deleted!',
                                'Your record has been deleted.',
                                'success'
                                )
                            }

                        })

                    },
                    editProduct(product){
                        this.modal = 'edit'
                        this.product = product
                        $('#ProductModal').modal('show')
                        this.activeItem = product.id
                        // this.activeItem = product['.key']
                        // console.log(this.activeItem)

                             
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

                           this.$firestore.dbproducts.doc(this.activeItem).update(this.product)
                           Toast.fire({
                                type: 'success',
                                title: 'Record Updated successfully'
                            })
                            $('#ProductModal').modal('hide');
                    }
                  

        }
    }
</script>

<style lang="scss" scoped>
    .product-head{

            text-transform: uppercase;
    }

    .img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}

</style>