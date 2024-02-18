import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ffffff', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934',"#847996"],
  decals: ['react', 'three2','veg',],
  selectedDecals: [],
  color: '#EFBD4E',
  decal: 'logo',
  scale: .1,
  decalX: 0,
  decalY: 0.04,
  decalZ:0.15
})

export { state }
