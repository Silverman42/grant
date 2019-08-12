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
        selectedCap: {}
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
        }
    }
})