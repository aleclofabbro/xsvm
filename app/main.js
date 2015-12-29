a = 0;
(function go() {
  var config = {
    childList: true,
    subtree: true
  };
  var obss = Array.apply(null, Array(1000))
    .map(function (_, index) {

      var obs = new MutationObserver(function (mutations) {
        // console.time(index);
        // console.log(mutations);
        mutations.forEach(function (mut) {
          for (var i = 0; i < mut.addedNodes.length; i++) {
            var it = document.createNodeIterator(mut.addedNodes.item(i), NodeFilter.SHOW_ELEMENT, {
              acceptNode: function (node) {
                // if (node.tagName === 'P')
                return NodeFilter.FILTER_ACCEPT;
              }
            });
            while (it.nextNode()) {
              it.referenceNode.style.border = 'thin red dashed';
              a++;
            }
            // it.detach(); // 'NodeIterator.detach' is now a no-op, as per DOM (http://dom.spec.whatwg.org/#dom-nodeiterator-detach).
          }
        });
        // console.timeEnd(index);
      });
      obs.observe(document.body, config);
      return obs;
    });

  var xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var c = xhr.responseXML.body.firstElementChild;
        document.adoptNode(c);
        setTimeout(function () {
          document.body.appendChild(c);
          setTimeout(function () {
            // c.remove();
            obss.forEach(function (obs) {
              obs.takeRecords();
              obs.disconnect();
            })
            obss = null
          }, 1000);
        }, 1000);
      }
    }
    // try {
  xhr.open("GET", 'app/cont.html');
  xhr.responseType = "document";
  xhr.send();
  // } catch (e) {
  // debugger;
  // }
}());