var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
        is_twoside: true,
        is_single_page: false,
        is_viewport0: true,
        viewport0_images: ['../gitmanga-mojyo-base/Vol.001/000.jpg'],
        viewport1_images: [
            '../gitmanga-mojyo-base/Vol.001/001.png',
            '../gitmanga-mojyo-base/Vol.001/002.png',
        ],
        pages: [
            '../gitmanga-mojyo-base/Vol.001/000.png',
            '../gitmanga-mojyo-base/Vol.001/001.png',
            '../gitmanga-mojyo-base/Vol.001/002.png',
            '../gitmanga-mojyo-base/Vol.001/003.png',
            '../gitmanga-mojyo-base/Vol.001/004.png',
            '../gitmanga-mojyo-base/Vol.001/005.png',
        ],
        cur: 0,
    },

    methods: {
        ToggleUI: function() {
            this.is_show_ui = !this.is_show_ui
        },

        ToggleFullScreen: function() {
            if (IsFullScreen()){
                CancelFullScreen()
            } else {
                RequestFullScreen(this.$el)
            }
        },

        NextPage: function() {
            if (this.is_viewport0) {
                if (this.viewport1_images.length) {
                    this.is_viewport0 = false
                }
            } else {
                if (this.is_twoside) {
                    this.viewport0_images = [null, null]
                } else {
                    this.viewport0_images = [null]
                }

                this.is_viewport0 = true

                if (this.is_twoside) {
                    this.viewport1_images = [null, null]
                } else {
                    this.viewport1_images = [null]
                }
            }
        }
    },

    mounted: function() {
        this.is_twoside = !(this.cur==0 && this.is_viewport0) && window.innerWidth > window.innerHeight
        
        window.addEventListener('resize', function() {
            vm.is_twoside = !(vm.cur==0 && vm.is_viewport0) && window.innerWidth > window.innerHeight
        })
    },
})

function RequestFullScreen(el) {
    var reqeust = el.requestFullscreen
        || el.msRequestFullscreen
        || el.mozRequestFullScreen 
        || el.webkitRequestFullScreen

    return reqeust ? (reqeust.call(el), true) : false
}

function CancelFullScreen() {
    var cancel = document.exitFullscreen
        || document.msExitFullScreen
        || document.mozCancelFullScreen
        || document.webkitCancelFullScreen

    return cancel ? (cancel.call(document), true) : null
}

function IsFullScreen() {
    return document.fullscreenElement
        || document.msFullscreenElement
        || document.mozFullScreenElement
        || document.webkitFullscreenElement
}