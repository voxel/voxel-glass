'use strict';

var ItemPile = require('itempile');

module.exports = function(game, opts) {
  return new GlassPlugin(game, opts);
};
module.exports.pluginInfo = {
  loadAfter: ['voxel-registry', 'voxel-use']
};

function GlassPlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-glass requires voxel-registry');

  this.use = game.plugins.get('voxel-use');
  if (!this.use) throw new Error('voxel-glass requires voxel-use');

  this.enable();
}

// Get X or Z depending on the player orientation
GlassPlugin.prototype.playerOrientation = function() {
  var heading = Math.atan2(self.game.cameraVector()[0], self.game.cameraVector()[2]);
  var dir;
  if (Math.abs(heading) <= Math.PI / 4) { // 0 +/- 45 degrees // TODO: refactor with voxel-pumpkin, generic block/player orientation module?
    return 'Z'; // north
  } else if (Math.PI - Math.abs(heading) <= Math.PI / 4) { // +/-180 +/- 45
    return 'Z'; // south
  } else if (heading > 0) { // +90 +/- 45
    return 'X'; // west
  } else { // if (heading <= 0) { // -90 +/- 45
    return 'X'; // east
  }
};

GlassPlugin.prototype.enable = function() {
  this.registry.registerBlock('glass', {texture: 'glass', transparent: true, hardness: 0.2});

  // item
  var self = this;
  this.registry.registerItem('glassPane', {
    displayName: 'Glass Pane',
    itemTexture: 'glass_blue',
    creativeTab: 'blocks', // TODO: another decorative tab? glass tab?
    onUse: function(held, target) {
      // place X or Z pane depending on facing
      return self.use.useBlock(target, new ItemPile('glassPane' + self.playerOrientation())) === undefined;
    },
  });

  // oriented blocks

  this.registry.registerBlock('glassPaneZ', {
    creativeTab: false,
    itemDrop: 'glassPane',
    displayName: 'Glass Pane Z',
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
    creativeTab: false,
    itemDrop: 'glassPane',
    displayName: 'Glass Pane X',
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

