var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
    },

    methods: {
        ToggleUI: function() {
            this.is_show_ui = !this.is_show_ui
        }
    }
})