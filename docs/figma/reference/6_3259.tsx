const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/0138064d-ed34-4577-885f-d5925e67ace7.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/49bac086-49fc-4386-ad1c-8b485866f165.svg";

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

export default function Component61() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:3259" data-name="61">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:3260">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:3261">
          <Icon className="relative shrink-0 size-[24px]" />
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Bold'] font-bold items-start leading-[0] not-italic relative shrink-0 w-[219px]" data-node-id="6:3263">
            <div className="flex flex-col h-[23px] justify-center mb-[-3px] relative shrink-0 text-[20px] text-black w-full" data-node-id="6:3264">
              <p className="leading-[normal]">Sửa tin đăng</p>
            </div>
            <div className="flex flex-col h-[23px] justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:3265">
              <p className="leading-[normal] whitespace-pre-wrap">{`Cơm gà xối mỡ  `}</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:3266">
          <p className="leading-[normal]">#SM-2041</p>
        </div>
      </div>
      <div className="absolute bg-[#fef0d5] content-stretch flex gap-[10px] items-start justify-center left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[99px] w-[370px]" data-node-id="6:3267">
        <div className="relative shrink-0 size-[24px]" data-node-id="6:3268" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#a3732f] text-[14px]" data-node-id="6:3269">
          Tin đã có 2 tổ chức gửi yêu cầu. Thay đổi giờ lấy hoặc số lượng sẽ được thông báo cho họ.
        </p>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[209px] not-italic text-[14px] text-black top-[262px] whitespace-nowrap" data-node-id="6:3270">
        Suất
      </p>
      <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-center left-[209px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[291px] w-[177px]" data-node-id="6:3271">
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3272">
          20
        </p>
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[209px] not-italic text-[14px] text-black top-[355px] whitespace-nowrap" data-node-id="6:3273">
        Đến
      </p>
      <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-center left-[209px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[384px] w-[177px]" data-node-id="6:3274">
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3275">
          20
        </p>
      </div>
      <div className="absolute contents left-[16px] top-[181px]" data-node-id="6:3276">
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[16px] not-italic text-[14px] text-black top-[181px] whitespace-nowrap" data-node-id="6:3277">
          Tên món
        </p>
        <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-center left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[210px] w-[370px]" data-node-id="6:3278">
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3279">
            Cơm gà xối mỡ
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[16px] top-[265px] w-[177px]" data-node-id="6:3280">
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-black w-full" data-node-id="6:3281">
          Số lượng
        </p>
        <div className="bg-white border border-[#808080] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[12px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3282">
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3283">
            20
          </p>
        </div>
      </div>
      <div className="absolute contents left-[16px] top-[358px]" data-node-id="6:3284">
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[16px] not-italic text-[14px] text-black top-[358px] whitespace-nowrap" data-node-id="6:3285">{`Lấy từ `}</p>
        <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-center left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[387px] w-[177px]" data-node-id="6:3286">
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color-3,#262a2f)] whitespace-nowrap" data-node-id="6:3287">
            20
          </p>
        </div>
      </div>
      <div className="absolute contents left-[16px] top-[442px]" data-node-id="6:3288">
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[16px] not-italic text-[14px] text-black top-[442px] whitespace-nowrap" data-node-id="6:3289">
          Ghi chú cho người nhận
        </p>
        <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-start left-[16px] overflow-clip pb-[24px] pt-[12px] px-[16px] rounded-[12px] top-[471px] w-[369px]" data-node-id="6:3290">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[14px] text-[color:var(--color-3,#262a2f)]" data-node-id="6:3291">
            Có phần không hành. Mang theo túi giữ nhiệt nếu có
          </p>
        </div>
      </div>
      <div className="[word-break:break-word] absolute bg-white content-stretch flex flex-col gap-[12px] items-start leading-[normal] left-[16px] not-italic overflow-clip px-[16px] py-[12px] rounded-[12px] text-[14px] top-[570px] w-[369px]" data-node-id="6:3292">
        <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-black w-full" data-node-id="6:3293">
          Lịch sử chỉnh sửa
        </p>
        <div className="content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[4px] items-start relative shrink-0 text-[color:var(--des-text,#919191)] w-full" data-node-id="6:3294">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:3295">
            <p className="relative shrink-0 w-[48.762px]" data-node-id="6:3296">
              Tạo tin
            </p>
            <p className="relative shrink-0 whitespace-nowrap" data-node-id="6:3297">
              Hôm nay, 16:40
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:3298">
            <p className="flex-[1_0_0] min-w-px relative" data-node-id="6:3299">
              Đổi số lượng 25 → 20
            </p>
            <p className="relative shrink-0 whitespace-nowrap" data-node-id="6:3300">
              Hôm nay, 17:10
            </p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex h-[83px] items-center justify-between left-1/2 overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:3301">
        <div className="border border-[var(--color-5,#979a9e)] border-solid content-stretch flex items-center justify-center overflow-clip px-[22px] py-[12px] relative rounded-[12px] shrink-0" data-node-id="6:3302" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap" data-node-id="6:3303">
            Hủy thay đổi
          </p>
        </div>
        <div className="bg-[#006642] content-stretch flex items-center justify-center overflow-clip px-[32px] py-[12px] relative rounded-[12px] shrink-0" data-node-id="6:3304" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="I6:3304;6:171">
            Lưu và thông báo
          </p>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[46px] left-[164px] top-[784.25px] w-[227px]" data-node-id="84:1660" data-name="Prototype / Lưu và thông báo" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[45px] left-[11px] top-[784.75px] w-[153px]" data-node-id="84:1662" data-name="Prototype / Hủy thay đổi" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1868" data-name="Prototype / Quay lại" />
    </div>
  );
}
