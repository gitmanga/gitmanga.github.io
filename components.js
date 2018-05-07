Vue.component('viewport', {
    props: ['data', 'cur', 'mode'],
    template: 
        `<div class="viewport filled">
          <template v-if="mode=='twoside'">
            <template v-if="data.twoside[cur][0] instanceof Array">
              <div class="twoside page-left" v-for="item in data.twoside[cur][1]">
                <img :src=Object.keys(item) :style="{ 'mix-blend-mode': Object.values(item) }">
              </div>
              <div class="twoside page-right" v-for="item in data.twoside[cur][0]">
                <img :src=Object.keys(item) :style="{ 'mix-blend-mode': Object.values(item) }">
              </div>
            </template>
            <template v-else>
              <div class="oneside" v-for="item in data.twoside[cur]">
                <img :src=Object.keys(item) :style="{ 'mix-blend-mode': Object.values(item) }">
              </div>
            </template>
          </template>
          <template v-else>
              <div class="oneside" v-for="item in data.oneside[cur]">
                <img :src=Object.keys(item) :style="{ 'mix-blend-mode': Object.values(item) }">
              </div>
          </template>
        </div>`
})
