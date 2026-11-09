// PRVIH20 reklama (POST, karusel 1080x1350)
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const OLD = path.resolve(__dirname, '../old');
const { mark } = require(path.join(OLD, 'src/lib/brand.js'));
const OUT = path.resolve(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
const F = (n) => `file://${OLD}/public/fonts/${n}.css`;
const S = (n) => `file://${__dirname}/shots/${n}.jpg`;
const C = (n) => `file://${__dirname}/cards/${n}.png`;
const N = 9;

const T = {
  G: { bg: 'radial-gradient(120% 90% at 50% 0%, #2F6F5E 0%, #1B3F35 62%, #0F2A22 100%)', ink: '#F4EFE4', sub: 'rgba(244,239,228,.78)', acc: '#E6C887' },
  C: { bg: 'linear-gradient(180deg, #F7F3EA 0%, #F1EADC 100%)', ink: '#17241F', sub: '#55645E', acc: '#2F6F5E' },
  A: { bg: 'radial-gradient(120% 90% at 50% 0%, #E6C887 0%, #D3AE62 55%, #C29A50 100%)', ink: '#1B3F35', sub: 'rgba(27,63,53,.78)', acc: '#1B3F35' },
  N: { bg: 'radial-gradient(110% 80% at 50% 0%, #1E4A3F 0%, #12302A 55%, #0B1F1A 100%)', ink: '#F4EFE4', sub: 'rgba(244,239,228,.76)', acc: '#E6C887' },
};

function page(t, i, inner, extra = '') {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${F('fraunces')}"><link rel="stylesheet" href="${F('instrument-sans')}"><link rel="stylesheet" href="${F('instrument-serif')}">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{background:${t.bg};color:${t.ink};font-family:'Instrument Sans',sans-serif;position:relative;-webkit-font-smoothing:antialiased}
.ttl{font-family:'Fraunces',serif;font-weight:600;letter-spacing:-.022em;line-height:1.02}
.it{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:${t.acc};letter-spacing:0}
.sub{color:${t.sub};font-size:31px;line-height:1.38}
.kick{font-weight:600;font-size:26px;letter-spacing:.16em;text-transform:uppercase;color:${t.acc}}
.cnt{position:absolute;top:44px;right:56px;font-size:24px;font-weight:500;color:${t.sub};letter-spacing:.06em}
.swipe{position:absolute;bottom:48px;right:56px;font-size:26px;font-weight:500;color:${t.sub}}
.tag{display:inline-flex;align-items:center;gap:12px;padding:12px 24px;border-radius:99px;font-weight:600;font-size:23px;letter-spacing:.02em}
.ph{position:absolute;background:#0E1412;padding:12px;box-shadow:0 30px 60px rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.25)}
.ph img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.card{position:absolute;overflow:hidden;border-radius:6px;box-shadow:0 26px 50px rgba(0,0,0,.30),0 4px 10px rgba(0,0,0,.18)}
.card img{position:absolute;left:-4px;top:-4px;width:calc(100% + 8px);height:calc(100% + 8px);display:block}
.code{display:inline-block;border:3px dashed ${t.acc};border-radius:18px;padding:14px 40px;font-family:'Instrument Sans';font-weight:600;font-size:62px;letter-spacing:.16em;color:${t.ink}}
${extra}
</style></head><body>${inner}<div class="cnt">${i}/${N}</div></body></html>`;
}

// telefon: x,y = gornji levi ugao, w = širina; rot = rotacija
function phone(src, x, y, w, rot = 0, z = 1) {
  const h = Math.round((w - 24) * 768 / 432 + 24);
  return `<div class="ph" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${Math.round(w * 0.13)}px;transform:rotate(${rot}deg);z-index:${z}"><img src="${src}" style="border-radius:${Math.round(w * 0.11)}px"></div>`;
}
// kartica A6 (993x1408): x,y centar, w širina
function card(src, cx, cy, w, rot = 0, z = 1, ratio = 1408 / 993) {
  const h = Math.round(w * ratio);
  return `<div class="card" style="left:${cx - w / 2}px;top:${cy - h / 2}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z}"><img src="${src}"></div>`;
}
const seal = (s) => `<div style="width:${s}px;height:${s}px">${mark({ bg: 'none' })}</div>`;
const check = (c) => `<svg width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="${c}"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#1B3F35" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const slides = [];

// 1 — naslovna
slides.push(page(T.G, 1, `
<div style="position:absolute;top:92px;left:0;right:0;text-align:center">
  <div class="tag" style="background:#C9A45C;color:#1B3F35;letter-spacing:.14em;font-size:24px">AKCIJA · PRVIH 20 KLIJENATA</div>
  <div class="ttl" style="font-size:196px;color:#E6C887;margin-top:14px;line-height:.95">−30%</div>
  <div class="ttl" style="font-size:50px;margin-top:12px;line-height:1.08">na <span style="color:#fff">digitalnu pozivnicu</span><br>i planer proslave<br><span class="it" style="font-size:60px">kakve još niste videli</span></div>
</div>
${phone(S('eukaliptus-a'), 40, 636, 230, -14, 1)}
${phone(S('kraljevska-noc-a'), 226, 596, 240, -6, 2)}
${phone(S('maslina-b'), 420, 568, 250, 0, 4)}
${phone(S('akvarel-ruze-a'), 614, 596, 240, 6, 3)}
${phone(S('neon-18-a'), 810, 636, 230, 14, 1)}
<div style="position:absolute;left:0;right:0;top:1080px;display:flex;justify-content:center;align-items:center;gap:34px">
  <div class="code" style="font-size:52px;padding:12px 34px">PRVIH20</div>
  <div style="text-align:left">
    <div style="font-size:26px;color:rgba(244,239,228,.7)">paketi već od <s style="opacity:.75">5.900</s></div>
    <div class="ttl" style="font-size:76px;color:#E6C887;line-height:1">4.130 <span style="font-size:40px">din</span></div>
  </div>
</div>
<div class="swipe" style="bottom:52px">Prevucite →</div>
`, `.ph{box-shadow:0 30px 60px rgba(0,0,0,.45)}`));

// 2 — koverta
slides.push(page(T.C, 2, `
<div style="padding:100px 80px 0">
  <div class="kick">Pozivnica</div>
  <div class="ttl" style="font-size:76px;margin-top:16px">Gost dobije kovertu<br><span class="it" style="font-size:84px">sa voštanim pečatom</span></div>
  <div class="sub" style="margin-top:26px;max-width:860px">Otvori je jednim dodirom i vidi sve: imena, datum, program dana sa mapom i odbrojavanje.</div>
</div>
${phone(S('eukaliptus-a'), 110, 560, 380, -5, 1)}
${phone(S('eukaliptus-b'), 580, 520, 400, 4, 2)}
<div style="position:absolute;left:110px;top:1262px;width:380px;text-align:center;font-family:'Instrument Serif';font-style:italic;font-size:32px;color:#55645E">Stiže u koverti…</div>
<div style="position:absolute;left:600px;top:1262px;width:380px;text-align:center;font-family:'Instrument Serif';font-style:italic;font-size:32px;color:#55645E">…i otvara se ovako</div>
`));

// 3 — dizajni
{
  const g = [['sakura-a', 'Venčanje'], ['zimska-bajka-a', 'Venčanje'], ['bordo-magnolija-a', 'Venčanje'], ['prsten-a', 'Veridba'], ['sovica_baptism-a', 'Krštenje'], ['plavi-porcelan_baptism-a', 'Krštenje'], ['zirafica-b', '1. rođendan'], ['kruna-b', '18. rođendan']];
  let h = '';
  g.forEach(([s, l], i) => {
    const x = 70 + (i % 4) * 242; const y = 330 + Math.floor(i / 4) * 480;
    h += phone(S(s), x, y, 214) + `<div style="position:absolute;left:${x}px;top:${y + 400}px;width:214px;text-align:center;font-weight:600;font-size:25px;color:#1B3F35">${l}</div>`;
  });
  slides.push(page(T.A, 3, `
<div style="position:absolute;top:96px;left:0;right:0;text-align:center">
  <div class="kick">80+ dizajna</div>
  <div class="ttl" style="font-size:80px;margin-top:14px">Za svaku proslavu<br><span class="it" style="font-size:84px">po vašem ukusu</span></div>
</div>${h}`));
}

// 4 — brojevi za stolove
slides.push(page(T.C, 4, `
<div style="padding:96px 80px 0">
  <div class="kick">Štampa za stolove</div>
  <div class="ttl" style="font-size:80px;margin-top:14px">Brojevi za stolove<br><span class="it" style="font-size:84px">sa QR kodom za slike</span></div>
  <div class="sub" style="margin-top:24px;max-width:900px">20 dizajna, sami se oboje u boje vaše pozivnice. Odštampate kod kuće ili u štampariji.</div>
</div>
${card(C('rb-duga-0'), 175, 850, 320, -11, 1)}
${card(C('kb-pecat-0'), 350, 815, 350, -5, 2)}
${card(C('b-botanika-0'), 540, 800, 380, 1, 5)}
${card(C('gb-rozeta-0'), 730, 815, 350, 6, 3)}
${card(C('rb-veliki-broj-1'), 905, 850, 320, 12, 1)}
<div style="position:absolute;left:0;right:0;bottom:62px;text-align:center"><span class="tag" style="background:#1B3F35;color:#E6C887">U paketu „Sve na jednom mestu“</span></div>
`));

// 5 — slike gostiju (upload)
slides.push(page(T.G, 5, `
<div style="padding:96px 80px 0">
  <div class="kick">Slike gostiju</div>
  <div class="ttl" style="font-size:78px;margin-top:14px">Sve slike sa proslave<br><span class="it" style="font-size:84px">na jednom mestu</span></div>
</div>
${card(C('b-veliki-broj-2'), 245, 760, 330, -6, 2)}
<svg style="position:absolute;left:345px;top:560px;z-index:5" width="220" height="140" viewBox="0 0 220 140"><path d="M10 120 C 70 20, 150 10, 200 50" fill="none" stroke="#E6C887" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/><path d="M180 34 L204 52 L178 64" fill="none" stroke="#E6C887" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
${phone(S('up-1'), 480, 360, 320, 3, 3)}
${phone(S('up-3'), 750, 450, 285, 9, 2)}
<div style="position:absolute;left:80px;top:1080px;right:80px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">
  ${[['1', 'Gost skenira QR', 'sa svog stola'], ['2', 'Izabere slike', 'bez aplikacije i naloga'], ['3', 'Stižu vama', 'u punom kvalitetu']].map(([n, a, b]) => `<div style="background:rgba(244,239,228,.08);border:1px solid rgba(230,200,135,.35);border-radius:22px;padding:20px 22px"><div class="ttl" style="color:#E6C887;font-size:40px">${n}</div><div style="font-weight:600;font-size:27px;margin-top:4px">${a}</div><div style="font-size:23px;color:rgba(244,239,228,.72);margin-top:2px">${b}</div></div>`).join('')}
</div>
<div style="position:absolute;left:0;right:0;bottom:44px;text-align:center"><span class="tag" style="background:#C9A45C;color:#1B3F35">U svim paketima</span></div>
`));

// 6 — plan sale
slides.push(page(T.N, 6, `
<div style="position:absolute;top:92px;left:0;right:0;text-align:center">
  <div class="kick">Raspored sedenja</div>
  <div class="ttl" style="font-size:78px;margin-top:14px">Nacrtajte svoju salu<br><span class="it" style="font-size:82px">i smestite goste</span></div>
</div>
<div style="position:absolute;left:50px;top:316px;width:980px;height:824px">${hall()}</div>
<div style="position:absolute;left:80px;right:80px;top:1168px;text-align:center" class="sub">Prevucite gosta na sto, a raspored odštampajte za ulaz u salu.</div>
<div style="position:absolute;left:0;right:0;bottom:40px;text-align:center"><span class="tag" style="background:#C9A45C;color:#1B3F35;font-size:21px;padding:10px 22px">Paketi „Organizator“ i „Sve na jednom mestu“</span></div>
`));

// 7 — zahvalnice
slides.push(page(T.A, 7, `
<div style="position:absolute;top:96px;left:0;right:0;text-align:center">
  <div class="kick">Zahvalnice</div>
  <div class="ttl" style="font-size:80px;margin-top:14px">Za svakog gosta<br><span class="it" style="font-size:86px">sa njegovim imenom</span></div>
  <div class="sub" style="margin:22px auto 0;max-width:840px">Upišete goste jednom, a zahvalnice se same naprave, spremne za štampu.</div>
</div>
${card(C('kz-noc-1'), 175, 870, 320, -11, 1)}
${card(C('rz-monogram-2'), 350, 840, 350, -5, 3)}
${card(C('mz-veliko-hvala-0'), 540, 825, 380, 1, 5)}
${card(C('gz-botanika-3'), 730, 840, 350, 6, 4)}
${card(C('rz-konfete-1'), 905, 870, 320, 12, 2)}
<div style="position:absolute;left:0;right:0;bottom:62px;text-align:center"><span class="tag" style="background:#1B3F35;color:#E6C887">U paketu „Sve na jednom mestu“</span></div>
`));

// 8 — cene
{
  const rows = [['Pozivnica', 'Pozivnica, potvrde dolaska, slike gostiju', '5.900', '4.130', false], ['Organizator', 'Plus raspored sedenja, ček-lista i troškovi', '8.400', '5.880', true], ['Sve na jednom mestu', 'Plus brojevi za stolove, zahvalnice, foto-zid', '9.900', '6.930', false]];
  slides.push(page(T.C, 8, `
<div style="position:absolute;top:100px;left:0;right:0;text-align:center">
  <div class="kick">Cene sa kodom PRVIH20</div>
  <div class="ttl" style="font-size:74px;margin-top:14px">Plaćate jednom,<br><span class="it" style="font-size:80px">bez pretplate</span></div>
</div>
<div style="position:absolute;left:80px;right:80px;top:400px;display:flex;flex-direction:column;gap:30px">
${rows.map(([n, d, o, p, hi]) => `<div style="display:flex;align-items:center;justify-content:space-between;padding:36px 44px;border-radius:28px;background:${hi ? '#1B3F35' : '#fff'};color:${hi ? '#F4EFE4' : '#17241F'};box-shadow:0 14px 34px rgba(23,36,31,.10)">
  <div><div class="ttl" style="font-size:46px">${n}</div><div style="font-size:24px;margin-top:8px;color:${hi ? 'rgba(244,239,228,.75)' : '#55645E'}">${d}</div></div>
  <div style="text-align:right"><s style="font-size:26px;color:${hi ? 'rgba(244,239,228,.55)' : '#8A958F'}">${o}</s><div class="ttl" style="font-size:66px;color:${hi ? '#E6C887' : '#2F6F5E'};line-height:1">${p}</div><div style="font-size:21px;font-weight:600;letter-spacing:.08em;color:${hi ? 'rgba(244,239,228,.65)' : '#55645E'}">DIN</div></div>
</div>`).join('')}
</div>
<div style="position:absolute;left:0;right:0;bottom:92px;text-align:center;font-size:27px;color:#55645E;line-height:1.5">Pozivnicu pravite i uređujete besplatno.<br>Paket plaćate tek kad budete zadovoljni.</div>
`));
}

// 9 — poziv
slides.push(page(T.G, 9, `
<div style="position:absolute;top:250px;left:0;right:0;text-align:center">
  <div style="display:inline-block">${seal(170)}</div>
  <div class="ttl" style="font-size:92px;margin-top:30px">Budite među <span class="it" style="font-size:100px">prvih 20</span></div>
  <div class="sub" style="margin:30px auto 0;max-width:820px">Napravite pozivnicu besplatno i upišite kod pri registraciji:</div>
  <div class="code" style="margin-top:40px">PRVIH20</div>
  <div class="ttl" style="font-size:58px;margin-top:64px;color:#E6C887">eproslava.rs</div>
  <div style="font-size:26px;margin-top:16px;color:rgba(244,239,228,.7)">Link je u opisu profila · Popust važi za prvih 20 klijenata</div>
</div>
`));

function hall() {
  // SVG plan sale (pogled odozgo)
  const W = 980; const H = 800; const X0 = 30; const Y0 = 30; const X1 = W - 30; const Y1 = H - 30;
  const guestCol = ['#E7A9B3', '#A9C9C3', '#E6C887', '#B9C7E6', '#C9B6E0', '#F2C6A0'];
  let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const tables = [[170, 330, 1, 10], [170, 500, 2, 9], [170, 670, 3, 10], [810, 330, 4, 10], [810, 500, 5, 8], [810, 670, 6, 10], [345, 650, 7, 9], [635, 650, 8, 10]];
  const chairs = (cx, cy, filled, R, emptyGlow) => Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2; const x = (cx + Math.cos(a) * R).toFixed(1); const y = (cy + Math.sin(a) * R).toFixed(1);
    const on = emptyGlow ? i !== 7 : i < filled; const glow = emptyGlow && !on;
    return `${glow ? `<circle cx="${x}" cy="${y}" r="16" fill="#E6C887" opacity=".55"/>` : ''}<circle cx="${x}" cy="${y}" r="9.5" fill="${on ? guestCol[Math.floor(rnd() * guestCol.length)] : '#F6F0E2'}" stroke="${glow ? '#C9A45C' : on ? 'rgba(23,36,31,.25)' : '#C9B994'}" stroke-width="${glow ? 2.5 : 1.4}" ${glow ? 'stroke-dasharray="3 3"' : ''}/>`;
  }).join('');
  const flowers = (cx, cy) => `<path d="M${cx - 15} ${cy - 17} q15 8 30 0" stroke="#7FA37F" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="${cx - 8}" cy="${cy - 21}" r="5" fill="#E7A9B3"/><circle cx="${cx}" cy="${cy - 25}" r="5.5" fill="#FFFDF8" stroke="#E7A9B3" stroke-width="1.6"/><circle cx="${cx + 8}" cy="${cy - 21}" r="5" fill="#E7A9B3"/>`;
  let t = '';
  for (const [cx, cy, n, f] of tables) {
    const hi = n === 7;
    t += `${hi ? `<circle cx="${cx}" cy="${cy}" r="82" fill="url(#glowT)"/>` : ''}${chairs(cx, cy, f, 52, hi)}<circle cx="${cx}" cy="${cy}" r="39" fill="#FFFDF8" stroke="${hi ? '#C9A45C' : '#D8CBAA'}" stroke-width="${hi ? 4 : 2}"/><circle cx="${cx}" cy="${cy}" r="32" fill="none" stroke="#EFE6D3" stroke-width="1.5"/>${flowers(cx, cy)}<text x="${cx}" y="${cy + 21}" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="27" fill="#1B3F35">${n}</text>`;
  }
  // počasni sto
  let head = '';
  for (let i = 0; i < 8; i++) head += `<circle cx="${361 + i * 37}" cy="96" r="10" fill="${guestCol[i % 6]}" stroke="rgba(23,36,31,.25)" stroke-width="1.4"/>`;
  head += `<rect x="330" y="108" width="320" height="46" rx="10" fill="#FFFDF8" stroke="#C9A45C" stroke-width="3"/>`;
  head += `<path d="M345 156 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0" fill="none" stroke="#7FA37F" stroke-width="4" stroke-linecap="round"/>`;
  for (let i = 0; i < 8; i++) head += `<circle cx="${365 + i * 40}" cy="164" r="5" fill="${i % 2 ? '#FFFDF8' : '#E7A9B3'}"/>`;
  head += `<text x="490" y="139" text-anchor="middle" font-family="Instrument Serif" font-style="italic" font-size="27" fill="#2F6F5E">Mladenci</text>`;
  // podijum
  const spark = (x, y, s) => `<path d="M${x} ${y - s}L${x + s * .28} ${y - s * .28}L${x + s} ${y}L${x + s * .28} ${y + s * .28}L${x} ${y + s}L${x - s * .28} ${y + s * .28}L${x - s} ${y}L${x - s * .28} ${y - s * .28}Z" fill="#D9B464"/>`;
  let floor = `<circle cx="490" cy="400" r="138" fill="url(#danceG)" stroke="#C9A45C" stroke-width="3"/><circle cx="490" cy="400" r="124" fill="none" stroke="rgba(201,164,92,.5)" stroke-width="1.5" stroke-dasharray="3 7"/>`;
  floor += `<text x="490" y="398" text-anchor="middle" font-family="Instrument Serif" font-style="italic" font-size="36" fill="#8C6A2C">Plesni podijum</text><text x="490" y="434" text-anchor="middle" font-family="Instrument Sans" font-weight="600" font-size="15" letter-spacing="4" fill="#A38548">PRVI PLES</text>`;
  floor += spark(420, 325, 10) + spark(568, 470, 12) + spark(575, 322, 6) + spark(408, 478, 7);
  const extras = `
  <rect x="70" y="70" width="180" height="92" rx="14" fill="#2F6F5E"/>
  <text x="160" y="112" text-anchor="middle" font-family="Instrument Serif" font-style="italic" font-size="30" fill="#F4EFE4">Bend</text>
  <g fill="#E6C887"><path d="M150 124v22a7 6 0 1 1-4-5.5V128l20-4v17a7 6 0 1 1-4-5.5V131z"/></g>
  <path d="M730 70h180v100h-36v-62h-144z" fill="#8E6B47"/><path d="M734 74h172v92h-28v-62h-144z" fill="#A27B52"/>
  <text x="808" y="98" text-anchor="middle" font-family="Instrument Serif" font-style="italic" font-size="26" fill="#FFF6E6">Šank</text>
  <g><rect x="886" y="118" width="7" height="18" rx="3" fill="#3E6B5C"/><rect x="886" y="142" width="7" height="18" rx="3" fill="#C9A45C"/></g>
  <circle cx="290" cy="220" r="24" fill="#FFFDF8" stroke="#E7A9B3" stroke-width="3"/><circle cx="290" cy="220" r="15" fill="#F7E1E5"/><circle cx="290" cy="220" r="6" fill="#E7A9B3"/>
  <text x="290" y="266" text-anchor="middle" font-family="Instrument Serif" font-style="italic" font-size="22" fill="#8C6A2C">Torta</text>`;
  // zidovi, prozori, ulaz
  const DL = W / 2 - 62; const DR = W / 2 + 62;
  const walls = `
  <rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" rx="22" fill="url(#parquet)"/>
  <rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" rx="22" fill="url(#floorShade)"/>
  <path d="M${DL} ${Y1}H${X0 + 22}a22 22 0 0 1-22-22V${Y0 + 22}a22 22 0 0 1 22-22H${X1 - 22}a22 22 0 0 1 22 22V${Y1 - 22}a22 22 0 0 1-22 22H${DR}" fill="none" stroke="#E6C887" stroke-width="8" stroke-linecap="round"/>
  ${[230, 420, 600].map((y) => `<rect x="${X0 - 6}" y="${y}" width="12" height="76" rx="4" fill="#BFDCD5"/><rect x="${X1 - 6}" y="${y}" width="12" height="76" rx="4" fill="#BFDCD5"/>`).join('')}
  <path d="M${DL} ${Y1}l0 -58M${DR} ${Y1}l0 -58" stroke="#E6C887" stroke-width="3" stroke-linecap="round"/>
  <path d="M${DL} ${Y1 - 58}a58 58 0 0 1 58 58M${DR} ${Y1 - 58}a58 58 0 0 0 -58 58" fill="none" stroke="#E6C887" stroke-width="2" stroke-dasharray="4 5"/>
  <text x="${W / 2}" y="${H + 14}" text-anchor="middle" font-family="Instrument Sans" font-weight="600" font-size="18" letter-spacing="5" fill="#E6C887">ULAZ</text>
  <g transform="rotate(-6 ${DR + 48} ${Y1 - 36})"><rect x="${DR + 26}" y="${Y1 - 66}" width="46" height="56" rx="5" fill="#FFFDF8" stroke="#C9A45C" stroke-width="2.5"/>
  <path d="M${DR + 34} ${Y1 - 54}h30M${DR + 34} ${Y1 - 44}h24M${DR + 34} ${Y1 - 34}h28M${DR + 34} ${Y1 - 24}h20" stroke="#B9A57A" stroke-width="2"/></g>`;
  const lights = [[490, 400, 300], [170, 500, 210], [810, 500, 210]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#lamp)"/>`).join('');
  // oblačić za sto 7 + gost koji se prevlači
  const pop = `
  <g filter="url(#sh)"><rect x="240" y="530" width="262" height="50" rx="25" fill="#1B3F35"/></g>
  <path d="M335 579l10 12l10-12z" fill="#1B3F35"/>
  <text x="262" y="562" font-family="Fraunces" font-weight="600" font-size="21" fill="#F4EFE4">Sto 7 · Kumovi</text>
  <text x="482" y="561" text-anchor="end" font-family="Instrument Sans" font-weight="600" font-size="18" fill="#E6C887">9/10</text>
  <path d="M232 752 C 252 742, 268 712, 282 686" fill="none" stroke="#E6C887" stroke-width="3.5" stroke-dasharray="2 9" stroke-linecap="round"/>
  <g transform="rotate(-5 160 770)"><g filter="url(#sh)"><rect x="70" y="747" width="176" height="46" rx="23" fill="#2F6F5E"/></g>
  <circle cx="95" cy="770" r="10.5" fill="#E6C887"/><text x="114" y="777" font-family="Instrument Sans" font-weight="600" font-size="20" fill="#F4EFE4">Teodora K.</text></g>
  <path d="M226 774 l0 36 l9.5 -9.5 l7 15.5 l6.5 -3 l-7 -15.5 l13.5 0 z" fill="#FFFFFF" stroke="#17241F" stroke-width="2.2" stroke-linejoin="round"/>`;
  return `<svg width="${W}" height="${H + 24}" viewBox="0 0 ${W} ${H + 24}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="parquet" width="56" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="56" height="28" fill="#F1E6CF"/><rect width="28" height="14" fill="#ECDDC1"/><rect x="28" y="14" width="28" height="14" fill="#ECDDC1"/><path d="M0 0H56M0 14H56M28 0V28M0 0V28" stroke="#E0CDA8" stroke-width="1"/>
    </pattern>
    <radialGradient id="floorShade" cx="50%" cy="45%" r="72%"><stop offset="0" stop-color="#FFF8E8" stop-opacity=".5"/><stop offset=".75" stop-color="#FFF8E8" stop-opacity="0"/><stop offset="1" stop-color="#6B5230" stop-opacity=".22"/></radialGradient>
    <radialGradient id="danceG" cx="50%" cy="42%" r="62%"><stop offset="0" stop-color="#FFF9EA"/><stop offset="1" stop-color="#F1DDAE"/></radialGradient>
    <radialGradient id="lamp"><stop offset="0" stop-color="#FFF4D2" stop-opacity=".45"/><stop offset="1" stop-color="#FFF4D2" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowT"><stop offset=".55" stop-color="#E6C887" stop-opacity=".75"/><stop offset="1" stop-color="#E6C887" stop-opacity="0"/></radialGradient>
    <filter id="sh" x="-30%" y="-40%" width="160%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#0B1F1A" flood-opacity=".35"/></filter>
  </defs>
  ${walls}${lights}${extras}${floor}${head}${t}${pop}
  </svg>`;
}

(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
  for (let i = 0; i < slides.length; i++) {
    if (only && !only.includes(i + 1)) continue;
    const f = path.join(OUT, `s${i + 1}.html`); fs.writeFileSync(f, slides[i]);
    await pg.goto('file://' + f); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(500);
    await pg.screenshot({ path: path.join(OUT, String(i + 1).padStart(2, '0') + '.jpg'), type: 'jpeg', quality: 92 });
  }
  await b.close();
})();
