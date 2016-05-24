function asyncLoop(n,r,e){var t=0,o=!1,a={next:function(){o||(n>t?(t++,r(a)):(o=!0,e()))},iteration:function(){return t-1},"break":function(){o=!0,e()}};return a.next(),a}function dump(n){var r="";for(var e in n)r+=e+"\n";alert(r)}function objtostr(n){var r="";for(var e in n)r+=e+": "+n[e]+",\n";return r}function Ajax(n,r,e,t){if("undefined"==typeof XMLHttpRequest)return!1;var o=new XMLHttpRequest;return o?(o.open(n,r,!1),o.setRequestHeader("Accept","text/plain"),o.setRequestHeader("Accept","text/html"),o.setRequestHeader("Content-Type","application/x-ww-form-urlencoded; charset=UTF-8"),o.onreadystatechange=function(){200==o.status?t&&t(o.responseText):console.error("ajax "+o.status)},o.send(e),!0):!1}function _internal_cmd(n,r){if("undefined"!=typeof r2cmd&&(hascmd=r2cmd),hascmd){if("undefined"==typeof r2plugin)return hascmd(n,r);r(r2cmd(n))}else Ajax("GET",r2.root+"/cmd/"+encodeURI(n),"",function(n){r&&r(n)})}var r2={},backward=!1,next_curoff=0,next_lastoff=0,prev_curoff=0,prev_lastoff=0,hascmd=!1;"undefined"!=typeof module&&(module.exports=function(n){return hascmd="function"==typeof n?n:n.cmd,r2}),r2.project_name="",r2.plugin=function(){console.error("r2.plugin is not available in this environment")};try{r2plugin&&(r2.plugin=r2plugin)}catch(e){}r2.root="",r2.analAll=function(){r2.cmd("aa",function(){})},r2.analOp=function(n,r){r2.cmd("aoj 1 @ "+n,function(n){try{r(JSON.parse(n)[0])}catch(e){console.error(e),r(n)}})},r2.varMap=[],r2.argMap=[],r2.assemble=function(n,r,e){var t=n?"@"+n:"";r2.cmd('"pa '+r+'"'+t,e)},r2.disassemble=function(n,r,e){var t=n?"@"+n:"",o="pi @b:"+r+t;r2.cmd(o,e)},r2.get_hexdump=function(n,r,e){r2.cmd("px "+r+"@"+n,e)},r2.get_disasm=function(n,r,e){r2.cmd("pD "+r+"@"+n,e)},r2.get_disasm_before=function(n,r,e){var t=[];r2.cmd("pdj -"+r+"@"+n,function(n){t=JSON.parse(n)}),e(t)},r2.get_disasm_after=function(n,r,e){var t=[];r2.cmd("pdj "+r+"@"+n,function(n){t=JSON.parse(n)}),e(t)},r2.get_disasm_before_after=function(n,r,e,t){var o=[],a=[];r2.cmd("pdj "+r+" @"+n,function(n){o=JSON.parse(n)}),r2.cmd("pdj "+e+"@"+n,function(n){a=JSON.parse(n)});var c=o.concat(a);t(c)},r2.Config=function(n,r,e){return"function"!=typeof r&&r?r2.cmd("e "+n+"="+r,e):r2.cmd("e "+n,e||r),r2},r2.sections={},r2.load_mmap=function(){r2.cmdj("iSj",function(n){void 0!==n&&null!==n&&(r2.sections=n)})},r2.get_address_type=function(n){var r=parseInt(n,16);for(var e in r2.sections)if(r>=r2.sections[e].addr&&r<r2.sections[e].addr+r2.sections[e].size)return r2.sections[e].flags.indexOf("x")>-1?"instruction":"memory";return""},r2.settings={},r2.load_settings=function(){r2.cmd("e asm.arch",function(n){r2.settings["asm.arch"]=n.trim()}),r2.cmd("e asm.bits",function(n){r2.settings["asm.bits"]=n.trim()}),r2.cmd("e asm.bytes",function(n){r2.settings["asm.bytes"]=toBoolean(n.trim())}),r2.cmd("e asm.flags",function(n){r2.settings["asm.flags"]=toBoolean(n.trim())}),r2.cmd("e asm.offset",function(n){r2.settings["asm.offset"]=toBoolean(n.trim())}),r2.cmd("e asm.lines",function(n){r2.settings["asm.lines"]=toBoolean(n.trim())}),r2.cmd("e asm.xrefs",function(n){r2.settings["asm.xrefs"]=toBoolean(n.trim())}),r2.cmd("e asm.cmtright",function(n){r2.settings["asm.cmtright"]=toBoolean(n.trim())}),r2.cmd("e asm.pseudo",function(n){r2.settings["asm.pseudo"]=toBoolean(n.trim())})},r2.flags={},r2.update_flags=function(){r2.cmd("fs *;fj",function(n){var r=JSON.parse(n);if(void 0!==r&&null!==r){r2.flags={};for(var e in r){var t="0x"+r[e].offset.toString(16);if(t=address_canonicalize(t),t in r2.flags){var o=r2.flags[t];o[o.length]={name:r[e].name,size:r[e].size},r2.flags[t]=o}else r2.flags[t]=[{name:r[e].name,size:r[e].size}]}}})},r2.get_flag_address=function(n){for(var r in r2.flags)for(var e in r2.flags[r])if(n==r2.flags[r][e].name)return r;return null},r2.get_flag_names=function(n){var r=[];for(var e in r2.flags[n])r[r.length]=r2.flags[n][e].name;return r},r2.set_flag_space=function(n,r){r2.cmd("fs "+n,r)},r2.get_flags=function(n){r2.cmd("fj",function(r){n(r?JSON.parse(r):[])})},r2.get_opcodes=function(n,r,e){r2.cmd("pdj @"+n+"!"+r,function(n){e(JSON.parse(n))})},r2.get_bytes=function(n,r,e){r2.cmd("pcj @"+n+"!"+r,function(n){e(JSON.parse(n))})},r2.asm_config={},r2.store_asm_config=function(){config={},r2.cmd("e",function(n){conf=n.split("\n");for(var r in conf){var e=conf[r].split(" ");3==e.length&&0==e[0].trim().indexOf("asm.")&&(config[e[0].trim()]=e[2].trim())}r2.asm_config=config})},r2.restore_asm_config=function(){cmd="";for(var n in r2.asm_config)cmd+="e "+n+"="+r2.asm_config[n]+";";r2.cmd(cmd,function(){})},r2.get_info=function(n){r2.cmd("ij",function(r){n(JSON.parse(r))})},r2.bin_relocs=function(n){r2.cmd("irj",function(r){n(JSON.parse(r))})},r2.bin_imports=function(n){r2.cmd("iij",function(r){n(JSON.parse(r))})},r2.bin_symbols=function(n){r2.cmd("isj",function(r){n(JSON.parse(r))})},r2.bin_sections=function(n){r2.cmd("iSj",function(r){n(JSON.parse(r))})},r2.cmds=function(n,r){function e(){void 0!=t&&0!=n.length&&(t=n[0],n=n.splice(1),r2.cmd(t,e),r&&r())}if(0!=n.length){var t=n[0];n=n.splice(1),r2.cmd(t,e)}},r2.cmd=function(n,r){if(Array.isArray(n)){var e=[],t=0;asyncLoop(n.length,function(r){_internal_cmd(n[t],function(n){t=r.iteration(),e[t]=n.replace(/\n$/,""),t++,r.next()})},function(){r(e)})}else _internal_cmd(n,r)},r2.cmdj=function(n,r){r2.cmd(n,function(n){try{r(JSON.parse(n))}catch(e){r(null)}})},r2.alive=function(n){r2.cmd("b",function(r){var e=!1;r&&r.length()>0&&(e=!0),n&&n(r)})},r2.getTextLogger=function(n){return"object"!=typeof n&&(n={}),n.last=0,n.events={},n.interval=null,r2.cmd("Tl",function(r){n.last=+r}),n.load=function(r){r2.cmd('"Tj '+(n.last+1)+'"',function(n){r&&r(JSON.parse(n))})},n.clear=function(n){r2.cmd("T-",n)},n.send=function(n,r){r2.cmd('"T '+n+'"',r)},n.refresh=function(r){n.load(function(e){for(var t=0;t<e.length;t++){var o=e[t];n.events.message({id:o[0],text:o[1]}),o[0]>n.last&&(n.last=o[0])}r&&r()})},n.autorefresh=function(r){function e(){return n.refresh(function(){}),"Logs"===r2ui.selected_panel?setTimeout(e,1e3*r):console.log("Not in logs :("),!0}return r?void(n.interval=setTimeout(e,1e3*r)):void(n.interval&&n.interval.stop())},n.on=function(r,e){return n.events[r]=e,n},n},r2.filter_asm=function(n,r){function e(n){return"p"==n[0]&&"d"==n[1]?!0:-1!=n.indexOf(";pd")}var t=backward?prev_curoff:next_curoff,o=backward?prev_lastoff:next_lastoff,a=n.split(/\n/g);r2.cmd("s",function(n){t=n});for(var c=a.length-1;c>0;c--){var i=a[c].match(/0x([a-fA-F0-9]+)/);if(i&&i.length>0){o=i[0].replace(/:/g,"");break}}if("afl"==r){for(var s="",c=0;c<a.length;c++){var f=a[c].replace(/\ +/g," ").split(/ /g);s+=f[0]+"  "+f[3]+"\n"}n=s}else if("f"==r[0]){if("s"==r[1]){for(var s="",c=0;c<a.length;c++){var f=a[c].replace(/\ +/g," ").split(/ /g),l="*"==f[1]?"*":" ",u=f[2]?f[2]:f[1];u&&(s+=f[0]+" "+l+" <a href=\"javascript:runcmd('fs "+u+"')\">"+u+"</a>\n")}n=s}}else if("i"==r[0]&&r[1]){for(var s="",c=0;c<a.length;c++){for(var d=a[c].split(/ /g),m="",p="",g=0;g<d.length;g++){var v=d[g].split(/=/);"addr"==v[0]&&(p=v[1]),"name"==v[0]&&(m=v[1]),"string"==v[0]&&(m=v[1])}s+=p+"  "+m+"\n"}n=s}return e(r)&&(n=n.replace(/function:/g,"<span style=color:green>function:</span>"),n=n.replace(/;(\s+)/g,";"),n=n.replace(/;(.*)/g,"// <span style='color:#209020'>$1</span>"),n=n.replace(/(bl|goto|call)/g,"<b style='color:green'>call</b>"),n=n.replace(/(jmp|bne|beq|js|jnz|jae|jge|jbe|jg|je|jl|jz|jb|ja|jne)/g,"<b style='color:green'>$1</b>"),n=n.replace(/(dword|qword|word|byte|movzx|movsxd|cmovz|mov\ |lea\ )/g,"<b style='color:#1070d0'>$1</b>"),n=n.replace(/(hlt|leave|iretd|retn|ret)/g,"<b style='color:red'>$1</b>"),n=n.replace(/(add|sbb|sub|mul|div|shl|shr|and|not|xor|inc|dec|sar|sal)/g,"<b style='color:#d06010'>$1</b>"),n=n.replace(/(push|pop)/g,"<b style='color:#40a010'>$1</b>"),n=n.replace(/(test|cmp)/g,"<b style='color:#c04080'>$1</b>"),n=n.replace(/(outsd|out|string|invalid|int |int3|trap|main|in)/g,"<b style='color:red'>$1</b>"),n=n.replace(/nop/g,"<b style='color:blue'>nop</b>"),n=n.replace(/(sym|fcn|str|imp|loc)\.([^:<(\\\/ \|)\->]+)/g,"<a href='javascript:r2ui.seek(\"$1.$2\")'>$1.$2</a>")),n=n.replace(/0x([a-zA-Z0-9]+)/g,"<a href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),backward?(prev_curoff=t,prev_lastoff=o):(next_curoff=t,next_lastoff=o,prev_curoff||(prev_curoff=next_curoff)),n};