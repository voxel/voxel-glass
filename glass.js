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
  this.registry.registerBlock('glassCover', { // TODO: all other colors, and orientations
    displayName: 'Glass Cover',
    texture: 'glass_blue',
    blockModel:
      [{from: [0,0,0],
      to: [16,1,16], // 1/16th flat above ground
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

