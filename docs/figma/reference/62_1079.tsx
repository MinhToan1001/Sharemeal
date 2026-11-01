const imgProperty1Home = "https://www.figma.com/api/mcp/asset/abe95b7e-d309-4625-babe-e132f93113d6.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/2c8c991b-0a21-4ea5-ba93-4b27fa360df4.svg";
const imgNhMinhHaHandoff = "https://www.figma.com/api/mcp/asset/cb4e2682-5f45-4233-a3d3-2d926828aecc.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/87b059fa-a294-4b21-91ab-7beb5e397f83.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/c7f45d2c-edd0-4526-835b-5eac88a658db.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/c356a85b-b716-4613-9760-707845461bee.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/7c5457b1-5fee-467d-b3ae-01e3a6fdd035.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/e62ee590-302f-45fd-9316-265f336f0c23.svg";

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

export default function A05DiSoatKhiuNi() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="62:1079" data-name="A05 · Đối soát khiếu nại">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:1080">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:1081">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="62:1082" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:1083" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:1084">
            Đối soát khiếu nại
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:1085">
            KN-3307 · Đơn nhận DN-367
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:1088" data-name="Content">
        <div className="bg-[var(--sm-redBg,#fce9e7)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1114" data-name="Frame">
          <div className="relative shrink-0 size-[22px]" data-node-id="62:1115" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-red,#b34343)] w-[298px]" data-node-id="62:1117">
            Tổ chức báo thiếu 2 suất. Tạm giữ kết quả hoàn tất cho đến khi đối soát.
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[358px] whitespace-nowrap" data-node-id="62:1118" data-name="Frame">
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="62:1119" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I62:1119;60:566">
              Đã xác nhận lấy
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I62:1119;60:567">
              15 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I62:1119;60:568">
              Người cho · 19:12
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="62:1123" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I62:1123;60:566">
              Tổ chức báo nhận
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I62:1123;60:567">
              13 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I62:1123;60:568">
              Mái ấm · 19:42
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1127" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1128">{`Diễn biến & bằng chứng`}</p>
          <div className="h-[124px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1037" data-name="Ảnh minh họa / handoff">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaHandoff} />
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1129" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="62:1130" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="62:1131">
                ✓
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="62:1132" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="62:1133">
                19:12 · Lấy hàng
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="62:1134">
                Ảnh: 15 hộp, QR đã đối chiếu
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1135" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="62:1136" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="62:1137">
                ✓
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="62:1138" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="62:1139">
                19:35 · Sự cố vận chuyển
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="62:1140">
                Tình nguyện viên báo rơi 2 hộp
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1141" data-name="Frame">
            <div className="bg-[var(--sm-brand,#006642)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="62:1142" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-surface,white)] whitespace-nowrap" data-node-id="62:1143">
                3
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="62:1144" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="62:1145">
                19:42 · Tổ chức xác nhận
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="62:1146">
                13 hộp nguyên vẹn, 2 hộp không dùng được
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1147" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1148">
            Phương án xử lý
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1149">
            Ghi nhận 13 suất trao thành công. Hai suất hỏng không tính vào tác động; lưu sự cố và nhắc lại quy trình bảo quản.
          </p>
          <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[326px]" data-node-id="62:1150" data-name="go/resolveCase">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I62:1150;6:171">{`Chốt kết quả & thông báo`}</p>
          </a>
        </div>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="62:1089" data-name="SM/Admin navigation">
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1089;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1089;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1089;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1089;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1089;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:1089;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1089;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1089;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1089;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I62:1089;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1089;60:585">
            Điều phối
          </p>
        </a>
        <div className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1089;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1089;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="I62:1089;60:589">
            Sự cố
          </p>
        </div>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1089;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1089;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1089;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
