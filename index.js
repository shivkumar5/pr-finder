
const { Command } = require('commander');
const dotenv = require('dotenv');
const { findPullRequests } = require('./src/index')

dotenv.config()
const program = new Command();
program
    .version('0.0.1')
    .option('-c, --count <number>', 'Number of pull request to search',30)
    .option('-f, --file <files...>', 'File to be searched')
    .requiredOption('-r, --repo <repository>', 'Gitub repo')
    .option('-l, --list', 'List pull request')
    .requiredOption('-u, --user <githubuser>', 'specify the name of user who create repo')
    .option('-a, --author <author>', 'Author of pull request')
    .option('-s --status <status>','Status of pull request','open')
    .option('-t, --token <github_token>', 'Github token for authentication', process.env['GITHUB_TOKEN']);

program.parse()
findPullRequests(program)

