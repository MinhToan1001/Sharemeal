const imgGroup = "https://www.figma.com/api/mcp/asset/6272a86b-c61d-4a96-a99e-95dac3416b73.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/3797241d-d58b-4fec-b02b-855a960eeb33.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/f8b36741-494e-47cc-928a-384eb43560b7.svg";
const imgNhMinhHaKitchen = "https://www.figma.com/api/mcp/asset/cf890367-82cc-43c7-92db-9250180a0b9e.png";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/101bbb32-a972-4910-a33b-fa4896beb140.svg";

type FormFieldDefaultProps = {
  className?: string;
  label?: string;
  placeholder?: string;
};

function FormFieldDefault({ className, label = "Nhãn trường", placeholder = "Nhập nội dung" }: FormFieldDefaultProps) {
  return (
    <div className={className || "content-stretch flex flex-col gap-[8px] items-start relative w-[348px]"} data-node-id="46:522" data-name="Form field / Default">
      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[15px] text-black whitespace-nowrap" data-node-id="46:523">
        {label}
      </p>
      <div className="bg-white border border-[#808080] border-solid content-stretch flex h-[52px] items-center overflow-clip px-[16px] relative rounded-[15px] shrink-0 w-full" data-node-id="46:524" data-name="Input">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#717171] text-[15px]" data-node-id="46:525">
          {placeholder}
        </p>
      </div>
    </div>
  );
}

type IconProps = {
  className?: string;
  property1?: "User" | "Box" | "ChervonLeft";
};

function Icon({ className, property1 = "User" }: IconProps) {
  const isBox = property1 === "Box";
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : isBox ? "overflow-clip size-[39px]" : "overflow-clip size-[46px]"}`} id={isChervonLeft ? "node-6_140" : isBox ? "node-6_109" : "node-6_94"}>
      {["User", "Box"].includes(property1) && (
        <div className={`absolute ${isBox ? "inset-[9.54%_12.5%_8.33%_12.5%]" : "inset-[16.67%]"}`} id={isBox ? "node-6_110" : "node-6_95"} data-name="Group">
          <div className={`absolute ${isBox ? "inset-[-3.12%_-3.42%_-1.66%_-3.42%]" : "inset-[-4.08%]"}`}>
            <img alt="" className="block max-w-none size-full" src={isBox ? imgGroup1 : imgGroup} />
          </div>
        </div>
      )}
      {isChervonLeft && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />}
    </div>
  );
}

export default function U01HSNgiCho() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:832" data-name="U01 · Hồ sơ người cho">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:833">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:834">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:835" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:836" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:837">
            Hồ sơ người cho
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:838">
            Chọn loại hình để xác minh đúng giấy tờ
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:841" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:842" data-name="Frame">
          <div className="h-[130px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1042" data-name="Ảnh minh họa / kitchen">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaKitchen} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:843">
            Bạn chia sẻ với tư cách nào?
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:844" data-name="go/verifyBusiness">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Box" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:850" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:851">
                Nhà hàng / Cửa hàng
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:852">
                Giấy phép, ảnh cơ sở và cam kết ATTP
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:853">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="64:854" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:855" data-name="go/U11">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:860" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:861">
                Cá nhân / Hộ gia đình
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:862">
                Danh tính, địa chỉ và cam kết ATTP
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:863">
              ›
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:864" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="64:865" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I64:865;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="64:869">
            Bạn có thể xem thực phẩm khi chờ xác minh. Quyền đăng tin được mở sau khi hồ sơ được duyệt.
          </p>
        </div>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Tên hiển thị" placeholder="Bếp Nhà Lan" />
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Người đại diện" placeholder="Nguyễn Thu Lan" />
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:878" data-name="go/verifyBusiness">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:878;6:171">
            Xác minh hồ sơ nhà hàng
          </p>
        </a>
      </div>
    </div>
  );
}
