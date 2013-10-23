module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dev: {
				options: {
					sassDir: 'sass',
					cssDir: 'public/stylesheets',
				}
			}
		},

		express: {
			options: {
				script: 'app.js'
			},
			dev: {
				options: {
					script: 'app.js',
					node_env: 'development',
				}
			}
		},

		simplemocha: {
			dev: {
				src: [ "test/*_test.js", "test/**/*_test.js"],
				options: {
					reporter: 'spec',
					slow: 200,
					timeout: 1000
				}
			},
			src: ['test/*_test.js', 'test/**/*_test.js']
		},

		watch: {
			simplemocha: {
				files: ['lib/*.js', 'test/*_test.js', 'test/**/*_test.js'],
				tasks: ['simplemocha:dev']
			},

			express: {
				files: [
					'app.js', 'lib/*.js', 'lib/**/*.js'
				],
				tasks: ['express:dev'],
				options: {
					nospawn: true,
					livereload: true
				}
			},

			compass: {
				files: ['sass/*.scss'],
				tasks: ['compass']
			},

			livereload: {
				options: {
					livereload: true,
				},
				files: [
					'public/stylesheets/*.css',
					'views/*.mustache'
				],
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('server', [ 'express:dev', 'watch' ])
};
