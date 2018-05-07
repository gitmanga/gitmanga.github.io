var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
        mode: 'twoside',
        viewport: 'viewport0',
        meta: {},
        toc: [],
        data: {
            oneside: [
            ],
            twoside: [
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
        UpdateMode(this)
        
        window.addEventListener('resize', function() {
            UpdateMode(vm)
        })

        LoadManga(this)
    },
})

function UpdateMode(vm) {
    var old_mode = vm.mode
    vm.mode = window.innerWidth > window.innerHeight ? 'twoside' : 'oneside'
    if (old_mode == 'twoside' && vm.mode == 'oneside') {
        var tmp = vm.cur * 2
        vm.cur = tmp ? tmp - 1 : 0
    } else if (old_mode == 'oneside' && vm.mode == 'twoside') {
        vm.cur = parseInt((vm.cur + 1) / 2)
    }
}

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