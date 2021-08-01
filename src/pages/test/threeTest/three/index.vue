<template>
  <canvas ref="three"></canvas>
</template>

<script>
import * as THREE from 'three';

export default {
  name: "three",
  mounted() {
    console.log('Three', THREE, this.$refs.three)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#e02727')
    const renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.three, antialias: true
    })
    const geometry = new THREE.BoxGeometry(  );
    const material = new THREE.MeshBasicMaterial( { color: '#00ff00' } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2;

    function animate() {
      // console.log('render')
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
  },
  data() {
    return {scenes: []}
  },
  methods: {}
}
</script>

<style scoped>

</style>
