var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
        is_twoside: true,
        is_single_page: false,
        is_viewport0: true,
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
    },

    mounted: function() {
        this.is_twoside = !this.is_single_page && window.innerWidth > window.innerHeight
        
        window.addEventListener('resize', function() {
            vm.is_twoside = !vm.is_single_page && window.innerWidth > window.innerHeight
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