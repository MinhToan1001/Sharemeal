const imgGroup = "https://www.figma.com/api/mcp/asset/222f8ed6-7221-4272-972e-3b4cf2513e56.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/5593ae8b-d050-439e-8e5d-de39a07d48fe.svg";
const imgLogo = "https://www.figma.com/api/mcp/asset/0ee6b3a4-f5c9-4d1b-8065-65a2decac2d1.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/0f3bfa4d-6be7-4724-8382-289fbf96ee90.svg";

type IconProps = {
  className?: string;
  property1?: "MapPing" | "ChervonLeft";
};

function Icon({ className, property1 = "MapPing" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative size-[24px] ${isChervonLeft ? "" : "overflow-clip"}`} id={isChervonLeft ? "node-6_140" : "node-6_118"}>
      {property1 === "MapPing" && (
        <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="6:119" data-name="Group">
          <div className="absolute inset-[-5.64%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
      {isChervonLeft && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />}
    </div>
  );
}

export default function Component16() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:560" data-name="16">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:561">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="6:562">
          <Icon className="col-1 ml-0 mt-0 relative row-1 size-[24px]" property1="ChervonLeft" />
          <div className="[word-break:break-word] col-1 flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center ml-[51px] mt-[0.5px] not-italic relative row-1 text-[20px] text-black w-[219px]" data-node-id="6:564">
            <p className="leading-[normal]">Chi tiết tin đăng</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex gap-[27px] h-[106px] items-end justify-center left-1/2 overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:566">
        <div className="border border-[var(--color-5,#979a9e)] border-solid content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[146px]" data-node-id="6:567" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap" data-node-id="6:568">
            Chỉnh sửa
          </p>
        </div>
        <div className="border border-[var(--color-2,#a31919)] border-solid content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[146px]" data-node-id="6:569" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--color-2,#a31919)] whitespace-nowrap" data-node-id="6:570">
            Đóng tin
          </p>
        </div>
      </div>
      <div className="absolute bg-white border-[#d9d9d9] border-[1.5px] border-solid content-stretch flex flex-col gap-[10px] items-start left-[16px] overflow-clip pb-[16px] rounded-[24px] top-[88px] w-[370px]" data-node-id="6:571">
        <div className="bg-[#fef0d5] content-stretch flex flex-col items-center justify-center overflow-clip px-[160px] py-[58px] relative shrink-0 w-full" data-node-id="6:572">
          <div className="h-[62.5px] relative shrink-0 w-[67.069px]" data-node-id="6:573" data-name="Logo">
            <div className="absolute inset-[-4%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLogo} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] relative shrink-0 w-full" data-node-id="6:574">
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="6:575">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-node-id="6:576">
              <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[20px] text-black" data-node-id="6:577">
                <p className="leading-[normal]">Cơm gà xối mỡ</p>
              </div>
              <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] text-[14px]" data-node-id="6:578">
                <p className="leading-[normal]">{`20 suất Cơm & món mặn`}</p>
              </div>
            </div>
            <div className="bg-[#e1fde8] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[3px] relative rounded-[11px] shrink-0" data-node-id="6:579" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:579;6:180">
                <p className="leading-[normal]">Đang mở</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#717171] text-[14px] w-full" data-node-id="6:580">
            <p className="leading-[normal]">Gà chiên mới nấu lúc 17:00, cơm đóng hộp riêng từng xuất, không chứa hải sản.</p>
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="6:581">
            <Icon className="overflow-clip relative shrink-0 size-[18px]" />
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] min-w-px not-italic relative text-[#717171] text-[13px]" data-node-id="6:583">
              <p className="leading-[normal]">45 Nguyễn Thị Minh Khai,Quận 1 | 19:00 - 20:30</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#fef0d5] content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[586px] w-[369px]" data-node-id="6:584">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-node-id="6:585">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#9e6d02] text-[16px]" data-node-id="6:586">
            2 yêu cầu mới nhận
          </p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[14px] text-black" data-node-id="6:587">{`Mái ấm Hoa Sen và 1 tổ chức khác `}</p>
        </div>
        <div className="bg-black content-stretch flex flex-col items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-node-id="6:588">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="6:589">
            Xem
          </p>
        </div>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--color-6,#d9d9d9)] border-solid content-stretch flex flex-col gap-[8px] items-start left-[18px] overflow-clip p-[16px] rounded-[24px] top-[447px] w-[367px]" data-node-id="6:590">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-full" data-node-id="6:591">
          <p className="leading-[normal]">Tiến trình</p>
        </div>
        <div className="content-stretch flex items-center justify-between px-[16px] relative shrink-0 w-full" data-node-id="6:592">
          <div className="content-stretch flex flex-col h-[56px] items-center justify-between relative shrink-0 w-[52px]" data-node-id="6:593">
            <div className="bg-[#006642] overflow-clip relative rounded-[100px] shrink-0 size-[32px]" data-node-id="6:594">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-node-id="6:595" data-name="Icon">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black whitespace-nowrap" data-node-id="6:596">
              <p className="leading-[normal]">Đã đăng</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col h-[56px] items-center justify-between relative shrink-0 w-[78px]" data-node-id="6:597">
            <div className="bg-[#e69d00] overflow-clip relative rounded-[100px] shrink-0 size-[32px]" data-node-id="6:598">
              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[12px] not-italic text-[13px] text-black top-[15px] whitespace-nowrap" data-node-id="6:599">
                <p className="leading-[normal]">2</p>
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black whitespace-nowrap" data-node-id="6:600">
              <p className="leading-[normal]">{`Có yêu cầu `}</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col h-[56px] items-center justify-between relative shrink-0 w-[60px]" data-node-id="6:601">
            <div className="bg-[#d2d2d2] overflow-clip relative rounded-[100px] shrink-0 size-[32px]" data-node-id="6:602">
              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[calc(50%-4px)] not-italic text-[13px] text-black top-1/2 whitespace-nowrap" data-node-id="6:603">
                <p className="leading-[normal]">3</p>
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:604">
              <p className="leading-[normal]">Ghép cặp</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col h-[56px] items-center justify-between relative shrink-0 w-[55px]" data-node-id="6:605">
            <div className="bg-[#d2d2d2] overflow-clip relative rounded-[100px] shrink-0 size-[32px]" data-node-id="6:606">
              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[calc(50%-4px)] not-italic text-[13px] text-black top-1/2 whitespace-nowrap" data-node-id="6:607">
                <p className="leading-[normal]">4</p>
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:608">
              <p className="leading-[normal]">Bàn giao</p>
            </div>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[43px] left-[296px] top-[594px] w-[78px]" data-node-id="84:1555" data-name="Prototype / Xem" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[62px] left-[36.5px] top-[762px] w-[156px]" data-node-id="84:1557" data-name="Prototype / Chỉnh sửa" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[62px] left-[209.5px] top-[762px] w-[156px]" data-node-id="84:1559" data-name="Prototype / Đóng tin" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1800" data-name="Prototype / Quay lại" />
    </div>
  );
}
