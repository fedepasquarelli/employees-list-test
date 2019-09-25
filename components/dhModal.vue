<template>
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
            <b-button variant="outline-danger" size="sm" @click="hideModal">Cancel</b-button>
        </b-form>
        <div class="d-block text-center text-danger my-2" v-else>
            <b-spinner class="align-middle"></b-spinner>
        </div>
    </b-modal>
</template>