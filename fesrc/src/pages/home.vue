<style scoped lang="scss">
</style>

<template>
    <div>
        <Header :bread-msg="breadMsg"></Header>
        home
    </div>
</template>
<script>
import Header from './../components/header.vue'
export default {
    components: {
        Header,
    },
    data() {
        return {
            breadMsg: [
                {name: '首页', route: '/home'}
            ]
        }
    }
}
</script>
