# voxel-glass

Glass blocks (voxel.js plugin)

![screenshot](http://i.imgur.com/zkrTtHZ.png "Screenshot")

Adds a solid glass block and glass panes:

![screenshot](http://i.imgur.com/qeihe2f.png "Screenshot")

The `glass` block is a transparent solid cube. Three glass blocks
can be crafted horizontally in a [voxel-workbench](https://github.com/deathcap/voxel-workbench)
to create a clear glass pane. Colored versions of the glass panes are also added
(not yet craftable).

Glass panes can be placed in the world facing along the X or Z axis, depending on the
player's heading. Mining the panes always drops the same item independent of the
direction (similar to [voxel-pumpkin](https://github.com/deathcap/voxel-pumpkin)).


Requires [voxel-mesher](https://github.com/deathcap/voxel-mesher) 0.14.0+,
[voxel-shader](https://github.com/deathcap/voxel-shader) 0.13.0+ for custom block model support;
the panes are an example of using [block-models](https://github.com/deathcap/block-models),
via the `blockModel` property in [voxel-registry](https://github.com/deathcap/voxel-registry)
block registration.

## License

MIT

