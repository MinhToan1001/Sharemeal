const imgProperty1Home = "https://www.figma.com/api/mcp/asset/8c5c0cbf-4e0a-430d-96ac-6165e82e00a8.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/95bbc560-d396-44a2-b0be-b18b21140ea4.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/18370a39-3006-4615-ac7d-5fb7f9ed4ba4.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/0de58ef8-3be9-486a-adf2-ea48c3fb1604.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/81516df9-9064-4cf7-80fc-89be5d3c9bb9.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/1d7c3d6c-a957-4611-9881-f5cc49e57d1e.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/c8c9c869-fe21-4381-a567-8ecb5d755dcd.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/43d470b1-23c6-45e3-8291-f45ff66cf127.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "Notice";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isNotice = property1 === "Notice";
  return (
    <div className={className || `relative ${isNotice ? "size-[41px]" : "size-[43px]"}`} id={isNotice ? "node-6_101" : "node-6_90"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isNotice ? imgProperty1Notice : imgProperty1Home} />
    </div>
  );
}

export default function A13DaTChiHS() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="77:1141" data-name="A13 · Đã từ chối hồ sơ">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="77:1142">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="77:1143">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="77:1144" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="77:1145" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="77:1146">
            Đã từ chối hồ sơ
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="77:1147">
            HS-0419 · Quyết định được lưu trong lịch sử
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="77:1150" data-name="Content">
        <div className="bg-[var(--sm-redBg,#fce9e7)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1176" data-name="Frame">
          <div className="relative shrink-0 size-[50px]" data-node-id="77:1177" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[24px] text-[color:var(--sm-red,#b34343)] w-[310px]" data-node-id="77:1179">
            Yêu cầu xác thực lại đại diện
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="77:1180">
            Thông tin đại diện chưa trùng khớp tài liệu. Tài khoản vẫn ở chế độ xem.
          </p>
        </div>
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 text-[color:var(--sm-ink,#173a30)] w-[358px]" data-node-id="77:1181" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] w-[326px]" data-node-id="77:1182">
            Lý do gửi đến người dùng
          </p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[14px] w-[326px]" data-node-id="77:1183">
            Tên người đại diện trên hồ sơ chưa trùng với giấy tờ đính kèm. Vui lòng sửa đúng thông tin và gửi lại.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="77:1184" data-name="go/A02">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I77:1184;6:171">
            Về hàng đợi hồ sơ
          </p>
        </a>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="77:1151" data-name="SM/Admin navigation">
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1151;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1151;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1151;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1151;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1151;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I77:1151;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1151;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1151;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1151;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I77:1151;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1151;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1151;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1151;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1151;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1151;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1151;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1151;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
