const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/9ef15af0-448d-43e0-9d0e-fd86eddd0c60.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/d76688ca-e765-4a57-bf30-7f277a7e9346.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/86c05a97-05ec-4782-b32a-f1ac060bb889.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/68d0e772-6731-4824-a9dc-d27345060786.svg";

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

export default function U25HyYeuCuNhn() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="65:1470" data-name="U25 · Hủy yêu cầu nhận">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="65:1471">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="65:1472">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="65:1473" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="65:1474" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="65:1475">
            Hủy yêu cầu nhận
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="65:1476">
            DN-367 · Cơm gà xối mỡ · 15 suất
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="65:1479" data-name="Content">
        <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1480" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="65:1481" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I65:1481;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-amber,#a35a09)] w-[298px]" data-node-id="65:1485">
            Người cho sẽ được thông báo. Số lượng được mở lại cho tổ chức khác.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1486" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1487">
            Lý do hủy
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1488" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="65:1489" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="65:1491">
              Đã đủ thực phẩm từ nguồn khác
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1492" data-name="Frame">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="65:1493" data-name="Icon">
              <div className="absolute inset-[8.33%]" data-node-id="I65:1493;6:143" data-name="Group">
                <div className="absolute inset-[-6%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup1} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="65:1497">
              Không thể nhận đúng giờ
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1498" data-name="Frame">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="65:1499" data-name="Icon">
              <div className="absolute inset-[8.33%]" data-node-id="I65:1499;6:143" data-name="Group">
                <div className="absolute inset-[-6%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup1} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="65:1503">
              Thay đổi nhu cầu thực tế
            </p>
          </div>
        </div>
        <FormFieldDefault className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" label="Lời nhắn tới người cho" placeholder="Xin lỗi, bên mình đã đủ suất ăn tối nay." />
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1508" data-name="go/cancelRequest">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I65:1508;6:171">
            Xác nhận hủy yêu cầu
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1510" data-name="go/U13">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I65:1510;6:173">
            Giữ yêu cầu
          </p>
        </a>
      </div>
    </div>
  );
}
