<template>
    <div>Salut ça fonctionne.</div>
    <div>{{this.$route.params.Name}}</div>
    <button class="btn" @click="this.$router.push({name:'home'})">Go Back</button>
</template>

<script>
export default{
    data(){
        return{
            ClientName:"singh"

        }
    }
}
</script>