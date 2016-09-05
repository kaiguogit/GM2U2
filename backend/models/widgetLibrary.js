  //This file export some database call back function for all kind of widgets

  //AfterCreate
  var addToPlaylistArray = function(widget, options) {
    console.log("!!!!!adding to playlist after create");
    this.associations.playlist.target.findById(widget.playlistId)
    .then(function(playlist){
      var widgets = playlist.dataValues.widgets
      widgets.push(widget);
      playlist.updateAttributes({widgets: widgets});
    });
  }

    //After destroy 
  var removeFromPlaylistArray = function(widget, option) {
    // console.log("In After Destroy widget is", widget);
    this.associations.playlist.target.findById(widget.playlistId)
    .then(function(playlist){
      // console.log("Before splice, widgets is", widgets);

      //Remove the widget from array
      var widgets = playlist.dataValues.widgets;
      widgets.forEach(function(widget, index){
        if(widget.id === widget.id){
          widgets.splice(index, 1);
        }
      });
      // console.log("After splice, widgets is", widgets);
      playlist.updateAttributes({widgets: widgets});
    });
  }

var widget = {};
widget.addToPlaylistArray = addToPlaylistArray;
widget.removeFromPlaylistArray = removeFromPlaylistArray;
module.exports = widget;
