<template>
<div>
    <b-button @click="$refs['modal-new'].toggle()">Add new Employee</b-button>
    <b-modal ref="modal-new" hide-footer title="Add Employee">
        <b-form @submit.prevent="addEntry" v-if="!modalLoading && !cbMessage">
            <b-form-group
                id="input-group-1"
                label="Employee Name:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                type="text"
                v-model="newEntry.employee_name"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Employee Salary:"
                label-for="input-2"
            >
                <b-form-input
                id="input-2"
                type="number"
                v-model="newEntry.employee_salary"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="Employee Age:"
                label-for="input-3"
            >
                <b-form-input
                id="input-3"
                type="number"
                v-model="newEntry.employee_age"
                ></b-form-input>
            </b-form-group>
            <b-button variant="outline-success" size="sm" type="submit">Save</b-button>
            <b-button variant="outline-primary" size="sm" @click="this.$refs['modal-new'].hide()">Cancel</b-button>
        </b-form>
        <div class="d-block text-center text-danger my-2" v-else-if="modalLoading && !cbMessage">
            <b-spinner class="align-middle"></b-spinner>
        </div>
        <div class="text-center" v-else>
            <h3>{{cbMessage}}</h3>
        </div>
    </b-modal>
</div>
</template>
<script>
export default {
    data() {
        return {
            newEntry: {
                employee_name: '',
                employee_salary: null,
                employee_age: null
            },
            cbMessage: false,
            modalLoading: false
        }
    },
    methods: {
        addEntry() {
            this.modalLoading = true
            let updateData = {
				'name': this.newEntry.employee_name,
				'salary': this.newEntry.employee_salary.toString(),
				'age': this.newEntry.employee_age.toString(),
			}
            this.$axios( {
                method: 'post',
                url: process.env.apiWpUrl + 'create',
                data: updateData
            })
            .then((res) => {
                this.cbMessage = res.data;
                this.modalLoading = false;
                this.$store.dispatch('getUserList');
                setTimeout(() => {
                    this.$refs['modal-new'].hide()
                    return this.cbMessage = false
                }, 3000);
            }).catch((err) => {
                console.log(err)
                this.modalLoading = false;
            })
        }
    }
}
</script>