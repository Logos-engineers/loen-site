// wireframes.jsx — building blocks + 5 variations.
// Each variation exposes { Info, Goods, Faq } screens at mobile width.
// Sketchy wireframe vibe: dashed image placeholders, gray text-line bars,
// real Korean copy only on key labels (titles / sections / CTAs / chips).

const { useState } = React;

/* ─────────────────────── primitives ─────────────────────── */

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

/* ────────────────────── chrome (header / nav) ────────────────────── */

// header tweak: 'hamburger' | 'tabs' | 'bottomnav'
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
  // hamburger (default)
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

/* ════════════════ VARIATION A · 차분한 스크롤 ════════════════ */

const A_Info = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="수련회 정보" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"24px 20px 70px", display:"flex", flexDirection:"column", gap:24}}>
      <div>
        <div style={{fontSize:11, letterSpacing:".22em", color:accent, fontWeight:600, marginBottom:14}}>2025 · AUTUMN · RETREAT</div>
        <HBig size={86} weight={500} ls="-0.04em" lh={.9}>reset.</HBig>
        <div style={{fontSize:13, marginTop:14, opacity:.78, lineHeight:1.55}}>
          마태복음 11:28<br/>
          “수고하고 무거운 짐 진 자들아 다 내게로 오라”
        </div>
      </div>

      <div style={{display:"flex", justifyContent:"space-between", padding:"14px 0", borderTop:`1px solid ${mute}`, borderBottom:`1px solid ${mute}`}}>
        <div><div style={{fontSize:9.5, opacity:.5, letterSpacing:".15em"}}>DATE</div><div style={{fontSize:13, fontWeight:500, marginTop:3}}>11.14 — 11.16</div></div>
        <div><div style={{fontSize:9.5, opacity:.5, letterSpacing:".15em"}}>PLACE</div><div style={{fontSize:13, fontWeight:500, marginTop:3}}>양평 ○○수양관</div></div>
        <div><div style={{fontSize:9.5, opacity:.5, letterSpacing:".15em"}}>2NIGHTS</div><div style={{fontSize:13, fontWeight:500, marginTop:3}}>3일</div></div>
      </div>

      <PH h={210} label="포스터 이미지"/>

      <div>
        <SectionLabel accent={accent}>일정</SectionLabel>
        <div style={{display:"flex", flexDirection:"column", gap:10, marginTop:8}}>
          {["DAY 01 · 11.14 (금)","DAY 02 · 11.15 (토)","DAY 03 · 11.16 (일)"].map((d,i)=>(
            <div key={i} style={{padding:"10px 0", borderBottom:`1px solid ${mute}`, display:"flex", justifyContent:"space-between"}}>
              <span style={{fontSize:12, fontWeight:500}}>{d}</span>
              <span style={{fontSize:11, opacity:.5}}>자세히 →</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel accent={accent}>오시는 길</SectionLabel>
        <PH h={120} label="MAP"/>
        <div style={{marginTop:8}}><TextLines count={2} last={60} h={5} op={.35}/></div>
      </div>

      <div>
        <SectionLabel accent={accent}>준비물</SectionLabel>
        <div style={{display:"flex", flexWrap:"wrap", gap:6, marginTop:8}}>
          {["성경","개인 컵","세면도구","편한 옷","필기구","담요"].map(t=>
            <Chip key={t} ink={ink} mute={mute}>{t}</Chip>
          )}
        </div>
      </div>

      <div style={{marginTop:6}}>
        <Btn full ink={ink}>신청하기 →</Btn>
        <div className="scribble" style={{marginTop:6, fontSize:12, textAlign:"center"}}>· 마감: 11.07 (금) ·</div>
      </div>
    </div>
  </Phone>
);

const A_Goods = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="굿즈" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"22px 20px 70px"}}>
      <SectionLabel accent={accent}>2025 RETREAT GOODS</SectionLabel>
      <HBig size={28} weight={500} ls="-0.02em">수련회 굿즈</HBig>
      <div style={{fontSize:11.5, opacity:.6, marginTop:6}}>전원 무료 · 사전 신청 후 현장 수령</div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18}}>
        {[
          ["티셔츠","S · M · L · XL"],
          ["에코백","FREE"],
          ["스티커 팩","6종"],
          ["수련회 노트","A5"],
        ].map(([n,o],i)=>(
          <div key={i} style={{display:"flex", flexDirection:"column", gap:6}}>
            <PH ratio="1" label={n}/>
            <div style={{fontSize:11.5, fontWeight:500}}>{n}</div>
            <div style={{fontSize:10, opacity:.5}}>{o}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop:22, padding:"14px 14px", border:`1px solid ${mute}`, borderRadius:8}}>
        <div style={{fontSize:11.5, fontWeight:500, marginBottom:6}}>나의 신청 내역</div>
        <TextLines count={2} last={50} h={5} op={.35}/>
      </div>

      <div style={{marginTop:18}}><Btn full ink={ink}>굿즈 신청하기</Btn></div>
    </div>
  </Phone>
);

