<template>
	<div>
		<b-jumbotron header="Employees" lead="List of employees, edit button and profile detail">
			<p>by Federico Pasquarelli</p>
		</b-jumbotron>
		<b-container fluid>
			<b-row>
				<b-col>
					<new-user></new-user>
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
				</b-col>
			</b-row>
		</b-container>
		<edit-users :show="showEdit" :entry-id="entryEdit" @hideModal="() => {return this.showEdit = false}"></edit-users>
	</div>
</template>

<script>
import editUsers from '~/components/editUsers.vue'
import newUser from '~/components/newUser.vue'

export default {
	data() {
		return {
			fields: ['id', 'employee_name', 'employee_age', 'employee_salary', 'actions'],
			entryEdit: null,
			modalLoading: false,
			showEdit: false
		}
	},
	methods: {
		openEditModal(id) {
			this.entryEdit = id;
			this.showEdit = true;
		},
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
	components: {
		editUsers,
		newUser
	}
}
</script>