(function(){

    'use strict';

    angular
        .module('breeze')
        .factory('oList', oList);

    function oList() {

        function getEvents() {
            return [
                {
                    "name": "Event 1",
                    "value":"event_1"
                },
                
            ];
        }

        function getClubs() {
            return [
                {
                    "name": "Event 1",
                    "value":"event_1"
                },
                
            ];
        }
        return {
            getEvents: getEvents,
            getClubs: getClubs
        }
    }
})();