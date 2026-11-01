const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/ac2a470a-11ed-4c17-9704-0770cd8e5627.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/af52abd8-bab9-43a3-8c98-c2eb0ebc8fe2.svg";
const imgFrame312 = "https://www.figma.com/api/mcp/asset/7ade7afa-29cf-45c7-95b5-3a1f31c241f9.svg";

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

export default function Component62() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:3305" data-name="62">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:3306">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:3307">
          <Icon className="relative shrink-0 size-[24px]" />
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Bold'] font-bold items-start leading-[0] not-italic relative shrink-0 w-[219px]" data-node-id="6:3309">
            <div className="flex flex-col h-[23px] justify-center mb-[-3px] relative shrink-0 text-[20px] text-black w-full" data-node-id="6:3310">
              <p className="leading-[normal]">Đóng tin đăng</p>
            </div>
            <div className="flex flex-col h-[23px] justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:3311">
              <p className="leading-[normal] whitespace-pre-wrap">{`Cơm gà xối mỡ  `}</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:3312">
          <p className="leading-[normal]">#SM-2041</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#ffe0e0] content-stretch flex gap-[10px] items-start justify-center left-1/2 overflow-clip px-[16px] py-[12px] rounded-[12px] top-[99px] w-[370px]" data-node-id="6:3313">
        <div className="relative shrink-0 size-[24px]" data-node-id="6:3314" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[0] min-w-px not-italic relative text-[#a31919] text-[14px]" data-node-id="6:3315">
          <span className="font-['Inter:Bold'] font-bold leading-[normal]">Tin sẽ ngừng hiển thị với tổ chức</span>
          <span className="leading-[normal]">. 2 yêu cầu đang chờ sẽ được hủy và thông báo kèm lý do bạn chọn.</span>
        </p>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex h-[83px] items-center justify-between left-1/2 overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:3316">
        <div className="border border-[var(--color-5,#979a9e)] border-solid content-stretch flex items-center justify-center overflow-clip px-[38px] py-[12px] relative rounded-[12px] shrink-0 w-[143px]" data-node-id="6:3317" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap" data-node-id="6:3318">
            Giữ tin
          </p>
        </div>
        <div className="bg-[#a31919] content-stretch flex items-center justify-center overflow-clip px-[46px] py-[12px] relative rounded-[12px] shrink-0 w-[217px]" data-node-id="6:3319" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="I6:3319;6:171">
            Đóng tin đăng
          </p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[12px] items-start left-1/2 top-[198px] w-[370px]" data-node-id="6:3320">
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black w-full" data-node-id="6:3321">
          Lý do đóng tin
        </p>
        <div className="bg-white border border-[#006642] border-solid content-stretch flex gap-[10px] items-center overflow-clip px-[16px] py-[18px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3322">
          <div className="relative shrink-0 size-[31px]" data-node-id="6:3323">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame312} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3325">
            Đã tìm được nơi nhận bên ngoài
          </p>
        </div>
        <div className="bg-white border border-[#006642] border-solid content-stretch flex gap-[10px] items-center overflow-clip px-[16px] py-[18px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3326">
          <div className="bg-white border-[0.7px] border-black border-solid relative rounded-[116px] shrink-0 size-[31px]" data-node-id="6:3327" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3328">
            Số lượng thực tế không còn đủ
          </p>
        </div>
        <div className="bg-white border border-[#006642] border-solid content-stretch flex gap-[10px] items-center overflow-clip px-[16px] py-[18px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3329">
          <div className="bg-white border-[0.7px] border-black border-solid relative rounded-[116px] shrink-0 size-[31px]" data-node-id="6:3330" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3331">
            Thực phẩm không còn đảm bảo chất lượng
          </p>
        </div>
        <div className="bg-white border border-[#006642] border-solid content-stretch flex gap-[10px] items-center overflow-clip px-[16px] py-[18px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3332">
          <div className="bg-white border-[0.7px] border-black border-solid relative rounded-[116px] shrink-0 size-[31px]" data-node-id="6:3333" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3334">
            Quán đóng cửa đột xuất
          </p>
        </div>
        <div className="bg-white border border-[#006642] border-solid content-stretch flex gap-[10px] items-center overflow-clip px-[16px] py-[18px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3335">
          <div className="bg-white border-[0.7px] border-black border-solid relative rounded-[116px] shrink-0 size-[31px]" data-node-id="6:3336" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3337">
            Lý do khác
          </p>
        </div>
      </div>
      <div className="absolute contents left-[17px] top-[632px]" data-node-id="6:3338">
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[17px] not-italic text-[14px] text-black top-[632px] whitespace-nowrap" data-node-id="6:3339">
          Lời nhắn gửi tổ chức (tùy chọn)
        </p>
        <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-start left-[17px] overflow-clip pb-[24px] pt-[12px] px-[16px] rounded-[12px] top-[661px] w-[369px]" data-node-id="6:3340">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[14px] text-[color:var(--color-3,#262a2f)]" data-node-id="6:3341">
            Xin lỗi vì sự bất tiện, mình sẽ đăng lại vào hôm sau
          </p>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[43px] left-[62px] top-[2.5px] w-[229px]" data-node-id="84:1664" data-name="Prototype / Đóng tin đăng" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[46px] left-[164px] top-[784.25px] w-[227px]" data-node-id="84:1666" data-name="Prototype / Đóng tin đăng" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[45px] left-[11px] top-[784.75px] w-[153px]" data-node-id="84:1668" data-name="Prototype / Giữ tin" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1870" data-name="Prototype / Quay lại" />
    </div>
  );
}
