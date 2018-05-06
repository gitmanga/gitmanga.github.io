Vue.component('viewport', {
    props: ['id', 'data', 'cur', 'mode'],
    template: 
        `<div class="viewport filled" :id=id>
          <template v-if="mode=='twoside' && data.twoside[cur][id] instanceof Array">
            <div class="twoside page-left" >
              <img :src=data.twoside[cur][id][1]>
            </div>
            <div class="twoside page-right">
              <img :src=data.twoside[cur][id][0]>
            </div>
          </template>
          <template v-else>
            <div class="oneside">
              <img :src=data.oneside[cur][id]>
            </div>
          </template>
        </div>`
})
