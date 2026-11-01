const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/185d65a8-fc64-4aea-a6e7-99ed894a9a40.svg";
const imgRectangle = "https://www.figma.com/api/mcp/asset/b06546c1-6369-4414-803f-e9faf884379d.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/721d9ddf-dbdb-4ccd-ba54-80aeabcbac4f.svg";

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

export default function D02BnMunChiaSMonGi() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:370" data-name="D02 · Bạn muốn chia sẻ món gì?">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="74:1062">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="74:1063">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="74:1064" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="74:1065" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="74:1066">
            Bạn muốn chia sẻ món gì?
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="74:1067">
            Bước 1 / 3 · Thông tin món ăn
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="74:1070" data-name="Content">
        <div className="h-[170px] relative rounded-[20px] shrink-0 w-[358px]" data-node-id="74:1071" data-name="Rectangle">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle} />
        </div>
        <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="74:1072" data-name="Frame">
          <div className="relative shrink-0 size-[24px]" data-node-id="74:1073" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="74:1075">
            Thay ảnh hoặc thêm ảnh món ăn
          </p>
        </div>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Tên món ăn" placeholder="Cơm gà xối mỡ" />
        <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="74:1080" data-name="Frame">
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[98px]" data-node-id="74:1081" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="74:1082">{`Cơm & món mặn`}</p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[86px]" data-node-id="74:1083" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1084">
              Rau củ
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[70px]" data-node-id="74:1085" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1086">
              Bánh
            </p>
          </div>
        </div>
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1087" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1088">
            Số lượng có thể chia sẻ
          </p>
          <div className="content-stretch flex font-['Inter:Bold'] font-bold gap-[24px] items-center overflow-clip relative shrink-0 text-[24px] w-[326px]" data-node-id="74:1089" data-name="Frame">
            <p className="relative shrink-0 text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="74:1090">
              −
            </p>
            <p className="relative shrink-0 text-[color:var(--sm-ink,#173a30)] w-[47px]" data-node-id="74:1091">{`20 `}</p>
            <p className="relative shrink-0 text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="74:1092">
              +
            </p>
          </div>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="74:1093">
            Một suất ước tính dành cho một người. Khai báo đúng lượng thực tế.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="74:1094" data-name="go/foodSafety">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I74:1094;6:171">
            Tiếp tục: An toàn thực phẩm
          </p>
        </a>
      </div>
    </div>
  );
}
