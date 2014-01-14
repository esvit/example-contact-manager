angular.module('app').run(['$templateCache', function ($templateCache) {
	$templateCache.put('views/form-contacthtml', '<div class="page-header"> <h1> <span ng-if="contact.id">Edit contact</span> <span ng-if="!contact.id">New contact</span> </h1> </div> <form class="form-horizontal" ng-submit="saveContact(contact)" name="form" novalidate> <div class="form-group" ng-class="{\'has-error\': form.name.$dirty && form.name.$invalid}"> <label class="col-lg-3">Name:</label> <div class="col-lg-9"> <input class="form-control" name="name" type="text" ng-model="contact.name" required/> <div class="help-block" ng-if="form.name.$dirty && form.name.$invalid"> Заполните поле </div> </div> </div> <div class="form-group" ng-class="{\'has-error\': form.surname.$dirty && form.surname.$invalid}"> <label class="col-lg-3">Surname:</label> <div class="col-lg-9"> <input class="form-control" name="surname" type="text" ng-model="contact.surname"/> <div class="help-block" ng-if="form.surname.$dirty && form.surname.$invalid"> Заполните поле </div> </div> </div> <div class="form-group" ng-class="{\'has-error\': form.phone.$dirty && form.phone.$invalid}"> <label class="col-lg-3">Phone:</label> <div class="col-lg-9"> <input class="form-control" name="phone" type="text" ng-model="contact.phone" required/> <div class="help-block" ng-if="form.phone.$dirty && form.phone.$invalid"> Заполните поле </div> </div> </div> <div class="form-group" ng-class="{\'has-error\': form.group.$dirty && form.group.$invalid}"> <label class="col-lg-3">Group:</label> <div class="col-lg-9"> <input class="form-control" name="group" type="text" ng-model="contact.group"/> <div class="help-block" ng-if="form.group.$dirty && form.group.$invalid"> Заполните поле </div> </div> </div> <div class="form-actions"> <div class="col-lg-offset-3 col-lg-9"> <button class="btn btn-primary" type="submit">Save</button> </div> </div> </form>');
	$templateCache.put('views/indexhtml', '<div class="row"> <div class="col-lg-9"> <div class="page-header"> <h1>{{\'List of contacts\'|translate}}</h1> </div> <div ng-if="saved" class="alert alert-success"> Saved! </div> <table ng-table="tableParams" class="table"> <tr ng-repeat="user in $data"> <td data-title="\'Name of people\'"> <a ng-href="{{user.getUrl()}}">{{user.name}}</a> </td> <td data-title="\'Age\'"> {{user.age}} </td> </tr> </table> </div> <div class="col-lg-3"> <a class="btn btn-primary" href="#!/add">Add contact</a> <div app-view-segment="1"></div> </div> </div>');
}]);