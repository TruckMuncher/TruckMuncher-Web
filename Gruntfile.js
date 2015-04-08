/*
 This Gruntfile was generated by IBM DevOps Services.

 Grunt dependencies are required in the package.json
 file in order to build. Add the following devDependencies entries
 to your package.json file:

 "devDependencies": {
 "grunt": "~0.4.x",
 "grunt-contrib-jshint": "~0.7.2",
 "grunt-contrib-uglify": "^0.4.0",
 "grunt-contrib-concat": "^0.4.0",
 "grunt-contrib-qunit": "^0.5.0",
 "grunt-contrib-watch": "^0.6.1"
 }

 */
module.exports = function (grunt) {
    var jsVendorSourceFiles = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/lodash/lodash.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/base-64/base64.js',
        'bower_components/ng-resource/dist/ng-resource.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/chosen-angular/chosen.js',
        'bower_components/chosen/chosen.jquery.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-growl/build/angular-growl.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/ng-tags-input/ng-tags-input.js',
        'bower_components/angular-file-upload/angular-file-upload.js',
        'bower_components/es5-shim/es5-shim.js',
        'bower_components/color-thief/src/color-thief.js',
        'bower_components/spectrum/spectrum.js',
        'bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.js',
        'bower_components/angular-google-maps/dist/angular-google-maps.js',
        'bower_components/angulartics/dist/angulartics.min.js',
        'bower_components/angulartics/dist/angulartics-ga.min.js',
        'bower_components/ng-img-crop/compile/unminified/ng-img-crop.js'
    ];

    var globalConfig = {
        smartAdmin: 'smartAdmin',

        cssDest: 'public/stylesheets'


    };

    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),

        'concat': {
            options: {
                separator: ';'
            },
            vendorScripts: {
                src: [jsVendorSourceFiles],
                dest: 'public/js/vendorScripts.js'
            }
        },

        'uglify': {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dev: {
                files: {
                    'public/js/vendorScripts.js': ['<%= concat.vendorScripts.dest %>']
                }
            },
            prod: {
                files: {
                    'public/js/<%= pkg.name %>.js': ['public/js/<%= pkg.name %>.js'],
                    'public/js/vendorScripts.js': ['<%= concat.vendorScripts.dest %>']
                }
            }
        },

        'jshint': {
            files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        'less': {
            development: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    "<%= globalConfig.smartAdmin %>/UNMINIFIED_CSS/bootstrap.css": "<%= globalConfig.smartAdmin %>/LESS_FILES/bootstrap.less",
                    "<%= globalConfig.smartAdmin %>/UNMINIFIED_CSS/smartadmin-production.css": "<%= globalConfig.smartAdmin %>/LESS_FILES/smartadmin-production.less",
                    "<%= globalConfig.smartAdmin %>/UNMINIFIED_CSS/smartadmin-production-plugins.css": "<%= globalConfig.smartAdmin %>/LESS_FILES/smartadmin-production-plugins.less",
                    "<%= globalConfig.smartAdmin %>/UNMINIFIED_CSS/smartadmin-skins.css": "<%= globalConfig.smartAdmin %>/LESS_FILES/smartadmin-skin/smartadmin-skins.less"
                }
            }
        },
        'copy': {
            bower: {
                files: [
                    {
                        expand: true,
                        src: ['bower_components/chosen/chosen.min.css',
                            'bower_components/chosen/chosen-sprite.png',
                            'bower_components/chosen/chosen-sprite@2x.png',
                            'bower_components/angular-growl/build/angular-growl.min.css',
                            'bower_components/ng-tags-input/ng-tags-input.css',
                            'bower_components/ng-tags-input/ng-tags-input.bootstrap.css',
                            'bower_components/spectrum/spectrum.css',
                            'bower_components/ng-img-crop/compile/minified/ng-img-crop.css'
                        ],
                        dest: '<%= globalConfig.cssDest %>',
                        flatten: true
                    }
                ]
            }
        },
        // MINIFY CSS
        'cssmin': {
            minify: {
                expand: true,
                src: ['*.css', '!*.min.css'],
                dest: '<%= globalConfig.cssDest %>',
                cwd: '<%= globalConfig.smartAdmin %>/UNMINIFIED_CSS/',
                extDot: 'last',
                ext: '.min.css'
            }
        },
        'tsd':{
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: false,

                    // specify config file
                    config: 'app/tsd.json',

                    // experimental: options to pass to tsd.API
                    opts: {
                        // props from tsd.Options
                    }
                }
            }
        },
        'ts':{
            default:{
                files:{
                    'public/js/TruckMuncherApp.js': ['app/**/*.ts']
                },
                options:{
                    fast: 'never',
                    sourceMap: false
                }
            }
        },
        'watch': {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint'],
            less: {
                files: ['<%= globalConfig.smartAdmin %>/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            app: {
                files: ['app/**/*.ts'],
                tasks: ['ts:default']
            },
            vendorFiles: {
                files: ['Gruntfile.js'],
                tasks: ['concat:vendorScripts', 'copy:bower', 'uglify:dev']
            }
        },
        'karma': {
            //shared config
            options: {
                preprocessors: {
                    '**/*.jade': ['ng-jade2js']
                },
                logLevel: 'INFO',
                colors: true,
                port: 9876,
                plugins: [
                    'karma-junit-reporter',
                    'karma-ng-jade2js-preprocessor',
                    'karma-phantomjs-launcher',
                    'karma-jasmine',
                    'karma-growl-reporter'
                ],
                files: [
                    'public/js/vendorScripts.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'bower_components/google-maps-mock/google-maps-mock.js',
                    'bower_components/sinonjs/sinon.js',
                    'public/js/TruckMuncherApp.js',
                    'test/jasmine/**/*.js',
                    'views/**/*.jade'
                ],
                ngJade2JsPreprocessor: {
                    stripPrefix: 'views',
                    templateExtension: 'jade'
                },
                frameworks: [ 'jasmine'],
                browsers: ['PhantomJS'],
                basePath: ''
            },
            //run this one in dev
            unit: {
                reporters: ['dots', 'growl']
            },
            //run on CI
            continuous: {
                singleRun: true,
                reporters: ['dots', 'junit']
            }
        },
        'concurrent': {
            target: {
                tasks: ['karma:unit', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks("grunt-ts");

    // A test task.  Uncomment to use if you have tests
    // grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'ts:default', 'concat:vendorScripts', 'uglify:dev', 'copy:bower', 'less', 'cssmin']);
    grunt.registerTask('dev', ['concurrent:target']);
    grunt.registerTask('build-prod', ['jshint', 'ts:default', 'concat:vendorScripts', 'uglify:prod']);
    grunt.registerTask('update-bower-css', ['copy:bower']);

};