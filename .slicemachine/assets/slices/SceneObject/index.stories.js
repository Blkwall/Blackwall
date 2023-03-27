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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"image":{"dimensions":{"width":4160,"height":3120},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1560457079-9a6532ccb118"},"layers":47},"id":"_Default","slice_type":"scene_object"}
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
      mock: {"variation":"sceneObjectVideo","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"video":{"link_type":"Media","name":"mock","kind":"image","url":"https://source.unsplash.com/random","size":"10kB"},"layers":56},"id":"_SceneObjectVideo","slice_type":"scene_object"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_SceneObjectVideo.storyName = ''
