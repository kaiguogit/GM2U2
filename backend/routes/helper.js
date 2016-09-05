var models = require("../models");


function findPlaylistforWidget(widget){
  console.log("\n!!!!!returned variable after create widget  is", widget.dataValues);
  return models.playlist.findById(widget.playlistId);
}

function addToPlaylistArray(playlist){
  console.log("\n!!!!!returned variable after finding playlist   is", playlist.dataValues);
  console.log("\n!!!!!Binded widiget in this is", this);
  var widgets = playlist.dataValues.widgets
  widgets.push(this);
  return playlist.updateAttributes({widgets: widgets});
}
function deleteFromPlaylistArray(playlist, widget){
  //Remove the widget from array
  console.log("\n!!!!!Deleting widget from array, id is", widget.id);
  var widgets = playlist.dataValues.widgets;
  widgets.forEach(function(w, index){
      if(w.id === widget.id){
        widgets.splice(index, 1);
      }
    });
  // console.log("After splice, widgets is", widgets);
  return playlist.updateAttributes({widgets: widgets}).bind(this);
}



module.exports.findPlaylistforWidget = findPlaylistforWidget;
module.exports.addToPlaylistArray = addToPlaylistArray;
module.exports.deleteFromPlaylistArray = deleteFromPlaylistArray;