const A_Faq = ({ ink, mute, accent, bg, header }) => {
  const items = [
    ["참가비는 얼마인가요?", true],
    ["식사는 모두 제공되나요?", false],
    ["가족과 함께 참가할 수 있나요?", false],
    ["환불은 가능한가요?", false],
    ["밤에 자유시간이 있나요?", false],
  ];
  return (
    <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
      <Header kind={header} current="FAQ/공지" ink={ink} mute={mute} accent={accent}/>
      <div className="scroll" style={{padding:"22px 20px 70px"}}>
        <SectionLabel accent={accent}>HELP</SectionLabel>
        <HBig size={28} weight={500} ls="-0.02em">자주 묻는 질문</HBig>

        <div style={{display:"flex", gap:6, marginTop:16, marginBottom:6}}>
          <Chip active ink={ink} mute={mute}>FAQ</Chip>
          <Chip ink={ink} mute={mute}>공지사항</Chip>
        </div>

        <div style={{marginTop:10}}>
          {items.map(([q,open],i)=>(
            <div key={i} style={{padding:"14px 0", borderBottom:`1px solid ${mute}`}}>
              <div style={{display:"flex", justifyContent:"space-between", gap:8}}>
                <div style={{fontSize:12.5, fontWeight:500, lineHeight:1.4}}>Q. {q}</div>
                <div style={{opacity:.5, fontSize:14, transform: open?"rotate(45deg)":"none", transition:"transform .15s"}}>+</div>
              </div>
              {open && (
                <div style={{marginTop:8, padding:"10px 12px", background:mute, opacity:.85, borderRadius:6}}>
                  <TextLines count={3} last={55} h={5} op={.5}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
};

/* ════════════════ VARIATION B · 매거진 그리드 ════════════════ */

const B_Info = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="수련회 정보" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"6px 16px 70px"}}>
      <div style={{borderTop:`2px solid ${ink}`, borderBottom:`1px solid ${ink}`, padding:"6px 0 4px", display:"flex", justifyContent:"space-between", fontSize:9.5, letterSpacing:".15em", textTransform:"uppercase", fontWeight:600}}>
        <span>Issue 02</span><span>2025 · 가을</span><span>₩ 0</span>
      </div>

      <div style={{margin:"22px 0 6px"}}>
        <HBig size={104} weight={400} ls="-0.05em" lh={.86}>RESET</HBig>
        <HBig size={26} weight={500} ls="-0.02em" style={{marginTop:8}}>reset, 다시 시작하기 위하여</HBig>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, padding:"14px 0", borderTop:`1px solid ${ink}`, borderBottom:`1px solid ${ink}`, marginTop:12}}>
        <div>
          <div style={{fontSize:9, opacity:.55, letterSpacing:".18em"}}>DATE</div>
          <div style={{fontSize:18, fontWeight:500, marginTop:4, letterSpacing:"-.01em"}}>11.14<span style={{opacity:.4}}>—</span>11.16</div>
        </div>
        <div>
          <div style={{fontSize:9, opacity:.55, letterSpacing:".18em"}}>PLACE</div>
          <div style={{fontSize:13, fontWeight:500, marginTop:6, lineHeight:1.35}}>양평 ○○수양관<br/><span style={{opacity:.5}}>경기도 양평군 ...</span></div>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:10, marginTop:18}}>
        <PH h={190} label="MAIN POSTER"/>
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <PH ratio="1" label="이미지"/>
          <PH ratio="1" label="이미지"/>
        </div>
      </div>

      <div style={{marginTop:22, paddingTop:14, borderTop:`1px solid ${mute}`}}>
        <div style={{fontSize:9.5, letterSpacing:".15em", color:accent, fontWeight:600}}>FEATURE · 주제 말씀</div>
        <HBig size={20} weight={500} style={{marginTop:6}}>마태복음 11:28—30</HBig>
        <div style={{marginTop:10, fontSize:12.5, lineHeight:1.6, opacity:.78}}>
          “수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라.”
        </div>
      </div>

      <div style={{marginTop:24, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
        {["DAY 01","DAY 02","DAY 03"].map((d,i)=>(
          <div key={i} style={{aspectRatio:"3/4", border:`1px solid ${ink}`, padding:"10px 8px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div style={{fontSize:9, letterSpacing:".18em", fontWeight:600}}>{d}</div>
            <div>
              <div style={{fontSize:9, opacity:.55}}>{["11.14","11.15","11.16"][i]}</div>
              <div style={{fontSize:11, fontWeight:500, marginTop:2}}>{["환영·말씀","말씀·조모임","말씀·헌신"][i]}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:22, padding:"16px 0", borderTop:`2px solid ${ink}`, borderBottom:`2px solid ${ink}`, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div style={{fontSize:9.5, letterSpacing:".18em", opacity:.6}}>REGISTER</div>
          <div style={{fontSize:14, fontWeight:600, marginTop:2}}>지금 신청하기 →</div>
        </div>
        <div className="pen" style={{fontSize:18, color:accent}}>~11.07 마감</div>
      </div>
    </div>
  </Phone>
);

const B_Goods = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="굿즈" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"6px 16px 70px"}}>
      <div style={{borderTop:`2px solid ${ink}`, borderBottom:`1px solid ${ink}`, padding:"6px 0", display:"flex", justifyContent:"space-between", fontSize:9.5, letterSpacing:".15em", fontWeight:600}}>
        <span>LOOKBOOK</span><span>ED. 2025</span>
      </div>
      <HBig size={48} weight={500} ls="-0.03em" style={{margin:"22px 0 6px"}}>Goods</HBig>
      <div style={{fontSize:11.5, opacity:.65, marginBottom:18}}>전원 무료 · 사전 신청</div>

      <PH h={260} label="HERO LOOK · 티셔츠"/>
      <div style={{display:"flex", justifyContent:"space-between", marginTop:8, fontSize:10, opacity:.6, letterSpacing:".1em"}}>
        <span>01 · TEE</span><span>S/M/L/XL</span>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18}}>
        <PH ratio="3/4" label="에코백"/>
        <PH ratio="3/4" label="스티커"/>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:6, fontSize:10, opacity:.6, letterSpacing:".1em"}}>
        <span>02 · BAG</span><span>03 · STICKER</span>
      </div>

      <div style={{marginTop:18}}>
        <PH ratio="2/1" label="수련회 노트"/>
        <div style={{fontSize:10, opacity:.6, letterSpacing:".1em", marginTop:6}}>04 · NOTE</div>
      </div>

      <div style={{marginTop:22, padding:"14px 0", borderTop:`2px solid ${ink}`}}>
        <Btn full ink={ink}>전체 신청서 작성하기</Btn>
      </div>
    </div>
  </Phone>
);

