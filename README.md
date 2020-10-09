# pr-finder

## Setup 

* Pull the repo using `git clone git@github.com:shivkumar5/pr-finder.git`
* Run `npm i`
* Login to github and go to profile settings, then Navigate to Personal Access tokens
* Click on generate new token and save the token.
* Create .env file from .env_sample and paste your Github token there.

## Example 
* To fetch pr from a repo corresponding to a file run ` ./bin/pr-finder -r YOUR_REPO -u USER_NAME -f FILE_PATH`
