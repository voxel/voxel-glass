'use strict';

var ItemPile = require('itempile');
var ucfirst = require('ucfirst');

module.exports = function(game, opts) {
  return new GlassPlugin(game, opts);
};
module.exports.pluginInfo = {
  loadAfter: ['voxel-registry', 'voxel-use', 'voxel-recipes']
};

function GlassPlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-glass requires voxel-registry');

  this.use = game.plugins.get('voxel-use');
  if (!this.use) throw new Error('voxel-glass requires voxel-use');

  this.recipes = game.plugins.get('voxel-recipes'); // optional

  this.colors = opts.colors !== undefined ? opts.colors : ['black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red', 'silver', 'white', 'yellow'];

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
  this.registry.registerBlock('glass', {texture: 'glass', transparent: true, hardness: 0.2, creativeTab: 'glass', harvestSound: 'random/glass1'});

  for (var i = 0; i < this.colors.length; i += 1) {
    this.registerPane(this.colors[i]); // TODO: use metablocks?
  }
  this.registerPane(''); // clear

  if (this.recipes) {
    this.recipes.registerPositional([['glass', 'glass', 'glass']], ['glassPane', 3]);

    // TODO: dye recipes, harmonize with https://github.com/deathcap/voxel-wool (API?)
  }
};

// Register an item and two blocks for a glass pane of the given color
GlassPlugin.prototype.registerPane = function(color) {
  var colorName = ucfirst(color);

  var texture = color !== '' ? ('glass_' + color) : 'glass';

  // item
  var self = this;
  this.registry.registerItem('glassPane' + colorName, {
    displayName: colorName + ' Glass Pane',
    itemTexture: texture,
    creativeTab: 'glass',
    onUse: function(held, target) {
      // place X or Z pane depending on facing
      return self.use.useBlock(target, new ItemPile('glassPane' + self.playerOrientation() + colorName)) === undefined;
    },
  });

  // oriented blocks

  this.registry.registerBlock('glassPaneZ' + colorName, {
    harvestSound: 'random/glass1',
    creativeTab: false,
    itemDrop: 'glassPane' + colorName,
    displayName: colorName + ' Glass Pane Z',
    itemTexture: texture, // flat, not 3D cube
    texture: texture,     // preload for model below
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
      texture: texture, // for all faces. TODO: use glass_pane_top for narrow faces?
      }],
  });

  // same as above but oriented along X axis
  this.registry.registerBlock('glassPaneX' + colorName, {
    harvestSound: 'random/glass1',
    creativeTab: false,
    itemDrop: 'glassPane' + colorName,
    displayName: colorName + ' Glass Pane X',
    itemTexture: texture,
    texture: texture,
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
      texture: texture,
      }],
  });
};

GlassPlugin.prototype.disable = function() {
  // TODO: unregister blocks
};

