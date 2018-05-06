var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
        mode: 'twoside',
        viewport: 'viewport0',
        data: {
            oneside: [
                { viewport0: '../gitmanga-mojyo-base/Vol.001/000.jpg', viewport1: '../gitmanga-mojyo-base/Vol.001/001.png' },
                { viewport0: '../gitmanga-mojyo-base/Vol.001/002.png', viewport1: '../gitmanga-mojyo-base/Vol.001/003.png' },
                { viewport0: '../gitmanga-mojyo-base/Vol.001/004.png', viewport1: '../gitmanga-mojyo-base/Vol.001/005.png' },
            ],
            twoside: [
                {
                    viewport0: '../gitmanga-mojyo-base/Vol.001/000.jpg',
                    viewport1: ['../gitmanga-mojyo-base/Vol.001/001.png', '../gitmanga-mojyo-base/Vol.001/002.png'],
                },
                {
                    viewport0: ['../gitmanga-mojyo-base/Vol.001/003.png', '../gitmanga-mojyo-base/Vol.001/004.png'],
                    viewport1: '../gitmanga-mojyo-base/Vol.001/005.png',
                }
            ]
        },
        cur: 0,
        viewport_shift_mode: null,
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
            this.viewport_shift_mode = 'viewport-right-shift-fade'
            if (this.viewport == 'viewport0') {
                this.viewport = 'viewport1'
            } else {
                if (this.data[this.mode].length > this.cur + 1) {
                    this.cur++
                    this.viewport = 'viewport0'
                }
            }
        },

        LastPage: function() {
            this.viewport_shift_mode = 'viewport-left-shift-fade'
            if (this.viewport == 'viewport1') {
                this.viewport = 'viewport0'
            } else {
                if (this.cur > 0) {
                    this.cur--
                    this.viewport = 'viewport1'
                }
            }
        },
    },

    created: function() {
        this.mode = window.innerWidth > window.innerHeight ? 'twoside' : 'oneside'
        
        window.addEventListener('resize', function() {
            vm.mode = window.innerWidth > window.innerHeight ? 'twoside' : 'oneside'
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