const imgTablerUser = "https://www.figma.com/api/mcp/asset/7e462098-04fe-40d6-8284-2ce119c422a4.svg";
const imgTablerPackage = "https://www.figma.com/api/mcp/asset/1da23540-769e-45f3-92c8-df37caa5a3f4.svg";
const imgTablerHeart = "https://www.figma.com/api/mcp/asset/785fb9c6-d775-49c1-8bff-7a15fc10fcc8.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/597b7f33-a2e1-49eb-b610-b5f8f9a91b6a.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/eef1196b-acff-4121-ace5-4fc8ffabb87e.svg";
const imgLogo = "https://www.figma.com/api/mcp/asset/dcd09922-7704-40d8-9807-f26fde99f91d.svg";
const imgLogo1 = "https://www.figma.com/api/mcp/asset/293f7d16-8342-401a-9170-a2f3b9eec809.svg";
const imgTablerSearch = "https://www.figma.com/api/mcp/asset/ebd89245-8458-4714-b9eb-37fcddaa8992.svg";

function TablerUser({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:67" data-name="tabler:user">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerUser} />
    </div>
  );
}

function TablerPackage({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:76" data-name="tabler:package">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerPackage} />
    </div>
  );
}

function TablerHeart({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="6:74" data-name="tabler:heart">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerHeart} />
    </div>
  );
}

