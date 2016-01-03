#!/usr/bin/env node

var addic7edApi = require('addic7ed-api');

var full_path = process.argv[2];
var path_regex = /.*\//g;
var file = full_path;
var file_dir = "./";
if (full_path.indexOf('/') > -1) {
    var full_path_splitted = full_path.split('/');
    file = full_path_splitted[full_path_splitted.length-1];
    file_dir = path_regex.exec(full_path)[0];
}

var lang = 'eng';

var serie_regex = /(.*)\.[Ss]([0-9]+)[Ee]([0-9]+)\.([0-9]+p)\.([A-Za-z-]+)\.(.*)\.([A-Za-z0-9]+)/g;
// iZombie.S02E09.720p.HDTV.X264-DIMENSION.mkv
//    1.	`iZombie`
//    2.	`02`
//    3.	`09`
//    4.	`720p`
//    5.	`HDTV`
//    6.	`X264-DIMENSION`
//    7.	`mkv`

// The.Vampire.Diaries.S07E09.720p.WEB-DL.DD5.1.H264-RARBG.mkv
//    1.	[0-19]	`The.Vampire.Diaries`
//    2.	[21-23]	`07`
//    3.	[24-26]	`09`
//    4.	[27-31]	`720p`
//    5.	[32-38]	`WEB-DL`
//    6.	[39-55]	`DD5.1.H264-RARBG`
//    7.	[56-59]	`mkv`
var file_wo_extention_regex = /.*\./g;
var serie_match = serie_regex.exec(file);
var file_wo_extention = file_wo_extention_regex.exec(file)[0];
var subtitle_filename = file_dir + file_wo_extention + 'srt';

var show = serie_match[1];
var season = serie_match[2];
var episode = serie_match[3];
var version_torrents = serie_match[5].toUpperCase();

var last_updated_version = 0;
var last_updated_version_i = 0;

var version_map = {
    "HDTV": "(DIMENSION|LOL)",
    "WEB-DL": "WEB-DL"
};

var version_addicted = new RegExp(version_map[version_torrents]);

addic7edApi.search(show, season, episode, lang).then(function (subtitlesList) {
    var i;
    for (i = 0; i < subtitlesList.length; ++i) {
        s = subtitlesList[i];
        if (version_addicted.test(s['version'])) {
            s_link = s['link'].split('/');
            updated_version = s_link[s_link.length-1];
            if (updated_version > last_updated_version){
                last_updated_version = updated_version;
                last_updated_version_i = i;
            }
        }
    }

    var sub = subtitlesList[last_updated_version_i];
    if (sub) {
        addic7edApi.download(sub, subtitle_filename).then(function () {
            console.log('Subtitles file saved to ' + subtitle_filename);
        });
    }
});
