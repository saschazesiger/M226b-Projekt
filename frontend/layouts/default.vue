<template>
    <div>
        <h2 class="text-danger">Zeit</h2>
        <p>Home page content goes here.</p>
        <NuxtLink to="/">Home</NuxtLink><br><br>
        <NuxtLink to="/login">Login</NuxtLink>
    </div>
</template>


<slot></slot>

<script setup>

</script>

<style scoped>
    .router-link-exact-active {
        color: red;
    }
</style>