<template>
    <li>
        <p>{{ feeding.user.name}}</p>
        <p>{{ feeding.hour }}</p>
    </li>
</template>


<script>
export default {
    props: {
        feeding: Object
    },

      
}

</script>