<template>
    <div class="row">
        <div class="col-md-12">
            <h1 class="text-center text-white">Contacts</h1>
        </div>
    </div>
     
    <div class="row">
        <div class="col-md-12">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
 
                <tbody>
                    <tr v-for="contact in contacts" v-bind:key="contact._id">
                        <td>
                            <span v-text="contact.name"></span>
                        </td>
    <td v-text="contact.email"></td>
</tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
 
<script>
    import axios from "axios"
    import swal from "sweetalert2"
 
    export default {
        data() {
            return {
                contacts: []
            }
        },
 
        methods: {
            getData: async function () {
                const self = this
 
                const response = await axios.post(
                    this.$apiURL + "/contact/fetch",
                    null,
                    {
                        headers: this.$headers
                    }
                )
                console.log(response)
 
                if (response.data.status == "success") {
                    this.contacts = response.data.contacts
                } else {
                    swal.fire("Error", response.data.message, "error");
                }
            }
        },
 
        mounted() {
            this.getData()
        }
    }
</script>