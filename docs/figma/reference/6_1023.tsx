const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/e94fec40-c80f-4096-a4b4-ef76c2edf381.svg";

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

export default function Component18() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:1023" data-name="18">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:1024">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:1025">
          <Icon className="relative shrink-0 size-[24px]" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[219px]" data-node-id="6:1027">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-full" data-node-id="6:1028">
              <p className="leading-[normal]">Gợi ý ghép cặp</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-[16px] not-italic text-[12px] text-[color:var(--des-text,#919191)] top-[82px] w-[370px]" data-node-id="6:1029">
        <p className="leading-[normal]">{`Điểm phù hợp tính theo khoảng cách, loại món, số suất cần và khung giờ nhận `}</p>
      </div>
      <div className="absolute contents left-[16px] top-[108px]" data-node-id="6:1030">
        <div className="absolute bg-white border-[#006642] border-[1.5px] border-solid content-stretch flex flex-col gap-[12px] items-start left-[16px] overflow-clip px-[16px] py-[24px] rounded-[24px] top-[120px] w-[370px]" data-node-id="6:1031">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:1032">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 w-[189px]" data-node-id="6:1033">
              <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[18px] text-black w-full" data-node-id="6:1034">
                <p className="leading-[normal]">Mái ấm hoa sen</p>
              </div>
              <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[14px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:1035">
                <p className="leading-[normal]">Xin 15 suất tự đến lấy</p>
              </div>
            </div>
            <div className="bg-white border-[#006642] border-[3.5px] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[50px]" data-node-id="6:1036">
              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-19px)] not-italic text-[18px] text-black top-1/2 whitespace-nowrap" data-node-id="6:1037">
                <p className="leading-[normal]">92%</p>
              </div>
            </div>
          </div>
          <div className="gap-x-[6px] gap-y-[6px] grid-cols-[repeat(2,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] inline-grid relative shrink-0" data-node-id="6:1038">
            <div className="bg-[#e1fde8] content-stretch flex items-center justify-center justify-self-stretch overflow-clip px-[12px] py-[3px] relative rounded-[11px] self-stretch shrink-0" data-node-id="6:1039" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:1039;6:180">
                <p className="leading-[normal]">Gần nhất 1.2km</p>
              </div>
            </div>
            <div className="bg-[#e1fde8] content-stretch flex items-center justify-center justify-self-stretch overflow-clip px-[12px] py-[3px] relative rounded-[11px] self-stretch shrink-0" data-node-id="6:1040" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:1040;6:180">
                <p className="leading-[normal]">Cần món mặn</p>
              </div>
            </div>
            <div className="bg-[#e1fde8] content-stretch flex items-center justify-center justify-self-stretch overflow-clip px-[12px] py-[3px] relative rounded-[11px] self-stretch shrink-0" data-node-id="6:1041" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:1041;6:180">
                <p className="leading-[normal]">Đến trước 19:30</p>
              </div>
            </div>
          </div>
          <div className="bg-[#006642] content-stretch flex items-center justify-center overflow-clip py-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:1042" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="I6:1042;6:171">
              Ghép với Mái ấm Hoa Sen
            </p>
          </div>
        </div>
        <div className="absolute bg-[#006642] content-stretch flex items-center justify-center left-[40px] overflow-clip px-[8px] py-[4px] rounded-[12px] top-[108px]" data-node-id="6:1043">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="6:1044">
            <p className="leading-[normal]">Phù hợp nhất</p>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[16px] top-[384px]" data-node-id="6:1045">
        <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex flex-col gap-[12px] items-start left-[16px] overflow-clip px-[16px] py-[24px] rounded-[24px] top-[384px] w-[370px]" data-node-id="6:1046">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:1047">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 w-[189px]" data-node-id="6:1048">
              <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" data-node-id="6:1049">
                <p className="leading-[normal]">Bếp Yêu Thương Q.10</p>
              </div>
              <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[14px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:1050">
                <p className="leading-[normal]">Xin 20 suất · cần tình nguyện viên giao</p>
              </div>
            </div>
            <div className="bg-white border-[#f5811f] border-[3.5px] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[50px]" data-node-id="6:1051">
              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-19px)] not-italic text-[18px] text-black top-1/2 whitespace-nowrap" data-node-id="6:1052">
                <p className="leading-[normal]">85%</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="6:1053">
            <div className="bg-[#c5c5c5] content-stretch flex h-[21px] items-center justify-center overflow-clip px-[12px] py-[3px] relative rounded-[11px] shrink-0" data-node-id="6:1054" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e6e] text-[12px] whitespace-nowrap" data-node-id="I6:1054;6:180">
                <p className="leading-[normal]">2,8km</p>
              </div>
            </div>
            <div className="bg-[#c5c5c5] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[3px] relative rounded-[11px] shrink-0" data-node-id="6:1055" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e6e] text-[12px] whitespace-nowrap" data-node-id="I6:1055;6:180">
                <p className="leading-[normal]">Đủ 20 suất</p>
              </div>
            </div>
          </div>
          <div className="bg-[#e4eef8] content-stretch flex h-[21px] items-center justify-center overflow-clip px-[12px] py-[3px] relative rounded-[11px] shrink-0" data-node-id="6:1056" data-name="Tag">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0c4da2] text-[12px] whitespace-nowrap" data-node-id="I6:1056;6:182">
              <p className="leading-[normal]">Có tình nguyện viên trống</p>
            </div>
          </div>
          <div className="border-[#006642] border-[1.5px] border-solid content-stretch flex items-center justify-center overflow-clip py-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:1057" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#006642] text-[16px] whitespace-nowrap" data-node-id="I6:1057;6:171">
              Chọn tổ chức này
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between left-[16px] overflow-clip px-[16px] py-[12px] rounded-[24px] top-[646px] w-[370px]" data-node-id="6:1058">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start leading-[normal] not-italic relative shrink-0 text-[16px] w-[214px]" data-node-id="6:1059">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-black w-full" data-node-id="6:1060">
            Quỹ Bữa Cơm sẻ chia
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#717171] w-full" data-node-id="6:1061">
            Cần rau củ nhiều hơn 3,4km
          </p>
        </div>
        <div className="bg-white border-[3.5px] border-[var(--des-text,#919191)] border-solid overflow-clip relative rounded-[100px] shrink-0 size-[50px]" data-node-id="6:1062">
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-19px)] not-italic text-[18px] text-black top-1/2 whitespace-nowrap" data-node-id="6:1063">
            <p className="leading-[normal]">71%</p>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[51px] left-[28.5px] top-[263.5px] w-[345px]" data-node-id="84:1571" data-name="Prototype / Ghép với Mái ấm Hoa Sen" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[54px] left-[28.5px] top-[533.5px] w-[345px]" data-node-id="84:1573" data-name="Prototype / Chọn tổ chức này" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1804" data-name="Prototype / Quay lại" />
    </div>
  );
}
