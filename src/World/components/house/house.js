import { Box3, Vector3 } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { setupModel } from './setupModel'

async function loadHouse() {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  const houseData = await gltfLoader.loadAsync('/assets/models/Marco-c.glb')
  const house = setupModel(houseData)
  house.traverse(n => {
    if (n.isMesh) {
      if (n.material.name === 'esquadria.vidro') {
        n.castShadow = false
      } else {
        n.castShadow = true
        n.receiveShadow = true
      }
    }
  })

  const box = new Box3().setFromObject(house)
  const center = box.getCenter(new Vector3())
  house.position.x += (house.position.x - center.x)
  house.position.z += (house.position.z - center.z)
  house.position.y = 2.2

  // let cobertura = house.getObjectByName('coberturaEmpty')
  // let pavSuperior = house.getObjectByName('superiorEmpty')
  // let pavTerreo = house.getObjectByName('terreoEmpty')


  return { house }
}

export { loadHouse }