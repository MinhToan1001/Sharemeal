const imgProperty1Home = "https://www.figma.com/api/mcp/asset/743de1a3-362e-47ce-b7b3-9edd4a6435ec.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/3b06e1c1-3c5c-4270-b776-e570d8475840.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/3af07f84-115f-4375-aa99-c773aece25f3.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/8ddb0070-2c68-4b46-81cf-30896919afbe.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/ca3682de-124f-41a0-8f93-e48293e75ff9.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/38cb6f31-fea8-4d74-a2bc-e45c929caa81.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/c82cd20b-da7a-45da-9bb4-189be74dfa65.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/df413980-a962-4926-8d27-5307cf84f22c.svg";

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

export default function A12DaYeuCuBSung() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="77:1090" data-name="A12 · Đã yêu cầu bổ sung">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="77:1091">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="77:1092">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="77:1093" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="77:1094" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="77:1095">
            Đã yêu cầu bổ sung
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="77:1096">
            HS-0419 · Thông báo đã gửi tới đối tác
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="77:1099" data-name="Content">
        <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1125" data-name="Frame">
          <div className="relative shrink-0 size-[50px]" data-node-id="77:1126" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="77:1128">
            Chờ bản cam kết có chữ ký
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="77:1129">
            Đối tác cần cập nhật tài liệu. Các mục đã đạt yêu cầu được giữ nguyên.
          </p>
        </div>
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1130" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1131">
            Nội dung gửi đối tác
          </p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1132">
            Vui lòng bổ sung bản cam kết an toàn thực phẩm có chữ ký của người đại diện.
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1133" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1134">
              Trạng thái hồ sơ
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1135">
              Cần bổ sung
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1136" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1137">
              Quyền đăng tin
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1138">
              Chưa được mở
            </p>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="77:1139" data-name="go/A02">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I77:1139;6:171">
            Về hàng đợi hồ sơ
          </p>
        </a>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="77:1100" data-name="SM/Admin navigation">
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1100;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1100;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1100;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1100;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1100;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I77:1100;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1100;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1100;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1100;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I77:1100;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1100;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1100;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1100;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1100;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1100;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1100;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1100;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
