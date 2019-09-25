<template>
    <b-modal ref="modal-edit" hide-footer title="Edit Employee">
        <b-form v-if="!modalLoading && entryEdit && !cbMessage" @submit.prevent="updateEntry(entryEdit.id)">
            <b-form-group
                id="input-group-1"
                label="Employee Name:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                type="text"
                v-model="entryEdit.employee_name"
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
                v-model="entryEdit.employee_salary"
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
                v-model="entryEdit.employee_age"
                ></b-form-input>
            </b-form-group>
            <b-button variant="outline-success" size="sm" type="submit">Save</b-button>
            <b-button variant="outline-danger" size="sm" @click="deleteEntry()">Delete</b-button>
            <b-button variant="outline-primary" size="sm" @click="$emit('hideModal')">Cancel</b-button>
        </b-form>
        <div class="d-block text-center text-primary my-2" v-else-if="modalLoading && !cbMessage">
            <b-spinner class="align-middle"></b-spinner>
        </div>
        <div class="text-center" v-else>
            <h3>{{cbMessage}}</h3>
            <b-button variant="outline-primary" size="sm" @click="$emit('hideModal')">Cancel</b-button>
        </div>
    </b-modal>
</template>
<script>
export default {
    data() {
        return {
            entryEdit: false,
            modalLoading: true,
            cbMessage: false,
        }
    },
    methods: {
        getEntry() {
            this.modalLoading = true
            this.$axios.get(process.env.apiWpUrl + 'employee/' + this.entryId)
            .then((res) => {
                this.entryEdit = res.data;
                this.modalLoading = false;
            }).catch((err) => {
                console.log(err)
                this.modalLoading = false;
            })
        },

        updateEntry(id) {
			this.modalLoading = true;
			let updateData = {
				'name': this.entryEdit.employee_name,
				'salary': this.entryEdit.employee_salary.toString(),
				'age': this.entryEdit.employee_age.toString(),
			}
			this.$axios({
                method: 'put',
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                url: process.env.apiWpUrl + 'update/' + id,
                data: updateData
            }).then((res) => {
                console.log(res.data)
                this.cbMessage = res.data;
                this.modalLoading = false;
                this.$store.dispatch('getUserList');
                setTimeout(() => {
                    return this.$emit('hideModal')
                }, 3000);
			}).catch((err) => {
				this.modalLoading = false;
			})
        },
        
        deleteEntry(id) {
			this.modalLoading = true;
			this.$axios({
                method: 'delete',
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                url: process.env.apiWpUrl + 'delete/' + id,
            }).then((res) => {
				this.cbMessage = res.data;
                this.modalLoading = false;
                this.$store.dispatch('getUserList');
                setTimeout(() => {
                    this.$refs['modal-edit'].hide()
                    return this.$emit('hideModal')
                }, 3000);
			}).catch((err) => {
				console.log(err)
				this.modalLoading = false;
			})
		},
    },
    props: {
        entryId: {
            type: Number/Boolean
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
    },
    watch: {
        show(val) {
            this.cbMessage = false
            if (val) {
                this.$refs['modal-edit'].show()
                this.getEntry();
            } else {
                this.$refs['modal-edit'].hide()
                this.entryEdit = false
            }
        }
    }
}
</script>