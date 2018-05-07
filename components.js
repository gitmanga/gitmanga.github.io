Vue.component('viewport', {
    props: ['data', 'cur', 'mode'],
    template: 
        `<div class="viewport filled">
          <template v-if="mode=='twoside'">
            <template v-if="data.twoside[cur][0] instanceof Array">
              <div class="twoside page-left" >
                <img :src=Object.keys(data.twoside[cur][1][0])>
              </div>
              <div class="twoside page-right">
                <img :src=Object.keys(data.twoside[cur][0][0])>
              </div>
            </template>
            <template v-else>
              <div class="oneside">
                <img :src=Object.keys(data.oneside[cur][0])>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="oneside">
              <img :src=Object.keys(data.oneside[cur][0])>
            </div>
          </template>
        </div>`
})
