const imgTablerUser = "https://www.figma.com/api/mcp/asset/1d203ca1-4bcc-499d-b356-f604ce916b02.svg";
const imgTablerPackage = "https://www.figma.com/api/mcp/asset/a332e35b-f8d8-4872-904c-200c05e07763.svg";
const imgTablerHeart = "https://www.figma.com/api/mcp/asset/8a4c5350-63e2-4170-9425-7b39bd93de0d.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/5b1f2138-299b-494d-a0ef-c88a08530ab9.svg";
const imgProperty1Filter = "https://www.figma.com/api/mcp/asset/4471ca69-8cb9-4b19-93bd-6b16b002e6bf.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/84e748d2-bd8b-47d7-af17-4d1b8f1380f7.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/e6e5f6e5-81f0-4981-8c12-fb882c746fbd.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/aa97614a-5a71-40c6-be9a-f11f8eab4cdd.svg";
const imgTablerSearch = "https://www.figma.com/api/mcp/asset/f17817f0-6861-431d-bfe3-d414957608c9.svg";

function TablerUser({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:67" data-name="tabler:user">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerUser} />
    </div>
  );
}

function TablerPackage({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:76" data-name="tabler:package">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerPackage} />
    </div>
  );
}

function TablerHeart({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="6:74" data-name="tabler:heart">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerHeart} />
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
  property1?: "Filter" | "ChervonLeft";
};

