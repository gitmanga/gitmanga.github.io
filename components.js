Vue.component('viewport', {
    props: ['data', 'cur', 'mode'],
    template: 
        `<div class="viewport filled">
          <template v-if="mode=='twoside'">
            <template v-if="data.twoside[cur] instanceof Array">
              <div class="twoside page-left" >
                <img :src=data.twoside[cur][1]>
              </div>
              <div class="twoside page-right">
                <img :src=data.twoside[cur][0]>
              </div>
            </template>
            <template v-else>
              <div class="oneside">
                <img :src=data.twoside[cur]>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="oneside">
              <img :src=data.oneside[cur]>
            </div>
          </template>
        </div>`
})
