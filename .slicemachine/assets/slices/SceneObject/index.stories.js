import MyComponent from '../../../../slices/SceneObject';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/SceneObject'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"image":{"dimensions":{"width":1024,"height":677},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1537498425277-c283d32ef9db?rect=1%2C0%2C4379%2C2895&w=1024&h=677"},"layers":40},"id":"_Default","slice_type":"scene_object"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''

export const _SceneObjectVideo = () => ({
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
      mock: {"variation":"sceneObjectVideo","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"video":{"link_type":"Media","name":"mock","kind":"image","url":"https://source.unsplash.com/random","size":"10kB"},"layers":30,"video_width":41,"video_height":57},"id":"_SceneObjectVideo","slice_type":"scene_object"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_SceneObjectVideo.storyName = ''
