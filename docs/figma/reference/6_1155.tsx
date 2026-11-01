const imgTablerUser = "https://www.figma.com/api/mcp/asset/f5b21e7e-d6a0-4597-8144-138fd4ba085c.svg";
const imgTablerPackage = "https://www.figma.com/api/mcp/asset/d888107b-aa0a-4c14-9296-5d3e92651aba.svg";
const imgTablerHeart = "https://www.figma.com/api/mcp/asset/9e960a1f-451e-4d56-b20b-90eb91b31ff6.svg";
const imgProperty1ChartBar = "https://www.figma.com/api/mcp/asset/23382bca-76ec-4fa2-94a2-370277fc8529.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/0d64622a-54b3-4421-9d29-7a02932a98cd.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/c51809d5-ea68-4500-b3c8-69fb91ee4de5.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/175ecb9b-5e5f-48bd-b24b-d7447dd2f808.svg";
const imgNhMinhHaCommunity = "https://www.figma.com/api/mcp/asset/e3704d75-4d6c-41f7-93e3-13915aa632c9.png";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/fab7932a-f662-4eaf-a684-3ae37831cfc1.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/388a58b3-4c91-467e-986f-62edb7f1bc7f.svg";
const imgTablerSearch = "https://www.figma.com/api/mcp/asset/3b204c2b-b76b-4e8b-9d99-d1fc2ca321f3.svg";

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

type IconProps = {
  className?: string;
  property1?: "ChartBar" | "Notice" | "Box" | "Truck";
};

