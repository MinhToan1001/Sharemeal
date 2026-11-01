const imgGroup = "https://www.figma.com/api/mcp/asset/c96b4db6-bf8b-471e-8116-592fc03759cb.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/e3dfd297-3c48-4eae-86e7-a16f836db17c.svg";
const imgNhMinhHaHandoff = "https://www.figma.com/api/mcp/asset/f49e4967-97b5-404b-b91c-8595ef18fa1f.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/174f46ff-9f19-42c4-af36-9733c08b3c0b.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/4f3360f3-6966-4258-92eb-5f3fb19ac230.svg";

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
  property1?: "ChervonLeft" | "Security";
};

function Icon({ className, property1 = "ChervonLeft" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : "overflow-clip size-[34px]"}`} id={isChervonLeft ? "node-6_140" : "node-6_134"}>
      {property1 === "Security" && (
        <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="6:135" data-name="Group">
          <div className="absolute inset-[-3.44%_-3.92%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
      {isChervonLeft && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />}
    </div>
  );
}

export default function U03HSTinhNguynVien() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:933" data-name="U03 · Hồ sơ tình nguyện viên">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:934">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:935">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:936" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:937" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:938">
            Hồ sơ tình nguyện viên
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:939">
            Xác minh trước khi nhận chuyến đầu tiên
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:942" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:943" data-name="Frame">
          <div className="h-[136px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1044" data-name="Ảnh minh họa / handoff">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaHandoff} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:944">
            Xác thực danh tính
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:945" data-name="Tài liệu đã đính kèm">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[260px]" data-node-id="64:950" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:951">
                Giấy tờ tùy thân
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:952">
                CCCD mặt trước và mặt sau
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="64:953">
              ›
            </p>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:954" data-name="Tài liệu đã đính kèm">
            <div className="relative shrink-0 size-[24px]" data-node-id="64:955" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[260px]" data-node-id="64:957" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:958">
                Ảnh chân dung
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:959">
                Đối chiếu với giấy tờ tùy thân
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="64:960">
              ›
            </p>
          </div>
        </div>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Họ và tên" placeholder="Trần Quốc Bảo" />
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Phương tiện & biển số" placeholder="Xe máy · 59-A1 123.45" />
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:969" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:970">
            Điều kiện giao nhận
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:971" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="64:972" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="64:974">
              Có túi giữ nhiệt sạch
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:975" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="64:976" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="64:978">
              Không mở hộp trong khi vận chuyển
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:979" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="64:980" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="64:982">
              Giao trực tiếp đúng người nhận
            </p>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:983" data-name="go/submitVolunteer">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:983;6:171">
            Gửi hồ sơ tình nguyện viên
          </p>
        </a>
      </div>
    </div>
  );
}
