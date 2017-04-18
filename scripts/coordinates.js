(function() {
    define(function() {

        /**
         * Get data from file
         * @param {string} file - Path to file
         * @param {function} callback - A callback function
         */
        function getData(file, callback) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    callback(JSON.parse(request.responseText));
                }
            };

            request.open("GET", file, true);
            request.send();
        }

        /**
         * Parses data object
         * @param  {JSON} data a JSON data object
         */
        function parseData(data) {

            var start = document.querySelectorAll('input'),
                x = start[0].value,
                y = start[1].value,
                results,
                sorted,
                distances = document.querySelector('.distances');

            results = data.map(function(obj){
                var k = [],
                    id = obj.id,
                    values = obj.value.split(","),
                    d = getDistance(x,y,values[0],values[1]);

                    k.push( id, d);

                return k;
            });

            sorted = results.sort(function( a,b ){
                return parseFloat( a[1] ) - parseFloat( b[1] );
            });


            sorted.map( function(array){
                var newItem = document.createElement("LI"),
                    textNode = document.createTextNode( array[0] + " : " + array[1] );

                newItem.append( textNode );
                distances.appendChild( newItem );
            } );

        }

        /**
         * Get distance between two points
         * @param {number} x1 - The x coordinate of the first point
         * @param {number} y1 - The y coordinate of the first point
         * @param {number} x2 - The x coordinate of the second point
         * @param {number} y2 - The y coordinate of the second point
         * @return {number} the calculated distance between the points
         */
        function getDistance(x1, y1, x2, y2) {

            var dx = x2 - x1,
                dy = y2 - y1;

            dx *= dx;
            dy *= dy;

            return Math.sqrt(dx + dy).toFixed(2);
        }

        return {parseData: parseData, getData: getData};
    });
})();
