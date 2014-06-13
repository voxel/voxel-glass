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
};

GlassPlugin.prototype.disable = function() {
};

