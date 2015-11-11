// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

angular
  .module('openproject.workPackages')
  .directive('wpCreateButton', wpCreateButton);

function wpCreateButton() {
  return {
    restrict: 'E',
    templateUrl: '/components/work-packages/directives/wp-create-button/' +
      'wp-create-button.directive.html',

    scope: {
      projectIdentifier: '='
    },

    bindToController: true,
    controllerAs: 'vm',
    controller: WorkPackageCreateButtonController
  }
}

function WorkPackageCreateButtonController($scope, AuthorisationService, EditableFieldsState,
    ProjectService) {

  var vm = this,
      editAll = EditableFieldsState.editAll.state;

  vm.text = I18n.t('js.toolbar.unselected_title');
  vm.disabled = editAll || AuthorisationService.cannot('work_package', 'create');

  ProjectService.getProject(vm.projectIdentifier).then(function(project) {
    vm.types = project.embedded.types;
  });

  $scope.$on('modelAuthUpdate.work_package', function (event, can, cannot) {
    vm.disabled = editAll || cannot('create');
  })
}
