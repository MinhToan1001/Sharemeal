const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/c99673c8-e8f0-4645-a7f5-38a0f633a018.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/3da495b9-a66e-47af-9716-c2aeaf02eb46.svg";

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
  property1?: "ChervonLeft";
};

function Icon({ className, property1 = "ChervonLeft" }: IconProps) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="6:140">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />
    </div>
  );
}

export default function U08KhoiPhcMtKhu() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:1199" data-name="U08 · Khôi phục mật khẩu">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1200">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1201">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1202" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1203" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1204">
            Khôi phục mật khẩu
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1205">
            Lấy lại quyền truy cập tài khoản của bạn
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1208" data-name="Content">
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1209" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[48px]" data-node-id="64:1210" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I64:1210;6:135" data-name="Group">
              <div className="absolute inset-[-2.44%_-2.78%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[23px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="64:1214">
            Xác thực danh tính trước khi đổi mật khẩu
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-muted,#687c74)] w-[310px]" data-node-id="64:1215">
            Mã xác thực được gửi đến số điện thoại hoặc email đã đăng ký.
          </p>
        </div>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Email hoặc số điện thoại" placeholder="0903 123 456" />
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Mã xác thực 6 số" placeholder="483721" />
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Mật khẩu mới" placeholder="Tối thiểu 8 ký tự" />
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1228" data-name="go/login">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1228;6:171">{`Lưu mật khẩu & đăng nhập`}</p>
        </a>
      </div>
    </div>
  );
}
