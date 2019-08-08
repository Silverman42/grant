var thumbnailLink = 'img/Thumbnails/'

var caps = [
    {
        name: 'Ahaba Traditional Cap',
        thumbnail:  thumbnailLink+'ahaba_traditional.png'
    },
    {
        name: 'Asho Oke (Brown) Cap',
        thumbnail:  thumbnailLink+'asho_oke_brown.png'
    },
    {
        name: 'Lace Traditional Cap',
        thumbnail:  thumbnailLink+'lace_traditional.png'
    },
    {
        name: 'Synthetic Leopard Skin Cap',
        thumbnail:  thumbnailLink+'syn_leopard.png'
    },
    {
        name: 'Olinzele Traditional Cap',
        thumbnail:  thumbnailLink+'olinzele_trad_cap.png'
    },
    {
        name: 'Asho Oke (Green) Cap',
        thumbnail:  thumbnailLink+'asho_oke_green.png'
    }
]
var vm = new Vue({
    el: '#app',
    data:{
        navIsOpen: false,
        capData: caps,
        
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