
var response={ 
  authors:[
    {
      id: 1,
      name: "Monica",
      posts: [
        {
          id: 1,
          title: "how to write fast js",
          comments:[
            {id:1,
             text: "fast js is really fast"
            },
            {id:2,
             text: "fast js is not bad"
            }
          ]
        },
        {
          id: 2,
          title: "how to write slow js",
          comments:[
            {
              id:3,
              text: "it is too slow"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "John",
      posts: [
        {
          id: 2,
          title: "how to write slow js",
          comments:[
            {
              id:3,
              text: "it is too slow"
            }
          ]
        }
      ]
    }
  ]
}


function normalize(parent, object){
  var keys = Object.keys(object);

  //iterate through keys
  keys.forEach(function(key){

    //if value is array, create a array in result variable
    if(Array.isArray(object[key])){
        if(!result[key]) result[key] = [];

      // add each item to the 
      object[key].forEach(function(child, i){

        if(!result[key].find(function(item){return item.id === child.id})){
          if(parent) child[parent+"_id"] = object.id;
          result[key].push(child);
        }

        // **** recursion ****//
        normalize(singular(key), child);
      });
      delete object[key];
    }
  });
}

function singular(str){
  return str.replace(/[s]$/i, "");
}

var result = {};
normalize("", response);
console.log(result);



