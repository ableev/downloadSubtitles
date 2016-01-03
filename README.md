# downloadSubtitles
"smart" downloading of subtitles from [addic7ed](http://www.addic7ed.com) for exact tv show file.

Note! This script match your files in very specified regexp: `(.*)\.[Ss]([0-9]+)[Ee]([0-9]+)\.([0-9]+p)\.([A-Za-z-]+)\.(.*)\.([A-Za-z0-9]+)`


## Installation
You need:

 - node js
 - [same31/addic7ed-api](https://github.com/same31/addic7ed-api) lib

## Usage
I'm Mac OS X user, so I created [Automator](https://en.wikipedia.org/wiki/Automator_%28software%29) workflow for quick downloading subtitles directly in my file manager:
![Download Subtitles in Finder](http://ableev.com/wp-content/uploads/output_ok6Clr.gif)
Open Download Subtitles.workflow in Finder, click to "Install", "Open in Automator", change the path to your copy of downloadSubtitles.js and press "CMD+S" to save. 

If you are not Mac OS X user, you can use script for command line:
```
20:08:16 [reLosted] ~ $ cd Movies/The.Flash.2014.S02E03/

20:08:31 [reLosted] ~/Movies/The.Flash.2014.S02E03 $ ls
The.Flash.2014.S02E03.720p.HDTV.X264-DIMENSION.mkv

20:08:32 [reLosted] ~/Movies/The.Flash.2014.S02E03 $ ~/git/downloadSubtitles/downloadSubtitles.js The.Flash.2014.S02E03.720p.HDTV.X264-DIMENSION.mkv
Subtitles file saved to ./The.Flash.2014.S02E03.720p.HDTV.X264-DIMENSION.srt

20:08:56 [reLosted] ~/Movies/The.Flash.2014.S02E03 $ ls
The.Flash.2014.S02E03.720p.HDTV.X264-DIMENSION.mkv The.Flash.2014.S02E03.720p.HDTV.X264-DIMENSION.srt

```
