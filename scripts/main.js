(function(){
  define(function (require) {
    var cs = require('coordinates'),
        btn = document.querySelector('button');

    btn.addEventListener("click", function(){
        document.querySelector(".distances").innerHTML = "";
        cs.getData("scripts/coordinates.json", cs.parseData);
    });

  });
})();
