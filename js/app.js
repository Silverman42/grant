var body = document.querySelector('body');
var vm = new Vue({
    el: '#app',
    data:{
        /**
         * navIsOpen
         * @description: Toggled state of the navbar
         */
        navIsOpen: false,

        /**
         * capData
         * @description: List of cap Data
         */
        capData: caps,

        
        /**
         * capMeasurement
         * @description: List of cap Data
         */
        capMeasurement: capMeasurement,

        /**
         * modalIsOpen
         * @description: Toggled state of the modal
         */
        modalIsOpen: false,

        /**
         * videoInfo
         * @description: Information about the video to be inserted in the modal
         */
        videoInfo: {},

        /**
         * selectedCap
         * @description: Currently selected cap from inventory to be used in inventory modal
         */
        selectedCap: {},

        /**
         * selectedCapMeasurement
         * @description: Measurement type Currently selected cap from inventory to be used in inventory modal
         */
        modalCapMeasurement: 'cm'
    },
    methods:{
        /**
         * HideNavLink
         * @description: This Method hides the navbar in mobile view
         */
        HideNavLink(){
            body.classList.remove('hide-overflow')
            this.navIsOpen = false;
        },

        /**
         * ShowVideo
         * @description: This Method shows the navbar in mobile view
         */
        ShowNavLink(){
            body.classList.add('hide-overflow')
            this.navIsOpen = true;
        },

        /**
         * CloseModal
         * @description: This Method closes a modal
         */
        CloseModal(){
            body.classList.remove('hide-overflow')
            this.modalIsOpen = false
        },

        /**
         * OpenModal
         * @description: This Method opens a modal
         */
        OpenModal(){
            body.classList.add('hide-overflow')
            this.modalIsOpen = true
        },

        /**
         * ShowVideo
         * @description: This Method inserts the video link in the modal before displaying it in the modal
         */
        ShowVideo(videoLink = null, videoTitle = null){
            var videoInfo = {
                vLink: videoLink,
                vTitle: videoTitle
            }
            this.videoInfo = videoInfo
            this.OpenModal();
        },

        /**
         * ShowCapData
         * @description: Opens a modal and shows the data for the clicked cap
         * @param {Object} cap
         */
        ShowCapData(cap){
            this.OpenModal();
            this.selectedCap = cap
        },

        /**
         * MakeObserver
         * @description: Uses the class name of the entry element to apply the observer
         * @param {String} addedClass (New html class to be added to the observed element)
         */
        MakeObserver(addedClass){
            //Check if observer API is available on Browser
            if("IntersectionObserver" in window){
                //return new instance of observer API
                return (new IntersectionObserver((entries,observer) => {

                    entries.forEach(entry =>{
                        if(entry.isIntersecting){
                            //Element to be observed
                            var target = entry.target
                            target.classList.add(addedClass)
                            observer.unobserve(target);
                        }
                    })
                })) ;
            }
        },
        /**
         * ObserveElement
         * @description: Trigger Observer API to observe the element
         * @param {String} observedElementClass (Element to be observed)
         * @param  {String} addedClass (Classes to be added after the element has been observed)
         */
        ObserveElement(observedElementClass, addedClass){
            var elementObserver = this.MakeObserver(addedClass)
            var elements = Array.from(document.querySelectorAll(observedElementClass))
            elements.forEach(function (element) {  
                elementObserver.observe(element)
            })
        },
        /**
         * SwitchModalMeasurement
         * @description: Switch the measurement type of the cap in the modal
         * @param {String} measurementType (measurement of cap in the modal)
         */
        SwitchModalMeasurement(measurement){
            this.modalCapMeasurement = measurement
        },
    },
    mounted(){
        vm = this; //Vue instance
        document.addEventListener("DOMContentLoaded",function () {  
            vm.ObserveElement('.hide-slideUp','slideUp')
            vm.ObserveElement('.hide-slideInLeft','slideInLeft')
            vm.ObserveElement('.hide-slideInRight','slideInRight')
        })
    }

})