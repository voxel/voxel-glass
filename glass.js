'use strict';

module.exports = function(game, opts) {
  return new GlassPlugin(game, opts);
};

function GlassPlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-glass requires voxel-registry');

  this.enable();
}

GlassPlugin.prototype.enable = function() {
  this.registry.registerBlock('glass', {texture: 'glass', transparent: true, hardness: 0.2});
  this.registry.registerBlock('glassPaneZ', {
    displayName: 'Glass Pane',
    itemTexture: 'glass_blue',  // flat, not 3D cube
    texture: 'glass_blue',      // preload for model below
    blockModel:
      [{from: [0,0,7],
      to: [16,16,2],
      faceData: {
        down: {},
        up: {},
        north: {},
        south: {},
        west: {},
        east: {}
        },
      texture: 'glass_blue',
      }],
  });

  // same as above but oriented along X axis
  this.registry.registerBlock('glassPaneX', {
    displayName: 'Glass Pane',
    itemTexture: 'glass_blue',
    texture: 'glass_blue',
    blockModel:
      [{from: [7,0,0],
      to: [2,16,16],
      faceData: {
        down: {},
        up: {},
        north: {},
        south: {},
        west: {},
        east: {}
        },
      texture: 'glass_blue',
      }],
  });
};

GlassPlugin.prototype.disable = function() {
};

