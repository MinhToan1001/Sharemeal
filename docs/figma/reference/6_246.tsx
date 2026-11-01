const imgProperty1Love = "https://www.figma.com/api/mcp/asset/a788592b-f712-4fa8-ac2c-6f0eed57eec0.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/5dfd8fea-e770-4446-a4a7-988c02f3e1e8.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/1471390d-508b-42c0-8979-2328025b8d15.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/dad67eb0-fbf6-4deb-80b4-f079e811c10b.svg";
const imgRectangle = "https://www.figma.com/api/mcp/asset/91250083-82dd-484e-8507-7f34e780fc42.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/f355e271-6d9e-422d-90e9-751f22adab03.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/8a262e3e-c4cc-41af-97be-14c2e5089c3d.svg";

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
  property1?: "Love" | "Box" | "Truck" | "Security";
};

function Icon({ className, property1 = "Love" }: IconProps) {
  const isBox = property1 === "Box";
  const isSecurity = property1 === "Security";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isSecurity ? "overflow-clip size-[34px]" : isTruck ? "size-[39px]" : isBox ? "overflow-clip size-[39px]" : "size-[31px]"}`} id={isSecurity ? "node-6_134" : isTruck ? "node-6_122" : isBox ? "node-6_109" : "node-6_107"}>
      {["Love", "Truck"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isTruck ? imgProperty1Truck : imgProperty1Love} />}
      {["Box", "Security"].includes(property1) && (
        <div className={`absolute ${isSecurity ? "inset-[8.33%_12.5%_6.25%_12.5%]" : "inset-[9.54%_12.5%_8.33%_12.5%]"}`} id={isSecurity ? "node-6_135" : "node-6_110"} data-name="Group">
          <div className={`absolute ${isSecurity ? "inset-[-3.44%_-3.92%]" : "inset-[-3.12%_-3.42%_-1.66%_-3.42%]"}`}>
            <img alt="" className="block max-w-none size-full" src={isSecurity ? imgGroup1 : imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Component01DangNhp() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:246" data-name="01 · Đăng nhập">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="98:1177">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="98:1178">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex flex-col gap-[var(--sm-space-12,12px)] h-[806px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[48px] w-[358px]" data-node-id="98:1179" data-name="Content">
        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="98:1180" data-name="Frame">
          <div className="relative shrink-0 size-[28px]" data-node-id="98:1181" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[23px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="98:1183">
            ShareMeal
          </p>
        </div>
        <div className="h-[140px] relative rounded-[20px] shrink-0 w-[358px]" data-node-id="98:1184" data-name="Rectangle">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[25px] text-[color:var(--sm-ink,#173a30)] w-[358px]" data-node-id="98:1185">
          Chào mừng trở lại
        </p>
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#667a70] text-[11px] whitespace-nowrap" data-node-id="105:1142">
          TÀI KHOẢN ĐÃ LƯU TRÊN THIẾT BỊ
        </p>
        <div className="content-stretch cursor-pointer flex gap-[10px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="98:1186" data-name="Frame">
          <button className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[76px] items-center overflow-clip p-[8px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[82px]" data-node-id="98:1187" data-name="Tài khoản gần đây / donor">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Box" />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-ink,#173a30)] text-left whitespace-nowrap" data-node-id="98:1193">
              Người cho
            </p>
            <div className="absolute left-[64px] size-[12px] top-[7px]" data-node-id="105:1143" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
          </button>
          <button className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[76px] items-center overflow-clip p-[8px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[82px]" data-node-id="98:1195" data-name="Tài khoản gần đây / charity">
            <Icon className="relative shrink-0 size-[24px]" />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-ink,#173a30)] text-left whitespace-nowrap" data-node-id="98:1198">
              Tổ chức
            </p>
          </button>
          <button className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[76px] items-center overflow-clip p-[8px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[82px]" data-node-id="98:1200" data-name="Tài khoản gần đây / volunteer">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-ink,#173a30)] text-left whitespace-nowrap" data-node-id="98:1203">
              Tình nguyện
            </p>
          </button>
          <button className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[76px] items-center overflow-clip p-[8px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[82px]" data-node-id="98:1205" data-name="Tài khoản gần đây / admin">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-ink,#173a30)] text-left whitespace-nowrap" data-node-id="98:1210">
              Quản trị
            </p>
          </button>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" data-node-id="98:1212" data-name="Form field / Default">
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[15px] text-black whitespace-nowrap" data-node-id="I98:1212;46:523">
            Email hoặc số điện thoại
          </p>
          <div className="bg-white border border-[#808080] border-solid content-stretch flex h-[52px] items-center overflow-clip px-[16px] relative rounded-[15px] shrink-0 w-full" data-node-id="I98:1212;46:524" data-name="Input">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#717171] text-[15px]" data-node-id="I98:1212;46:525">
              lan@bepnhalan.vn
            </p>
          </div>
        </div>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Mật khẩu" placeholder="••••••••" />
        <a className="[word-break:break-word] block cursor-pointer font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] text-right w-[358px]" data-node-id="98:1220">
          <p className="leading-[1.4]">Quên mật khẩu?</p>
        </a>
        <button className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1222" data-name="auth/authLogin">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I98:1222;6:171">
            Đăng nhập
          </p>
        </button>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1225" data-name="auth/signup">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I98:1225;6:173">
            Chưa có tài khoản? Đăng ký
          </p>
        </a>
      </div>
    </div>
  );
}
