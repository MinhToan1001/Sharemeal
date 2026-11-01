const imgTablerUser = "https://www.figma.com/api/mcp/asset/5fe84b85-3d12-49d2-a672-a577310002cd.svg";
const imgTablerPackage = "https://www.figma.com/api/mcp/asset/1a7174bf-b8f4-4a4a-a18b-85b068330a2e.svg";
const imgTablerHeart = "https://www.figma.com/api/mcp/asset/259e3b87-c1fd-4339-965f-0e13a1186983.svg";
const imgLogo = "https://www.figma.com/api/mcp/asset/c2326f24-26b6-4af6-8994-7967a38b83a5.svg";
const imgLogo1 = "https://www.figma.com/api/mcp/asset/7a51d001-1796-45c8-8aeb-4062169d4d4d.svg";
const imgTablerSearch = "https://www.figma.com/api/mcp/asset/0ba47a6f-fac8-4489-9f8e-bb25eb19be28.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/0dadd49c-2ea7-4b0d-9be3-d5d34dba7999.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/7360da5b-9eae-4d8e-bc75-068a6d86dd8d.svg";
const imgTablerSearch1 = "https://www.figma.com/api/mcp/asset/5b397a91-6b20-4753-be0b-eb5e4c794149.svg";

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

type TagProps = {
  className?: string;
  property1?: "Hot";
};

function Tag({ className, property1 = "Hot" }: TagProps) {
  return (
    <div className={className || "bg-[#e1fde8] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[3px] relative rounded-[11px]"} data-node-id="6:179">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="6:180">
        <p className="leading-[normal]">Còn nóng</p>
      </div>
    </div>
  );
}

