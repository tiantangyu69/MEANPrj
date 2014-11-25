var LoginApp = angular.module('LoginApp', ['ui.bootstrap']);

LoginApp.controller('LoginController', function($scope){
    $scope.alerts = [];

    $scope.submitForm = function () {
        if ($scope.loginForm.username.$invalid)
            $scope.alerts.push({ type: 'danger', msg: '用户名不能为空!' });
        if ($scope.loginForm.password.$invalid)
            $scope.alerts.push({ type: 'danger', msg: '密码不能为空!' });
        if ($scope.alerts.length)
            return;

        $scope.alerts = [{ type: 'success', msg: '登录成功' }];
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});