const fetch = require('node-fetch');
const fetchPullRequestDetails = async (token,user, repo) => {
   return await fetch(`https://api.github.com/repos/${user}/${repo}/pulls`, {
        headers: {
            "Authorization": `token ${token}`
        }
    }).then( async res => res.json());
}

const fetchPullRequestFilesDetail = async (token, pulls) => {
    return await Promise.all(pulls.map(async pull => {
        return await fetch(pull.url + '/files', {
            headers: {
                "Authorization": `token ${token}`
            }
        }).then(async result => {
            return {
                pull_request: pull.number,
                url:pull.url,
                filesData: await result.json()
            }
        })

    }));
}

const listPullRequestFiles = async (pullRequestFilesData) => {
    return await Promise.all(pullRequestFilesData.map(async pullRequestFile => {
        return {
            pull_request: pullRequestFile.pull_request,
            url:pullRequestFile.url,
            files: await Promise.all(pullRequestFile.filesData.map(async file => {
                return file.filename
            }))
        }
    }))
}
module.exports = {fetchPullRequestDetails, fetchPullRequestFilesDetail, listPullRequestFiles }