import fetch from 'node-fetch';
const fetchPullRequestDetails = async (token, repo) => {
    const res = await fetch(`https://api.github.com/repos/${repo}/pulls`, {
        headers: {
            "Authorization": `token ${token}`
        }
    }).then(res => res.json());
    return res;

}

const fetchPullRequestFilesDetail = async (token, pulls) => {
    return await Promise.all(pulls.map(async pull => {
        return await fetch(pull.url + '/files', {
            headers: {
                "Authorization": `token ${token}`
            }
        }).then(async result => {
            return {
                pr: pull.number,
                filesData: await result.json()
            }
        })

    }));
}

const listPullRequestFiles = async (pulls) => {
    return await Promise.all(pulls.map(async pull => {
        return {
            pr: pull.pr,
            files: await Promise.all(pull.filesData.map(async file => {
                return file.filename
            }))
        }
    }))
}
export { fetchPullRequestDetails, fetchPullRequestFilesDetail, listPullRequestFiles }