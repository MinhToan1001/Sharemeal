const imgTablerUser = "https://www.figma.com/api/mcp/asset/16cd2160-ec16-43f2-a5d9-234005a17a91.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/1b2aa867-15f1-41c7-826e-d2fe5673b32f.svg";
const imgProperty1MenuBar = "https://www.figma.com/api/mcp/asset/15305608-0589-4c7a-8b72-be74eaf9bf58.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/b6407768-cd82-42d5-abc3-3a81dd94846b.svg";
const imgProperty1Love = "https://www.figma.com/api/mcp/asset/01b6896d-535a-4ba9-b7bf-6ff14ed02c1f.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/1ad009b5-4bac-4738-8875-4104d8a40aea.svg";
const imgNhMinhHaFood = "https://www.figma.com/api/mcp/asset/9c0a79e0-fb10-4900-8899-feab6b0183a0.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/a4c96987-6d04-449b-b551-0b37630486da.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/df3ae16c-1efe-46ad-a1ed-2b6e31e73745.svg";

function TablerUser({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:67" data-name="tabler:user">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerUser} />
    </div>
  );
}

function TablerHome({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:63" data-name="tabler:home">
      <div className="absolute inset-[12.5%]" data-node-id="6:64" data-name="Group">
        <div className="absolute inset-[-5.33%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

type IconProps = {
  className?: string;
  property1?: "MenuBar" | "Notice" | "Love" | "Truck";
};

function Icon({ className, property1 = "MenuBar" }: IconProps) {
  const isLove = property1 === "Love";
  const isNotice = property1 === "Notice";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isTruck ? "size-[39px]" : isLove ? "size-[31px]" : isNotice ? "size-[41px]" : "size-[38px]"}`} id={isTruck ? "node-6_122" : isLove ? "node-6_107" : isNotice ? "node-6_101" : "node-6_92"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isTruck ? imgProperty1Truck : isLove ? imgProperty1Love : isNotice ? imgProperty1Notice : imgProperty1MenuBar} />
    </div>
  );
}

export default function D01BpNhaLan() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:319" data-name="D01 · Bếp Nhà Lan">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="66:1214">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="66:1215">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="66:1216" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="66:1217" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="66:1218">
            Bếp Nhà Lan
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="66:1219">
            Người cho · Đã xác minh
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[41px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="66:1222" data-name="Content">
        <div className="bg-[var(--sm-dark,#103e31)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[20px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1223" data-name="Frame">
          <div className="h-[154px] relative rounded-[16px] shrink-0 w-[318px]" data-node-id="73:1030" data-name="Ảnh minh họa / food">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaFood} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-tint,#e3f2e9)] w-[318px]" data-node-id="66:1224">
            HÔM NAY BẠN MUỐN CHIA SẺ GÌ?
          </p>
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[27px] text-[color:var(--sm-surface,white)] w-[318px]" data-node-id="66:1225">
            <p className="leading-[1.4] mb-0">Một phần dư,</p>
            <p className="leading-[1.4]">thêm một bữa đủ</p>
          </div>
          <button className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[318px]" data-node-id="66:1226" data-name="go/createFood">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I66:1226;6:171">
              Đăng thực phẩm mới
            </p>
          </button>
        </div>
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[358px] whitespace-nowrap" data-node-id="66:1228" data-name="Frame">
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="66:1229" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I66:1229;60:566">
              Tin đang mở
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I66:1229;60:567">
              3
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I66:1229;60:568">
              Còn 2 tin chưa ghép
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="66:1233" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I66:1233;60:566">
              Yêu cầu mới
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I66:1233;60:567">
              2
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I66:1233;60:568">
              Cần bạn xác nhận
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1237" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1238">
            Đang chờ bạn phản hồi
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1239" data-name="go/requests">
            <Icon className="relative shrink-0 size-[24px]" property1="Love" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1242" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1243">
                Mái ấm Hoa Sen xin 15 suất
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1244">
                Cơm gà · tự lấy hoặc nhờ giao
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1245">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="66:1246" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1247" data-name="go/donorTracking">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1250" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1251">
                Bánh mì · đã có người giao
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1252">
                Quốc Bảo đang tới lấy · 8 phút
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1253">
              ›
            </p>
          </a>
        </div>
        <div className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="66:1254" data-name="Frame">
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[173px]" data-node-id="66:1255" data-name="go/myListings">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1255;6:173">
              Tin của tôi
            </p>
          </a>
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[173px]" data-node-id="66:1257" data-name="go/donorHistory">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1257;6:173">
              Tác động
            </p>
          </a>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white bottom-0 h-[67px] left-1/2 overflow-clip w-[402px]" data-node-id="66:1259" data-name="Bottom navigation / D01">
        <div className="absolute h-[67px] left-[24px] overflow-clip top-0 w-[69px]" data-node-id="66:1260">
          <TablerHome className="absolute left-[20px] size-[25px] top-[8px]" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1262">
            <p className="leading-[normal]">Trang chủ</p>
          </div>
        </div>
        <div className="absolute h-[67px] left-[124px] overflow-clip top-0 w-[69px]" data-node-id="66:1263">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1264">
            <p className="leading-[normal]">Tin đăng</p>
          </div>
          <div className="absolute left-[22px] size-[25px] top-[11px]" data-node-id="66:1265" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[220px] overflow-clip top-0 w-[69px]" data-node-id="66:1266">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1267">
            <p className="leading-[normal]">Tác động</p>
          </div>
          <div className="absolute left-[24px] size-[25px] top-[9px]" data-node-id="66:1268" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[317px] overflow-clip top-0 w-[69px]" data-node-id="66:1269">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1270">
            <p className="leading-[normal]">Tôi</p>
          </div>
          <TablerUser className="absolute left-[20px] size-[25px] top-[8px]" />
        </div>
      </div>
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-0 top-[807px] w-[100.5px]" data-node-id="84:1700" data-name="Prototype / Trang chủ" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[100.5px] top-[807px] w-[100.5px]" data-node-id="84:1702" data-name="Prototype / Tin đăng" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[201px] top-[807px] w-[100.5px]" data-node-id="84:1704" data-name="Prototype / Tác động" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[301.5px] top-[807px] w-[100.5px]" data-node-id="84:1706" data-name="Prototype / Tôi" />
    </div>
  );
}
