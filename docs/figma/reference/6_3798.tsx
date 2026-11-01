const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/3ae78704-e171-4c57-9473-f5d8d9ae428e.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/9bcec7c1-4704-4496-a269-29a206b612a9.svg";
const imgNhMinhHaKitchen = "https://www.figma.com/api/mcp/asset/73cdcb13-e551-4b6d-8bbc-a0e591a8fa0d.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/3d7271b1-0e38-4a3e-9ca6-0b6578e88bfc.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/16436b1c-6b7e-4eda-b04f-1c5e716d14cc.svg";

type IconProps = {
  className?: string;
  property1?: "Notice" | "Security";
};

function Icon({ className, property1 = "Notice" }: IconProps) {
  const isSecurity = property1 === "Security";
  return (
    <div className={className || `relative ${isSecurity ? "overflow-clip size-[34px]" : "size-[41px]"}`} id={isSecurity ? "node-6_134" : "node-6_101"}>
      {property1 === "Notice" && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1Notice} />}
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

export default function A03HSBpNhaLanScroll() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:3798" data-name="A03 · Hồ sơ Bếp Nhà Lan [scroll]">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(10%-18.2px)] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:935">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(70%+20.6px)] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:936">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(10%-18.2px)] overflow-clip top-[48px] w-[358px]" data-node-id="62:937" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:938" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:939">
            Hồ sơ Bếp Nhà Lan
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:940">
            HS-0419 · Người cho / Nhà hàng
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[606px] items-start left-[calc(10%-18.2px)] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:943" data-name="Content">
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:944" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:945">
            Thông tin đối tác
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:946" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:947">
              Người đại diện
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:948">
              Nguyễn Thu Lan
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:949" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:950">
              Địa chỉ
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:951">
              45 Nguyễn Thị Minh Khai
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:952" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:953">
              Mã số thuế
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:954">
              0312 458 971
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-8,8px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:955" data-name="Frame">
          <div className="h-[124px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1035" data-name="Ảnh minh họa / kitchen">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaKitchen} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="73:1036">
            Ảnh cơ sở · hình minh họa
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:956" data-name="Frame">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="62:961">
              GIẤY CHỨNG NHẬN ĐĂNG KÝ
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:962" data-name="Rectangle" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[15px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:963">
            HỘ KINH DOANH BẾP NHÀ LAN
          </p>
          <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="62:964">
            <p className="leading-[1.4] mb-0">Số: 0312 458 971</p>
            <p className="leading-[1.4] mb-0">Địa chỉ và đại diện khớp thông tin khai báo.</p>
            <p className="leading-[1.4]">Giấy phép · Ảnh cơ sở · Cam kết ATTP</p>
          </div>
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[158px]" data-node-id="62:965" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="62:966">
              3 tài liệu đã đối chiếu
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:967" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:968">
            Điều kiện phê duyệt
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:969" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="62:970" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="62:972">
              Danh tính và địa chỉ trùng khớp
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:973" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="62:974" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="62:976">
              Giấy phép còn hiệu lực
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:977" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="62:978" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="62:980">
              Cam kết an toàn đã ký
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:981" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="62:982" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:982;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="62:986">
            Duyệt sẽ mở quyền đăng thực phẩm và gửi thông báo cho đối tác.
          </p>
        </div>
      </div>
      <div className="absolute content-stretch cursor-pointer flex flex-col gap-[var(--sm-space-8,8px)] items-start left-[calc(10%-18.2px)] overflow-clip top-[746px] w-[358px]" data-node-id="77:1320" data-name="Sticky approval actions">
        <a className="bg-[#006642] content-stretch flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="62:987" data-name="go/approve">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I62:987;6:171">
            Phê duyệt hồ sơ
          </p>
        </a>
        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="62:989" data-name="Frame">
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[174px]" data-node-id="62:990" data-name="go/supplement">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I62:990;6:173">
              Yêu cầu bổ sung
            </p>
          </a>
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[174px]" data-node-id="62:992" data-name="go/reject">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I62:992;6:173">
              Từ chối
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
