import MyComponent from '../../../../slices/Project';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Project'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":4172,"height":4000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1586952518485-11b180e92764"}}],"primary":{"width":"Full","caption":[{"type":"paragraph","text":"Aute ad excepteur cupidatat labore exercitation est cupidatat. Incididunt cillum elit ut labore deserunt deserunt nulla reprehenderit dolor eu nostrud est.","spans":[]}],"vimeo_link":{"link_type":"Web","url":"https://prismic.io"},"video_preview":{"link_type":"Media","name":"mock","kind":"image","url":"https://source.unsplash.com/random","size":"10kB"}},"id":"_Default","slice_type":"project"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
