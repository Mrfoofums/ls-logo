import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


class Logo extends Component {

    componentDidMount() {
        var renderer = new THREE.WebGLRenderer({antialias:true});
        var scene = new THREE.Scene();
        // scene.background= new THREE.Color("#D3D3D3");
        scene.background= new THREE.Color("black");
        var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 1000 );
        renderer.setSize( window.innerWidth, window.innerHeight );

        var labelRenderer = new CSS2DRenderer();
				labelRenderer.setSize( window.innerWidth, window.innerHeight );
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = 0;

        var controls = new OrbitControls( camera, labelRenderer.domElement );
        
        document.body.appendChild( renderer.domElement );
        document.body.appendChild( labelRenderer.domElement );
        controls.update();


        var vertices = randomLogoVerts(6);
        var boxGeo = new THREE.BoxGeometry();
        console.log(boxGeo.vertices);
        boxGeo.vertices = vertices;
        boxGeo.verticesNeedUpdate = true;
        
        var geo = new THREE.EdgesGeometry( boxGeo);

        // var mat = new THREE.LineBasicMaterial( { color: "#000000", linewidth:400 });
        var mat = new THREE.LineBasicMaterial( { color: "white", linewidth:400 });
        var wireframe = new THREE.LineSegments( geo, mat );

        var sphereGeo = new THREE.SphereGeometry(1.75,50,50);
        var sphereMat = new THREE.MeshBasicMaterial({color: "green"});
        var sphere = new THREE.Mesh(sphereGeo,sphereMat);

        var gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
			gridHelper.position.y = 0;
            gridHelper.position.x = 0;
            
		// scene.add( gridHelper );
        scene.add( wireframe );
        scene.add(sphere);
        camera.position.z = 20;

        for(let vertex in vertices){
            addLabelsToShape(vertex, wireframe)
        };

        function addLabelsToShape(vertex, wireframe){
            //Create a vertex div and add it out there
            var vertexDiv = document.createElement('div');
            vertexDiv.className = 'label';
            vertexDiv.textContent = vertex.toString(); // Need to get vertex location
            var vertexLabel = new CSS2DObject(vertexDiv);
            vertexLabel.position.set(vertex);
            wireframe.add(vertexLabel);
        }


        var animate = function () {
          requestAnimationFrame( animate );

          controls.update();
          renderer.render( scene, camera );
          labelRenderer.render( scene, camera );
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

        // function doSomething(){
        //     var v0 = new THREE.Vector3 (0.5, 0.5, 0.5);
        //     var v1 = new THREE.Vector3 (0.5, 0.5, -0.5);
        //     var v2 = new THREE.Vector3 (0.5, -0.5, 0.5);
        //     var v3 = new THREE.Vector3 (0.5, -0.5, -0.5);
        //     var v4 = new THREE.Vector3 (-0.5, 0.5, -0.5);
        //     var v5 = new THREE.Vector3 (-0.5, 0.5, 0.5);
        //     var v6 = new THREE.Vector3 (-0.5, -0.5, -0.5);
        //     var v7 = new THREE.Vector3 (-0.5, -0.5, 0.5);

        //     //Need to replicate the current geometry drawing 4 times and add them each as Line Segment GEO I believe
        // };

        animate();
      }
      render() {
        return (
            <div ref={ref => (this.mount = ref)}>
                <div id="info">Lightstep</div>
            </div>
        )
      }
     

}
export default Logo