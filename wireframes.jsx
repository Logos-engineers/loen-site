// wireframes.jsx — building blocks + 5 variations.
const { useState } = React;

const Phone = ({ children, accent, mute, ink, bg }) => (
  <div className="phone" style={{
    "--accent": accent, "--mute": mute, "--ink": ink, "--bg": bg, background: bg, color: ink,
  }}>
    <div className="statusbar">
      <span>9:41</span>
      <span style={{display:"flex", gap:6, alignItems:"center"}}>
        <span style={{display:"inline-block",width:14,height:7,border:`1px solid ${ink}`,opacity:.5,borderRadius:1}} />
        <span>●●●</span>
      </span>
    </div>
    {children}
  </div>
);

const Bar = ({ w="100%", h=8, c, op=.45, mt=0, mb=0, r=2 }) => (
  <div style={{ width:w, height:h, background:c||"var(--ink)", opacity:op, borderRadius:r, marginTop:mt, marginBottom:mb }} />
);
const TextLines = ({ count=3, last=70, gap=6, op=.4, h=6, c }) => (
  <div style={{display:"flex",flexDirection:"column",gap}}>
    {Array.from({length:count}).map((_,i)=>(
      <Bar key={i} h={h} w={i===count-1 ? `${last}%` : "100%"} op={op} c={c}/>
    ))}
  </div>
);
const PH = ({ h, ratio, label, style, mono }) => (
  <div className="ph" style={{ height:h, aspectRatio:ratio, fontFamily: mono?'ui-monospace,monospace':undefined, ...style }}>
    {label}
  </div>
);
const Chip = ({ children, active, ink, mute, accent }) => (
  <span style={{
    fontSize:10.5, padding:"4px 9px", borderRadius:999,
    border:`1px solid ${active?ink:mute}`,
    background: active ? ink : "transparent",
    color: active ? "var(--bg)" : ink,
    opacity: active ? 1 : .85,
    whiteSpace:"nowrap",
    fontWeight: active?500:400,
  }}>{children}</span>
);
const SectionLabel = ({ children, ink, accent, k="default" }) => (
  <div style={{
    fontSize:10.5, letterSpacing:".18em", textTransform:"uppercase", fontWeight:600,
    color:accent, opacity:.95, marginBottom:6,
  }}>{children}</div>
);
const HBig = ({ children, size=44, weight=600, lh=1.05, ls="-0.02em", style }) => (
  <div style={{ fontSize:size, fontWeight:weight, lineHeight:lh, letterSpacing:ls, fontFamily:"var(--font-head)", ...style }}>
    {children}
  </div>
);
const Btn = ({ children, ink, full, ghost }) => (
  <div style={{
    height:38, borderRadius: ghost ? 6 : 999, padding:"0 16px",
    background: ghost ? "transparent" : ink, color: ghost ? ink : "var(--bg)",
    border: ghost ? `1px solid ${ink}` : "none",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:12.5, fontWeight:500, width: full?"100%":"auto", letterSpacing:".01em",
  }}>{children}</div>
);

