const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/13c6f50a-2790-4629-80ef-2ecc1ddc2ae6.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/b98adea0-8008-416b-bdb6-78233e6bbe85.svg";
const imgLogo = "https://www.figma.com/api/mcp/asset/9efca857-b415-4799-873e-e15ab80af2f6.svg";

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

export default function Component67() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:3516" data-name="67">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:3517">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:3518">
          <Icon className="relative shrink-0 size-[24px]" />
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 w-[219px]" data-node-id="6:3520">
            <div className="flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center min-w-full relative shrink-0 text-[20px] text-black w-[min-content]" data-node-id="6:3521">
              <p className="leading-[normal]">Hẹn giờ lấy hàng</p>
            </div>
            <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:3522">
              <p className="leading-[normal]">{`Thương lượng khung giờ với bên đăng `}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#c5e7ff] content-stretch flex gap-[10px] items-start justify-center left-1/2 overflow-clip px-[16px] py-[12px] rounded-[12px] top-[448px] w-[370px]" data-node-id="6:3523">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="6:3524" data-name="Icon">
          <div className="absolute inset-[8.33%]" data-node-id="I6:3524;6:143" data-name="Group">
            <div className="absolute inset-[-5%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup} />
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#00488f] text-[14px]" data-node-id="6:3525">
          Bạn sẽ nhận nhắc nhở trước 30 phút. Đến muộn quá 15 phút, suất có thể chuyển cho nơi khác.
        </p>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[72px] left-[16px] overflow-clip rounded-[12px] top-[102px] w-[370px]" data-node-id="6:3526">
        <div className="absolute bg-[#fef0d5] h-[46px] left-[12px] overflow-clip rounded-[15px] top-[12px] w-[45px]" data-node-id="6:3527">
          <div className="absolute h-[20px] left-[12px] top-[13px] w-[22px]" data-node-id="6:3528" data-name="Logo">
            <div className="absolute inset-[-4.94%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLogo} />
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[72px] not-italic text-[16px] text-black top-[27px] w-[192px]" data-node-id="6:3529">
          <p className="leading-[normal]">Cơm gà xối mỡ - 15 suất</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[72px] not-italic text-[#6e6e6e] text-[13px] top-[45px] w-[250px]" data-node-id="6:3530">
          <p className="leading-[normal]">Bên đăng cho phép lấy 19:00 – 20:30</p>
        </div>
      </div>
      <div className="absolute contents left-[16px] top-[310px]" data-node-id="6:3531">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[16px] not-italic text-[16px] text-black top-[319.5px] whitespace-nowrap" data-node-id="6:3532">
          <p className="leading-[normal]">Chọn giờ đến lấy</p>
        </div>
        <div className="absolute gap-x-[16px] gap-y-[12px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] left-[17px] top-[344px] w-[369px]" data-node-id="6:3533">
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center justify-self-stretch overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3534">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3535">
              <p className="leading-[normal]">19:00</p>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center justify-self-stretch overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3536">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3537">
              <p className="leading-[normal]">19:15</p>
            </div>
          </div>
          <div className="bg-[#1b6a4a] content-stretch flex flex-col items-center justify-self-stretch overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3538">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" data-node-id="6:3539">
              <p className="leading-[normal]">19:30</p>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center justify-self-stretch overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3540">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3541">
              <p className="leading-[normal]">19:45</p>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center justify-self-stretch overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3542">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3543">
              <p className="leading-[normal]">20:00</p>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center justify-self-stretch overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3544">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3545">
              <p className="leading-[normal]">20:15</p>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-dashed content-stretch flex flex-col items-center justify-self-stretch opacity-50 overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3546">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3547">
              <p className="leading-[normal]">20:45</p>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[var(--des-text,#919191)] border-dashed content-stretch flex flex-col items-center justify-self-stretch opacity-50 overflow-clip px-[16px] py-[10px] relative rounded-[12px] self-stretch shrink-0" data-node-id="6:3548">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap" data-node-id="6:3549">
              <p className="leading-[normal]">21:00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] absolute contents font-['Inter:Bold'] font-bold leading-[0] left-[16px] not-italic top-[190px]" data-node-id="6:3550">
        <div className="-translate-y-1/2 absolute flex flex-col justify-center left-[16px] text-[16px] text-black top-[199.5px] whitespace-nowrap" data-node-id="6:3551">
          <p className="leading-[normal]">Chọn ngày</p>
        </div>
        <div className="absolute bg-[rgba(225,253,232,0.92)] border-[#1b6a4a] border-[1.5px] border-solid content-stretch flex flex-col items-center left-[16px] overflow-clip px-[12px] py-[16px] rounded-[12px] text-[#1b6a4a] text-center top-[220px] w-[118px]" data-node-id="6:3552">
          <div className="flex flex-col justify-center relative shrink-0 text-[14px] w-full" data-node-id="6:3553">
            <p className="leading-[normal]">Hôm nay</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[18px] w-full" data-node-id="6:3554">
            <p className="leading-[normal]">14</p>
          </div>
        </div>
        <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center left-[142px] overflow-clip px-[12px] py-[16px] rounded-[12px] text-black text-center top-[220px] w-[118px]" data-node-id="6:3555">
          <div className="flex flex-col justify-center relative shrink-0 text-[14px] w-full" data-node-id="6:3556">
            <p className="leading-[normal]">Ngày mai</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[18px] w-full" data-node-id="6:3557">
            <p className="leading-[normal]">15</p>
          </div>
        </div>
        <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col items-center left-[268px] overflow-clip px-[12px] py-[16px] rounded-[12px] text-black text-center top-[220px] w-[118px]" data-node-id="6:3558">
          <div className="flex flex-col justify-center relative shrink-0 text-[14px] w-full" data-node-id="6:3559">
            <p className="leading-[normal]">Thứ 6</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[18px] w-full" data-node-id="6:3560">
            <p className="leading-[normal]">16</p>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[16px] top-[539px]" data-node-id="6:3561">
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[16px] not-italic text-[14px] text-black top-[539px] whitespace-nowrap" data-node-id="6:3562">
          Lời nhắn (tùy chọn)
        </p>
        <div className="absolute bg-white border border-[#808080] border-solid content-stretch flex items-start left-[16px] overflow-clip pb-[24px] pt-[12px] px-[16px] rounded-[12px] top-[568px] w-[369px]" data-node-id="6:3563">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[14px] text-[color:var(--color-3,#262a2f)]" data-node-id="6:3564">
            Bên mình đến bằng xe bán tài màu trắng
          </p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white bottom-0 content-stretch flex flex-col items-start left-1/2 overflow-clip px-[35px] py-[17px] w-[402px]" data-node-id="6:3565">
        <div className="bg-[#006642] content-stretch flex items-center justify-center overflow-clip px-[32px] py-[12px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3566" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="I6:3566;6:171">{`Xác nhận ghép & giờ lấy`}</p>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[46px] left-[30px] top-[785px] w-[342px]" data-node-id="84:1670" data-name="Prototype / Xác nhận ghép & giờ lấy" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1872" data-name="Prototype / Quay lại" />
    </div>
  );
}
