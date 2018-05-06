Vue.component('viewport', {
    props: ['id', 'images'],
    template: 
        `<div class="viewport filled" v-bind:id=id>
          <template v-if="images.length == 2">
            <div class="twoside page-left" >
              <img v-bind:src=images[1]>
            </div>
            <div class="twoside page-right">
              <img v-bind:src=images[0]>
            </div>
          </template>
          <template v-else>
            <div class="oneside">
            <img v-bind:src=images[0]>
            </div>
          </template>
        </div>`
})
