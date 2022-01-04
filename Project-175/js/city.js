AFRAME.registerComponent("items", {
    init: async function () {
  
      //Get the compund details of the element
      var items = await this.getItem();
  
      var barcodes = Object.keys(items);
  
      barcodes.map(barcode => {
        var element = items[barcode];
  
        //Call the function
        this.createThings(element);
      });
  
    },
    getItem: function () {
      return fetch("./js/cityStuff.json")
        .then(res => res.json())
        .then(data => data);
    },
    createThings: async function (element) {
  
      //Element data
      var itemName = element.model_name;
      var barcodeValue = element.barcode_value;
      var position = element.position;
      var rotation = element.rotation;
      var scale = element.scale;
      var model = element.model_url;
  
      //Scene
      var scene = document.querySelector("a-scene");
  
      //Add marker entity for BARCODE marker
      var marker = document.createElement("a-marker");
  
      marker.setAttribute("id", `marker-${barcodeValue}`);
      marker.setAttribute("type", "barcode");
      marker.setAttribute("element_name", itemName);
      marker.setAttribute("value", barcodeValue);
      
      scene.appendChild(marker);

      var thing = document.createElement("a-entity");
      thing.setAttribute("id",`thing-${itemName}`)
      thing.setAttribute("position", {x: position.x, y:position.y, z: position.z})
      thing.setAttribute("scale",{x: scale.x, y: scale.y, z: scale.z})
      thing.setAttribute("rotation",{x: rotation.x, y: rotation.y, z: rotation.z})
      thing.setAttribute("gltf-model",model)

      marker.appendChild(thing);
    }
  });
  