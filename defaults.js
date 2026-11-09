/* Стандартные значения и общий код. Админ-панель и сайт используют этот файл. */
var TEAM={name:'MYOU FK',logo:'logo.png'};  // положите logo.png рядом, если нужен логотип
var STATS=[['pac','СКО'],['sho','УДР'],['pas','ПАС'],['dri','ДРИ'],['def','ЗАЩ'],['phy','ФИЗ']];

document.head.insertAdjacentHTML('beforeend','<style>'+
':root{--bg:#0d0a14;--card:#1a1226;--line:#34244d;--p:#8b3dff;--p2:#c9a3ff;--tx:#f2ecff;--mut:#9a8bb5}'+
'*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 50% -10%,#2a1450,var(--bg) 60%);color:var(--tx);font:15px system-ui,sans-serif;min-height:100vh}'+
'header{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid var(--line);flex-wrap:wrap}header b{font-size:22px;letter-spacing:2px;color:var(--p2)}header nav{margin-left:auto;display:flex;gap:8px}'+
'main{max-width:1000px;margin:auto;padding:18px}h2{color:var(--p2);margin:22px 0 10px;font-size:18px;text-transform:uppercase;letter-spacing:1px}'+
'.box{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:14px}'+
'button,.btn{background:var(--p);color:#fff;border:0;border-radius:8px;padding:8px 14px;cursor:pointer;font:inherit;text-decoration:none}button.g{background:#2a1d3f}button.r{background:#7a1f3a}'+
'input,select{background:#110c1b;color:var(--tx);border:1px solid var(--line);border-radius:8px;padding:8px;font:inherit;max-width:100%}'+
'.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:6px 0}.row>input{flex:1;min-width:110px}.n{width:58px!important;min-width:0!important;flex:none!important}'+
'.match{display:flex;align-items:center;justify-content:center;gap:20px;text-align:center;flex-wrap:wrap}.logo{width:84px;height:84px;object-fit:contain;border-radius:50%;background:#110c1b;border:2px solid var(--line);display:inline-flex;align-items:center;justify-content:center}'+
'.vs{font-size:28px;font-weight:800;color:var(--p)}'+
'.pitch{position:relative;width:100%;max-width:420px;aspect-ratio:3/4;margin:auto;border-radius:14px;background:repeating-linear-gradient(0deg,#1f6b3a 0 10%,#237a42 10% 20%);border:3px solid #fff3}.pitch:before{content:"";position:absolute;left:0;right:0;top:50%;border-top:2px solid #fff4}'+
'.sl{position:absolute;transform:translate(-50%,-50%);text-align:center;width:70px}.sl i{display:block;width:38px;height:38px;line-height:38px;margin:auto;border-radius:50%;background:var(--p);font-style:normal;font-weight:700;border:2px solid #fff}.sl span{font-size:11px;background:#000a;border-radius:4px;padding:1px 4px}'+
'.dr{cursor:grab;touch-action:none;user-select:none}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}'+
'.fc{position:relative;padding:14px 12px;border-radius:16px 16px 40px 40px;text-align:center;background:linear-gradient(160deg,#5b21b6,#2a1054 55%,#8b3dff);border:2px solid var(--p2);box-shadow:0 6px 20px #8b3dff44}'+
'.fc .o{position:absolute;left:14px;top:12px;text-align:left;font-size:12px;color:var(--p2)}.fc .o b{display:block;font-size:34px;line-height:1;color:#fff}'+
'.fc img,.fc .ph{width:84px;height:84px;object-fit:cover;border-radius:50%;margin:0 0 4px auto;display:flex;align-items:center;justify-content:center;font-size:40px;background:#0006}'+
'.fc h3{margin:6px 0;font-size:16px;border-bottom:1px solid #fff4;padding-bottom:6px;text-transform:uppercase}.st{display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;font-size:14px;text-align:left;padding:0 6px}.st b{color:#fff}'+
'.mut{color:var(--mut)}.tag{display:inline-block;background:#2a1d3f;border-radius:6px;padding:2px 8px;font-size:12px;margin-right:4px}table{width:100%;border-collapse:collapse}td,th{padding:6px;text-align:left;border-bottom:1px solid var(--line)}'+
'</style>');

function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pn(P,id){return P.find(function(p){return p.id==id})}
/* Карточка: среднее по оценкам матчей; если оценок нет — стартовые значения. ОВР = среднее 6 параметров */
function card(p,R){
 var rs=R.filter(function(r){return r.player_id==p.id}),v={};
 STATS.forEach(function(s){var k=s[0];v[k]=rs.length?Math.round(rs.reduce(function(a,r){return a+(+r[k]||0)},0)/rs.length):(+p[k]||60)});
 return{v:v,n:rs.length,ovr:Math.round(STATS.reduce(function(a,s){return a+v[s[0]]},0)/6)}}
function cardHTML(p,R){var c=card(p,R);
 return '<div class="fc"><div class="o"><b>'+c.ovr+'</b>'+esc(p.pos)+'<br>#'+esc(p.number)+'</div>'+(p.photo?'<img src="'+esc(p.photo)+'">':'<div class="ph">👤</div>')+
 '<h3>'+esc(p.name)+'</h3><div class="st">'+STATS.map(function(s){return '<span><b>'+c.v[s[0]]+'</b> '+s[1]+'</span>'}).join('')+'</div><div class="mut" style="font-size:11px;margin-top:6px">оценённых матчей: '+c.n+'</div></div>'}
function pitch(m,P,edit){var L=Array.isArray(m.lineup)?m.lineup:[];
 return '<div class="pitch" id="pitch">'+L.map(function(l,i){var p=pn(P,l.pid);
 return '<div class="sl'+(edit?' dr':'')+'" data-i="'+i+'" style="left:'+l.x+'%;top:'+l.y+'%"><i>'+(p?esc(p.number):'?')+'</i><span>'+(p?esc(p.name):'—')+'</span></div>'}).join('')+'</div>'}
function nextMatch(M){return M.filter(function(m){return !m.played}).sort(function(a,b){return a.date>b.date?1:-1})[0]}
async function loadAll(sb){
 var g=async function(t){return (await sb.from(t).select('*')).data||[]};
 var r=await Promise.all([g('players'),g('matches'),g('ratings')]);return{P:r[0],M:r[1],R:r[2]}}
