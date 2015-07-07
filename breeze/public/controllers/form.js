(function() {
'use strict';
    

    angular
        .module('breeze_form')
        .controller('FormCtrl', FormCtrl);

    function FormCtrl(oList) {

        var vm = this;

        vm.events = {};
    
    // An array of our form fields with configuration
    // and options set. We make reference to this in
    // the 'fields' attribute on the  element
    vm.eventFields = [
        {
            key: 'Name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Name',
                placeholder: 'Enter Name',
                required: true
            }
        },
        
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: true
            }
        },
        {
            key: 'contact_num',
            type: 'input',
            templateOptions: {
                type: 'tel',
                label: 'contact number',
                placeholder: 'Enter number',
                required: true
            }
        },
        {
            key: 'event_name',	
            type: 'select',
            templateOptions: {
                label: 'Event Name',
                options: oList.getEvents()
            }
        },
        {
            key: 'club_name',	
            type: 'select',
            templateOptions: {
                label: 'Organization Name',
                options: oList.getClubs()
            }
        },
        {
            key: 'team',	
            type: 'checkbox',
            templateOptions: {
                label: 'Team?',
            }
        },
        {
            key: 'team_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Team Name',
                placeholder: 'Enter Team Name',
                required: true
            },
            hideExpression: '!model.team'
        },

    ];

    }

})();