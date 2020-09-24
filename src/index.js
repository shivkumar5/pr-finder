const {fetchPullRequestDetails, fetchPullRequestFilesDetail, listPullRequestFiles } = require('./../api/github-api');

const findPullRequests = async (program) => {
   const pullRequests = await fetchPullRequestDetails(program.token, program.user,program.repo);
   const pullRequestsFileDetails = await fetchPullRequestFilesDetail(program.token,pullRequests);
   const pullRequestsFiles = await listPullRequestFiles(pullRequestsFileDetails);
   if (program.file) {
        pullRequestsFiles.forEach(pull => {
            pull.files.forEach(file => {
                if (file === program.file[0]) {
                    console.log({
                        pullRequests:pull.pull_request,
                        url:pull.url,
                        match:'true'
                    })
                }
            })
        })
   } else {
    console.log(pullRequestsFiles);
   }
}

module.exports = {findPullRequests}