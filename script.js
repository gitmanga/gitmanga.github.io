var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
        mode: 'twoside',
        viewport: 'viewport0',
        data: {
            oneside: [
                [
                    {'../gitmanga-mojyo-base/Vol.001/000.jpg': 'normal'},
                ],
                [
                    {'../gitmanga-mojyo-base/Vol.001/001.png': 'normal'},
                    {'../gitmanga-mojyo-color/Vol.001/001.png': 'multiply'},
                ],
            ],
            twoside: [
                [
                    {'../gitmanga-mojyo-base/Vol.001/000.jpg': 'normal'},
                ],
                [
                    [
                        {'../gitmanga-mojyo-base/Vol.001/001.png': 'normal'},
                        {'../gitmanga-mojyo-color/001.png': 'multiply'},
                    ],
                    [
                        {'../gitmanga-mojyo-base/Vol.001/002.png': 'normal'},
                    ],
                ],
            ]
        },
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
            if (this.data[this.mode].length > this.cur + 1) {
                this.cur++
            }
        },

        LastPage: function() {
            if (this.cur > 0) {
                this.cur--
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