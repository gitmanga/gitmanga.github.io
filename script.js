var vm = new Vue({
    el: '#main',

    data: {
        is_show_ui: true,
    },

    methods: {
        toggle_ui: function() {
            this.is_show_ui = !this.is_show_ui
        }
    }
})