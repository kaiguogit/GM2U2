

function move(old_index, new_index, array){
  array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  return array;
}