const imgProperty1Home = "https://www.figma.com/api/mcp/asset/f8e0017b-0099-47d3-8dba-5db2446fa620.svg";
const imgProperty1ChartBar = "https://www.figma.com/api/mcp/asset/e57b48d4-0972-4b5b-ba3d-929e22849046.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/99eba3bf-8dd9-4239-93e2-6ea8db501bc3.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/95b601b4-0794-4d69-85ca-b256534cdfe9.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/1dd9a396-b3c6-4440-aa5e-31f66d5c5de9.svg";
const imgProperty1Warn = "https://www.figma.com/api/mcp/asset/58b5f170-a8e6-42f9-8c29-935c10f6f144.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/bfb62983-64e0-4618-a363-9c314d3c26c0.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/53e137cf-42a2-4e31-8041-70b20b6e1ae7.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/e6b4a435-23dd-4c78-af13-88701899e05f.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/833a34fc-71f3-4e52-99c4-680c29abe452.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/6c9c2158-351a-4720-8ba7-2a3b1e43bcf6.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "ChartBar" | "Notice" | "Truck" | "warn" | "Security";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isChartBar = property1 === "ChartBar";
  const isNotice = property1 === "Notice";
  const isSecurity = property1 === "Security";
  const isTruck = property1 === "Truck";
  const isWarn = property1 === "warn";
  return (
    <div className={className || `relative ${isWarn ? "size-[24px]" : isSecurity ? "overflow-clip size-[34px]" : isTruck ? "size-[39px]" : isNotice ? "size-[41px]" : isChartBar ? "size-[37px]" : "size-[43px]"}`} id={isWarn ? "node-6_146" : isSecurity ? "node-6_134" : isTruck ? "node-6_122" : isNotice ? "node-6_101" : isChartBar ? "node-6_98" : "node-6_90"}>
      {["Home", "ChartBar", "Notice", "Truck", "warn"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isWarn ? imgProperty1Warn : isTruck ? imgProperty1Truck : isNotice ? imgProperty1Notice : isChartBar ? imgProperty1ChartBar : imgProperty1Home} />}
      {isSecurity && (
        <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="6:135" data-name="Group">
          <div className="absolute inset-[-3.44%_-3.92%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function A11ThongBaoQunTr() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="77:1018" data-name="A11 · Thông báo quản trị">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="77:1019">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="77:1020">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="77:1021" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="77:1022" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="77:1023">
            Thông báo quản trị
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="77:1024">
            Công việc mới và các thay đổi cần theo dõi
          </p>
        </div>
        <Icon className="relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="77:1027" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1053" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1054">
            Cần xử lý hôm nay
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1055" data-name="go/A03">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="77:1060" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="77:1061">
                HS-0419 đã hoàn tất hồ sơ
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="77:1062">
                Bếp Nhà Lan · Người cho / Nhà hàng
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="77:1063">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="77:1064" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1065" data-name="go/A04">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="77:1068" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="77:1069">
                CG-512 cần đổi người giao
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="77:1070">
                Hỏng xe · ưu tiên điều phối gần nhất
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="77:1071">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="77:1072" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1073" data-name="go/A05">
            <Icon className="relative shrink-0 size-[24px]" property1="warn" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="77:1076" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="77:1077">
                KN-3307 có bằng chứng mới
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="77:1078">
                Tổ chức xác nhận nhận 13/15 suất
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="77:1079">
              ›
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1080" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1081">
            Đã hoàn tất
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1082" data-name="go/A07">
            <Icon className="relative shrink-0 size-[24px]" property1="ChartBar" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="77:1086" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="77:1087">
                Báo cáo tuần đã được cập nhật
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="77:1088">
                Dựa trên số lượng bàn giao thực tế
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="77:1089">
              ›
            </p>
          </a>
        </div>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="77:1028" data-name="SM/Admin navigation">
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1028;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1028;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1028;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1028;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1028;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I77:1028;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1028;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1028;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1028;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I77:1028;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1028;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1028;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1028;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1028;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1028;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1028;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1028;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