function Icon({ className, property1 = "ChartBar" }: IconProps) {
  const isBox = property1 === "Box";
  const isNotice = property1 === "Notice";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isTruck ? "size-[39px]" : isBox ? "overflow-clip size-[39px]" : isNotice ? "size-[41px]" : "size-[37px]"}`} id={isTruck ? "node-6_122" : isBox ? "node-6_109" : isNotice ? "node-6_101" : "node-6_98"}>
      {["ChartBar", "Notice", "Truck"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isTruck ? imgProperty1Truck : isNotice ? imgProperty1Notice : imgProperty1ChartBar} />}
      {isBox && (
        <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="6:110" data-name="Group">
          <div className="absolute inset-[-3.12%_-3.42%_-1.66%_-3.42%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function C01MaimHoaSen() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:1155" data-name="C01 · Mái ấm Hoa Sen">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="66:1378">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="66:1379">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="66:1380" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="66:1381" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="66:1382">
            Mái ấm Hoa Sen
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="66:1383">
            Tổ chức từ thiện · Đã xác minh
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[41px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="66:1386" data-name="Content">
        <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[20px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1387" data-name="Frame">
          <div className="h-[134px] relative rounded-[16px] shrink-0 w-[318px]" data-node-id="73:1031" data-name="Ảnh minh họa / community">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaCommunity} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] w-[318px]" data-node-id="66:1388">
            BỮA TỐI CHO 32 NGƯỜI
          </p>
          <div className="[word-break:break-word] content-stretch flex gap-[10px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[318px]" data-node-id="66:1389" data-name="Frame">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[40px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="66:1390">
              15
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[220px]" data-node-id="66:1391">
              / 32 suất đã được ghép
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] h-[10px] overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[318px]" data-node-id="66:1392" data-name="Frame">
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[10px] left-0 rounded-[5px] top-0 w-[149px]" data-node-id="66:1393" data-name="Rectangle" />
          </div>
          <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[318px]" data-node-id="66:1394" data-name="go/findFood">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I66:1394;6:171">
              Tìm thêm 17 suất còn thiếu
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1396" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1397">
            Đơn nhận đang xử lý
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1398" data-name="go/charityTracking">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1401" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1402">
                15 suất cơm gà · DN-367
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1403">
                Xem tiến trình và thời gian bàn giao
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1404">
              ›
            </p>
          </a>
        </div>
        <div className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="66:1405" data-name="Frame">
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[173px]" data-node-id="66:1406" data-name="go/newNeed">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1406;6:173">
              Đăng nhu cầu
            </p>
          </a>
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[173px]" data-node-id="66:1408" data-name="go/U22">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1408;6:173">{`Kho & phân phát`}</p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1410" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1411">
            Thực phẩm phù hợp gần bạn
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1412" data-name="go/foodDetail">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Box" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1418" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1419">
                Rau củ sơ chế · 6 kg
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1420">
                Cách 2,1 km · cần bảo quản lạnh
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1421">
              ›
            </p>
          </a>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="66:1422" data-name="go/warehouse">
            <Icon className="relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="66:1426" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="66:1427">{`Điểm nhận & báo cáo`}</p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="66:1428">
                Quản lý sức chứa và số suất nhận
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="66:1429">
              ›
            </p>
          </a>
        </div>
      </div>
      <div className="absolute bg-white h-[67px] left-0 overflow-clip top-[807px] w-[400px]" data-node-id="66:1430" data-name="Bottom navigation / C01">
        <div className="absolute h-[67px] left-[11px] overflow-clip top-[-3px] w-[69px]" data-node-id="66:1431">
          <div className="absolute left-[20px] size-[25px] top-[8px]" data-node-id="66:1432" data-name="tabler:home">
            <div className="absolute inset-[12.5%]" data-node-id="I66:1432;158:138" data-name="Group">
              <div className="absolute inset-[-5.33%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33.5px] not-italic text-[#006642] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1433">
            <p className="leading-[normal]">Trang chủ</p>
          </div>
        </div>
        <div className="absolute h-[67px] left-[91px] overflow-clip top-[-3px] w-[69px]" data-node-id="66:1434">
          <div className="absolute left-[20px] size-[25px] top-[8px]" data-node-id="66:1435" data-name="tabler:home">
            <div className="absolute inset-[12.5%]" data-node-id="I66:1435;158:138" data-name="Group">
              <div className="absolute inset-[-5.33%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33.5px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1436">
            <p className="leading-[normal]">Tìm đồ ăn</p>
          </div>
          <div className="absolute left-[22px] size-[25px] top-[9px]" data-node-id="66:1437" data-name="tabler:search">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerSearch} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[169px] overflow-clip top-[-3px] w-[69px]" data-node-id="66:1439">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1440">
            <p className="leading-[normal]">Nhu cầu</p>
          </div>
          <TablerHeart className="absolute left-[20px] size-[24px] top-[10px]" />
        </div>
        <div className="absolute h-[67px] left-[249px] overflow-clip top-[-3px] w-[69px]" data-node-id="66:1442">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1443">
            <p className="leading-[normal]">Đơn nhận</p>
          </div>
          <TablerPackage className="absolute left-[19px] size-[25px] top-[8px]" />
        </div>
        <div className="absolute h-[67px] left-[327px] overflow-clip top-[-3px] w-[69px]" data-node-id="66:1445">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[33px] not-italic text-[#717171] text-[12px] text-center top-[45.5px] whitespace-nowrap" data-node-id="66:1446">
            <p className="leading-[normal]">Tôi</p>
          </div>
          <TablerUser className="absolute left-[20px] size-[25px] top-[8px]" />
        </div>
      </div>
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-0 top-[807px] w-[80.4px]" data-node-id="84:1722" data-name="Prototype / Trang chủ" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[80.4px] top-[807px] w-[80.4px]" data-node-id="84:1724" data-name="Prototype / Tìm đồ ăn" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[160.8px] top-[807px] w-[80.4px]" data-node-id="84:1726" data-name="Prototype / Nhu cầu" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[241.2px] top-[807px] w-[80.4px]" data-node-id="84:1728" data-name="Prototype / Đơn nhận" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[321.6px] top-[807px] w-[80.4px]" data-node-id="84:1730" data-name="Prototype / Tôi" />
    </div>
  );
}
