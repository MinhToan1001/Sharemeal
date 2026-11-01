const imgProperty1Home = "https://www.figma.com/api/mcp/asset/3ee4f9a1-6d9f-484b-95a6-f315c2207203.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/754d530e-bdaa-4922-8aea-4577294a1759.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/c7dd39e9-30dd-40c5-bf7a-755dea354435.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/fe2a52be-461e-435f-bd66-38e9853d20a2.svg";
const imgProperty1Warn = "https://www.figma.com/api/mcp/asset/ce7de22e-1abd-45e0-bfcb-072ee8eb79fa.svg";
const imgNhMinhHaHandoff = "https://www.figma.com/api/mcp/asset/9bb8d2ab-9773-40e4-b9e7-aee15da64b61.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/aaae097c-0a12-4825-9af9-e16c06f8453b.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/652b3a7a-0caf-4487-a16c-407e554fa660.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/ec9e946b-2c86-4755-ac02-400ad4e78395.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/1ef1781b-0dc5-4838-851c-597f09e82f50.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/a064a9c3-8a07-427e-a8a8-35e9336378e6.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "Notice" | "Truck" | "warn" | "Security";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isNotice = property1 === "Notice";
  const isSecurity = property1 === "Security";
  const isTruck = property1 === "Truck";
  const isWarn = property1 === "warn";
  return (
    <div className={className || `relative ${isWarn ? "size-[24px]" : isSecurity ? "overflow-clip size-[34px]" : isTruck ? "size-[39px]" : isNotice ? "size-[41px]" : "size-[43px]"}`} id={isWarn ? "node-6_146" : isSecurity ? "node-6_134" : isTruck ? "node-6_122" : isNotice ? "node-6_101" : "node-6_90"}>
      {["Home", "Notice", "Truck", "warn"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isWarn ? imgProperty1Warn : isTruck ? imgProperty1Truck : isNotice ? imgProperty1Notice : imgProperty1Home} />}
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

export default function A01TrungTamDiuHanh() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:3641" data-name="A01 · Trung tâm điều hành">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(10%-18.2px)] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:617">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(70%+20.6px)] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:618">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(10%-18.2px)] overflow-clip top-[48px] w-[358px]" data-node-id="62:619" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:620" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:621">
            Trung tâm điều hành
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:622">
            Thứ Năm, 29 tháng 10 · TP. Hồ Chí Minh
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[calc(10%-18.2px)] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:625" data-name="Content">
        <div className="bg-[var(--sm-dark,#103e31)] content-stretch flex flex-col gap-[6px] items-start overflow-clip p-[20px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:651" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-tint,#e3f2e9)] w-[140px]" data-node-id="62:652">
            MỖI BỮA ĂN ĐỀU CÓ GIÁ TRỊ
          </p>
          <div className="h-[120px] relative rounded-[16px] shrink-0 w-[318px]" data-node-id="73:1033" data-name="Ảnh minh họa / handoff">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaHandoff} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[26px] text-[color:var(--sm-surface,white)] w-[318px]" data-node-id="62:653">
            2.418 suất đã trao
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-tint,#e3f2e9)] w-[318px]" data-node-id="62:654">
            Hôm nay cộng đồng đã cứu 326 kg thực phẩm
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[358px] whitespace-nowrap" data-node-id="62:655" data-name="Frame">
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="62:656" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I62:656;60:566">
              Hồ sơ chờ duyệt
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I62:656;60:567">
              12
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I62:656;60:568">
              3 hồ sơ gần quá hạn
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="62:660" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I62:660;60:566">
              Chuyến đang chạy
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I62:660;60:567">
              37
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I62:660;60:568">
              2 chuyến cần hỗ trợ
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:664" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:665">
            Cần bạn xử lý
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:666" data-name="go/A03">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="62:671" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="62:672">
                Duyệt hồ sơ Bếp Nhà Lan
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="62:673">
                Đã đủ tài liệu · chờ 2 giờ
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="62:674">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:675" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:676" data-name="go/A04">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="62:679" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="62:680">
                Chuyến #CG-512 gặp sự cố
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="62:681">
                Hỏng xe · còn 28 phút để giao
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="62:682">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:683" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:684" data-name="go/A05">
            <Icon className="relative shrink-0 size-[24px]" property1="warn" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="62:687" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="62:688">
                Khiếu nại cần đối soát
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="62:689">
                Thiếu 2 suất trong đơn #DN-367
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="62:690">
              ›
            </p>
          </a>
        </div>
        <a className="bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:691" data-name="go/A07">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] text-left w-[326px]" data-node-id="62:692">
            Nhịp chia sẻ trong tuần
          </p>
          <div className="h-[100px] overflow-clip relative shrink-0 w-[326px]" data-node-id="62:693" data-name="Frame">
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[34.714px] left-[8px] rounded-[5px] top-[41.29px] w-[26px]" data-node-id="62:694" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[13px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:695">
              T2
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[45px] left-[54.57px] rounded-[5px] top-[31px] w-[26px]" data-node-id="62:696" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[59.57px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:697">
              T3
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[37.286px] left-[101.14px] rounded-[5px] top-[38.71px] w-[26px]" data-node-id="62:698" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[106.14px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:699">
              T4
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[54px] left-[147.71px] rounded-[5px] top-[22px] w-[26px]" data-node-id="62:700" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[152.71px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:701">
              T5
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[48.857px] left-[194.29px] rounded-[5px] top-[27.14px] w-[26px]" data-node-id="62:702" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[199.29px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:703">
              T6
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[61.071px] left-[240.86px] rounded-[5px] top-[14.93px] w-[26px]" data-node-id="62:704" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[245.86px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:705">
              T7
            </p>
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[72px] left-[287.43px] rounded-[5px] top-[4px] w-[26px]" data-node-id="62:706" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[292.43px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] text-left top-[83px] whitespace-nowrap" data-node-id="62:707">
              CN
            </p>
          </div>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1357" data-name="auth/login">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I98:1357;6:173">
            Đăng xuất tài khoản quản trị
          </p>
        </a>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="62:626" data-name="SM/Admin navigation">
        <div className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:626;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:626;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="I62:626;60:573">
            Tổng quan
          </p>
        </div>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:626;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:626;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:626;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:626;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:626;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:626;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I62:626;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:626;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:626;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:626;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:626;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:626;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:626;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:626;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
