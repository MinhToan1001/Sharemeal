const imgRectangle = "https://www.figma.com/api/mcp/asset/318e4e0f-2a32-466a-bde4-55fb005063e4.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/1f485294-e4d6-4024-9fe6-9fd145eba666.svg";

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

export default function Component02DangKy() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="46:526" data-name="02 · Đăng ký">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="98:1228">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="98:1229">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex flex-col gap-[var(--sm-space-12,12px)] h-[806px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[48px] w-[358px]" data-node-id="98:1230" data-name="Content">
        <div className="h-[116px] relative rounded-[20px] shrink-0 w-[358px]" data-node-id="98:1231" data-name="Rectangle">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[25px] text-[color:var(--sm-ink,#173a30)] w-[358px]" data-node-id="98:1232">
          Bắt đầu chia sẻ bữa ăn
        </p>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-muted,#687c74)] w-[358px]" data-node-id="98:1233">
          Một tài khoản để cho, nhận hoặc tình nguyện giao thực phẩm.
        </p>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Họ và tên" placeholder="Nguyễn Minh Anh" />
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Email hoặc số điện thoại" placeholder="minhanh@gmail.com" />
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Mật khẩu" placeholder="••••••••" />
        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="98:1246" data-name="Frame">
          <div className="relative shrink-0 size-[22px]" data-node-id="98:1247" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="98:1249">
            Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1250" data-name="auth/createAccount">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I98:1250;6:171">{`Tạo tài khoản & xác thực`}</p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1253" data-name="auth/login">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I98:1253;6:173">
            Đã có tài khoản? Đăng nhập
          </p>
        </a>
      </div>
    </div>
  );
}
