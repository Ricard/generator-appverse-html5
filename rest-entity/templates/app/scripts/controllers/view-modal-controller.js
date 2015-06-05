/*
 Copyright (c) 2015 GFT Appverse, S.L., Sociedad Unipersonal.
 This Source Code Form is subject to the terms of the Appverse Public License
 Version 2.0 (“APL v2.0”). If a copy of the APL was not distributed with this
 file, You can obtain one at http://www.appverse.mobi/licenses/apl_v2.0.pdf. [^]
 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the conditions of the AppVerse Public License v2.0
 are met.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. EXCEPT IN CASE OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT
 SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

/*
 * Pay attention to injection of dependencies (factories, entities and Angular objects).
 */
angular.module('App.Controllers')

.controller('<%=viewName%>-modal-controller',
    function ($scope, $modalInstance, item) {
        $scope.item = item;
        if (item) {
            $scope.title = 'Edit <%=viewName%>';
        } else {
            $scope.title = 'New <%=viewName%>';
        }
        $scope.ok = function (item) {
            $modalInstance.close(item);
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };

        <%  var fields=model.properties;
         for (var key in fields) {
         var type = fields[key].type;

         if (type == 'string' && (fields[key].format == 'date-time' || fields[key].format == 'date')) { %>
             $scope.datepicker = {opened : false};
             $scope.openCalendar = function($event) {
                 $event.preventDefault();
                 $event.stopPropagation();
                 $scope.datepicker.opened = true;
             };

             $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
             $scope.format = $scope.formats[0];
             $scope.today = function() {
                  $scope.item.<%=key%> = new Date();
            };
            $scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
            };
    <%   }
       }
    %>

    });
