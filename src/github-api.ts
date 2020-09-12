import fetch from 'node-fetch';
import { PullRequest, PullRequestFile } from '../@types';
const fetchPullRequestDetails = async (token:string | undefined, repo:string):Promise<PullRequest[]> => {
   return await fetch(`https://api.github.com/repos/${repo}/pulls`, {
        headers: {
            "Authorization": `token ${token}`
        }
    }).then( async res => res.json());
}

const fetchPullRequestFilesDetail = async (token:string | undefined, pulls:PullRequest[]):Promise<PullRequestFile[]> => {
    return await Promise.all(pulls.map(async pull => {
        return await fetch(pull.url + '/files', {
            headers: {
                "Authorization": `token ${token}`
            }
        }).then(async result => {
            return {
                pull_request: pull.number,
                filesData: await result.json()
            }
        })

    }));
}

const listPullRequestFiles = async (pullRequestFilesData:PullRequestFile[]) => {
    return await Promise.all(pullRequestFilesData.map(async pullRequestFile => {
        return {
            pull_request: pullRequestFile.pull_request,
            files: await Promise.all(pullRequestFile.filesData.map(async file => {
                return file.filename
            }))
        }
    }))
}
export { fetchPullRequestDetails, fetchPullRequestFilesDetail, listPullRequestFiles }