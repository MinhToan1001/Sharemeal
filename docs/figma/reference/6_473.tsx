const imgProperty1Love = "https://www.figma.com/api/mcp/asset/6e233423-5e8d-4cff-9657-f3f1861781d8.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/32e33efa-134a-4343-ac27-016b9fcfd236.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/7f89ce40-155b-4cf4-87d1-d8a3e1f9a664.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/121fca97-313a-4de4-a6be-53e9b4902ed0.svg";
const imgEllipse = "https://www.figma.com/api/mcp/asset/3fc15fdd-16c3-4b4b-83cf-f8eb451d3d80.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/4424c601-a567-4445-89ab-84a2fe40e79e.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/b34ffaea-8146-49fd-9a82-c81d8c267306.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/7a99a5d2-55a6-4466-aa7a-76072d9d2585.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/5fae398c-1986-4c98-801e-d8c01a7adf34.svg";

type IconProps = {
  className?: string;
  property1?: "Love" | "MapPing" | "Truck" | "ChervonLeft";
};

function Icon({ className, property1 = "Love" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  const isMapPing = property1 === "MapPing";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : isTruck ? "size-[39px]" : isMapPing ? "overflow-clip size-[24px]" : "size-[31px]"}`} id={isChervonLeft ? "node-6_140" : isTruck ? "node-6_122" : isMapPing ? "node-6_118" : "node-6_107"}>
      {["Love", "Truck", "ChervonLeft"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : isTruck ? imgProperty1Truck : imgProperty1Love} />}
      {isMapPing && (
        <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="6:119" data-name="Group">
          <div className="absolute inset-[-5.64%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function D04HnNiTraoBaAn() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:473" data-name="D04 · Hẹn nơi trao bữa ăn">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="74:1257">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="74:1258">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="74:1259" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="74:1260" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="74:1261">
            Hẹn nơi trao bữa ăn
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="74:1262">{`Bước 3 / 3 · Địa điểm & giờ lấy`}</p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="74:1265" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] h-[220px] overflow-clip relative rounded-[var(--sm-radius-24,24px)] shrink-0 w-[358px]" data-node-id="74:1266" data-name="Frame">
          <div className="absolute flex h-[318.664px] items-center justify-center left-[147.25px] top-[-30px] w-[157.542px]" data-node-id="74:1267">
            <div className="flex-none rotate-16">
              <div className="bg-[var(--sm-blueBg,#e9f3f8)] h-[310px] relative w-[75px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[35px] w-[435.408px]" data-node-id="74:1268">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[-2.07px] w-[430.924px]" data-node-id="74:1269">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[143px] w-[435.408px]" data-node-id="74:1270">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[105.93px] w-[430.924px]" data-node-id="74:1271">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[251px] w-[435.408px]" data-node-id="74:1272">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute bg-[var(--sm-surface,white)] h-[280px] left-[40px] top-[-20px] w-[10px]" data-node-id="74:1273" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[280px] left-[124px] top-[-20px] w-[10px]" data-node-id="74:1274" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[280px] left-[208px] top-[-20px] w-[10px]" data-node-id="74:1275" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[280px] left-[292px] top-[-20px] w-[10px]" data-node-id="74:1276" data-name="Rectangle" />
          <div className="absolute left-[55px] size-[42px] top-[70px]" data-node-id="74:1277" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[65px] overflow-clip size-[22px] top-[80px]" data-node-id="74:1278" data-name="Icon">
            <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="I74:1278;6:110" data-name="Group">
              <div className="absolute inset-[-5.53%_-6.06%_-4.07%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[71px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[49px] whitespace-nowrap" data-node-id="74:1283">
            A
          </p>
          <div className="absolute left-[245px] size-[42px] top-[170px]" data-node-id="74:1284" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[255px] size-[22px] top-[180px]" data-node-id="74:1285" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[261px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[149px] whitespace-nowrap" data-node-id="74:1287">
            B
          </p>
          <div className="absolute left-[160px] size-[42px] top-[120px]" data-node-id="74:1288" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </div>
          <div className="absolute left-[170px] size-[22px] top-[130px]" data-node-id="74:1289" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[22px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[18px] whitespace-nowrap" data-node-id="74:1291">
            Quận 1
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[273px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[188px] whitespace-nowrap" data-node-id="74:1292">
            Quận 5
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1293" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1294">
            Bếp Nhà Lan
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1295" data-name="go/foodPickup">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="MapPing" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[260px]" data-node-id="74:1300" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="74:1301">
                45 Nguyễn Thị Minh Khai
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="74:1302">
                Quận 1 · TP. Hồ Chí Minh
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1303">
              ›
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="74:1304" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="74:1305">
              Lấy trong khung giờ
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="74:1306">
              19:00–20:30 hôm nay
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1307" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1308">
            Cách bàn giao
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1309" data-name="Frame">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="74:1312" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="74:1313">
                Cho phép tình nguyện viên giao
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="74:1314">
                Nếu tổ chức không thể tự đến lấy
              </p>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1315">
            Ghi chú: Gọi quầy thu ngân khi đến. Các hộp đã được đóng sẵn.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="74:1316" data-name="go/reviewFood">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I74:1316;6:171">
            Xem lại tin đăng
          </p>
        </a>
      </div>
    </div>
  );
}
