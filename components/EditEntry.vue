<template>
    <b-button @click="editEntry">Edit</b-button>
</template>
<script>
export default {
    props: {
        EntryId: {
            required: true,
            type: Boolean/Number,
        }
    },
    methods: {
        editEntry() {
            
        }
    }
}
</script>