const Header = ({ kind, current, ink, mute, accent, churchName="○○교회" }) => {
  if (kind === "tabs") {
    return (
      <div style={{padding:"10px 16px 8px", borderBottom:`1px solid ${mute}`, background:"var(--bg)", flex:"0 0 auto"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
          <div style={{fontSize:11.5, fontWeight:600, letterSpacing:".06em"}}>{churchName} · 수련회</div>
          <div style={{fontSize:11, opacity:.5}}>···</div>
        </div>
        <div style={{display:"flex", gap:0, background:"transparent", borderBottom:`1px solid ${mute}`, marginBottom:-9, marginLeft:-16, marginRight:-16, paddingLeft:16, paddingRight:16}}>
          {["수련회 정보","굿즈","FAQ/공지"].map(l => (
            <div key={l} style={{
              padding:"7px 12px 9px", fontSize:11.5,
              borderBottom: l===current ? `2px solid ${ink}` : "2px solid transparent",
              fontWeight: l===current ? 600 : 400, opacity: l===current ? 1 : .55,
            }}>{l}</div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", flex:"0 0 auto"}}>
      <div style={{fontSize:11.5, letterSpacing:".06em", fontWeight:600}}>{churchName} · 수련회</div>
      <div style={{display:"flex", flexDirection:"column", gap:3}}>
        <div style={{width:18, height:1.5, background:ink}}/>
        <div style={{width:18, height:1.5, background:ink}}/>
      </div>
    </div>
  );
};

const A_Info = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="수련회 정보" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"24px 20px 70px", display:"flex", flexDirection:"column", gap:24}}>
      <div>
        <div style={{fontSize:11, letterSpacing:".22em", color:accent, fontWeight:600, marginBottom:14}}>2025 · AUTUMN · RETREAT</div>
        <HBig size={86} weight={500} ls="-0.04em" lh={.9}>reset.</HBig>
        <div style={{fontSize:13, marginTop:14, opacity:.78, lineHeight:1.55}}>마태복음 11:28<br/>“수고하고 무거운 짐 진 자들아 다 내게로 오라”</div>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", padding:"14px 0", borderTop:`1px solid ${mute}`, borderBottom:`1px solid ${mute}`}}>
        <div><div style={{fontSize:9.5, opacity:.5, letterSpacing:".15em"}}>DATE</div><div style={{fontSize:13, fontWeight:500, marginTop:3}}>11.14 — 11.16</div></div>
        <div><div style={{fontSize:9.5, opacity:.5, letterSpacing:".15em"}}>PLACE</div><div style={{fontSize:13, fontWeight:500, marginTop:3}}>양평 ○○수양관</div></div>
        <div><div style={{fontSize:9.5, opacity:.5, letterSpacing:".15em"}}>2NIGHTS</div><div style={{fontSize:13, fontWeight:500, marginTop:3}}>3일</div></div>
      </div>
      <PH h={210} label="포스터 이미지"/>
    </div>
  </Phone>
);

const A_Goods = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="굿즈" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"22px 20px 70px"}}>
      <SectionLabel accent={accent}>2025 RETREAT GOODS</SectionLabel>
      <HBig size={28} weight={500} ls="-0.02em">수련회 굿즈</HBig>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18}}>
        {[["티셔츠","S-XL"],["에코백","FREE"]].map(([n,o],i)=>(
          <div key={i} style={{display:"flex", flexDirection:"column", gap:6}}>
            <PH ratio="1" label={n}/>
            <div style={{fontSize:11.5, fontWeight:500}}>{n}</div>
          </div>
        ))}
      </div>
    </div>
  </Phone>
);

const A_Faq = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="FAQ/공지" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"22px 20px 70px"}}>
      <SectionLabel accent={accent}>HELP</SectionLabel>
      <HBig size={28} weight={500} ls="-0.02em">자주 묻는 질문</HBig>
    </div>
  </Phone>
);

window.RETREAT = {
  A: { Info: A_Info, Goods: A_Goods, Faq: A_Faq, name: "차분한 스크롤", note: "긴 호흡 · 큰 단어 · 위에서 아래로" },
  B: { Info: A_Info, Goods: A_Goods, Faq: A_Faq, name: "매거진 그리드", note: "에디토리얼 · 큰 숫자" },
  C: { Info: A_Info, Goods: A_Goods, Faq: A_Faq, name: "탭 세그먼트", note: "앱 같은 · 빠른 탐색" },
  D: { Info: A_Info, Goods: A_Goods, Faq: A_Faq, name: "타임라인 스파인", note: "시간 중심" },
  E: { Info: A_Info, Goods: A_Goods, Faq: A_Faq, name: "벤토 카드", note: "한눈에" },
};