const B_Faq = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="FAQ/공지" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"6px 16px 70px"}}>
      <div style={{borderTop:`2px solid ${ink}`, borderBottom:`1px solid ${ink}`, padding:"6px 0", display:"flex", justifyContent:"space-between", fontSize:9.5, letterSpacing:".15em", fontWeight:600}}>
        <span>Q&A</span><span>NOTICE</span>
      </div>
      <HBig size={56} weight={500} ls="-0.03em" lh={.95} style={{margin:"22px 0 4px"}}>묻고<br/>답하기</HBig>
      <div style={{fontSize:11.5, opacity:.65, marginBottom:18}}>준비위가 직접 답변합니다.</div>

      <div style={{display:"flex", gap:14, paddingBottom:10, borderBottom:`1px solid ${ink}`, fontSize:11.5}}>
        <div style={{fontWeight:600, borderBottom:`2px solid ${ink}`, padding:"4px 0", marginBottom:-11}}>FAQ</div>
        <div style={{opacity:.5, padding:"4px 0"}}>공지사항</div>
      </div>

      {[
        "참가비는 얼마인가요?",
        "식사는 모두 제공되나요?",
        "가족과 함께 참가할 수 있나요?",
        "환불은 가능한가요?",
        "처음 오는 사람도 괜찮을까요?",
      ].map((q,i)=>(
        <div key={i} style={{padding:"18px 0", borderBottom:`1px solid ${mute}`, display:"grid", gridTemplateColumns:"34px 1fr", gap:10, alignItems:"start"}}>
          <div style={{fontFamily:"var(--font-head)", fontSize:24, fontWeight:500, lineHeight:1, opacity:.85}}>
            {String(i+1).padStart(2,"0")}
          </div>
          <div>
            <div style={{fontSize:13, fontWeight:500, lineHeight:1.4}}>{q}</div>
            {i===0 && <div style={{marginTop:8, fontSize:11.5, opacity:.7, lineHeight:1.55}}>전원 무료입니다. 모든 비용은 교회 예산과 후원으로 충당됩니다.</div>}
          </div>
        </div>
      ))}
    </div>
  </Phone>
);

/* ════════════════ VARIATION C · 탭 세그먼트 ════════════════ */

const SegTabs = ({ items, active, ink, mute, sub }) => (
  <div style={{
    display:"flex", padding:3, borderRadius:999,
    background: sub ? "transparent" : `${mute}`,
    border: sub ? "none" : "none",
    fontSize:11, gap: sub?14:0,
  }}>
    {items.map(it => (
      <div key={it} style={{
        flex: sub ? "0 0 auto" : 1,
        padding: sub ? "6px 0" : "7px 10px",
        borderRadius: sub ? 0 : 999,
        background: !sub && it===active ? "var(--bg)" : "transparent",
        boxShadow: !sub && it===active ? "0 1px 3px rgba(0,0,0,.08)" : "none",
        textAlign:"center",
        fontWeight: it===active ? 600 : 400,
        opacity: it===active ? 1 : .55,
        borderBottom: sub ? (it===active ? `1.5px solid ${ink}` : "1.5px solid transparent") : "none",
      }}>{it}</div>
    ))}
  </div>
);

