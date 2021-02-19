<template>
    <button @click="toggleDetails"> Die Fütterer</button>
    
    <hr>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            detailsAreVisible: false
        }
    },
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    }
        
    
}
</script>