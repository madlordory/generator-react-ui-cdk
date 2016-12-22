var generators = require('yeoman-generator');
var utils = require('./utils/misc');
var _ = require('lodash');
var path =require('path');
module.exports = module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },


    /*
     *
     * 配置各种选项
     *
     * */
    prompting: function () {
        this.props = {};

        var done = this.async();



        var prompts = [
            {
                name: 'name',
                message: 'Your react component name',
                default: path.basename(process.cwd())// Default to current folder name
            },
            {
                name: 'description',
                default: 'awesome react component',
                message: 'description'
            },
            {
                name: 'repo',
                default: utils.getGitOrigin(),
                message: 'git repository'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someAnswer;

            done();
        }.bind(this));
    },

    configuring: {
        processParam:function () {
            this.componentName = this.props.name || '';
            this.prettyComponentName = this.componentName
                .split('-')
                .map(function (word) {
                    return _.capitalize(word);
                })
                .join(' ');

            this.githubUrl = this.props.repo || 'https://github.com/you/repo.git';
            this.description = this.props.description || this.prettyComponentName + ' Component';
        },
        copyDotFiles: function () {
            var self = this;
            [
                'babelrc',
                // 'eslintrc',
                'gitignore',
                'npmignore'
            ].forEach(function (fileName) {
                self.copy(fileName,  './.' + fileName);
            });
        },

        copyCoreFiles: function () {
            var self = this;
            [
                '.storybook/config.js',
                // '.scripts/mocha_runner.js',
                '.scripts/prepublish.sh',
                // '.scripts/get_gh_pages_url.js',
                // '.scripts/publish_storybook.sh',
                '.scripts/user/prepublish.sh',
                // '.scripts/user/pretest.js',
            ].forEach(function (fileName) {
                self.copy(fileName, './' + fileName);
            });
        },

        copyPackageJson: function () {
            var self = this;

            self.template(
                'package.json',
                './package.json',
                {
                    name: self.componentName,
                    description: self.description,
                    githubUrl: self.githubUrl
                }
            );
        },

        copyOtherFiles: function () {
            var self = this;
            self.template(
                'README.md',
                './README.md',
                {
                    name: self.prettyComponentName,
                    description: self.description
                }
            );


            // self.template(
            //   'CONTRIBUTING.md',
            //   '/CONTRIBUTING.md',
            //   { name: self.prettyComponentName }
            // );

            self.copy('LICENSE', './LICENSE');
        }
    },

    writing: {
        copySrcFiles: function () {
            var self = this;
            [
                'src/index.js',
                'src/stories/index.js',
                // 'src/tests/index.js'
            ].forEach(function (fileName) {
                self.copy(fileName, './' + fileName);
            });
        }
    },

    "install": function () {
        // this.npmInstall();
        let opt={
            cwd:this.destinationPath('./')
        };

        try {
            if (utils.shouldUseYarn()) {
                this.spawnCommandSync('yarn', [],opt);

            } else {
                this.spawnCommandSync('npm', ['install'],opt);
            }
            this.spawnCommandSync('npm', ['start'],opt);

        } catch (e) {
            console.error(e);
        }
        // this.spawnCommandSync('npm',['start'],opt);

    }
});
