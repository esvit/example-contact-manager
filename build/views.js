angular.module('app').run(['$templateCache', function ($templateCache) {
	$templateCache.put('/views/form-contact.html', '<div class="page-header"> <h1> <span ng-if="contact.id">Edit contact</span> <span ng-if="!contact.id">New contact</span> </h1> </div> <form class="form-horizontal" ng-submit="saveContact(contact)" name="form" novalidate> <div class="form-group" ng-class="{\'has-error\': form.name.$dirty && form.name.$invalid}"> <label class="col-lg-3">Name:</label> <div class="col-lg-9"> <input class="form-control" name="name" type="text" ng-model="contact.name" required/> <div class="help-block" ng-if="form.name.$dirty && form.name.$invalid"> Заполните поле </div> </div> </div> <div class="form-group" ng-class="{\'has-error\': form.surname.$dirty && form.surname.$invalid}"> <label class="col-lg-3">Surname:</label> <div class="col-lg-9"> <input class="form-control" name="surname" type="text" ng-model="contact.surname"/> <div class="help-block" ng-if="form.surname.$dirty && form.surname.$invalid"> Заполните поле </div> </div> </div> <div class="form-group" ng-class="{\'has-error\': form.phone.$dirty && form.phone.$invalid}"> <label class="col-lg-3">Phone:</label> <div class="col-lg-9"> <input class="form-control" name="phone" type="text" ng-model="contact.phone" required/> <div class="help-block" ng-if="form.phone.$dirty && form.phone.$invalid"> Заполните поле </div> </div> </div> <div class="form-group" ng-class="{\'has-error\': form.group.$dirty && form.group.$invalid}"> <label class="col-lg-3">Group:</label> <div class="col-lg-9"> <input class="form-control" name="group" type="text" ng-model="contact.group"/> <div class="help-block" ng-if="form.group.$dirty && form.group.$invalid"> Заполните поле </div> </div> </div> <div class="form-actions"> <div class="col-lg-offset-3 col-lg-9"> <button class="btn btn-primary" type="submit">Save</button> </div> </div> </form>');
	$templateCache.put('/views/index.html', '<div class="row"> <div class="col-lg-9"> <div class="page-header"> <h1>{{\'List of contacts\'|translate}}</h1> </div> <div ng-if="saved" class="alert alert-success"> Saved! </div> <p><strong>Search: </strong><input class="form-control" type="text" ng-model="filter"/></p> <table ng-table="tableParams" class="table"> <tbody ng-repeat="group in $groups"> <tr class="ng-table-group"> <td colspan="{{$columns.length}}"> <a href="" ng-click="group.$hideRows=!group.$hideRows"> <strong>{{ group.value }}</strong> </a> </td> </tr> <tr ng-hide="group.$hideRows" ng-repeat="user in group.data"> <td data-title="\'Name\'" filter="{ \'name\': \'text\' }" sortable="\'name\'"> <a ng-href="{{user.getUrl()}}">{{user.name}}</a> </td> <td data-title="\'Surname\'"> {{user.surname}} </td> <td data-title="\'Phone\'"> {{user.phone}} </td> </tr> </tbody> </table> </div> <div class="col-lg-3"> <a class="btn btn-primary" href="#!/add">Add contact</a> <div id="view1" app-view-segment="1"></div> </div> </div>');
}]);