const C_Info = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <div style={{padding:"10px 16px 12px", flex:"0 0 auto", borderBottom:`1px solid ${mute}`}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
        <div style={{fontSize:11.5, fontWeight:600, letterSpacing:".06em"}}>○○교회 · 수련회</div>
        <div style={{width:22, height:22, borderRadius:999, border:`1px solid ${ink}`, opacity:.4}}/>
      </div>
      <SegTabs items={["수련회 정보","굿즈","FAQ"]} active="수련회 정보" ink={ink} mute={mute}/>
    </div>

    <div style={{padding:"14px 16px 0", flex:"0 0 auto"}}>
      <div style={{display:"flex", gap:18, overflowX:"hidden", borderBottom:`1px solid ${mute}`}}>
        <SegTabs sub items={["소개","일정","장소","준비물","조 편성"]} active="일정" ink={ink} mute={mute}/>
      </div>
    </div>

    <div className="scroll" style={{padding:"18px 16px 70px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8}}>
        <HBig size={22} weight={600} ls="-0.02em">전체 일정</HBig>
        <span style={{fontSize:10.5, opacity:.55}}>2박 3일</span>
      </div>

      {[
        ["DAY 01 · 11.14 (금)", [["17:00","도착·배정"],["19:00","개회·저녁"],["20:30","첫 강의"],["22:30","조모임"]]],
        ["DAY 02 · 11.15 (토)", [["07:00","경건회"],["09:30","둘째 강의"],["13:00","팀 액티비티"],["19:30","찬양의 밤"]]],
        ["DAY 03 · 11.16 (일)", [["08:30","주일예배"],["11:30","폐회·점심"],["13:00","해산"]]],
      ].map(([day, rows], i)=>(
        <div key={i} style={{marginTop:18}}>
          <div style={{fontSize:10.5, letterSpacing:".15em", color:accent, fontWeight:600, marginBottom:6}}>{day}</div>
          <div style={{borderTop:`1px solid ${mute}`}}>
            {rows.map(([t,n],j)=>(
              <div key={j} style={{display:"grid", gridTemplateColumns:"56px 1fr", padding:"10px 0", borderBottom:`1px solid ${mute}`, alignItems:"center"}}>
                <div style={{fontSize:11.5, fontFamily:"ui-monospace,monospace", opacity:.85}}>{t}</div>
                <div style={{fontSize:12.5}}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Phone>
);

const C_Goods = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <div style={{padding:"10px 16px 12px", flex:"0 0 auto", borderBottom:`1px solid ${mute}`}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
        <div style={{fontSize:11.5, fontWeight:600, letterSpacing:".06em"}}>○○교회 · 수련회</div>
        <div style={{width:22, height:22, borderRadius:999, border:`1px solid ${ink}`, opacity:.4}}/>
      </div>
      <SegTabs items={["수련회 정보","굿즈","FAQ"]} active="굿즈" ink={ink} mute={mute}/>
    </div>

    <div style={{padding:"14px 16px 0", flex:"0 0 auto"}}>
      <SegTabs sub items={["전체","의류","소품","한정"]} active="전체" ink={ink} mute={mute}/>
    </div>

    <div className="scroll" style={{padding:"18px 16px 70px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:14}}>
        <HBig size={22} weight={600} ls="-0.02em">2025 굿즈</HBig>
        <span style={{fontSize:10.5, opacity:.55}}>전원 무료</span>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        {[["티셔츠","S–XL"],["에코백","FREE"],["노트","A5"],["스티커","6종"],["키링","FREE"],["뱃지","2종"]].map(([n,o],i)=>(
          <div key={i} style={{display:"flex", flexDirection:"column", gap:6}}>
            <PH ratio="1" label={n}/>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
              <div style={{fontSize:11.5, fontWeight:500}}>{n}</div>
              <div style={{fontSize:9.5, opacity:.55}}>{o}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Phone>
);

const C_Faq = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <div style={{padding:"10px 16px 12px", flex:"0 0 auto", borderBottom:`1px solid ${mute}`}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
        <div style={{fontSize:11.5, fontWeight:600, letterSpacing:".06em"}}>○○교회 · 수련회</div>
        <div style={{width:22, height:22, borderRadius:999, border:`1px solid ${ink}`, opacity:.4}}/>
      </div>
      <SegTabs items={["수련회 정보","굿즈","FAQ"]} active="FAQ" ink={ink} mute={mute}/>
    </div>

    <div style={{padding:"14px 16px 0", flex:"0 0 auto"}}>
      <SegTabs sub items={["FAQ","공지사항"]} active="공지사항" ink={ink} mute={mute}/>
    </div>

    <div className="scroll" style={{padding:"18px 16px 70px"}}>
      {[
        ["📌","[필독] 출발 시간이 17시 → 16시 30분으로 변경되었습니다", "11.10"],
        ["·","조 편성 안내 (1~8조)", "11.05"],
        ["·","숙소 배정 및 룸메이트 안내", "11.04"],
        ["·","준비물 안내 — 11월 양평 날씨 참고", "10.30"],
        ["·","2차 사전 모임 (10.26 주일 1부 후)", "10.20"],
      ].map(([badge, title, date], i)=>(
        <div key={i} style={{padding:"14px 0", borderBottom:`1px solid ${mute}`, display:"grid", gridTemplateColumns:"22px 1fr 50px", gap:8, alignItems:"start"}}>
          <div style={{fontSize:13, opacity: i===0?1:.4, color: i===0?accent:ink, textAlign:"center"}}>{badge}</div>
          <div style={{fontSize:12.5, lineHeight:1.45, fontWeight: i===0?500:400}}>{title}</div>
          <div style={{fontSize:10.5, opacity:.5, fontFamily:"ui-monospace,monospace", textAlign:"right"}}>{date}</div>
        </div>
      ))}
    </div>
  </Phone>
);

/* ════════════════ VARIATION D · 타임라인 스파인 ════════════════ */

const Spine = ({ children, ink, mute, accent }) => (
  <div style={{position:"relative", paddingLeft:32}}>
    <div style={{position:"absolute", left:9, top:6, bottom:6, width:1, background:mute}}/>
    {children}
  </div>
);
const SpineDot = ({ accent, big }) => (
  <div style={{
    position:"absolute", left: big?5:7, top:5,
    width: big?9:5, height: big?9:5, borderRadius:999,
    background: accent, border: big?`2px solid var(--bg)`:"none",
  }}/>
);

const D_Info = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="수련회 정보" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"20px 20px 70px"}}>
      <SectionLabel accent={accent}>2025 가을 수련회</SectionLabel>
      <HBig size={36} weight={500} ls="-0.03em">reset — 3일의 흐름</HBig>
      <div style={{fontSize:11.5, opacity:.65, marginTop:6}}>모든 일정이 한 줄로 흘러갑니다.</div>

      <div style={{marginTop:22}}>
        <Spine ink={ink} mute={mute} accent={accent}>
          {[
            ["big","11.14 (금)","DAY 01 · 출발", "16:30 교회 집결 → 17:00 출발", true],
            ["dot","17:00","도착·방 배정", null],
            ["dot","19:00","저녁식사", null],
            ["dot","20:30","개회 예배 · 첫 말씀", "마태복음 11:28~30"],
            ["dot","22:30","조모임 · 자유시간", null],

            ["big","11.15 (토)","DAY 02 · 깊이", "온종일 일정 · 저녁 찬양의 밤"],
            ["dot","07:00","경건회", null],
            ["dot","13:00","팀 액티비티", "야외 게임 · 사진 찍기"],
            ["dot","19:30","찬양의 밤", null],

            ["big","11.16 (일)","DAY 03 · 결단", "주일 예배로 마무리"],
            ["dot","08:30","주일 예배", null],
            ["dot","11:30","폐회 · 점심", null],

            ["map","오시는 길","양평 ○○수양관"],
            ["cta", null, null],
          ].map((row,i)=>{
            const [type,a,b,c] = row;
            if (type==="big") {
              return (
                <div key={i} style={{position:"relative", padding:"22px 0 6px"}}>
                  <SpineDot accent={accent} big/>
                  <div style={{fontSize:10.5, fontWeight:600, color:accent, letterSpacing:".15em"}}>{a}</div>
                  <div style={{fontSize:18, fontWeight:600, marginTop:2, letterSpacing:"-.01em"}}>{b}</div>
                  {c && <div style={{fontSize:11.5, opacity:.65, marginTop:4}}>{c}</div>}
                </div>
              );
            }
            if (type==="map") {
              return (
                <div key={i} style={{position:"relative", padding:"20px 0"}}>
                  <SpineDot accent={accent} big/>
                  <div style={{fontSize:10.5, fontWeight:600, color:accent, letterSpacing:".15em"}}>{a}</div>
                  <div style={{fontSize:14, fontWeight:500, marginTop:2, marginBottom:8}}>{b}</div>
                  <PH h={120} label="MAP"/>
                </div>
              );
            }
            if (type==="cta") {
              return (
                <div key={i} style={{position:"relative", padding:"16px 0 0"}}>
                  <SpineDot accent={accent} big/>
                  <Btn full ink={ink}>신청하기 →</Btn>
                </div>
              );
            }
            return (
              <div key={i} style={{position:"relative", padding:"10px 0"}}>
                <SpineDot accent={accent}/>
                <div style={{display:"flex", gap:12, alignItems:"baseline"}}>
                  <span style={{fontSize:11, fontFamily:"ui-monospace,monospace", opacity:.6, minWidth:42}}>{a}</span>
                  <div>
                    <div style={{fontSize:12.5, fontWeight:500}}>{b}</div>
                    {c && <div style={{fontSize:11, opacity:.6, marginTop:2}}>{c}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </Spine>
      </div>
    </div>
  </Phone>
);

const D_Goods = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="굿즈" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"20px 20px 70px"}}>
      <SectionLabel accent={accent}>굿즈</SectionLabel>
      <HBig size={28} weight={500} ls="-0.02em">제작 · 수령 일정</HBig>

      <div style={{marginTop:18}}>
        <Spine ink={ink} mute={mute} accent={accent}>
          {[
            ["10.20","사전 신청 시작","사이즈/수량 입력"],
            ["10.27","신청 마감","변경 불가"],
            ["11.05","디자인 공개","미리보기 업데이트"],
            ["11.10","인쇄·제작 완료","검수 중"],
            ["11.14","현장 수령 시작","리셉션 데스크"],
          ].map(([d,t,s],i)=>(
            <div key={i} style={{position:"relative", padding:"12px 0"}}>
              <SpineDot accent={accent} big={i===2 || i===4}/>
              <div style={{display:"flex", gap:10, alignItems:"baseline"}}>
                <span style={{fontSize:11, fontFamily:"ui-monospace,monospace", opacity:.6, minWidth:42}}>{d}</span>
                <div>
                  <div style={{fontSize:13, fontWeight:500}}>{t}</div>
                  <div style={{fontSize:11, opacity:.6, marginTop:2}}>{s}</div>
                </div>
              </div>
            </div>
          ))}
        </Spine>
      </div>

      <div style={{marginTop:24, paddingTop:18, borderTop:`1px solid ${mute}`}}>
        <div style={{fontSize:10.5, letterSpacing:".15em", color:accent, fontWeight:600, marginBottom:10}}>제작 품목</div>
        <div style={{display:"flex", flexDirection:"column", gap:0}}>
          {[["티셔츠","S · M · L · XL"],["에코백","FREE"],["수련회 노트","A5"],["스티커 팩","6종"]].map(([n,o],i)=>(
            <div key={i} style={{display:"grid", gridTemplateColumns:"54px 1fr auto", gap:12, alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${mute}`}}>
              <PH h={48} ratio="1" label="·" style={{height:48,width:48}}/>
              <div style={{fontSize:12.5, fontWeight:500}}>{n}</div>
              <div style={{fontSize:10.5, opacity:.55}}>{o}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:18}}><Btn full ink={ink}>굿즈 신청하기</Btn></div>
      </div>
    </div>
  </Phone>
);

const D_Faq = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="FAQ/공지" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"20px 20px 70px"}}>
      <div style={{display:"flex", gap:6, marginBottom:14}}>
        <Chip active ink={ink} mute={mute}>공지사항</Chip>
        <Chip ink={ink} mute={mute}>FAQ</Chip>
      </div>
      <HBig size={26} weight={500} ls="-0.02em">업데이트 흐름</HBig>

      <div style={{marginTop:18}}>
        <Spine ink={ink} mute={mute} accent={accent}>
          {[
            ["11.10","[필독] 출발 시간 변경","16:30 교회 집결 → 17:00 출발", true],
            ["11.05","조 편성 안내 (1~8조)","조장 연락처 포함"],
            ["11.04","숙소 배정 안내","룸메이트 확인"],
            ["10.30","준비물 안내","양평 날씨 참고"],
            ["10.20","2차 사전 모임","10.26 주일 1부 후"],
          ].map(([d,t,s,pin],i)=>(
            <div key={i} style={{position:"relative", padding:"14px 0"}}>
              <SpineDot accent={accent} big={pin}/>
              <div style={{fontSize:10, fontFamily:"ui-monospace,monospace", opacity:.55}}>{d}</div>
              <div style={{fontSize:12.5, fontWeight: pin?600:500, marginTop:2}}>
                {pin && <span style={{color:accent, marginRight:4}}>📌</span>}{t}
              </div>
              <div style={{fontSize:11, opacity:.55, marginTop:2}}>{s}</div>
            </div>
          ))}
        </Spine>
      </div>
    </div>
  </Phone>
);

/* ════════════════ VARIATION E · 카드 스택 (벤토) ════════════════ */

const Card = ({ children, ink, mute, span={col:1,row:1}, dark, style }) => (
  <div style={{
    gridColumn: `span ${span.col}`, gridRow: `span ${span.row}`,
    background: dark ? ink : "var(--bg)",
    color: dark ? "var(--bg)" : ink,
    border: dark ? "none" : `1px solid ${mute}`,
    borderRadius:14, padding:14, display:"flex", flexDirection:"column",
    overflow:"hidden", position:"relative",
    ...style,
  }}>{children}</div>
);

const E_Info = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="수련회 정보" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"14px 14px 70px"}}>
      <div style={{padding:"4px 4px 14px"}}>
        <div style={{fontSize:10.5, letterSpacing:".18em", color:accent, fontWeight:600}}>2025 가을 수련회</div>
        <HBig size={26} weight={500} ls="-0.02em" style={{marginTop:2}}>안녕하세요, 봄결입니다.</HBig>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, gridAutoRows:"minmax(96px,auto)"}}>
        <Card span={{col:2,row:1}} ink={ink} mute={mute} dark>
          <div style={{fontSize:9.5, letterSpacing:".22em", opacity:.7}}>THEME</div>
          <HBig size={48} weight={500} ls="-0.04em" style={{marginTop:8}}>reset.</HBig>
          <div style={{fontSize:11, opacity:.7, marginTop:6}}>11.14 — 11.16 · 양평 ○○수양관</div>
        </Card>

        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>일정</div>
          <div style={{display:"flex", flexDirection:"column", gap:4, marginTop:8}}>
            <div style={{fontSize:11.5, fontWeight:500}}>DAY 01 · 11.14</div>
            <div style={{fontSize:11.5, fontWeight:500}}>DAY 02 · 11.15</div>
            <div style={{fontSize:11.5, fontWeight:500}}>DAY 03 · 11.16</div>
          </div>
          <div style={{marginTop:"auto", fontSize:10, opacity:.5}}>전체 일정 →</div>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>장소</div>
          <div style={{fontSize:13, fontWeight:500, marginTop:6}}>양평 ○○수양관</div>
          <PH h={40} label="MAP" style={{marginTop:6}}/>
          <div style={{marginTop:6, fontSize:10, opacity:.5}}>오시는 길 →</div>
        </Card>

        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>준비물</div>
          <div style={{display:"flex", flexWrap:"wrap", gap:4, marginTop:8}}>
            {["성경","컵","세면","담요"].map(t=><Chip key={t} ink={ink} mute={mute}>{t}</Chip>)}
          </div>
          <div style={{marginTop:"auto", fontSize:10, opacity:.5}}>체크리스트 →</div>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>조 편성</div>
          <div style={{display:"flex", alignItems:"baseline", gap:4, marginTop:6}}>
            <HBig size={36} weight={500}>8</HBig>
            <span style={{fontSize:11, opacity:.6}}>개 조</span>
          </div>
          <div style={{marginTop:"auto", fontSize:10, opacity:.5}}>내 조 보기 →</div>
        </Card>

        <Card span={{col:2,row:1}} ink={ink} mute={mute} style={{background:accent, color:ink, border:"none"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div style={{fontSize:9.5, letterSpacing:".18em", fontWeight:600, opacity:.7}}>REGISTER</div>
              <div style={{fontSize:18, fontWeight:600, marginTop:2}}>지금 신청하기</div>
            </div>
            <div style={{fontSize:24}}>→</div>
          </div>
          <div style={{fontSize:10.5, opacity:.7, marginTop:6}}>마감 11.07 (금) · 사전 신청 필수</div>
        </Card>

        <Card span={{col:2,row:1}} ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>주제 말씀</div>
          <div style={{fontSize:12, marginTop:6, lineHeight:1.5, opacity:.85}}>
            “수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라.”
          </div>
          <div style={{fontSize:10.5, opacity:.5, marginTop:6}}>마태복음 11:28</div>
        </Card>
      </div>
    </div>
  </Phone>
);

const E_Goods = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="굿즈" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"14px 14px 70px"}}>
      <div style={{padding:"4px 4px 14px"}}>
        <div style={{fontSize:10.5, letterSpacing:".18em", color:accent, fontWeight:600}}>RETREAT GOODS</div>
        <HBig size={24} weight={500} ls="-0.02em" style={{marginTop:2}}>전원 무료 · 사전 신청</HBig>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, gridAutoRows:"minmax(110px,auto)"}}>
        <Card span={{col:2,row:1}} ink={ink} mute={mute} style={{padding:0, aspectRatio:"2/1"}}>
          <PH style={{flex:1, border:"none", borderRadius:14}} label="티셔츠 · MAIN"/>
        </Card>
        <Card ink={ink} mute={mute} style={{padding:0}}>
          <PH style={{flex:1, border:"none", borderRadius:14}} label="에코백"/>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>NOTE</div>
          <HBig size={26} weight={500} style={{marginTop:6}}>수련회<br/>노트</HBig>
          <div style={{marginTop:"auto", fontSize:10, opacity:.5}}>A5 · 80p</div>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>STICKER</div>
          <HBig size={24} weight={500} style={{marginTop:6}}>스티커 팩</HBig>
          <div style={{marginTop:"auto", fontSize:10, opacity:.5}}>6종 1세트</div>
        </Card>
        <Card ink={ink} mute={mute} style={{padding:0}}>
          <PH style={{flex:1, border:"none", borderRadius:14}} label="키링"/>
        </Card>
        <Card span={{col:2,row:1}} ink={ink} mute={mute} dark>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div style={{fontSize:10, opacity:.65, letterSpacing:".18em"}}>한 번에 신청하기</div>
              <div style={{fontSize:14, fontWeight:600, marginTop:2}}>전체 굿즈 신청서 →</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </Phone>
);

const E_Faq = ({ ink, mute, accent, bg, header }) => (
  <Phone ink={ink} mute={mute} accent={accent} bg={bg}>
    <Header kind={header} current="FAQ/공지" ink={ink} mute={mute} accent={accent}/>
    <div className="scroll" style={{padding:"14px 14px 70px"}}>
      <div style={{padding:"4px 4px 12px"}}>
        <div style={{display:"flex", gap:6, marginBottom:8}}>
          <Chip active ink={ink} mute={mute}>공지</Chip>
          <Chip ink={ink} mute={mute}>FAQ</Chip>
        </div>
        <HBig size={22} weight={500} ls="-0.02em">새로운 소식</HBig>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, gridAutoRows:"minmax(96px,auto)"}}>
        <Card span={{col:2,row:1}} ink={ink} mute={mute} style={{background:accent, color:ink, border:"none"}}>
          <div style={{fontSize:10, letterSpacing:".18em", fontWeight:600, opacity:.75}}>📌 PINNED · 11.10</div>
          <div style={{fontSize:14, fontWeight:600, marginTop:6, lineHeight:1.4}}>출발 시간이 16:30으로 변경되었습니다</div>
          <div style={{fontSize:11, opacity:.7, marginTop:4}}>교회 본당 1층 · 단톡방 공지 참고</div>
        </Card>

        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, opacity:.5, fontFamily:"ui-monospace,monospace"}}>11.05</div>
          <div style={{fontSize:12, fontWeight:500, marginTop:4, lineHeight:1.4}}>조 편성 안내 (1~8조)</div>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, opacity:.5, fontFamily:"ui-monospace,monospace"}}>11.04</div>
          <div style={{fontSize:12, fontWeight:500, marginTop:4, lineHeight:1.4}}>숙소 배정 · 룸메이트 확인</div>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, opacity:.5, fontFamily:"ui-monospace,monospace"}}>10.30</div>
          <div style={{fontSize:12, fontWeight:500, marginTop:4, lineHeight:1.4}}>준비물 — 양평 날씨 참고</div>
        </Card>
        <Card ink={ink} mute={mute}>
          <div style={{fontSize:9.5, opacity:.5, fontFamily:"ui-monospace,monospace"}}>10.20</div>
          <div style={{fontSize:12, fontWeight:500, marginTop:4, lineHeight:1.4}}>2차 사전 모임 안내</div>
        </Card>

        <Card span={{col:2,row:1}} ink={ink} mute={mute}>
          <div style={{fontSize:9.5, letterSpacing:".18em", color:accent, fontWeight:600}}>FAQ TOP 3</div>
          <div style={{display:"flex", flexDirection:"column", gap:6, marginTop:8}}>
            {["참가비는 얼마인가요?","식사는 모두 제공되나요?","처음 오는 사람도 괜찮을까요?"].map((q,i)=>(
              <div key={i} style={{fontSize:11.5, padding:"6px 0", borderTop:i?`1px solid ${mute}`:"none", display:"flex", justifyContent:"space-between"}}>
                <span>Q. {q}</span><span style={{opacity:.4}}>+</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </Phone>
);

/* ────────────── export ────────────── */

window.RETREAT = {
  A: { Info: A_Info, Goods: A_Goods, Faq: A_Faq, name: "차분한 스크롤", note: "긴 호흡 · 큰 단어 · 위에서 아래로" },
  B: { Info: B_Info, Goods: B_Goods, Faq: B_Faq, name: "매거진 그리드", note: "에디토리얼 · 큰 숫자 · 두꺼운 룰" },
  C: { Info: C_Info, Goods: C_Goods, Faq: C_Faq, name: "탭 세그먼트", note: "앱 같은 · 빠른 탐색 · 짧은 스크롤" },
  D: { Info: D_Info, Goods: D_Goods, Faq: D_Faq, name: "타임라인 스파인", note: "한 줄로 흐르는 · 시간 중심" },
  E: { Info: E_Info, Goods: E_Goods, Faq: E_Faq, name: "벤토 카드", note: "한눈에 · 카드 진입 · 균형감" },
};
