/**
 * Created by madlord on 2016/11/29.
 */
'use strict';
const fs=require('fs');
const execSync = require('child_process').execSync;

function getGitOrigin() {
    let gitOrigin = '';
    try {
        let gitConfig = fs.readFileSync('./.git/config', 'utf-8'), m = gitConfig.match(/\[remote\s+"origin"]\s+url\s+=\s+(\S+)\s+/i);

        if (m) {
            gitOrigin = m[1];
        }
    } finally {
        return gitOrigin;
    }
}

function getHomeUrl(repo) {
    let url = '';
    try {
        let m = repo.match(/^git@(\S+)\.git$/i);
        if (m) {
            url = m[1].split(':').join('/');
        }
    } finally {
        return url;
    }
}

function shouldUseYarn() {
    try {
        execSync('yarn --version', {stdio: 'ignore'});
        return true;
    } catch (e) {
        return false;
    }
}

module.exports={
    getGitOrigin:getGitOrigin,
    getHomeUrl:getHomeUrl,
    shouldUseYarn:shouldUseYarn
}