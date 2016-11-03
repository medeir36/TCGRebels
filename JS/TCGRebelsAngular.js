var app = angular.module("TCGRebelsApp", ['ngRoute']);

//configure the routes of diffferent applications
app.config(function($routeProvider) {
    $routeProvider

         // route for the home page
        .when('/', {
            template : '<home></home>',
            controller  : 'homeController'
        })

        // route for the calendar page
        .when('/calendar', {
            template : '<calendar></calendar>',
            controller  : 'calendarController'
        })

        // route for the members page
        .when('/members', {
            template : '<members></members>',
            controller  : 'membersController'
        });
    
/*        // route for the chat page
        .when('/chat', {
            template : '<chat></chat>',
            controller  : 'chatController'
        });
    
        // route for the pictures page
        .when('/pictures', {
            template : '<pictures></pictures>',
            controller  : 'picturesController'
        });*/
});

app.controller("membersController", function($scope) {
    $scope.members = ["Paul", "Harry", "Scott", "Tori", "Michael", "David", "Sophia", "Moses", "Johnny", "Gio", "Paige", "Andrew", "John", "Vince", "Me", "You"]
});

app.directive("members", function() {
    return {
        restric: "E",
        templateUrl: "templates/members.html",
        link: function(scope) {
           /* _strechY(scope.members.length);*/
        }    
    };
    function _strechY(objectNum) {
        console.log("objectNum" + objectNum);
        //use this function to lengthen the y axis when more than 10 people (5 per row) are loaded into the app 15%
        if(objectNum / 5 > 2){
            alert("streching "+$(".container").outerHeight(true)+ " by 4");
            document.getElementById("content-background").style.height = $(".container").outerHeight(true) * 4+"px";
        }
    };
});


app.directive("home", function() {
    return {
        restric: "E",
        templateUrl: "templates/home.html"
    };
});

app.controller("calendarController", function($scope) {
    $scope.day = moment();
});

app.directive("calendar", function() {
    return {
        restrict: "E", //restricts the directive to element names only <hey>
        templateUrl: "templates/calendar.html",
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);
            
            scope.select = function(day) {
                scope.selected = day.date;  
            };
            
            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1)).date(1);
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };
            
            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
            
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }
    
    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }
    
    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
    
});