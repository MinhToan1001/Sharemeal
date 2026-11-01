const imgProperty1ChartBar = "https://www.figma.com/api/mcp/asset/90b29224-5877-404a-b371-8ed0399c2bb4.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/a0cae196-1abb-4823-8254-3798eed07d55.svg";
const imgProperty1Mess = "https://www.figma.com/api/mcp/asset/3e7de885-2a4a-45ed-a829-09120fc1523a.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/88c6e6a7-dd24-4000-960f-e8156653d03c.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/1b466cdf-305a-41df-b7f4-3875434a7243.svg";
const imgProperty1Pen = "https://www.figma.com/api/mcp/asset/5618d107-d5e2-4ed9-9938-46841b0f2319.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/d2a9164c-123c-4f29-9c65-222a16a1c65d.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/a0fb412b-aeae-4329-832a-2a7c7b3b6776.svg";

type IconProps = {
  className?: string;
  property1?: "ChartBar" | "Notice" | "Mess" | "MapPing" | "Pen" | "ChervonLeft" | "Security";
};

function Icon({ className, property1 = "ChartBar" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  const isMapPing = property1 === "MapPing";
  const isMess = property1 === "Mess";
  const isNotice = property1 === "Notice";
  const isPen = property1 === "Pen";
  const isSecurity = property1 === "Security";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : isPen ? "size-[45px]" : isSecurity ? "overflow-clip size-[34px]" : isMapPing ? "overflow-clip size-[24px]" : isMess ? "size-[43px]" : isNotice ? "size-[41px]" : "size-[37px]"}`} id={isChervonLeft ? "node-6_140" : isPen ? "node-6_138" : isSecurity ? "node-6_134" : isMapPing ? "node-6_118" : isMess ? "node-6_114" : isNotice ? "node-6_101" : "node-6_98"}>
      {["ChartBar", "Notice", "Mess", "Pen", "ChervonLeft"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : isPen ? imgProperty1Pen : isMess ? imgProperty1Mess : isNotice ? imgProperty1Notice : imgProperty1ChartBar} />}
      {["MapPing", "Security"].includes(property1) && (
        <div className={`absolute ${isSecurity ? "inset-[8.33%_12.5%_6.25%_12.5%]" : "inset-[12.5%_20.83%_13.56%_20.83%]"}`} id={isSecurity ? "node-6_135" : "node-6_119"} data-name="Group">
          <div className={`absolute ${isSecurity ? "inset-[-3.44%_-3.92%]" : "inset-[-5.64%_-7.14%]"}`}>
            <img alt="" className="block max-w-none size-full" src={isSecurity ? imgGroup1 : imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function P01HSCaToi() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:2504" data-name="P01 · Hồ sơ của tôi">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="66:1702">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="66:1703">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="66:1704" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="66:1705" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="66:1706">
            Hồ sơ của tôi
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="66:1707">
            Quản lý tài khoản và vai trò
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="66:1710" data-name="Content">
        <div className="bg-[var(--sm-dark,#103e31)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[20px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1711" data-name="Frame">
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[318px]" data-node-id="66:1712" data-name="Frame">
            <div className="overflow-clip relative shrink-0 size-[44px]" data-node-id="66:1713" data-name="Icon">
              <div className="absolute inset-[16.67%]" data-node-id="I66:1713;6:95" data-name="Group">
                <div className="absolute inset-[-4.26%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup2} />
                </div>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[250px]" data-node-id="66:1717" data-name="Frame">
              <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-surface,white)] w-[250px]" data-node-id="66:1718">
                Nguyễn Minh Anh
              </p>
              <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-tint,#e3f2e9)] w-[250px]" data-node-id="66:1719">
                0903 123 456 · Đã xác thực OTP
              </p>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-tint,#e3f2e9)] w-[318px]" data-node-id="66:1720">
            Một tài khoản, nhiều cách đóng góp
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1721" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1722">{`Vai trò & quyền sử dụng`}</p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1723" data-name="go/U09">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1728" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1729">
                Quản lý vai trò của tôi
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1730">
                Chuyển vai trò hoặc thêm hồ sơ mới
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1731">
              ›
            </p>
          </a>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1732" data-name="go/U04">
            <Icon className="relative shrink-0 size-[24px]" property1="Pen" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1735" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1736">{`Giấy tờ & trạng thái xác minh`}</p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1737">
                Xem kết quả và cập nhật tài liệu
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1738">
              ›
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1739" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1740">
            Cài đặt tài khoản
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1741" data-name="go/warehouse">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="MapPing" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1746" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1747">
                Địa chỉ và điểm nhận
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1748">
                Quản lý địa điểm, giờ hoạt động
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1749">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="66:1750" data-name="Rectangle" />
          <button className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1751" data-name="go/impactReport">
            <Icon className="relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1755" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1756">
                Báo cáo tác động
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1757">
                Xem số lượng đã xác nhận thực tế
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1758">
              ›
            </p>
          </button>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="66:1759" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1760" data-name="go/U10">
            <Icon className="relative shrink-0 size-[24px]" property1="Mess" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1763" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1764">
                Trung tâm hỗ trợ
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1765">
                Theo dõi yêu cầu đã gửi
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1766">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="66:1767" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1768" data-name="go/settings">
            <Icon className="relative shrink-0 size-[24px]" property1="Notice" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1771" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1772">
                Cài đặt thông báo
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1773">
                Nhắc chuyến, yêu cầu và xác minh
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1774">
              ›
            </p>
          </a>
        </div>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="66:1775" data-name="go/login">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1775;6:173">
            Đăng xuất
          </p>
        </a>
      </div>
    </div>
  );
}
