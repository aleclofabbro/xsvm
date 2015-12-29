define(function (){
  return function number(el){
    el.on('set',ev => el.innerText = Number(ev.detail.val));
  };
});