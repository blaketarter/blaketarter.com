module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				src: 'dev/js/scripts.js',
				dest: 'public/js/scripts.min.js'
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'dev/scss',
					cssDir: 'dev/css'
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'public/index.html': 'dev/index.html'
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'public/css/styles.min.css': 'dev/css/styles.css'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 5 version', 'ie 8', 'ie 9']
			},
			dist: {
				files: {
					'dev/css/styles.css': 'dev/css/pre_styles.css'
				}
			}
		},
		watch: {
			compass: {
				files: 'dev/scss/pre_styles.css',
				tasks: ['compass', 'autoprefixer', 'cssmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['uglify', 'compass', 'htmlmin', 'autoprefixer', 'cssmin', 'watch']);
	grunt.registerTask('build', ['uglify', 'compass', 'htmlmin', 'autoprefixer', 'cssmin']);
};
