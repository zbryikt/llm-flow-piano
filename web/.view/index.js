 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (libLoader, version) {
      pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
if(!libLoader) {
  libLoader = {
    js: {url: {}},
    css: {url: {}},
    root: function(r) { libLoader._r = r; },
    _r: "/assets/lib",
    _v: "",
    version: function(v) { libLoader._v = (v ? "?v=" + v : ""); }
  }
  if(version) { libLoader.version(version); }
}























































































pug_html = pug_html + "\u003Chtml lang=\"zh-TW\"\u003E\u003Chead\u003E\u003Cmeta charset=\"UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Ctitle\u003EPiano Rhythm Game - 落下音符鋼琴遊戲\u003C\u002Ftitle\u003E\u003Cstyle type=\"text\u002Fcss\"\u003E*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Arial',sans-serif;background:linear-gradient(135deg,#667eea 0,#764ba2 100%);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;overflow:hidden}.container{width:90%;max-width:900px;margin:20px auto}h1{text-align:center;margin-bottom:20px;font-size:2.5em;text-shadow:2px 2px 4px rgba(0,0,0,0.3)}.controls{text-align:center;margin-bottom:20px}.controls button{padding:12px 30px;margin:0 10px;font-size:16px;border:0;border-radius:8px;background:#fff;color:#667eea;cursor:pointer;font-weight:bold;transition:all .3s;box-shadow:0 4px 6px rgba(0,0,0,0.2)}.controls button:hover{transform:translateY(-2px);box-shadow:0 6px 12px rgba(0,0,0,0.3)}.controls button:active{transform:translateY(0)}.score-display{text-align:center;margin-bottom:20px;font-size:1.2em;background:rgba(255,255,255,0.1);padding:15px;border-radius:10px;backdrop-filter:blur(10px);position:relative;min-height:80px}.score-display .score-item{margin:5px 0}.score-display .perfect{color:#4ade80}.score-display .good{color:#fbbf24}.score-display .miss{color:#f87171}.judgment{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2em;font-weight:bold;animation:judgment-fade .5s ease-out;pointer-events:none;text-shadow:2px 2px 4px rgba(0,0,0,0.5)}.judgment.judgment-perfect{color:#4ade80}.judgment.judgment-good{color:#fbbf24}.judgment.judgment-miss{color:#f87171}.game-area{background:rgba(0,0,0,0.3);border-radius:15px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,0.3);backdrop-filter:blur(10px)}.note-area{position:relative;width:100%;height:500px;background:rgba(0,0,0,0.2);border-radius:10px 10px 0 0;overflow:hidden;border-bottom:3px solid #fbbf24}.note-bar{position:absolute;width:50px;background:linear-gradient(180deg,#60a5fa 0,#3b82f6 100%);border-radius:5px;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid rgba(255,255,255,0.3)}.piano-container{position:relative;width:100%;height:150px;background:#1f2937;border-radius:0 0 10px 10px}.piano-key{position:absolute;bottom:0;cursor:pointer;transition:all .1s;user-select:none}.piano-key.piano-key-white{width:60px;height:150px;background:linear-gradient(180deg,#f9fafb 0,#e5e7eb 100%);border:2px solid #374151;border-radius:0 0 8px 8px}.piano-key.piano-key-white:hover{background:linear-gradient(180deg,#e5e7eb 0,#d1d5db 100%)}.piano-key.piano-key-white.active{background:linear-gradient(180deg,#93c5fd 0,#60a5fa 100%);transform:translateY(3px);box-shadow:inset 0 2px 8px rgba(0,0,0,0.3)}.piano-key.piano-key-black{width:36px;height:100px;background:linear-gradient(180deg,#374151 0,#1f2937 100%);border:2px solid #111827;border-radius:0 0 5px 5px;z-index:2}.piano-key.piano-key-black:hover{background:linear-gradient(180deg,#4b5563 0,#374151 100%)}.piano-key.piano-key-black.active{background:linear-gradient(180deg,#60a5fa 0,#3b82f6 100%);transform:translateY(2px)}.piano-key .key-label{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-size:12px;font-weight:bold;color:#374151}.piano-key.piano-key-black .key-label{color:#fff}.instructions{margin-top:20px;text-align:center;font-size:.9em;opacity:.8}.instructions p{margin:5px 0}@-moz-keyframes judgment-fade{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-70%) scale(1.5)}}@-webkit-keyframes judgment-fade{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-70%) scale(1.5)}}@-o-keyframes judgment-fade{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-70%) scale(1.5)}}@keyframes judgment-fade{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-70%) scale(1.5)}}\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv class=\"container\"\u003E\u003Ch1\u003EPiano Rhythm Game\u003C\u002Fh1\u003E\u003Cdiv class=\"controls\"\u003E\u003Cbutton id=\"start-btn\"\u003EStart\u003C\u002Fbutton\u003E\u003Cbutton id=\"stop-btn\"\u003EStop\u003C\u002Fbutton\u003E\u003Cbutton id=\"reset-btn\"\u003EReset\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"score-display\" id=\"score-display\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"game-area\"\u003E\u003Cdiv class=\"note-area\" id=\"note-area\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"piano-container\" id=\"piano-container\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"instructions\"\u003E\u003Cp\u003E白鍵: A S D F G H J K | 黑鍵: W E T Y U\u003C\u002Fp\u003E\u003Cp\u003E或使用滑鼠\u002F觸控點擊琴鍵\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cscript type=\"module\"\u003Evar soundEngine,ref$,piano,noteManager,game,myGame;soundEngine=function(e){e==null&&(e={});this.type=e.type||\"synth\";this.audioCtx=null;this.samples={};if(e.autoInit){this._initAudioCtx()}return this};soundEngine.prototype=(ref$=Object.create(Object.prototype),ref$.constructor=soundEngine,ref$._initAudioCtx=function(){var e;if(this.audioCtx){return}e=window.AudioContext||window.webkitAudioContext;return this.audioCtx=new e},ref$.noteToFreq=function(e){var t,n;t={C4:-9,\"C#4\":-8,D4:-7,\"D#4\":-6,E4:-5,F4:-4,\"F#4\":-3,G4:-2,\"G#4\":-1,A4:0,\"A#4\":1,B4:2,C5:3};n=t[e];if(n==null){return 440}return 440*Math.pow(2,n\u002F12)},ref$.playSynth=function(e,t){var n,i,o;t==null&&(t=.3);this._initAudioCtx();n=this.audioCtx.createOscillator();n.type=\"sine\";n.frequency.value=e;i=this.audioCtx.createGain();i.gain.value=0;n.connect(i);i.connect(this.audioCtx.destination);o=this.audioCtx.currentTime;i.gain.setValueAtTime(0,o);i.gain.linearRampToValueAtTime(.3,o+.01);i.gain.linearRampToValueAtTime(.2,o+.05);i.gain.setValueAtTime(.2,o+t-.05);i.gain.linearRampToValueAtTime(0,o+t);n.start(o);return n.stop(o+t)},ref$.playSample=function(e,t){t==null&&(t=.3);if(!this.samples[e]){return}this.samples[e].currentTime=0;return this.samples[e].play()},ref$.play=function(e,t){var n;t==null&&(t=.3);n=this.noteToFreq(e);if(this.type===\"synth\"){return this.playSynth(n,t)}else{return this.playSample(e,t)}},ref$);window.SoundEngine=soundEngine;piano=function(e,t){var n,i,o,s;t==null&&(t={});this.root=e;this.soundEngine=t.soundEngine||new SoundEngine;this.onKeyPress=t.onKeyPress||function(){};this.keys=[{note:\"C4\",key:\"A\",type:\"white\",pos:0},{note:\"C#4\",key:\"W\",type:\"black\",pos:.7},{note:\"D4\",key:\"S\",type:\"white\",pos:1},{note:\"D#4\",key:\"E\",type:\"black\",pos:1.8},{note:\"E4\",key:\"D\",type:\"white\",pos:2},{note:\"F4\",key:\"F\",type:\"white\",pos:3},{note:\"F#4\",key:\"T\",type:\"black\",pos:3.7},{note:\"G4\",key:\"G\",type:\"white\",pos:4},{note:\"G#4\",key:\"Y\",type:\"black\",pos:4.75},{note:\"A4\",key:\"H\",type:\"white\",pos:5},{note:\"A#4\",key:\"U\",type:\"black\",pos:5.8},{note:\"B4\",key:\"J\",type:\"white\",pos:6},{note:\"C5\",key:\"K\",type:\"white\",pos:7}];this.keyMap={};this.activeKeys={};for(n=0,o=(i=this.keys).length;n\u003Co;++n){s=i[n];this.keyMap[s.key]=s.note}this.init();return this};piano.prototype=(ref$=Object.create(Object.prototype),ref$.constructor=piano,ref$.init=function(){this.render();return this.setupEvents()},ref$.render=function(){var e,t,n,i,o,s,r=[];this.root.innerHTML=\"\";this.root.className=\"piano-container\";for(e=0,n=(t=this.keys).length;e\u003Cn;++e){i=t[e];o=document.createElement(\"div\");o.className=\"piano-key piano-key-\"+i.type;o.dataset.note=i.note;o.dataset.key=i.key;o.style.left=i.pos*60+\"px\";s=document.createElement(\"span\");s.className=\"key-label\";s.textContent=i.key;o.appendChild(s);r.push(this.root.appendChild(o))}return r},ref$.setupEvents=function(){var e,t,n,i,o=this;document.addEventListener(\"keydown\",function(e){return o.onKeydown.apply(o,[e])});document.addEventListener(\"keyup\",function(e){return o.onKeyup.apply(o,[e])});e=this.root.querySelectorAll(\".piano-key\");for(t=0,n=e.length;t\u003Cn;++t){i=e[t];i.addEventListener(\"mousedown\",s);i.addEventListener(\"touchstart\",r)}document.addEventListener(\"mouseup\",function(e){return o.releaseAllKeys()});return document.addEventListener(\"touchend\",function(e){return o.releaseAllKeys()});function s(e){return o.onMouseDown.apply(o,[e])}function r(e){return o.onTouchStart.apply(o,[e])}},ref$.onKeydown=function(e){var t,n;if(e.repeat){return}t=e.key.toUpperCase();n=this.keyMap[t];if(!n){return}return this.pressKey(n)},ref$.onKeyup=function(e){var t,n;t=e.key.toUpperCase();n=this.keyMap[t];if(!n){return}return this.releaseKey(n)},ref$.onMouseDown=function(e){var t;e.preventDefault();t=e.currentTarget.dataset.note;return this.pressKey(t)},ref$.onTouchStart=function(e){var t;e.preventDefault();t=e.currentTarget.dataset.note;return this.pressKey(t)},ref$.pressKey=function(e){var t;if(this.activeKeys[e]){return}this.activeKeys[e]=true;t=this.root.querySelector(\"[data-note='\"+e+\"']\");if(t){if(t!=null){t.classList.add(\"active\")}}this.soundEngine.play(e,.3);return this.onKeyPress(e)},ref$.releaseKey=function(e){var t;if(!this.activeKeys[e]){return}delete this.activeKeys[e];t=this.root.querySelector(\"[data-note='\"+e+\"']\");if(t){return t!=null?t.classList.remove(\"active\"):void 8}},ref$.releaseAllKeys=function(){var e,t=[];for(e in this.activeKeys){t.push(this.releaseKey(e))}return t},ref$);window.Piano=piano;noteManager=function(e,t){t==null&&(t={});this.root=e;this.speed=t.speed||200;this.fallDistance=500;this.notes=[];this.activeNotes=[];this.noteElements=[];this.startTime=null;this.isPlaying=false;this.onNoteHit=t.onNoteHit||function(){};this.fallTime=this.fallDistance\u002Fthis.speed*1e3;this.init();return this};noteManager.prototype=(ref$=Object.create(Object.prototype),ref$.constructor=noteManager,ref$.init=function(){return this.root.className=\"note-area\"},ref$.loadSong=function(e){this.notes=e.notes||[];this.title=e.title||\"Untitled\";return this.bpm=e.bpm||120},ref$.start=function(){if(this.isPlaying){return}this.isPlaying=true;this.startTime=Date.now();return this.update()},ref$.stop=function(){this.isPlaying=false;return this.clearNotes()},ref$.reset=function(){var e,t,n,i,o=[];this.stop();this.activeNotes=[];this.noteElements=[];this.clearNotes();for(e=0,n=(t=this.notes).length;e\u003Cn;++e){i=t[e];i.spawned=false;o.push(i.hitChecked=false)}return o},ref$.clearNotes=function(){this.root.innerHTML=\"\";return this.noteElements=[]},ref$.update=function(){var e,t=this;if(!this.isPlaying){return}e=Date.now()-this.startTime;this.spawnNotes(e);this.updateNotes(e);return requestAnimationFrame(function(){return t.update()})},ref$.spawnNotes=function(e){var t,n,i,o,s,r=[];for(t=0,i=(n=this.notes).length;t\u003Ci;++t){o=n[t];s=o.time-this.fallTime;if(e\u003E=s&&!o.spawned){this.createNoteElement(o);o.spawned=true;r.push(this.activeNotes.push(o))}}return r},ref$.createNoteElement=function(e){var t,n,i;t=document.createElement(\"div\");t.className=\"note-bar\";t.dataset.note=e.key;n=this.getKeyPosition(e.key);t.style.left=n+5+\"px\";i=e.duration\u002F1e3*this.speed;t.style.height=i+\"px\";t.style.top=\"0px\";this.root.appendChild(t);return this.noteElements.push({el:t,note:e})},ref$.updateNotes=function(e){var t,n,i,o,s,r,a=[];t=this.noteElements.length;while(t--){n=this.noteElements[t];i=n.note;o=n.el;s=e-(i.time-this.fallTime);r=s\u002Fthis.fallTime*this.fallDistance;o.style.top=r+\"px\";if(r\u003E=this.fallDistance&&!i.hitChecked){i.hitChecked=true;this.onNoteHit(i)}if(r\u003Ethis.fallDistance+100){this.root.removeChild(o);a.push(this.noteElements.splice(t,1))}}return a},ref$.getKeyPosition=function(e){var t,n;t={C4:0,\"C#4\":.7,D4:1,\"D#4\":1.8,E4:2,F4:3,\"F#4\":3.7,G4:4,\"G#4\":4.75,A4:5,\"A#4\":5.8,B4:6,C5:7};n=t[e]||0;return n*60},ref$.getCurrentTime=function(){if(!this.startTime){return 0}return Date.now()-this.startTime},ref$);window.NoteManager=noteManager;game=function(e){e==null&&(e={});this.pianoRoot=e.pianoRoot;this.noteRoot=e.noteRoot;this.scoreRoot=e.scoreRoot;this.soundEngine=null;this.piano=null;this.noteManager=null;this.score=0;this.combo=0;this.maxCombo=0;this.perfectCount=0;this.goodCount=0;this.missCount=0;this.pendingJudgments=[];this.init();return this};game.prototype=(ref$=Object.create(Object.prototype),ref$.constructor=game,ref$.init=function(){var t=this;this.soundEngine=new SoundEngine({autoInit:false});this.piano=new Piano(this.pianoRoot,{soundEngine:this.soundEngine,onKeyPress:function(e){return t.onKeyPress.apply(t,[e])}});return this.noteManager=new NoteManager(this.noteRoot,{speed:200,onNoteHit:function(e){return t.onNoteHit.apply(t,[e])}})},ref$.loadSong=function(e){return this.noteManager.loadSong(e)},ref$.start=function(){this.resetScore();this.noteManager.start();return this.updateScoreDisplay()},ref$.stop=function(){return this.noteManager.stop()},ref$.reset=function(){this.stop();this.noteManager.reset();return this.resetScore()},ref$.resetScore=function(){this.score=0;this.combo=0;this.maxCombo=0;this.perfectCount=0;this.goodCount=0;this.missCount=0;this.pendingJudgments=[];return this.updateScoreDisplay()},ref$.onNoteHit=function(e){return this.pendingJudgments.push({note:e,hitTime:this.noteManager.getCurrentTime(),judged:false})},ref$.onKeyPress=function(e){var t,n,i,o,s,r,a,u;t=this.noteManager.getCurrentTime();n=null;i=Infinity;for(o=0,r=(s=this.pendingJudgments).length;o\u003Cr;++o){a=s[o];if(a.judged){continue}if(a.note.key!==e){continue}u=Math.abs(t-a.note.time);if(u\u003Ci){i=u;n=a}}if(n){return this.judgeHit(n,i)}},ref$.judgeHit=function(e,t){e.judged=true;if(t\u003C=50){this.addScore(\"perfect\");return this.showJudgment(\"PERFECT\")}else if(t\u003C=100){this.addScore(\"good\");return this.showJudgment(\"GOOD\")}else{this.addScore(\"miss\");return this.showJudgment(\"MISS\")}},ref$.addScore=function(e){switch(e){case\"perfect\":this.perfectCount++;this.combo++;this.score+=100*(1+this.combo*.1);break;case\"good\":this.goodCount++;this.combo++;this.score+=50;break;case\"miss\":this.missCount++;this.combo=0}this.maxCombo=Math.max(this.maxCombo,this.combo);return this.updateScoreDisplay()},ref$.showJudgment=function(e){var t;if(!this.scoreRoot){return}t=document.createElement(\"div\");t.className=\"judgment judgment-\"+e.toLowerCase();t.textContent=e;this.scoreRoot.appendChild(t);return setTimeout(function(){return t!=null?t.remove():void 8},500)},ref$.updateScoreDisplay=function(){if(!this.scoreRoot){return}return this.scoreRoot.innerHTML='\u003Cdiv class=\"score-item\"\u003EScore: '+Math.floor(this.score)+'\u003C\u002Fdiv\u003E\\n\u003Cdiv class=\"score-item\"\u003ECombo: '+this.combo+'\u003C\u002Fdiv\u003E\\n\u003Cdiv class=\"score-item\"\u003E\\n  \u003Cspan class=\"perfect\"\u003EPerfect: '+this.perfectCount+'\u003C\u002Fspan\u003E \u002F\\n  \u003Cspan class=\"good\"\u003EGood: '+this.goodCount+'\u003C\u002Fspan\u003E \u002F\\n  \u003Cspan class=\"miss\"\u003EMiss: '+this.missCount+\"\u003C\u002Fspan\u003E\\n\u003C\u002Fdiv\u003E\"},ref$);window.Game=game;myGame=new Game({pianoRoot:document.getElementById(\"piano-container\"),noteRoot:document.getElementById(\"note-area\"),scoreRoot:document.getElementById(\"score-display\")});fetch(\"\u002Fassets\u002Fdata\u002Fsongs\u002Fdemo.json\").then(function(e){return e.json()}).then(function(e){return myGame.loadSong(e)});document.getElementById(\"start-btn\").addEventListener(\"click\",function(){return myGame.start()});document.getElementById(\"stop-btn\").addEventListener(\"click\",function(){return myGame.stop()});document.getElementById(\"reset-btn\").addEventListener(\"click\",function(){return myGame.reset()});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 