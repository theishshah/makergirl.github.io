window.instansive||(window.instansive=function(){"use strict";var n=[],t=0,i=!1,o=0,e=function(i){var o=setInterval(function(){var e=document.querySelectorAll(".instansive-widget");e.length>0&&(clearInterval(o),n=e,t=n.length,i())},100)},a=function(n,t){n.contentWindow&&n.contentWindow.postMessage("sizing:"+t,window.location.protocol+"//instansive.com")},s=function(){for(var i=0;t>i;i++)a(n[i],i)},r=function(t){if(t.origin==window.location.protocol+"//instansive.com"){var i=t.data.split(":");try{"sizing"==i[0]&&void 0!=n[parseInt(i[2])]&&(n[parseInt(i[2])].style.height=i[1]+"px")}catch(o){}}},c=function(n){if(n.origin==window.location.protocol+"//instansive.com"){var t=n.data.split(":");try{if("sizing_iid"==t[0]){var i=document.getElementById(t[2]);void 0!=i&&(i.style.height=t[1]+"px")}}catch(o){}}},d=function(){e(function(){for(var e=0;t>e;e++)n[e].onload=function(){o++,a(this,e)};var d=setInterval(function(){o>=t&&(clearInterval(d),i=!0,window.addEventListener?(window.addEventListener("message",r,!1),window.addEventListener("message",c,!0)):(window.attachEvent("onmessage",r),window.attachEvent("onmessage",c)),window.onresize=s,window.onload=s,s(),setInterval(function(){s()},5e3))},75)})};return d(),{refresh:function(){if(i)for(var o=0;t>o;o++)a(n[o],o)},reload:function(){d()}}}()),window.instansive.refresh();
