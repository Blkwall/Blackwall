import MyComponent from '../../../../slices/Text';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Text'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"text":[{"type":"paragraph","text":"Commodo cillum excepteur eiusmod excepteur duis sint nisi ipsum excepteur tempor tempor anim.","spans":[]}]},"id":"_Default","slice_type":"text"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
