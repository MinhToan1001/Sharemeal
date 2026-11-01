const imgProperty1Start = "https://www.figma.com/api/mcp/asset/35ee70e1-478b-4c3a-91bc-b921a93c1c82.svg";
const imgProperty1Cross = "https://www.figma.com/api/mcp/asset/cc19a018-1916-42e9-aee5-5eab758beb39.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/e3ab40d6-ba37-4284-8d1d-5ce7419bc5f5.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/9333de8a-492c-403b-b249-b8db1b7347a5.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/b6e889c7-8503-41d1-893b-9641a9869661.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/9ed67095-cc53-4553-8c59-5b64dd44fae5.svg";

type IconProps = {
  className?: string;
  property1?: "Start" | "Cross";
};

function Icon({ className, property1 = "Start" }: IconProps) {
  const isCross = property1 === "Cross";
  return (
    <div className={className || `relative ${isCross ? "size-[24px]" : "size-[34px]"}`} id={isCross ? "node-6_152" : "node-6_128"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isCross ? imgProperty1Cross : imgProperty1Start} />
    </div>
  );
}

export default function Component22() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:795" data-name="22">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:796">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:797">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="6:798">
            <Icon className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" property1="Cross" />
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[219px]" data-node-id="6:800">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-full" data-node-id="6:801">
              <p className="leading-[normal]">Đánh giá bàn giao</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#e1fde8] content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[72px] w-[370px]" data-node-id="6:802">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="6:803">
          <div className="bg-[#006642] col-1 ml-0 mt-0 overflow-clip relative rounded-[100px] row-1 size-[40px]" data-node-id="6:804">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:805" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
          </div>
          <div className="[word-break:break-word] col-1 content-stretch flex flex-col font-['Inter:Bold'] font-bold items-start ml-[50px] mt-[3px] not-italic relative row-1" data-node-id="6:806">
            <div className="flex flex-col justify-center relative shrink-0 text-[#006642] text-[16px] w-[208px]" data-node-id="6:807">
              <p className="leading-[normal]">Bàn giao hoàn tất lúc 19:12</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[#63987b] text-[12px] whitespace-nowrap" data-node-id="6:808">
              <p className="leading-[normal]">Bánh mì ngọt các loại · 15 phần</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[16px] not-italic text-[14px] text-black top-[160.5px] whitespace-nowrap" data-node-id="6:809">
        <p className="leading-[normal]">Mái ấm Hoa Sen nhận hàng thế nào?</p>
      </div>
      <div className="absolute content-stretch flex items-center justify-between left-[16px] top-[185px] w-[202px]" data-node-id="6:810">
        <div className="relative shrink-0 size-[34px]" data-node-id="6:811" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
        </div>
        <div className="relative shrink-0 size-[34px]" data-node-id="6:812" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
        </div>
        <div className="relative shrink-0 size-[34px]" data-node-id="6:813" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
        </div>
        <div className="relative shrink-0 size-[34px]" data-node-id="6:814" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
        </div>
        <div className="relative shrink-0 size-[34px]" data-node-id="6:815" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
        </div>
      </div>
      <div className="absolute bg-[#006642] content-stretch flex items-center justify-center left-[16px] overflow-clip px-[12px] py-[8px] rounded-[16px] top-[237px]" data-node-id="6:816">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="6:817">
          <p className="leading-[normal]">Đến đúng giờ</p>
        </div>
      </div>
      <div className="absolute bg-[#006642] content-stretch flex items-center justify-center left-[139px] overflow-clip px-[12px] py-[8px] rounded-[16px] top-[237px]" data-node-id="6:818">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="6:819">
          <p className="leading-[normal]">Thân thiện</p>
        </div>
      </div>
      <div className="absolute border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-center left-[245px] overflow-clip px-[12px] py-[8px] rounded-[16px] top-[235px]" data-node-id="6:820">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="6:821">
          <p className="leading-[normal]">Liên lạc nhanh</p>
        </div>
      </div>
      <div className="absolute border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-center left-[16px] overflow-clip px-[12px] py-[8px] rounded-[16px] top-[284px]" data-node-id="6:822">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-node-id="6:823">
          <p className="leading-[normal]">Giữ vệ sinh hộp đựng</p>
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[16px] not-italic text-[14px] text-black top-[350.5px] whitespace-nowrap" data-node-id="6:824">
        <p className="leading-[normal]">Nhận xét thêm</p>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex h-[101px] items-start justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[377px] w-[370px]" data-node-id="6:825">
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-px not-italic relative text-[#717171] text-[14px]" data-node-id="6:826">
          <p className="leading-[normal]">Các bạn đến sớm hơn dự kiến, nhận hàng nhanh gọn.</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[511px] w-[370px]" data-node-id="6:827">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="6:828">
          <div className="bg-[#e1fde8] col-1 ml-0 mt-0 overflow-clip relative rounded-[100px] row-1 size-[40px]" data-node-id="6:829">
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-7px)] not-italic text-[#006642] text-[18px] top-1/2 whitespace-nowrap" data-node-id="6:830">
              <p className="leading-[normal]">B</p>
            </div>
          </div>
          <div className="[word-break:break-word] col-1 content-stretch flex flex-col items-start ml-[50px] mt-[3px] not-italic relative row-1 w-[153px]" data-node-id="6:831">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[16px] text-black w-full" data-node-id="6:832">
              <p className="leading-[normal]">Trần Quốc Bảo</p>
            </div>
            <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:833">
              <p className="leading-[normal]">Đánh giá tình nguyện viên</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="6:834">
          <div className="relative shrink-0 size-[21px]" data-node-id="6:835" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <div className="relative shrink-0 size-[21px]" data-node-id="6:836" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <div className="relative shrink-0 size-[21px]" data-node-id="6:837" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <div className="relative shrink-0 size-[21px]" data-node-id="6:838" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <div className="relative shrink-0 size-[21px]" data-node-id="6:839" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex h-[106px] items-end justify-center left-1/2 overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:840">
        <div className="bg-[#006642] content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[16px] py-[19px] relative rounded-[12px]" data-node-id="6:841" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="6:842">
            Gửi đánh giá
          </p>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[57px] left-[11px] top-[767px] w-[380px]" data-node-id="84:1578" data-name="Prototype / Gửi đánh giá" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1810" data-name="Prototype / Quay lại" />
    </div>
  );
}
