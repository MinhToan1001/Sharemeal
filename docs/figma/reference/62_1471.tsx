const imgProperty1Home = "https://www.figma.com/api/mcp/asset/34882b8a-1081-4db9-a5c3-8c3f6b46c55e.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/281007d2-f453-4b7a-87f5-3125ca1fb91c.svg";
const imgNhMinhHaHandoff = "https://www.figma.com/api/mcp/asset/b83f6bad-828a-4386-bbe0-2b1f6e694f47.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/a30249f6-869d-4e6a-ad18-2c82f2aa16e3.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/5807d4ce-1c51-4be9-8cd1-d1bf93325f54.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/648092ad-3a6a-4145-b68f-bd36ef82fe92.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/30699877-036e-4707-a430-f5fa06da70ac.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/d925174b-5865-44ca-bbe5-3666ffe050f9.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/efdf7eac-e383-4531-8464-828e17e48373.svg";

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

export default function A10DaXLySC() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="62:1471" data-name="A10 · Đã xử lý sự cố">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:1472">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:1473">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="62:1474" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:1475" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:1476">
            Đã xử lý sự cố
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:1477">
            KN-3307 · Kết quả được gửi đến các bên
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:1480" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1506" data-name="Frame">
          <div className="relative shrink-0 size-[52px]" data-node-id="62:1507" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <div className="h-[140px] relative rounded-[16px] shrink-0 w-[310px]" data-node-id="73:1041" data-name="Ảnh minh họa / handoff">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaHandoff} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[25px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="62:1509">
            Đối soát hoàn tất
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="62:1510">
            Ghi nhận 13 suất trao thành công. Hai suất không đảm bảo được loại khỏi số liệu tác động.
          </p>
        </div>
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1511" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1512">
            Lịch sử quyết định
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1513" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1514">
              Người xử lý
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1515">
              Thu Hà · Quản trị viên
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1516" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1517">
              Trạng thái
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1518">
              Đã đóng khiếu nại
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1519" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1520">
              Thông báo
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1521">
              Người cho · Tổ chức · TNV
            </p>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="62:1522" data-name="go/A01">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I62:1522;6:171">
            Về trung tâm điều hành
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="62:1524" data-name="go/A07">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I62:1524;6:173">
            Xem báo cáo cập nhật
          </p>
        </a>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="62:1481" data-name="SM/Admin navigation">
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1481;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1481;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1481;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1481;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1481;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:1481;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1481;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1481;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1481;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I62:1481;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1481;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1481;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1481;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1481;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1481;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1481;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1481;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
