import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


class Logo extends Component {

    componentDidMount() {
        var renderer = new THREE.WebGLRenderer();
        var scene = new THREE.Scene();
        scene.background= new THREE.Color("#D3D3D3");
        var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 1000 );
        renderer.setSize( window.innerWidth, window.innerHeight );

        var controls = new OrbitControls( camera, renderer.domElement );
        controls.update();
        
        document.body.appendChild( renderer.domElement );


        var vertices = randomLogoVerts(7);
        var boxGeo = new THREE.BoxGeometry();
        boxGeo.vertices = vertices;
        boxGeo.verticesNeedUpdate = true;
        
        var geo = new THREE.EdgesGeometry( boxGeo);

        var mat = new THREE.LineBasicMaterial( { color: "#141414", linewidth:30 });
        var wireframe = new THREE.LineSegments( geo, mat );

        var sphereGeo = new THREE.SphereGeometry(2,50,50);
        var sphereMat = new THREE.MeshBasicMaterial({color: "#1CADB6"});
        var sphere = new THREE.Mesh(sphereGeo,sphereMat);

        scene.add( wireframe );
        scene.add(sphere);
        camera.position.z = 20;

        var animate = function () {
          requestAnimationFrame( animate );

          controls.update();
          renderer.render( scene, camera );
        };

        function rn(original,scale){
            var neg = false;
            if(original < 0){
                neg = true;
            }
            var num = Math.random()* scale+0.5;
            if(neg){
                return original - num;
            }
            return original+ num;
        };

        function randomLogoVerts(scale){
            var boxVertices = new THREE.BoxGeometry().vertices;
            for(var i = 0; i < 8; i++){
                boxVertices[i].addVectors(boxVertices[i], new THREE.Vector3(rn(boxVertices[i].x,scale),rn(boxVertices[i].y,scale),rn(boxVertices[i].z,scale)));
            }
            return boxVertices;
        }
        animate();
      }
      render() {
        return (
            <div ref={ref => (this.mount = ref)}>
                <div id="info">Lightstep Logo Test</div>
            </div>
        )
      }
     

}
export default Logo