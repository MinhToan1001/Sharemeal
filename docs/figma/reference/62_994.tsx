const imgProperty1Home = "https://www.figma.com/api/mcp/asset/d40e75ad-e3db-4f72-bc16-17d35de13a79.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/b621a877-fc92-440e-8aa3-74d6290d74d6.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/e947099b-1d41-4740-861b-c75299998518.svg";
const imgEllipse = "https://www.figma.com/api/mcp/asset/11420770-ace4-435b-a54e-730f5ba4a044.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/c9a3a4ac-67f8-4e7a-b62d-c86c3aaff821.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/9b96d38c-5ed9-4ad4-818a-0fb80225fff2.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/de7af6ec-b975-4062-94ff-0dcd576380cb.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/f9cc2c2d-9ee4-4da4-8319-eed40ec46d1d.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/44f3e9ba-04f5-46d0-8326-98ac6454b2d5.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/586b8f8a-ccbd-4eb6-b58c-56b1eb8e6798.svg";
const imgGroup3 = "https://www.figma.com/api/mcp/asset/90dc943d-96c5-470e-b358-886fdbce500d.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/56bdd791-964c-4bd5-8e88-38c3797b8f5b.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/7c9f59cd-79d6-4e6c-9373-66e7229bd591.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "User" | "Notice";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isNotice = property1 === "Notice";
  const isUser = property1 === "User";
  return (
    <div className={className || `relative ${isNotice ? "size-[41px]" : isUser ? "overflow-clip size-[46px]" : "size-[43px]"}`} id={isNotice ? "node-6_101" : isUser ? "node-6_94" : "node-6_90"}>
      {["Home", "Notice"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isNotice ? imgProperty1Notice : imgProperty1Home} />}
      {isUser && (
        <div className="absolute inset-[16.67%]" data-node-id="6:95" data-name="Group">
          <div className="absolute inset-[-4.08%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function A04DiuPhiGiaoNhn() {
  return (
    <div className="bg-[var(--sm-blueBg,#e9f3f8)] relative size-full" data-node-id="62:994" data-name="A04 · Điều phối giao nhận">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:995">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:996">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="62:997" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:998" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:999">
            Điều phối giao nhận
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:1000">
            37 chuyến đang chạy · 2 chuyến cần hỗ trợ
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:1003" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] h-[274px] overflow-clip relative rounded-[var(--sm-radius-24,24px)] shrink-0 w-[358px]" data-node-id="62:1029" data-name="Bản đồ điều phối / CG-512">
          <div className="absolute flex h-[370.572px] items-center justify-center left-[132.37px] top-[-30px] w-[172.427px]" data-node-id="62:1030">
            <div className="flex-none rotate-16">
              <div className="bg-[var(--sm-blueBg,#e9f3f8)] h-[364px] relative w-[75px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[35px] w-[435.408px]" data-node-id="62:1031">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[-2.07px] w-[430.924px]" data-node-id="62:1032">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[143px] w-[435.408px]" data-node-id="62:1033">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[105.93px] w-[430.924px]" data-node-id="62:1034">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[251px] w-[435.408px]" data-node-id="62:1035">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute bg-[var(--sm-surface,white)] h-[334px] left-[40px] top-[-20px] w-[10px]" data-node-id="62:1036" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[334px] left-[124px] top-[-20px] w-[10px]" data-node-id="62:1037" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[334px] left-[208px] top-[-20px] w-[10px]" data-node-id="62:1038" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[334px] left-[292px] top-[-20px] w-[10px]" data-node-id="62:1039" data-name="Rectangle" />
          <div className="absolute left-[55px] size-[42px] top-[70px]" data-node-id="62:1040" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[65px] overflow-clip size-[22px] top-[80px]" data-node-id="62:1041" data-name="Icon">
            <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="I62:1041;6:110" data-name="Group">
              <div className="absolute inset-[-5.53%_-6.06%_-4.07%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[71px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[49px] whitespace-nowrap" data-node-id="62:1046">
            A
          </p>
          <div className="absolute left-[245px] size-[42px] top-[170px]" data-node-id="62:1047" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[255px] size-[22px] top-[180px]" data-node-id="62:1048" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[261px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[149px] whitespace-nowrap" data-node-id="62:1050">
            B
          </p>
          <div className="absolute left-[160px] size-[42px] top-[120px]" data-node-id="62:1051" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </div>
          <div className="absolute left-[170px] size-[22px] top-[130px]" data-node-id="62:1052" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[22px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[18px] whitespace-nowrap" data-node-id="62:1054">
            Quận 1
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[273px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[242px] whitespace-nowrap" data-node-id="62:1055">
            Quận 5
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1056" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1057">
            CG-512 · Cần người thay thế
          </p>
          <div className="bg-[var(--sm-redBg,#fce9e7)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[176px]" data-node-id="62:1058" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-red,#b34343)] whitespace-nowrap" data-node-id="62:1059">
              Hỏng xe · ưu tiên cao
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1060">
            Bếp Nhà Lan → Mái ấm Hoa Sen
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1061" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1062">
              Thực phẩm
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1063">
              15 suất cơm · dùng trước 23:00
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1064" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1065">
              Hạn giao dự kiến
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1066">
              19:40 · còn 28 phút
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:1067" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1068" data-name="go/reassign">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="User" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="62:1073" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="62:1074">
                Minh Toàn · cách 600 m
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="62:1075">
                Đã xác minh · 4,9 sao · xe máy
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="62:1076">
              ›
            </p>
          </a>
          <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[326px]" data-node-id="62:1077" data-name="go/reassign">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I62:1077;6:171">
              Phân công Minh Toàn
            </p>
          </a>
        </div>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="62:1004" data-name="SM/Admin navigation">
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1004;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1004;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1004;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1004;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1004;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:1004;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1004;60:579">
            Hồ sơ
          </p>
        </a>
        <div className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1004;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1004;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I62:1004;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="I62:1004;60:585">
            Điều phối
          </p>
        </div>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1004;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1004;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1004;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1004;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1004;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1004;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
