const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/7ea9331e-2ed1-40e0-b912-526a23e09595.svg";

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

export default function Component17() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:609" data-name="17">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:610">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:611">
          <Icon className="relative shrink-0 size-[24px]" />
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 w-[219px]" data-node-id="6:613">
            <div className="flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center relative shrink-0 text-[20px] text-black w-full" data-node-id="6:614">
              <p className="leading-[normal]">Yêu cầu nhận</p>
            </div>
            <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:615">
              <p className="leading-[normal]">Cơm gà xối mỡ còn 20 suất</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex h-[106px] items-end justify-center left-1/2 overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:616">
        <div className="border border-[var(--color-5,#979a9e)] border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[16px] py-[19px] relative rounded-[12px]" data-node-id="6:617" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#006642] text-[16px] whitespace-nowrap" data-node-id="6:618">
            Xem gợi ý ghép cặp tự động
          </p>
        </div>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col gap-[12px] items-start left-[16px] overflow-clip px-[16px] py-[24px] rounded-[24px] top-[73px] w-[370px]" data-node-id="6:619">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="6:620">
          <div className="bg-[rgba(255,227,173,0.6)] overflow-clip relative rounded-[100px] shrink-0 size-[40px]" data-node-id="6:621">
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-7px)] not-italic text-[#a3732f] text-[18px] top-1/2 whitespace-nowrap" data-node-id="6:622">
              <p className="leading-[normal]">H</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 w-[189px]" data-node-id="6:623">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[18px] text-black w-full" data-node-id="6:624">
              <p className="leading-[normal]">Mái ấm hoa sen</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[14px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:625">
              <p className="leading-[normal] whitespace-pre-wrap">{`1.2 km  Đã xác nhận  4.9 sao`}</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[0] not-italic relative shrink-0 text-[14px] w-full" data-node-id="6:626">
          <div className="bg-[#ececec] content-stretch flex flex-col gap-[4px] items-start overflow-clip pl-[12px] pr-[24px] py-[6px] relative rounded-[12px] shrink-0 w-[98px]" data-node-id="6:627">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] w-full" data-node-id="6:628">
              <p className="leading-[normal]">Xin nhận</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-black w-full" data-node-id="6:629">
              <p className="leading-[normal]">15 suất</p>
            </div>
          </div>
          <div className="bg-[#ececec] content-stretch flex flex-col gap-[4px] items-start overflow-clip pl-[12px] pr-[24px] py-[6px] relative rounded-[12px] shrink-0 w-[98px]" data-node-id="6:630">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] whitespace-nowrap" data-node-id="6:631">
              <p className="leading-[normal]">Dự kiến đến</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-black w-[min-content]" data-node-id="6:632">
              <p className="leading-[normal]">19:30</p>
            </div>
          </div>
          <div className="bg-[#ececec] content-stretch flex flex-col gap-[4px] items-start overflow-clip pl-[12px] pr-[24px] py-[6px] relative rounded-[12px] shrink-0 w-[98px]" data-node-id="6:633">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] whitespace-nowrap" data-node-id="6:634">
              <p className="leading-[normal]">Cách giao</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-black w-[min-content]" data-node-id="6:635">
              <p className="leading-[normal]">Tự đến</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:636">
          <p className="leading-[normal]">{`“Bữa tối cho 32 em nhỏ và người cao tuổi, rất cần món mặn.” `}</p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:637">
          <div className="border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[20px] shrink-0 w-[153px]" data-node-id="6:638" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap" data-node-id="I6:638;6:171">
              Từ chối
            </p>
          </div>
          <div className="bg-[#006642] content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[20px] shrink-0 w-[167px]" data-node-id="6:639" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="I6:639;6:171">
              Chấp nhận
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col gap-[12px] items-start left-[16px] overflow-clip px-[16px] py-[24px] rounded-[24px] top-[362px] w-[370px]" data-node-id="6:640">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="6:641">
          <div className="bg-[#e1fde8] overflow-clip relative rounded-[100px] shrink-0 size-[40px]" data-node-id="6:642">
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-7px)] not-italic text-[#006642] text-[18px] top-1/2 whitespace-nowrap" data-node-id="6:643">
              <p className="leading-[normal]">B</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 w-[189px]" data-node-id="6:644">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" data-node-id="6:645">
              <p className="leading-[normal]">Bếp Yêu Thương Q.10</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[14px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:646">
              <p className="leading-[normal] whitespace-pre">{`2.8 km  Đã xác nhận  4.8 sao`}</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[0] not-italic relative shrink-0 text-[14px] w-full" data-node-id="6:647">
          <div className="bg-[#ececec] content-stretch flex flex-col gap-[4px] items-start overflow-clip pl-[12px] pr-[24px] py-[6px] relative rounded-[12px] shrink-0 w-[98px]" data-node-id="6:648">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] w-full" data-node-id="6:649">
              <p className="leading-[normal]">Xin nhận</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-black w-full" data-node-id="6:650">
              <p className="leading-[normal]">20 suất</p>
            </div>
          </div>
          <div className="bg-[#ececec] content-stretch flex flex-col gap-[4px] items-start overflow-clip pl-[12px] pr-[24px] py-[6px] relative rounded-[12px] shrink-0 w-[98px]" data-node-id="6:651">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] whitespace-nowrap" data-node-id="6:652">
              <p className="leading-[normal]">Dự kiến đến</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-black w-[min-content]" data-node-id="6:653">
              <p className="leading-[normal]">20:00</p>
            </div>
          </div>
          <div className="bg-[#ececec] content-stretch flex flex-col gap-[4px] items-start overflow-clip pl-[12px] pr-[24px] py-[6px] relative rounded-[12px] shrink-0 w-[98px]" data-node-id="6:654">
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#717171] whitespace-nowrap" data-node-id="6:655">
              <p className="leading-[normal]">Cách giao</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-black w-[min-content]" data-node-id="6:656">
              <p className="leading-[normal]">Cần giao</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:657">
          <p className="leading-[normal]">“Chúng tôi phát cơm miễn phí cho công nhân vào 20:30 tại Quận 10.”</p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:658">
          <div className="border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[20px] shrink-0 w-[153px]" data-node-id="6:659" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap" data-node-id="I6:659;6:171">
              Từ chối
            </p>
          </div>
          <div className="bg-[#006642] content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[20px] shrink-0 w-[167px]" data-node-id="6:660" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="I6:660;6:171">
              Chấp nhận
            </p>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[57px] left-[196.5px] top-[257px] w-[177px]" data-node-id="84:1561" data-name="Prototype / Chấp nhận" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[57px] left-[196.5px] top-[546px] w-[177px]" data-node-id="84:1563" data-name="Prototype / Chấp nhận" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[60px] left-[28.5px] top-[255.5px] w-[163px]" data-node-id="84:1565" data-name="Prototype / Từ chối" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[60px] left-[28.5px] top-[544.5px] w-[163px]" data-node-id="84:1567" data-name="Prototype / Từ chối" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[59px] left-[11px] top-[765px] w-[380px]" data-node-id="84:1569" data-name="Prototype / Xem gợi ý ghép cặp tự động" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1802" data-name="Prototype / Quay lại" />
    </div>
  );
}