function Icon({ className, property1 = "Filter" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : "size-[36px]"}`} id={isChervonLeft ? "node-6_140" : "node-6_103"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : imgProperty1Filter} />
    </div>
  );
}

export default function Component21() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:723" data-name="21">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:724">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:725">
          <Icon className="relative shrink-0 size-[24px]" property1="ChervonLeft" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[219px]" data-node-id="6:727">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-full" data-node-id="6:728">
              <p className="leading-[normal]">Lịch sử chia sẻ</p>
            </div>
          </div>
        </div>
        <Icon className="relative shrink-0 size-[24px]" />
      </div>
      <div className="[word-break:break-word] absolute content-stretch flex gap-[15px] items-center leading-[0] left-[16px] not-italic top-[86px] w-[370px]" data-node-id="6:730">
        <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip px-[8px] py-[6px] relative rounded-[12px]" data-node-id="6:731">
          <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#717171] text-[12px] w-full" data-node-id="6:732">
            <p className="leading-[normal]">Tổng suất đã chia sẻ</p>
          </div>
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#006642] text-[24px] w-full" data-node-id="6:733">
            <p className="leading-[normal]">1.248</p>
          </div>
        </div>
        <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip px-[8px] py-[6px] relative rounded-[12px]" data-node-id="6:734">
          <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#717171] text-[12px] w-full" data-node-id="6:735">
            <p className="leading-[normal]">Số lần bàn giao</p>
          </div>
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[#006642] text-[24px] w-full" data-node-id="6:736">
            <p className="leading-[normal]">73</p>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] left-[17px] not-italic text-[#717171] text-[12px] top-[169.5px] whitespace-nowrap" data-node-id="6:737">
        <p className="leading-[normal]">Tháng 10, 2026</p>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[210px] w-[370px]" data-node-id="6:738">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="6:739">
          <div className="bg-[#e1fde8] overflow-clip relative rounded-[6px] shrink-0 size-[36px]" data-node-id="6:740">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:741" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[normal] not-italic relative shrink-0 w-[205px]" data-node-id="6:742">
            <p className="font-['Inter:Bold'] font-bold min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="6:743">
              Cơm sườn nướng · 18 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] text-center whitespace-nowrap" data-node-id="6:744">
              09/10 · Bếp Yêu Thương Q.10
            </p>
          </div>
        </div>
        <a className="[word-break:break-word] block cursor-pointer font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[#006642] text-[12px] whitespace-nowrap" data-node-id="6:745">
          <p className="leading-[normal]">Hoàn tất</p>
        </a>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[289px] w-[370px]" data-node-id="6:746">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="6:747">
          <div className="bg-[#e1fde8] overflow-clip relative rounded-[6px] shrink-0 size-[36px]" data-node-id="6:748">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:749" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[normal] not-italic relative shrink-0 w-[205px]" data-node-id="6:750">
            <p className="font-['Inter:Bold'] font-bold min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="6:751">{`Bánh bao & bánh ngọt · 25 phần`}</p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] text-center whitespace-nowrap" data-node-id="6:752">
              07/10 · Mái ấm Hoa Sen
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#006642] text-[12px] whitespace-nowrap" data-node-id="6:753">
          Hoàn tất
        </p>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[385px] w-[370px]" data-node-id="6:754">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="6:755">
          <div className="bg-[rgba(255,0,0,0.15)] overflow-clip relative rounded-[6px] shrink-0 size-[36px]" data-node-id="6:756">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[20px] top-1/2" data-node-id="6:757" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[normal] not-italic relative shrink-0 w-[205px]" data-node-id="6:758">
            <p className="font-['Inter:Bold'] font-bold min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="6:759">
              Mì xào hải sản · 10 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] text-center whitespace-nowrap" data-node-id="6:760">
              05/10 · Không có người nhận
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#a31919] text-[12px] whitespace-nowrap" data-node-id="6:761">
          Hết hạn
        </p>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[17px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[464px] w-[370px]" data-node-id="6:762">
        <div className="bg-[#e1fde8] overflow-clip relative rounded-[6px] shrink-0 size-[36px]" data-node-id="6:763">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:764" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="6:765">
          <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[normal] not-italic relative shrink-0 w-[205px]" data-node-id="6:766">
            <p className="font-['Inter:Bold'] font-bold min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="6:767">
              Cháo gà · 30 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] text-center whitespace-nowrap" data-node-id="6:768">
              03/10 · Quỹ Bữa Cơm Sẻ Chia
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#006642] text-[12px] whitespace-nowrap" data-node-id="6:769">
          Hoàn tất
        </p>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[17px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[543px] w-[370px]" data-node-id="6:770">
        <div className="bg-[#e1fde8] overflow-clip relative rounded-[6px] shrink-0 size-[36px]" data-node-id="6:771">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:772" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="6:773">
          <div className="[word-break:break-word] content-stretch flex flex-col items-start justify-center leading-[normal] not-italic relative shrink-0 w-[205px]" data-node-id="6:774">
            <p className="font-['Inter:Bold'] font-bold min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" data-node-id="6:775">
              Rau củ sơ chế · 12 kg
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] text-center whitespace-nowrap" data-node-id="6:776">{`01/10 · Bếp Yêu Thương Q.10 `}</p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#006642] text-[12px] whitespace-nowrap" data-node-id="6:777">
          Hoàn tất
        </p>
      </div>
      <div className="-translate-x-1/2 absolute bg-white bottom-0 h-[67px] left-1/2 overflow-clip w-[402px]" data-node-id="6:778">
        <div className="absolute h-[67px] left-[11px] overflow-clip top-0 w-[69px]" data-node-id="6:779">
          <TablerHome className="absolute left-[20px] size-[25px] top-[8px]" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:781">
            <p className="leading-[normal]">Trang chủ</p>
          </div>
        </div>
        <div className="absolute h-[67px] left-[91px] overflow-clip top-0 w-[69px]" data-node-id="6:782">
          <div className="absolute left-[20px] size-[25px] top-[8px]" data-node-id="6:783" data-name="tabler:home">
            <div className="absolute inset-[12.5%]" data-node-id="I6:783;158:138" data-name="Group">
              <div className="absolute inset-[-5.33%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:784">
            <p className="leading-[normal]">Tìm đồ ăn</p>
          </div>
          <div className="absolute left-[22px] size-[25px] top-[9px]" data-node-id="66:1372" data-name="tabler:search">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerSearch} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[171px] overflow-clip top-0 w-[69px]" data-node-id="6:786">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:787">
            <p className="leading-[normal]">Nhu cầu</p>
          </div>
          <TablerHeart className="absolute left-[20px] size-[24px] top-[10px]" />
        </div>
        <div className="absolute h-[67px] left-[251px] overflow-clip top-0 w-[69px]" data-node-id="6:789">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:790">
            <p className="leading-[normal]">Đơn nhận</p>
          </div>
          <TablerPackage className="absolute left-[19px] size-[25px] top-[8px]" />
        </div>
        <div className="absolute h-[67px] left-[331px] overflow-clip top-0 w-[69px]" data-node-id="6:792">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:793">
            <p className="leading-[normal]">Tôi</p>
          </div>
          <TablerUser className="absolute left-[20px] size-[25px] top-[8px]" />
        </div>
      </div>
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-0 top-[807px] w-[100.5px]" data-node-id="84:1715" data-name="Prototype / Trang chủ" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[100.5px] top-[807px] w-[100.5px]" data-node-id="84:1717" data-name="Prototype / Tin đăng" />
      <div className="absolute bg-[rgba(0,0,0,0)] h-[67px] left-[201px] top-[807px] w-[100.5px]" data-node-id="84:1719" data-name="Prototype / Tác động" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[301.5px] top-[807px] w-[100.5px]" data-node-id="84:1720" data-name="Prototype / Tôi" />
    </div>
  );
}
