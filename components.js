Vue.component('viewport-twoside', {
    props: ['id', 'left', 'right'],
    template: 
        `<div class="viewport filled" v-bind:id=id>
          <div class="twoside page-left">
            <img v-bind:src=left>
          </div>
          <div class="twoside page-right">
            <img v-bind:src=right>
          </div>
        </div>`
})

Vue.component('viewport-oneside', {
    props: ['id', 'image'],
    template: 
        `<div class="viewport filled" v-bind:id=id>
          <div class="oneside">
            <img v-bind:src=image>
          </div>
        </div>`
})
