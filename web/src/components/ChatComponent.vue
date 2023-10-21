<template>
    <div class="container">
        <div class="row clearfix">
            <div class="col-lg-12">
                <div class="card chat-app">
                    <div class="chat">
                        <div class="chat-header clearfix">
                            <div class="row">
                                <div class="col-lg-6">
                                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar">
                                    </a>
 
                                    <div class="chat-about">
                                        <!-- receiver name goes here -->
                                    </div>
                                </div>
 
                                <div class="col-lg-6 hidden-sm text-right text-white">
                                    <!-- attachment goes here -->
                                </div>
                            </div>
                        </div>
 
                        <div class="chat-history">
                            <ul class="m-b-0">
                                <!-- all messages gone here -->
                            </ul>
                        </div>
 
                        <div class="chat-message clearfix">
                            <div class="input-group mb-0">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Enter text here..." />
                                    <button class="btn btn-primary" type="button">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
 
    import "../../public/assets/css/chat.css"
    import axios from "axios"
    import swal from "sweetalert2"
 
    export default {
        data() {
            return {
                email: this.$route.params.email,
            }
        }
    }
</script>