//this is acting like main information store

let imgsource;
let observer = null;

function emitChange() {
  observer(imgsource);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }
  observer = o;
  emitChange();
}

export function dragIcon(img){
  imgsource = img;
  console.log("imgsourcechanged", imgsource);
  emitChange();
}

export function checkIcon(){
  console.log("Chechking imgsource", imgsource);
  emitChange();
}