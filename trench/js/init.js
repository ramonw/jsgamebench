// Copyright 2004-present Facebook. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

(function() {

  var box_model_data = {"verts":[0,0,0,0,0,0,0,-1,1,1,0,0,1,0,0,-1,1,0,0,1,1,0,0,-1,0,1,0,1,0,0,0,-1,0,0,0,0,0,-1,0,0,0,1,1,0,1,-1,0,0,0,1,0,1,1,-1,0,0,0,0,1,1,0,-1,0,0,0,1,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,0,1,1,1,0,0,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,-1,0,1,0,0,0,1,0,-1,0,1,0,1,1,1,0,-1,0,0,0,1,1,0,0,-1,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,0,1,1,1,1,1,1,0,0,1,0,1,1,1,0,0,0,1],"indices":[0,1,2,0,3,1,4,5,6,4,7,5,8,9,10,8,11,9,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"materials":["default"],"counts":[36]};

  var render_inited = false;
  var box_model = null;

  function tick() {
    if (!render_inited && WebGLRender.isInitialized()) {
      render_inited = true;

      var material_table = WebGLRender.getMaterialTable();
      var model_context = WebGLRender.getModelContext();
      var viewport = WebGLRender.getViewport();

      TrenchMaterials.registerMaterials(WebGLRender.getMaterialTable());
      box_model = model_context.createModel(box_model_data);

      var worldmat = Math3D.mat4x4();
      worldmat[12] = -0.5;
      worldmat[13] = -0.5;
      worldmat[14] = -5.0;
      World3D.add(1, box_model, worldmat);

      World3D.setPerspective(0.5,
                             viewport.width / viewport.height,
                             0.75,
                             1000.0);
    }
  }

  function init() {
    Init.reset();

    GameFrame.updateSettings({
      render_mode: GameFrame.WEBGL3D,
      //webgl_debug: true,
      sprite_sheets: false
    });

    GameFrame.setXbyY();
    UI.hookUIEvents('gamebody');
  }

  function resize() {
    //console.log('resize');
    render_inited = false;
  }

  Init.setFunctions({
    app: tick,
    init: init,
    draw: Render.tick,
    ui: UI.tick,
    resize: resize,
    //postLoad: postImageLoad,
    fps: 1000
  });

})();

