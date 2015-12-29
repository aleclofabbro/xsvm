define(function (){
  return function string(el){
    el.on('set',ev => el.innerText = String(ev.detail.val));
  };
});