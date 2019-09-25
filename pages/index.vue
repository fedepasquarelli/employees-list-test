<template>
	<div>
		<b-jumbotron header="Employees" lead="List of employees, edit button and profile detail">
			<p>by Federico Pasquarelli</p>
		</b-jumbotron>
		<b-container fluid>
			<b-row>
				<b-col>
					<b-table striped outlined :busy="loading" :items="users" :fields="fields">
						<template v-slot:cell(actions)="data">
							<button variant="outline-success" size="sm" @click="openEditModal(data.item.id)">Edit</button>
						</template>
						<template v-slot:table-busy>
							<div class="text-center text-danger my-2">
								<b-spinner class="align-middle"></b-spinner>
							</div>
						</template>
					</b-table>
					<b-modal ref="modal-edit" hide-footer title="Edit Employee">
						<b-form v-if="!modalLoading && entryEdit" @submit.prevent="updateEntry(entryEdit.id)">
							<b-form-group
								id="input-group-1"
								label="Employee Name:"
								label-for="input-1"
							>
								<b-form-input
								id="input-1"
								type="text"
								:v-model="entryEdit.employee_name"
								></b-form-input>
							</b-form-group>
							<b-form-group
								id="input-group-2"
								label="Employee Name:"
								label-for="input-2"
							>
							<b-form-input
								id="input-2"
								type="number"
								:v-model="entryEdit.employee_salary"
								></b-form-input>
							</b-form-group>
							<b-form-group
								id="input-group-3"
								label="Employee Age:"
								label-for="input-2"
							>
								<b-form-input
								id="input-3"
								type="number"
								:v-model="entryEdit.employee_age"
								></b-form-input>
							</b-form-group>
							<b-button variant="outline-success" size="sm" type="submit">Save</b-button>
							<b-button variant="outline-danger" size="sm" @click="hideModal">Cancel</b-button>
						</b-form>
						<div class="d-block text-center text-danger my-2" v-else>
							<b-spinner class="align-middle"></b-spinner>
						</div>
					</b-modal>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>

export default {
	data() {
		return {
			fields: ['id', 'employee_name', 'employee_age', 'employee_salary', 'actions'],
			entryEdit: null,
			modalLoading: false
		}
	},
	methods: {
		async openEditModal(id) {
			this.modalLoading = true;
			this.$refs['modal-edit'].show();
			await this.$axios.get(process.env.apiWpUrl + 'employee/' + id)
			.then((res) => {
				this.entryEdit = res.data;
				this.modalLoading = false;
			}).catch((err) => {
				this.modalLoading = false;
			})
		},
		updateEntry(id) {
			this.modalLoading = true;
			this.$axios({
                method: 'put',
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                url: process.env.apiWpUrl + 'update/' + id,
                data: this.entryEdit
            }).then((res) => {
				console.log(res.data)
				this.modalLoading = false;
			}).catch((err) => {
				this.modalLoading = false;
			})
		},
		hideModal() {
			this.$refs['modal-edit'].hide();
		}
	},



	// server side render version. I used mounted() for performance issues

	// async fetch({store}) {
	// 	await store.dispatch('getUserList');
	// },

	async mounted() {
		await this.$store.dispatch('getUserList');
	},
	computed: {
		users() {
			return this.$store.state.usersList;
		},
		loading() {
			return this.$store.state.loading;
		}
	},
}
</script>