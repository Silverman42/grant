
 Vue.component('modal',{
    template: `<div v-if="isOpen">
    <!--Begin Modal-->
    <div @click="CloseModal" class="modal-background">
    </div>
    <div class="modal-container revealUp">
        <div class="modal-header">
            <div class="modal-descr">
                <slot name="description"/>
            </div>
            <div class="modal-close">
                <a href="#" @click.prevent="CloseModal">
                    <i class="fas fa-times"></i>
                </a>
            </div>
        </div>
        <slot name="body"/>
    </div>
    <!--End Modal-->
    </div>`,
    props:{
        isOpen:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        CloseModal(){
            return this.$emit('close-modal')
        }
    
    }
}
)