var vm = new Vue({
    el: '#app',
    data:{
        navIsOpen: false
    },
    methods:{
        HideNavLink(){
            this.navIsOpen = false
        },
        ShowNavLink(){
            this.navIsOpen = true
        }
    }
})