export default function Component24() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:1212" data-name="24">
      <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[104px] left-[20px] overflow-clip rounded-[20px] top-[582px] w-[363px]" data-node-id="6:1213">
        <div className="absolute bg-[#e4f1e8] h-[79px] left-[12px] overflow-clip rounded-[15px] top-[11px] w-[80px]" data-node-id="6:1214">
          <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1215" data-name="Logo">
            <div className="absolute inset-[-5.76%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLogo} />
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fef0d5] content-stretch flex items-center justify-center left-[191px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px] w-[62px]" data-node-id="6:1216" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8f5f15] text-[12px] whitespace-nowrap" data-node-id="I6:1216;6:180">
            <p className="leading-[normal]">Còn 1g</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[16px] text-black top-[22px] w-[121px]" data-node-id="6:1217">
          <p className="leading-[normal]">Rau củ sơ chế</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[#6e6e6e] text-[13px] top-[43px] w-[176px]" data-node-id="6:1218">
          <p className="leading-[normal]">Siêu thị Xanh - 8kg</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[18px] justify-center leading-[0] left-[310px] not-italic text-[#006642] text-[13px] top-[19px] w-[44px]" data-node-id="6:1219">
          <p className="leading-[normal]">2,1 km</p>
        </div>
        <Tag className="absolute bg-[#e1fde8] content-stretch flex items-center justify-center left-[103px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px]" />
        <Tag className="absolute bg-[#e1fde8] content-stretch flex items-center justify-center left-[103px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px]" />
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[104px] left-[19px] overflow-clip rounded-[20px] top-[465px] w-[363px]" data-node-id="6:1222">
        <div className="absolute bg-[#fef0d5] h-[79px] left-[12px] overflow-clip rounded-[15px] top-[11px] w-[80px]" data-node-id="6:1223">
          <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1224" data-name="Logo">
            <div className="absolute inset-[-5.76%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLogo1} />
            </div>
          </div>
        </div>
        <div className="absolute bg-[#eee] content-stretch flex items-center justify-center left-[103px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px] w-[118px]" data-node-id="6:1225" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#505050] text-[12px] whitespace-nowrap" data-node-id="I6:1225;6:180">
            <p className="leading-[normal]">Nhiệt độ phòng</p>
          </div>
        </div>
        <div className="absolute bg-[#fef0d5] content-stretch flex items-center justify-center left-[227px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px] w-[91px]" data-node-id="6:1226" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8f5f15] text-[12px] whitespace-nowrap" data-node-id="I6:1226;6:180">
            <p className="leading-[normal]">Còn 2g 10p</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[16px] text-black top-[22px] w-[171px]" data-node-id="6:1227">
          <p className="leading-[normal]">Bánh mì ngọt các loại</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[#6e6e6e] text-[13px] top-[43px] w-[189px]" data-node-id="6:1228">
          <p className="leading-[normal]">Tiệm Bánh Sài Gòn - 15 phần</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[18px] justify-center leading-[0] left-[310px] not-italic text-[#006642] text-[13px] top-[19px] w-[44px]" data-node-id="6:1229">
          <p className="leading-[normal]">2,6 km</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[104px] left-[20px] overflow-clip rounded-[20px] top-[231px] w-[363px]" data-node-id="6:1230">
        <div className="absolute bg-[#fef0d5] h-[79px] left-[12px] overflow-clip rounded-[15px] top-[11px] w-[80px]" data-node-id="6:1231">
          <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1232" data-name="Logo">
            <div className="absolute inset-[-5.76%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLogo1} />
            </div>
          </div>
        </div>
        <Tag className="absolute bg-[#e1fde8] content-stretch flex items-center justify-center left-[103px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px]" />
        <div className="absolute bg-[#fef0d5] content-stretch flex items-center justify-center left-[190px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px] w-[91px]" data-node-id="6:1234" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8f5f15] text-[12px] whitespace-nowrap" data-node-id="I6:1234;6:180">
            <p className="leading-[normal]">Còn 1g 40p</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[16px] text-black top-[22px] w-[121px]" data-node-id="6:1235">
          <p className="leading-[normal]">Cơm gà xối mỡ</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[#6e6e6e] text-[13px] top-[43px] w-[176px]" data-node-id="6:1236">
          <p className="leading-[normal]">Bếp Nhà Lan - 20 xuất</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[18px] justify-center leading-[0] left-[310px] not-italic text-[#006642] text-[13px] top-[19px] w-[44px]" data-node-id="6:1237">
          <p className="leading-[normal]">1,2 km</p>
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal h-[22px] justify-center leading-[0] left-[19px] not-italic text-[#717171] text-[14px] top-[207px] w-[341px]" data-node-id="6:1238">
        <p className="leading-[normal]">6 kết quả trong bán kính 5 km - Gần nhất trước</p>
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[104px] left-[20px] overflow-clip rounded-[20px] top-[348px] w-[363px]" data-node-id="6:1239">
        <div className="absolute bg-[#e4f1e8] h-[79px] left-[12px] overflow-clip rounded-[15px] top-[11px] w-[80px]" data-node-id="6:1240">
          <div className="absolute h-[26px] left-[26px] top-[27px] w-[28px]" data-node-id="6:1241" data-name="Logo">
            <div className="absolute inset-[-5.76%_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLogo} />
            </div>
          </div>
        </div>
        <div className="absolute bg-[#e1effd] content-stretch flex items-center justify-center left-[103px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px] w-[68px]" data-node-id="6:1242" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00488f] text-[12px] whitespace-nowrap" data-node-id="I6:1242;6:180">
            <p className="leading-[normal]">Để lạnh</p>
          </div>
        </div>
        <div className="absolute bg-[#fef0d5] content-stretch flex items-center justify-center left-[178px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[58px] w-[94px]" data-node-id="6:1243" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8f5f15] text-[12px] whitespace-nowrap" data-node-id="I6:1243;6:180">
            <p className="leading-[normal]">Còn 2g 30p</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[16px] text-black top-[22px] w-[121px]" data-node-id="6:1244">
          <p className="leading-[normal]">Rau củ sơ chế</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[20px] justify-center leading-[0] left-[105px] not-italic text-[#6e6e6e] text-[13px] top-[43px] w-[176px]" data-node-id="6:1245">
          <p className="leading-[normal]">Siêu thị Xanh - 8kg</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[18px] justify-center leading-[0] left-[310px] not-italic text-[#006642] text-[13px] top-[19px] w-[44px]" data-node-id="6:1246">
          <p className="leading-[normal]">2,1 km</p>
        </div>
      </div>
      <div className="absolute bg-white border-[#7b7b7b] border-[0.5px] border-solid h-[183px] left-0 overflow-clip top-0 w-[402px]" data-node-id="6:1247">
        <div className="absolute bg-[#eee] border border-[#b7b7b7] border-solid h-[50px] left-[19px] overflow-clip rounded-[20px] top-[72px] w-[366px]" data-node-id="6:1248">
          <div className="absolute left-[17px] size-[21px] top-[13px]" data-node-id="66:1366" data-name="tabler:search">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerSearch} />
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[41px] justify-center leading-[0] left-[50px] not-italic text-[#7f7f7f] text-[15px] top-[23.5px] w-[232px]" data-node-id="6:1250">
            <p className="leading-[normal]">{`Tìm món ăn, nhà hàng `}</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[22px] justify-center leading-[0] left-[19px] not-italic text-[24px] text-black top-[40px] w-[196px]" data-node-id="6:1251">
          <p className="leading-[normal]">Tìm thực phẩm</p>
        </div>
        <div className="absolute bg-[#c5c5c5] h-[38px] left-[201px] overflow-clip rounded-[13px] top-[21px] w-[184px]" data-node-id="6:1252">
          <div className="absolute bg-white h-[33px] left-[3px] overflow-clip rounded-[13px] top-[2px] w-[101px]" data-node-id="6:1253">
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[16px] justify-center leading-[0] left-[14px] not-italic text-[14px] text-black top-[17px] w-[83px]" data-node-id="6:1254">
              <p className="leading-[normal]">Danh sách</p>
            </div>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[16px] justify-center leading-[0] left-[120px] not-italic text-[14px] text-black top-[19px] w-[52px]" data-node-id="6:1255">
            <p className="leading-[normal]">Bản đò</p>
          </div>
        </div>
        <div className="absolute h-[46px] left-[13px] overflow-clip top-[129px] w-[372px]" data-node-id="6:1256">
          <div className="absolute bg-[#006642] h-[36px] left-[6px] overflow-clip rounded-[20px] top-[6px] w-[74px]" data-node-id="6:1257">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[17px] justify-center leading-[0] left-[37.5px] not-italic text-[15px] text-center text-white top-[17.5px] w-[51px]" data-node-id="6:1258">
              <p className="leading-[normal]">Tất cả</p>
            </div>
          </div>
          <div className="absolute bg-white border border-[#b7b7b7] border-solid h-[36px] left-[89px] overflow-clip rounded-[20px] top-[6px] w-[139px]" data-node-id="6:1259">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[17px] justify-center leading-[0] left-[69px] not-italic text-[15px] text-black text-center top-[16.5px] w-[124px]" data-node-id="6:1260">
              <p className="leading-[normal]">{`Cơm & món mặn`}</p>
            </div>
          </div>
          <div className="absolute bg-white border border-[#b7b7b7] border-solid h-[36px] left-[237px] overflow-clip rounded-[20px] top-[6px] w-[67px]" data-node-id="6:1261">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[17px] justify-center leading-[0] left-[32.5px] not-italic text-[15px] text-black text-center top-[16.5px] w-[51px]" data-node-id="6:1262">
              <p className="leading-[normal]">Bánh</p>
            </div>
          </div>
          <div className="absolute bg-white border border-[#b7b7b7] border-solid h-[36px] left-[313px] overflow-clip rounded-[20px] top-[6px] w-[77px]" data-node-id="6:1263">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[17px] justify-center leading-[0] left-[38.5px] not-italic text-[15px] text-black text-center top-[16.5px] w-[51px]" data-node-id="6:1264">
              <p className="leading-[normal]">Rau củ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white h-[67px] left-px overflow-clip top-[807px] w-[400px]" data-node-id="6:1265">
        <div className="absolute h-[67px] left-[11px] overflow-clip top-[-3px] w-[69px]" data-node-id="6:1266">
          <div className="absolute left-[20px] size-[25px] top-[8px]" data-node-id="6:1267" data-name="tabler:home">
            <div className="absolute inset-[12.5%]" data-node-id="I6:1267;158:138" data-name="Group">
              <div className="absolute inset-[-5.33%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1268">
            <p className="leading-[normal]">Trang chủ</p>
          </div>
        </div>
        <div className="absolute h-[67px] left-[91px] overflow-clip top-[-3px] w-[69px]" data-node-id="6:1269">
          <div className="absolute left-[20px] size-[25px] top-[8px]" data-node-id="6:1270" data-name="tabler:home">
            <div className="absolute inset-[12.5%]" data-node-id="I6:1270;158:138" data-name="Group">
              <div className="absolute inset-[-5.33%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#006642] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1271">
            <p className="leading-[normal]">Tìm đồ ăn</p>
          </div>
          <div className="absolute left-[22px] size-[25px] top-[9px]" data-node-id="66:1364" data-name="tabler:search">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerSearch1} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[169px] overflow-clip top-[-3px] w-[69px]" data-node-id="6:1273">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1274">
            <p className="leading-[normal]">Nhu cầu</p>
          </div>
          <TablerHeart className="absolute left-[20px] size-[24px] top-[10px]" />
        </div>
        <div className="absolute h-[67px] left-[249px] overflow-clip top-[-3px] w-[69px]" data-node-id="6:1276">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1277">
            <p className="leading-[normal]">Đơn nhận</p>
          </div>
          <TablerPackage className="absolute left-[19px] size-[25px] top-[8px]" />
        </div>
        <div className="absolute h-[67px] left-[327px] overflow-clip top-[-3px] w-[69px]" data-node-id="6:1279">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[10px] justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45px] w-[61px]" data-node-id="6:1280">
            <p className="leading-[normal]">Tôi</p>
          </div>
          <TablerUser className="absolute left-[20px] size-[25px] top-[8px]" />
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[44px] left-[121px] top-[240px] w-[131px]" data-node-id="84:1580" data-name="Prototype / Cơm gà xối mỡ" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-0 top-[807px] w-[80.4px]" data-node-id="84:1732" data-name="Prototype / Trang chủ" />
      <div className="absolute bg-[rgba(0,0,0,0)] h-[67px] left-[80.4px] top-[807px] w-[80.4px]" data-node-id="84:1734" data-name="Prototype / Tìm đồ ăn" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[160.8px] top-[807px] w-[80.4px]" data-node-id="84:1735" data-name="Prototype / Nhu cầu" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[241.2px] top-[807px] w-[80.4px]" data-node-id="84:1737" data-name="Prototype / Đơn nhận" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[321.6px] top-[807px] w-[80.4px]" data-node-id="84:1739" data-name="Prototype / Tôi" />
    </div>
  );
}
