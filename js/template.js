
 Vue.component('modal',{
    template: `<div v-if="isOpen">
    <!--Begin Modal-->
    <div @click="CloseModal" class="modal-background">
    </div>
    <div class="modal-container slideUp" style="opacity: 0">
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

/**
 * Contact Form Component
 * @description: This is the form for contact
 */
Vue.component('contact-form',{
    template:`
        <form class="contact_form" action="https://formspree.io/snkeze9@gmail.com" method="POST">
        <div class="form-group">
            <label for="client_name">Client Name<sup class="form-required">*</sup></label>
            <input type="text" id="client_name" placeholder="Full Name" name="name" required>
        </div>
        <div class="form-group">
            <label for="client_email">Client Email<sup class="form-required">*</sup></label>
            <input type="text" id="client_email" placeholder="example@email.com" name="email" required>
        </div>
        <div class="form-group">
            <label for="cap_size_type">Cap Size Type<sup class="form-required">*</sup></label>
            <select v-model="capSizeType" name="cap_size_type" id="cap_size_type" required>
                <option value="custom">Custom</option>
                <option value="standard" selected>Standard</option>
            </select>
        </div>
        <div class="form-group" v-if="capSizeIsStandard == true">
            <label for="cap_size">Cap Size<sup class="form-required">*</sup></label>
            <select name="cap_size" id="cap_size" required>
                <option v-for="(measurement, index) in fetchMeasurements" :keys="index" :value="measurement">{{measurement}}</option>
            </select>
        </div>
        <div v-if="capSizeIsStandard == false" class="form-group">
            <label for="cap_size">Cap Size<sup class="form-required">*</sup></label>
            <input type="text" name="cap_size" id="cap_size" placeholder="Custom size" required>
        </div>
        <div class="form-group">
            <label for="cap_measure">Cap Measurement Type<sup class="form-required">*</sup></label>
            <select name="cap_measurement" v-model="measurementType" id="cap_measure" required>
                <option value="inch" selected>Inches</option>
                <option value="cm">Centimeters (cm)</option>
            </select>
        </div>
        <div class="form-group">
            <label for="cap_type">Cap Type<sup class="form-required">*</sup></label>
            <select name="cap_type" id="cap_type" required>
                <option v-for="(cap,index) in caps" :value="cap.name">{{cap.name}}</option>
            </select>
        </div>
        
        <div class="form-group contact_form-desc" >
            <label for="add_info">Additional Information</label>
            <textarea name="cap_desc" id="cap_desc" cols="30" rows="4"></textarea>
        </div>
        <div class="contact_form-submit">
            <button type="submit" class="btn btn-primary contact_form-submit">Send Cap Data</button>
        </div>
    </form>
    `,
    data(){
        return {
            capSizeType: 'standard',
            measurementType:'inch',
            measurements: capMeasurement,
            caps: caps
        }
    },
    computed:{
        capSizeIsStandard(){
            if(this.capSizeType == "standard") return true
            return false
        },

        /**
         * fetchMeasurements
         * @description Check Measurement type of the measurement inputs before fetching them
         */
        fetchMeasurements(){
            if(this.measurementType == 'inch'){
                return this.measurements.map((measurement)=> measurement['inch'])
            }
            return this.measurements.map((measurement)=> measurement['cm'])
        }
    }
})

/**
 * Carousel
 * @description: Image slides
 */
Vue.component('carousel',{
    template:`
    <div :class="containerClass">
        <transition :name="transition" mode="out-in">
            <img v-for="(image,index) in images" :key="index" v-if="currentIndex == index" :class="imageClass" :src="image" style="width:100%; height:auto"/>
        </transition>
        <div v-if="canAutoplay == false" :class="counterContainClass">
            <button :class="decreaseBtnClass" @click="DecrementImage"><</button>
            <button :class="increaseBtnClass" @click="IncrementImage">></button>
        </div>
    </div>
    `,
    props:{
        canAutoplay:{
            type: Boolean,
            default: false
        },
        autoPlayInterval:{
            type: Number,
            default: 6000
        },
        transition:{
            type:String,
            default: ''
        },
        images:{
            type: Array,
            default(){
                return []
            }
        },
        containerClass:{
            type: Array,
            default(){
                return []
            }
        },
        imageClass:{
            type: Array,
            default(){
                return []
            }
        },
        increaseBtnClass:{
            type: Array,
            default(){
                return []
            }
        },
        decreaseBtnClass:{
            type: Array,
            default(){
                return []
            }
        },
        counterContainClass:{
            type: Array,
            default(){
                return []
            }
        },
    },
    data(){
        return {
            /**
             * currentIndex
             * @description index of the active image
             */
            currentIndex: 0,
        }
    },
    computed:{
        lastImageIndex(){
            return this.images.length - 1
        }
    },
    methods:{
        /**
         * IncrementImage
         * @description: Change to the carousel image with higher index
         */
        IncrementImage(){
            if(this.currentIndex == this.lastImageIndex){
                return this.currentIndex = 0 
            }
            return this.currentIndex = this.currentIndex + 1
        },
        /**
         * DecrementImage
         * @description: Change to the carousel image with lower index
         */
        DecrementImage(){
            if(this.currentIndex == 0){
                return this.currentIndex = this.lastImageIndex
            }
            return this.currentIndex = this.currentIndex - 1
        },
        /**
         * Autoplay
         * @description: Autoplay slides
         */
        Autoplay(){
            var vm = this
            if(this.canAutoplay){
                var hidden
                var visibilityChange
                if(typeof document.hidden !== "undefined"){
                    hidden = "hidden"
                    visibilityChange = "visibilitychange"
                }
                else if(typeof document.msHidden !== "undefined"){
                    hidden = "msHidden"
                    visibilityChange = "msvisibilitychange"
                }
                else if(typeof document.webkitHidden !== "undefined"){
                    hidden = "webkitHidden"
                    visibilityChange = "webkitvisibilitychange"
                }
                var startAutoplay = setInterval(vm.IncrementImage, vm.autoPlayInterval)

                window.addEventListener(visibilityChange,function () {
                    if(document[hidden]) {
                        console.log('hidden')
                        return clearInterval(startAutoplay)
                    } 
                    console.log('shown')
                    return startAutoplay = setInterval(vm.IncrementImage, vm.autoPlayInterval)
                })
            }
        }

    },
    mounted(){
        this.Autoplay()
    }

})