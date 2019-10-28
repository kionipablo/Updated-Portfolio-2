angular.module('sensitive', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'template/introduction.html'
            })
        .when('/file-structure',
            {
                templateUrl: 'template/file-structure.html',
                controller: 'fileStructureCtrl'
            })
        .when('/sass',
            {
                templateUrl: 'template/sass.html',
                controller: 'sassCtrl'
            })
        .when('/grunt',
            {
                templateUrl: 'template/grunt.html'
            })
        .when('/gulp',
            {
                templateUrl: 'template/gulp.html'
            })
        .when('/dependencies',
            {
                templateUrl: 'template/dependencies.html'
            })
        .when('/plugins',
            {
                templateUrl: 'template/plugins.html'
            })
        .when('/colors',
            {
                templateUrl: 'template/colors.html'
            })
        .when('/javascript-options',
            {
                templateUrl: 'template/javascript-options.html'
            })
        .when('/browser-support',
            {
                templateUrl: 'template/browser-support.html'
            })
        .when('/changelogs',
            {
                templateUrl: 'template/changelogs.html'
            });
})
    .controller('fileStructureCtrl', function () {
        //Js Tree
        var types = {
            'default': {
                'icon': 'fa fa-folder fa-fw'
            },
            'html': {
                'icon': 'fa fa-file-code-o fa-fw'
            },
            'json': {
                'icon': 'fa fa-file-text-o fa-fw'
            },
            'css': {
                'icon': 'fa fa-file-code-o fa-fw'
            },
            'scss': {
                'icon': 'fa fa-file-code-o fa-fw'
            },
            'img': {
                'icon': 'fa fa-file-image-o fa-fw'
            },
            'js': {
                'icon': 'fa fa-file-text-o fa-fw'
            }
        };

        var $treeView = $('.js-treeview');

        $treeView.on('open_node.jstree', function (e, data) {
            data.instance.set_icon(data.node, 'fa fa-folder-open fa-fw');
        });

        $treeView.on('close_node.jstree', function (e, data) {
            data.instance.set_icon(data.node, 'fa fa-folder fa-fw');
        });

        $treeView.jstree({
            'core': {
                'check_callback': true
            },
            'plugins': ['types', 'search'],
            'types': types
        });

        $('.js-searchbox').on('keyup', function () {
            var val = $(this).val();

            $treeView.jstree(true).search(val);
        });

    })
    .controller('sassCtrl', function () {
        //Js Tree
        var types = {
            'default': {
                'icon': 'fa fa-folder fa-fw'
            },
            'scss': {
                'icon': 'fa fa-file-code-o fa-fw'
            }
        };

        var $treeView = $('.js-treeview');

        $treeView.on('open_node.jstree', function (e, data) {
            data.instance.set_icon(data.node, 'fa fa-folder-open fa-fw');
        });

        $treeView.on('close_node.jstree', function (e, data) {
            data.instance.set_icon(data.node, 'fa fa-folder fa-fw');
        });

        $treeView.jstree({
            'core': {
                'check_callback': true
            },
            'plugins': ['types'],
            'types': types
        });

    })
    .run(function ($rootScope, $location) {
        $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
            var path = $location.$$path;

            $rootScope.url = path.replace('/', '');

            var title = '';
            if (path === '/') {
                title = 'INTRODUCTION';
            } else if (path === '/sass') {
                title = 'SASS & FOLDER STRUCTURES';
            } else {
                title = (path.replace('-', ' ').replace('/', '')).toUpperCase();
            }

            $rootScope.title = title;

            $('header ul li').removeClass('active');
            $('header ul li a[href="#' + path + '"]').parent().addClass('active');
        });
    });