function TablerHome({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[25px]"} data-node-id="6:63" data-name="tabler:home">
      <div className="absolute inset-[12.5%]" data-node-id="6:64" data-name="Group">
        <div className="absolute inset-[-5.33%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

type CategoryProps = {
  className?: string;
  property1?: "Default";
};

function Category({ className, property1 = "Default" }: CategoryProps) {
  return (
    <div className={className || "bg-[#006642] content-stretch flex items-center justify-center overflow-clip px-[20px] py-[8px] relative rounded-[16px]"} data-node-id="6:184">
      <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="6:185">
        Đang mở 3
      </p>
    </div>
  );
}

export default function Component15() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:1087" data-name="15">
      <div className="absolute bg-white h-[110px] left-0 overflow-clip top-0 w-[402px]" data-node-id="6:1088">
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-[15px] not-italic text-[18px] text-black top-[24px] whitespace-nowrap" data-node-id="6:1089">
          Tin đăng của tôi
        </p>
        <div className="absolute bg-[#006642] left-[346px] overflow-clip rounded-[50px] size-[41px] top-[14px]" data-node-id="6:1090">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[24px] top-[calc(50%+0.5px)]" data-node-id="6:1091" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[73px] w-[371px]" data-node-id="6:1092">
          <Category className="bg-[#006642] content-stretch flex items-center justify-center overflow-clip px-[20px] py-[8px] relative rounded-[16px] shrink-0" />
          <div className="bg-[#f6f8f5] content-stretch flex items-center justify-center overflow-clip px-[20px] py-[8px] relative rounded-[16px] shrink-0" data-node-id="6:1094" data-name="Category">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="I6:1094;6:187">
              Đang giao 1
            </p>
          </div>
          <div className="bg-[#f6f8f5] content-stretch flex items-center justify-center overflow-clip px-[20px] py-[8px] relative rounded-[16px] shrink-0" data-node-id="6:1095" data-name="Category">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="I6:1095;6:187">
              Hết hạn 5
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] items-start left-[16px] overflow-clip px-[16px] py-[12px] rounded-[20px] top-[151px] w-[370px]" data-node-id="6:1096">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="6:1097">
          <div className="bg-[#fef0d5] overflow-clip relative rounded-[15px] shrink-0 size-[79px]" data-node-id="6:1098">
            <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1099" data-name="Logo">
              <div className="absolute inset-[-5.76%_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLogo} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-w-px not-italic place-items-start relative" data-node-id="6:1100">
            <div className="col-1 flex flex-col font-['Inter:Medium'] font-medium justify-center ml-0 mt-[26px] relative row-1 text-[#6e6e6e] text-[13px] w-[66.38%]" data-node-id="6:1101">
              <p className="leading-[normal]">20 suất lấy 19:00 - 20:30</p>
            </div>
            <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-full" data-node-id="6:1102">
              <div className="flex flex-col font-['Inter:Bold'] font-bold h-[20px] justify-center relative shrink-0 text-[16px] text-black w-[121px]" data-node-id="6:1103">
                <p className="leading-[normal]">Cơm gà xối mỡ</p>
              </div>
              <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[13px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:1104">
                <p className="leading-[normal]">#SM-2041</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[326px]" data-node-id="6:1105">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="6:1106">
            <div className="bg-[#e1fde8] col-1 content-stretch flex items-center justify-center ml-0 mt-0 overflow-clip px-[12px] py-[3px] relative rounded-[11px] row-1" data-node-id="6:1107" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:1107;6:180">
                <p className="leading-[normal]">Đang mở</p>
              </div>
            </div>
            <div className="bg-[#fef0d5] col-1 content-stretch flex items-center justify-center ml-[87px] mt-0 overflow-clip px-[12px] py-[3px] relative rounded-[11px] row-1 w-[123px]" data-node-id="6:1108" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8f5f15] text-[12px] whitespace-nowrap" data-node-id="I6:1108;6:180">
                <p className="leading-[normal]">2 yêu cầu mới</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="6:1109">
            <p className="leading-[normal]">Xem yêu cầu</p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] items-start left-[17px] overflow-clip px-[16px] py-[12px] rounded-[20px] top-[302px] w-[370px]" data-node-id="6:1110">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="6:1111">
          <div className="bg-[#e4f1e8] overflow-clip relative rounded-[15px] shrink-0 size-[79px]" data-node-id="6:1112">
            <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1113" data-name="Logo">
              <div className="absolute inset-[-5.76%_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLogo1} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-w-px not-italic place-items-start relative" data-node-id="6:1114">
            <div className="col-1 flex flex-col font-['Inter:Medium'] font-medium justify-center ml-0 mt-[26px] relative row-1 text-[#6e6e6e] text-[13px] w-[67.23%]" data-node-id="6:1115">
              <p className="leading-[normal]">15 phần lấy 20:00 - 21:00</p>
            </div>
            <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-full whitespace-nowrap" data-node-id="6:1116">
              <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[16px] text-black" data-node-id="6:1117">
                <p className="leading-[normal]">Bánh mì ngọt các loại</p>
              </div>
              <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[13px] text-[color:var(--des-text,#919191)]" data-node-id="6:1118">
                <p className="leading-[normal]">#SM-2040</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[326px]" data-node-id="6:1119">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="6:1120">
            <div className="bg-[#e4eef8] col-1 content-stretch flex items-center justify-center ml-0 mt-0 overflow-clip px-[12px] py-[3px] relative rounded-[11px] row-1" data-node-id="6:1121" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0c4da2] text-[12px] whitespace-nowrap" data-node-id="I6:1121;6:182">
                <p className="leading-[normal]">Đã ghép cặp</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="6:1122">
            <p className="leading-[normal]">Theo dõi</p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] items-start left-[17px] overflow-clip px-[16px] py-[12px] rounded-[20px] top-[461px] w-[370px]" data-node-id="6:1123">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="6:1124">
          <div className="bg-[#e4f1e8] overflow-clip relative rounded-[15px] shrink-0 size-[79px]" data-node-id="6:1125">
            <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1126" data-name="Logo">
              <div className="absolute inset-[-5.76%_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLogo1} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-w-px not-italic place-items-start relative" data-node-id="6:1127">
            <div className="col-1 flex flex-col font-['Inter:Medium'] font-medium justify-center ml-0 mt-[26px] relative row-1 text-[#6e6e6e] text-[13px] w-[67.23%]" data-node-id="6:1128">
              <p className="leading-[normal]">15 phần lấy 18:30 - 19:30</p>
            </div>
            <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-full whitespace-nowrap" data-node-id="6:1129">
              <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[16px] text-black" data-node-id="6:1130">
                <p className="leading-[normal]">Canh rau củ hầm</p>
              </div>
              <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[13px] text-[color:var(--des-text,#919191)]" data-node-id="6:1131">
                <p className="leading-[normal]">#SM-2038</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[326px]" data-node-id="6:1132">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="6:1133">
            <div className="bg-[#e1fde8] col-1 content-stretch flex items-center justify-center ml-0 mt-0 overflow-clip px-[12px] py-[3px] relative rounded-[11px] row-1" data-node-id="6:1134" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:1134;6:180">
                <p className="leading-[normal]">Đang mở</p>
              </div>
            </div>
            <div className="bg-[#d2d2d2] col-1 content-stretch flex items-center justify-center ml-[87px] mt-0 overflow-clip px-[12px] py-[3px] relative rounded-[11px] row-1 w-[123px]" data-node-id="6:1135" data-name="Tag">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="I6:1135;6:180">
                <p className="leading-[normal]">Chưa có yêu cầu</p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="6:1136">
            <p className="leading-[normal] whitespace-pre">{`Chỉnh  sửa`}</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white bottom-0 h-[67px] left-1/2 overflow-clip w-[402px]" data-node-id="6:1137">
        <div className="absolute h-[67px] left-[11px] overflow-clip top-0 w-[69px]" data-node-id="6:1138">
          <TablerHome className="absolute left-[20px] size-[25px] top-[8px]" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1140">
            <p className="leading-[normal]">Trang chủ</p>
          </div>
        </div>
        <div className="absolute h-[67px] left-[91px] overflow-clip top-0 w-[69px]" data-node-id="6:1141">
          <div className="absolute left-[20px] size-[25px] top-[8px]" data-node-id="6:1142" data-name="tabler:home">
            <div className="absolute inset-[12.5%]" data-node-id="I6:1142;158:138" data-name="Group">
              <div className="absolute inset-[-5.33%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1143">
            <p className="leading-[normal]">Tìm đồ ăn</p>
          </div>
          <div className="absolute left-[22px] size-[25px] top-[9px]" data-node-id="66:1370" data-name="tabler:search">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerSearch} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[171px] overflow-clip top-0 w-[69px]" data-node-id="6:1145">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1146">
            <p className="leading-[normal]">Nhu cầu</p>
          </div>
          <TablerHeart className="absolute left-[20px] size-[24px] top-[10px]" />
        </div>
        <div className="absolute h-[67px] left-[251px] overflow-clip top-0 w-[69px]" data-node-id="6:1148">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1149">
            <p className="leading-[normal]">Đơn nhận</p>
          </div>
          <TablerPackage className="absolute left-[19px] size-[25px] top-[8px]" />
        </div>
        <div className="absolute h-[67px] left-[331px] overflow-clip top-0 w-[69px]" data-node-id="6:1151">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1152">
            <p className="leading-[normal]">Tôi</p>
          </div>
          <TablerUser className="absolute left-[20px] size-[25px] top-[8px]" />
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[44px] left-[279px] top-[258px] w-[85px]" data-node-id="84:1549" data-name="Prototype / Xem yêu cầu" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[44px] left-[292px] top-[568px] w-[78px]" data-node-id="84:1551" data-name="Prototype / Chỉnh sửa" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[44px] left-[303px] top-[409px] w-[78px]" data-node-id="84:1553" data-name="Prototype / Theo dõi" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[138px] left-[22px] top-[106px] w-[358px]" data-node-id="84:1686" data-name="Prototype / Tin cơm gà" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-0 top-[807px] w-[100.5px]" data-node-id="84:1708" data-name="Prototype / Trang chủ" />
      <div className="absolute bg-[rgba(0,0,0,0)] h-[67px] left-[100.5px] top-[807px] w-[100.5px]" data-node-id="84:1710" data-name="Prototype / Tin đăng" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[201px] top-[807px] w-[100.5px]" data-node-id="84:1711" data-name="Prototype / Tác động" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[301.5px] top-[807px] w-[100.5px]" data-node-id="84:1713" data-name="Prototype / Tôi" />
    </div>
  );
}
