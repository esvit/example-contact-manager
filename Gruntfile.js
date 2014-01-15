var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            theme: {
                files: [
                    {
                        expand: true,
                        src: ['assets/**', '!assets/less/**', 'favicon.png'],
                        dest: 'build/'
                    }
                ]
            }
        },
        less: {
            theme: {
                src: 'assets/less/theme.less',
                dest: 'assets/css/theme.css'
            }
        },
        requirejs: {
            frontend: {
                options: {
                    baseUrl: './app',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: {
                        start: "(function() {",
                        end: "require(['main']) }());"
                    },
                    mainConfigFile: 'config.js',
                    name: 'main',
                    include: ['requirejs'],
                    exclude: ['./views.js'],
                    out: 'build/js/main.min.js'
                }
            }
        },
        uglify: {
            frontend: {
                src: ['build/js/main.min.js'],
                dest: 'build/js/main.min.js'
            },
            options: {
                compress: false,
                mangle: false,
                preserveComments: false,
                beautify: {
                    ascii_only: true
                },
                sourceMappingURL: function (fileName) {
                    return fileName.replace(/^build\/js\//, '').replace(/\.js$/, '.map');
                },
                sourceMap: function (fileName) {
                    return fileName.replace(/\.js$/, '.map');
                }
            }
        },
        watch: {
            css: {
                files: 'assets/**/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['views/**/*.html'],
                tasks: ['i18nextract'],
                options: {
                    livereload: true
                }
            }
        },
        htmlmin: {
            backend: {
                files: {
                    'build/index.html': 'index.html'
                },
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost'
            },
            dev: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        replace: {
            admin: {
                src: 'build/index.html',
                overwrite: true,
                replacements: [
                    {
                        from: /<script src="(.*)\/require.js"(.*)><\/script>/gm,
                        to: '<script src="js/main.min.js"></script>'
                    },
                    {
                        from: '<script src="/bazalt.js"></script>',
                        to: ''
                    }
                ]
            }
        },
        i18nextract: {
            extract: {
                lang: ['en', 'ru'],
                src: ['views/**.html', 'index.html'],
                dest: './locale',
                extraSrc: [],
                prefix: 'theme-',
                safeMode: false
            }
        },
        ngTemplateCache: {
            views: {
                files: {
                    'build/views.js': './views/**.html'
                },
                options: {
                    trim: '.',
                    module: 'app'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-angular-translate');
    grunt.loadNpmTasks('grunt-hustler');

    grunt.registerTask('serve', [
        'copy:theme', 'connect:dev', 'watch'
    ]);
    return grunt.registerTask('default', [
        'ngTemplateCache', 'less:theme', 'copy:theme', 'requirejs', 'uglify', 'htmlmin', 'replace'
    ]);
};