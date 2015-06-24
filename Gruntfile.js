module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Project Paths Configuration
         * ===============================
         */
        paths: {
            images: 'img',
            dist: 'dist',
            src: 'app',
            email: 'index.html',
            txt: 'index.txt',
            distDomain: '', 
        		sender: {
          		service: '',
          		user: '',
              pass: ''
        		},
        		recipients: {
          		name: '',
          		email: '',
          		subject: ''
        		}
        },

        /**
         * SCSS Compilation Tasks
         * ===============================
         */
        compass: {
            options: {
                sassDir: '<%= paths.src %>/scss',
                outputStyle: 'expanded',
                httpImagesPath: '/img/'
            },
            dev: {
                options: {
                    cssDir: '<%= paths.src %>/css',
                    imagesDir: '<%= paths.src %>/<%= paths.images %>',
                    noLineComments: false
                }
            },
            dist: {
                options: {
                    force: true,
                    cssDir: '<%= paths.dist %>/css',
                    imagesDir: '<%= paths.dist %>/<%= paths.images %>',
                    noLineComments: true,
                    assetCacheBuster: false,
                    outputStyle: "compact"
                }
            }
        },

        /**
         * Watch Task
         * ===============================
         */
        watch: {
            compass: {
                files: ['<%= paths.src %>/scss/**/*.scss'],
                tasks: ['compass:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= paths.src %>/<%= paths.email %>',
                    '<%= paths.src %>/css/{,*/}*.css',
                    '<%= paths.src %>/<%= paths.images %>/{,*/}*.{png,jpg,jpeg,gif}'
                ]
            }
        },

        /**
         * Server Tasks
         * ===============================
         */
        connect: {
            options: {
                open: true,
                hostname: 'localhost',
                port: 8000,
                livereload: 35729
            },
            dev: {
                options: {
                    base: '<%= paths.src %>',
                    index: '<%= paths.email %>'
                }
            },
            dist: {
                options: {
                    keepalive: true,
                    livereload: false,
                    base: '<%= paths.dist %>'
                }
            }
        },

        /**
         * Cleanup Tasks
         * ===============================
         */
        clean: {
            dist: ['<%= paths.dist %>']
        },

        /**
         * Images Optimization Tasks
         * ===============================
         */
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>/<%= paths.images %>',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= paths.dist %>/<%= paths.images %>'
                }]
            }
        },

        /**
         * Premailer Parser Tasks
         * ===============================
         */
        premailer: {
            options: {
                baseUrl: '<%= paths.distDomain %>'
            },
            plain: {
                options: {
                    mode: 'txt'
                },
                src: '<%= paths.src %>/<%= paths.email %>',
                dest: '<%= paths.dist %>/<%= paths.txt %>'
            },
            dist: {
                src: '<%= paths.src %>/<%= paths.email %>',
                dest: '<%= paths.dist %>/<%= paths.email %>'
            }
        },
        
         /**
         * Replacement Tasks
         * ===============================
         */
        replace: {
          imageDir: {
            src: '<%= paths.dist %>/index.html',
            dest: '<%= paths.dist %>/index.html', 
            replacements: [{
              from: '/img/', 
              to: '/'
            }]
          }
        },

        /**
         * Test Mailer Tasks
         * ===============================
         */
        nodemailer: {
            options: {
                transport: {
                    type: 'SMTP',
                    options: {
                        service: '<%= paths.sender.service  %>',
                        auth: {
                            user: '<%= paths.sender.user  %>',
                            pass: '<%= paths.sender.pass  %>'
                        }
                    }
                },
                message: {
                  subject: '<%= paths.recipients.subject  %>'
                },
                recipients: [
              		{
                		name: '<%= paths.recipients.name  %>',
                		email: '<%= paths.recipients.email %>'
              		}
            		]
            },
            dist: {
                src: ['<%= paths.dist %>/<%= paths.email %>']
            }
        },
        
        prompt: {
            target: {
                options: {
                    questions: [{
                        config: 'paths.recipients.name',
                        type: 'input',
                        message: 'Who should we send this to (name)?',
                        default: '<%= paths.recipients.name  %>'
                    },
                    {
                        config: 'paths.recipients.email',
                        type: 'input',
                        message: 'Who should we send this to (email)?',
                        default: '<%= paths.recipients.email  %>'
                    },
                    {
                        config: 'paths.recipients.subject',
                        type: 'input',
                        message: 'What is the subject?',
                        default: '<%= paths.recipients.subject  %>'
                    }]
                }
            }
        }

    });

    [
        'grunt-contrib-connect',
        'grunt-contrib-watch',
        'grunt-contrib-compass',
        'grunt-contrib-imagemin',
        'grunt-contrib-clean',
        'grunt-text-replace',
        'grunt-premailer',
        'grunt-prompt',
        'grunt-nodemailer',
    ].forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', 'serve');

    grunt.registerTask('serve', function (target) {
        
      if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist']);
      }
  
      grunt.task.run([
        'compass:dev',
        'connect:dev',
        'watch'
      ]);
    });

    grunt.registerTask('build', [
        'clean',
        'imagemin',
        'compass:dist',
        'premailer:dist',
        'premailer:plain',
        'replace'
    ]);

    grunt.registerTask('send', [
        'build',
        'prompt:target',
        'nodemailer'
    ]);

};
